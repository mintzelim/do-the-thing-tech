import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const template = readFileSync(resolve(process.cwd(), "client/index.html"), "utf8");
const server = readFileSync(resolve(process.cwd(), "server/_core/vite.ts"), "utf8");
const entry = readFileSync(resolve(process.cwd(), "client/src/entry-server.tsx"), "utf8");
const client = readFileSync(resolve(process.cwd(), "client/src/entry-client.tsx"), "utf8");
const build = readFileSync(resolve(process.cwd(), "package.json"), "utf8");

describe("public SSR and metadata rendering", () => {
  it("uses one server-owned head and root-content placeholder rather than duplicated static SEO tags", () => {
    expect(template).toContain("<!--app-head-->");
    expect(template).toContain('<div id="root"><!--app-html--></div>');
    expect(template).toContain('/src/entry-client.tsx');
    expect(template).not.toContain('aggregateRating');
    expect(template).not.toContain('SearchAction');
  });

  it("renders crawler-visible public body content with route-level metadata and accurate JSON-LD", () => {
    expect(server).toContain("buildHeadTags");
    expect(server).toContain("application/ld+json");
    expect(server).toContain("noindex, follow");
    expect(entry).toContain('path.startsWith("/blog/")');
    expect(entry).toContain('"@type": "BlogPosting"');
    expect(entry).toContain('"@type": "SoftwareApplication"');
    expect(entry).toContain("notFound: true");
  });

  it("hydrates the same preloaded blog registry and builds the dedicated SSR bundle in production mode", () => {
    expect(client).toContain("window.__DTT_BLOG_POSTS__");
    expect(client).toContain("hydrateRoot");
    expect(build).toContain("vite build --config vite.config.ssr.ts");
    expect(build).toContain("NODE_ENV=production");
  });
});
