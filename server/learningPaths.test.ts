import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { LEARNING_PATHS } from "../client/src/lib/learningPaths";

type BlogRegistryItem = {
  slug: string;
};

describe("homepage learning paths", () => {
  it("offers three distinct paths with two actionable reading links each", () => {
    expect(LEARNING_PATHS).toHaveLength(3);
    expect(new Set(LEARNING_PATHS.map((path) => path.title)).size).toBe(3);

    for (const pathItem of LEARNING_PATHS) {
      expect(pathItem.posts).toHaveLength(2);
      expect(pathItem.description.length).toBeGreaterThan(20);
    }
  });

  it("links every learning-path article to a post in the generated blog registry", () => {
    const registryPath = path.resolve(process.cwd(), "client/public/blog-posts.json");
    const registry = JSON.parse(fs.readFileSync(registryPath, "utf8")) as BlogRegistryItem[];
    const slugs = new Set(registry.map((post) => post.slug));

    for (const post of LEARNING_PATHS.flatMap((pathItem) => pathItem.posts)) {
      expect(post.href).toMatch(/^\/blog\//);
      expect(slugs.has(post.href.replace("/blog/", ""))).toBe(true);
    }
  });
});

