import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const about = readFileSync(resolve(process.cwd(), "client/src/pages/About.tsx"), "utf8");
const homeContent = readFileSync(resolve(process.cwd(), "client/src/components/HomeContent.tsx"), "utf8");
const blogPost = readFileSync(resolve(process.cwd(), "client/src/pages/BlogPost.tsx"), "utf8");
const enhancedSchema = readFileSync(resolve(process.cwd(), "client/src/lib/enhancedSchema.ts"), "utf8");
const entryServer = readFileSync(resolve(process.cwd(), "client/src/entry-server.tsx"), "utf8");
const blogMetadata = readFileSync(resolve(process.cwd(), "server/blog-metadata.ts"), "utf8");

describe("approved founder profile", () => {
  const role = "Founder, Creative Director, Product Developer";
  const linkedIn = "https://www.linkedin.com/in/mintze/";

  it("shows the approved role and LinkedIn profile on the public About page", () => {
    expect(about).toContain(role);
    expect(about).toContain(linkedIn);
    expect(about).not.toContain("linkedin.com/in/min-tze-lim");
  });

  it("keeps public founder references and structured data aligned to the approved profile", () => {
    expect(homeContent).toContain(role);
    expect(blogPost).toContain(role);
    expect(enhancedSchema).toContain(role);
    expect(enhancedSchema).toContain(linkedIn);
    expect(entryServer).toContain(role);
    expect(entryServer).toContain(linkedIn);
    expect(blogMetadata).toContain(role);
    expect(blogMetadata).toContain(linkedIn);
  });
});
