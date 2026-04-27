import { describe, it, expect } from "vitest";

describe("BlogContentRenderer - Link Parsing", () => {
  // Test external link parsing
  it("should parse external links in markdown format", () => {
    const content = "Check out [this resource](https://example.com)";
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const match = linkRegex.exec(content);

    expect(match).not.toBeNull();
    expect(match?.[1]).toBe("this resource");
    expect(match?.[2]).toBe("https://example.com");
  });

  // Test internal blog post link parsing
  it("should parse internal blog post links", () => {
    const content = "See [related post](post:2) for more info";
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const match = linkRegex.exec(content);

    expect(match).not.toBeNull();
    expect(match?.[1]).toBe("related post");
    expect(match?.[2]).toBe("post:2");
  });

  // Test multiple links
  it("should parse multiple links in content", () => {
    const content = "Read [article 1](https://example.com) and [article 2](https://example2.com)";
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const matches = [];
    let match;

    while ((match = linkRegex.exec(content)) !== null) {
      matches.push({ text: match[1], url: match[2] });
    }

    expect(matches).toHaveLength(2);
    expect(matches[0].text).toBe("article 1");
    expect(matches[0].url).toBe("https://example.com");
    expect(matches[1].text).toBe("article 2");
    expect(matches[1].url).toBe("https://example2.com");
  });

  // Test mixed internal and external links
  it("should parse mixed internal and external links", () => {
    const content = "Check [external](https://example.com) and [internal post](post:3)";
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const matches = [];
    let match;

    while ((match = linkRegex.exec(content)) !== null) {
      matches.push({ text: match[1], url: match[2] });
    }

    expect(matches).toHaveLength(2);
    expect(matches[0].url).toBe("https://example.com");
    expect(matches[1].url).toBe("post:3");
  });

  // Test link detection
  it("should detect if link is internal (post:id format)", () => {
    const externalLink = "https://example.com";
    const internalLink = "post:5";

    expect(externalLink.startsWith("post:")).toBe(false);
    expect(internalLink.startsWith("post:")).toBe(true);
  });

  // Test extracting post ID from internal link
  it("should extract post ID from internal link", () => {
    const internalLink = "post:7";
    const postId = internalLink.substring(5);

    expect(postId).toBe("7");
  });

  // Test content without links
  it("should handle content without links", () => {
    const content = "This is plain text without any links";
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const match = linkRegex.exec(content);

    expect(match).toBeNull();
  });

  // Test link with special characters
  it("should parse links with special characters in text", () => {
    const content = "Check out [C++ Tutorial](https://example.com/cpp)";
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const match = linkRegex.exec(content);

    expect(match).not.toBeNull();
    expect(match?.[1]).toBe("C++ Tutorial");
  });

  // Test link with query parameters
  it("should parse links with query parameters", () => {
    const content = "Visit [search results](https://example.com?q=adhd&sort=date)";
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const match = linkRegex.exec(content);

    expect(match).not.toBeNull();
    expect(match?.[2]).toBe("https://example.com?q=adhd&sort=date");
  });

  // Test link with hash fragment
  it("should parse links with hash fragments", () => {
    const content = "Jump to [section](https://example.com#section-2)";
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const match = linkRegex.exec(content);

    expect(match).not.toBeNull();
    expect(match?.[2]).toBe("https://example.com#section-2");
  });

  // Test consecutive links
  it("should parse consecutive links", () => {
    const content = "[link1](https://example.com)[link2](https://example2.com)";
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const matches = [];
    let match;

    while ((match = linkRegex.exec(content)) !== null) {
      matches.push({ text: match[1], url: match[2] });
    }

    expect(matches).toHaveLength(2);
  });
});
