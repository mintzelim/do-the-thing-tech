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

  it("uses the public DoTheThing brand and a clean product description for the organization schema", () => {
    expect(entry).toContain("name: SITE_NAME");
    expect(entry).toContain("description: SITE_IDENTITY.businessDescription");
    expect(entry).not.toContain('name: "Boundless One Ventures"');
    expect(entry).not.toContain("alternateName: \"DoTheThing\"");
  });

  it("emits a specific SoftwareApplication entity for About with the required public product fields", () => {
    expect(entry).toContain('applicationCategory: "ProductivityApplication"');
    expect(entry).toContain('operatingSystem: "Web"');
    expect(entry).toContain('offers: { "@type": "Offer", price: "0", priceCurrency: "USD", availability: "https://schema.org/InStock" }');
    expect(entry).toContain('jsonLd: [organization, website, software, pageSchema("/about"');
  });

  it("emits the same specific SoftwareApplication entity on blog and supporting public routes", () => {
    expect(entry).toContain('jsonLd: [organization, website, software, pageSchema("/blog"');
    expect(entry).toContain('jsonLd: [organization, website, software, pageSchema(url, post.title, post.excerpt), blogSchema(post), breadcrumbSchema(post)]');
    expect(entry).toContain('jsonLd: [organization, website, software, pageSchema("/editorial-standards"');
    expect(entry).toContain('jsonLd: [organization, website, software, pageSchema(path, page.title, page.description)]');
  });

  it("uses valid application metadata and public identity details without fabricating ratings", () => {
    expect(entry).toContain("softwareVersion: SITE_IDENTITY.softwareVersion");
    expect(entry).toContain('softwareHelp: `${ORIGIN}/contact`');
    expect(entry).toContain('mainEntityOfPage: { "@id": `${ORIGIN}/#webpage` }');
    expect(entry).toContain("telephone: SITE_IDENTITY.telephone");
    expect(entry).toContain('address: { "@type": "PostalAddress", ...SITE_IDENTITY.address }');
    expect(entry).not.toContain("aggregateRating");
  });

  it("hydrates the same preloaded blog registry and builds the dedicated SSR bundle in production mode", () => {
    expect(client).toContain("window.__DTT_BLOG_POSTS__");
    expect(client).toContain("hydrateRoot");
    expect(build).toContain("vite build --config vite.config.ssr.ts");
    expect(build).toContain("NODE_ENV=production");
  });
});
