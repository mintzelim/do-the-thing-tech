import { readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const assetHelper = readFileSync(resolve(process.cwd(), "client/src/lib/assetUrl.ts"), "utf8");
const homeContent = readFileSync(resolve(process.cwd(), "client/src/components/HomeContent.tsx"), "utf8");
const navigation = readFileSync(resolve(process.cwd(), "client/src/components/Navigation.tsx"), "utf8");
const blogGenerator = readFileSync(resolve(process.cwd(), "scripts/generate-blog-posts.mjs"), "utf8");

describe("live image delivery", () => {
  it("routes public UI storage images through the production-accessible Manus origin", () => {
    expect(assetHelper).toContain('https://dothething-zkgytwax.manus.space');
    expect(homeContent).toContain('src={assetUrl("/manus-storage/');
    expect(navigation).toContain('src={assetUrl("/manus-storage/logo_dabca0e9.png")}');
    expect(homeContent).not.toContain('src="/manus-storage/');
  });

  it("normalizes generated blog featured and inline image paths for production", () => {
    expect(blogGenerator).toContain('toProductionAssetUrl(frontmatter.featuredImage || \'\')');
    expect(blogGenerator).toContain('normalizeMarkdownAssetUrls(preserveMarkdown(markdown))');
  });

  it("gives every published article one distinct production-safe featured image", () => {
    const blogDir = resolve(process.cwd(), "blog");
    const posts = readdirSync(blogDir)
      .filter((filename) => /^\d{2}-.+\.md$/.test(filename))
      .map((filename) => ({
        filename,
        content: readFileSync(resolve(blogDir, filename), "utf8"),
      }));

    const images = posts.map(({ filename, content }) => {
      const singleLine = content.match(/^featuredImage:\s*["']?([^"'\n]+)["']?\s*$/m)?.[1];
      const folded = content.match(/^featuredImage:\s*>-\s*\n\s+([^\n]+)/m)?.[1];
      const image = (singleLine && singleLine !== ">-" ? singleLine : folded)?.trim();

      expect(image, filename).toBeTruthy();
      expect(image, filename).toMatch(/^(\/manus-storage\/|https:\/\/)/);
      return image;
    });

    expect(new Set(images).size).toBe(posts.length);
  });
});
