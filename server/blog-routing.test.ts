import { describe, it, expect } from "vitest";
import { findBlogPostBySlug, injectBlogMetadata, loadBlogPosts } from "./blog-metadata";

describe("Blog Routing and Metadata", () => {
  it("should load blog posts from JSON", () => {
    const posts = loadBlogPosts();
    expect(posts.length).toBeGreaterThan(0);
    expect(posts[0]).toHaveProperty("slug");
    expect(posts[0]).toHaveProperty("title");
    expect(posts[0]).toHaveProperty("excerpt");
  });

  it("should find blog post by slug", () => {
    const posts = loadBlogPosts();
    if (posts.length === 0) {
      console.warn("No blog posts found, skipping test");
      return;
    }
    
    const firstPost = posts[0];
    const found = findBlogPostBySlug(firstPost.slug);
    expect(found).toBeDefined();
    expect(found?.title).toBe(firstPost.title);
  });

  it("should inject blog metadata into HTML template", () => {
    const posts = loadBlogPosts();
    if (posts.length === 0) {
      console.warn("No blog posts found, skipping test");
      return;
    }

    const post = posts[0];
    const template = `
      <!doctype html>
      <html>
        <head>
          <title>Default Title</title>
          <meta name="description" content="Default description" />
          <meta name="keywords" content="default keywords" />
        </head>
        <body>
          <div id="root"></div>
        </body>
      </html>
    `;

    const result = injectBlogMetadata(template, post);
    
    expect(result).toContain(post.title);
    expect(result).toContain(post.excerpt);
    expect(result).toContain("DoTheThing Blog");
    // Category is in keywords, verify at least one SEO keyword is present
    const hasKeyword = post.seoKeywords.some(kw => result.includes(kw));
    expect(hasKeyword).toBe(true);
  });

  it("should return undefined for non-existent slug", () => {
    const found = findBlogPostBySlug("non-existent-slug-12345");
    expect(found).toBeUndefined();
  });

  it("should have all required fields in blog posts", () => {
    const posts = loadBlogPosts();
    if (posts.length === 0) {
      console.warn("No blog posts found, skipping test");
      return;
    }

    posts.forEach((post) => {
      expect(post).toHaveProperty("id");
      expect(post).toHaveProperty("title");
      expect(post).toHaveProperty("excerpt");
      expect(post).toHaveProperty("date");
      expect(post).toHaveProperty("readTime");
      expect(post).toHaveProperty("category");
      expect(post).toHaveProperty("slug");
      expect(post).toHaveProperty("content");
      expect(post.slug).toBeTruthy();
      expect(post.title).toBeTruthy();
      expect(post.excerpt).toBeTruthy();
    });
  });

  it("should have unique slugs for all blog posts", () => {
    const posts = loadBlogPosts();
    if (posts.length === 0) {
      console.warn("No blog posts found, skipping test");
      return;
    }

    const slugs = posts.map((p) => p.slug);
    const uniqueSlugs = new Set(slugs);
    expect(uniqueSlugs.size).toBe(slugs.length);
  });

  it("should preserve blog post order (newest first)", () => {
    const posts = loadBlogPosts();
    if (posts.length < 2) {
      console.warn("Not enough blog posts for ordering test");
      return;
    }

    for (let i = 0; i < posts.length - 1; i++) {
      const current = new Date(posts[i].date).getTime();
      const next = new Date(posts[i + 1].date).getTime();
      expect(current).toBeGreaterThanOrEqual(next);
    }
  });
});
