import { describe, it, expect } from "vitest";
import {
  generateBlogPostingSchema,
  generateBlogFAQPageSchema,
  generateBlogBreadcrumbSchema,
  generateBlogPostingSchemaWithBreadcrumb,
  type BlogPostData,
} from "../client/src/lib/blogPostingSchema";

describe("Blog Posting Schema Generation", () => {
  const mockBlogPost: BlogPostData = {
    slug: "test-post",
    title: "Test Blog Post",
    description: "This is a test blog post",
    content: "This is the content of the test blog post. " + "word ".repeat(200),
    author: "Test Author",
    datePublished: "2026-05-14",
    dateModified: "2026-05-14",
    category: ["Test Category"],
    keywords: ["test", "blog", "schema"],
    faq: [
      {
        q: "What is this post about?",
        a: "This post is about testing schema generation.",
      },
      {
        q: "How do I use this?",
        a: "You can use this to generate schema markup for blog posts.",
      },
    ],
    sources: [
      {
        title: "Test Source",
        url: "https://example.com",
      },
    ],
  };

  it("should generate BlogPosting schema with correct structure", () => {
    const schema = generateBlogPostingSchema(mockBlogPost);

    expect(schema["@type"]).toBe("BlogPosting");
    expect(schema.headline).toBe("Test Blog Post");
    expect(schema.description).toBe("This is a test blog post");
    expect(schema.datePublished).toBe("2026-05-14");
    expect(schema.keywords).toContain("test");
  });

  it("should generate FAQPage schema when FAQ items exist", () => {
    const schema = generateBlogFAQPageSchema(mockBlogPost);

    expect(schema).not.toBeNull();
    expect(schema["@type"]).toBe("FAQPage");
    expect(schema.mainEntity).toHaveLength(2);
    expect(schema.mainEntity[0].name).toBe("What is this post about?");
    expect(schema.mainEntity[0].acceptedAnswer.text).toBe(
      "This post is about testing schema generation."
    );
  });

  it("should return null for FAQPage schema when no FAQ items exist", () => {
    const postWithoutFAQ: BlogPostData = {
      ...mockBlogPost,
      faq: undefined,
    };

    const schema = generateBlogFAQPageSchema(postWithoutFAQ);
    expect(schema).toBeNull();
  });

  it("should generate BreadcrumbList schema with correct structure", () => {
    const schema = generateBlogBreadcrumbSchema(mockBlogPost);

    expect(schema["@type"]).toBe("BreadcrumbList");
    expect(schema.itemListElement).toHaveLength(3);
    expect(schema.itemListElement[0].name).toBe("Home");
    expect(schema.itemListElement[1].name).toBe("Blog");
    expect(schema.itemListElement[2].name).toBe("Test Blog Post");
  });

  it("should include FAQPage schema in @graph when FAQ items exist", () => {
    const schema = generateBlogPostingSchemaWithBreadcrumb(mockBlogPost);

    expect(schema["@context"]).toBe("https://schema.org");
    expect(schema["@graph"]).toBeDefined();
    expect(schema["@graph"].length).toBe(3); // BlogPosting + BreadcrumbList + FAQPage

    // Verify FAQPage is in the graph
    const faqSchema = schema["@graph"].find((s: any) => s["@type"] === "FAQPage");
    expect(faqSchema).toBeDefined();
    expect(faqSchema.mainEntity).toHaveLength(2);
  });

  it("should NOT include FAQPage schema in @graph when no FAQ items exist", () => {
    const postWithoutFAQ: BlogPostData = {
      ...mockBlogPost,
      faq: undefined,
    };

    const schema = generateBlogPostingSchemaWithBreadcrumb(postWithoutFAQ);

    expect(schema["@graph"].length).toBe(2); // Only BlogPosting + BreadcrumbList
    const faqSchema = schema["@graph"].find((s: any) => s["@type"] === "FAQPage");
    expect(faqSchema).toBeUndefined();
  });

  it("should include citation schema for sources", () => {
    const schema = generateBlogPostingSchema(mockBlogPost);

    expect(schema.citation).toBeDefined();
    expect(schema.citation).toHaveLength(1);
    expect(schema.citation[0].name).toBe("Test Source");
    expect(schema.citation[0].url).toBe("https://example.com");
  });

  it("should calculate word count and reading time correctly", () => {
    const schema = generateBlogPostingSchema(mockBlogPost);

    expect(schema.wordCount).toBeGreaterThan(200);
    expect(schema.timeRequired).toMatch(/^PT\d+M$/); // Format: PT5M (5 minutes)
  });
});
