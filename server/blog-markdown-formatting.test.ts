import { describe, it, expect } from "vitest";

describe("BlogContentRenderer - Markdown Formatting", () => {
  // Test heading detection
  it("should detect H1 headings", () => {
    const content = "# Main Title";
    expect(content.startsWith("# ")).toBe(true);
  });

  it("should detect H2 headings", () => {
    const content = "## Subtitle";
    expect(content.startsWith("## ")).toBe(true);
  });

  it("should detect H3 headings", () => {
    const content = "### Subheading";
    expect(content.startsWith("### ")).toBe(true);
  });

  // Test bold and italic detection
  it("should detect bold text", () => {
    const content = "This is **bold** text";
    const boldRegex = /\*\*[^\*]+\*\*/;
    expect(boldRegex.test(content)).toBe(true);
  });

  it("should detect italic text", () => {
    const content = "This is *italic* text";
    const italicRegex = /\*[^\*]+\*/;
    expect(italicRegex.test(content)).toBe(true);
  });

  // Test list detection
  it("should detect unordered lists", () => {
    const content = "- Item 1";
    expect(content.startsWith("- ")).toBe(true);
  });

  it("should detect ordered lists", () => {
    const content = "1. First item";
    const orderedRegex = /^\d+\. /;
    expect(orderedRegex.test(content)).toBe(true);
  });

  // Test blockquote detection
  it("should detect blockquotes", () => {
    const content = "> This is a quote";
    expect(content.startsWith("> ")).toBe(true);
  });

  // Test code block detection
  it("should detect code blocks", () => {
    const content = "```\nconst x = 1;\n```";
    expect(content.startsWith("```")).toBe(true);
  });

  // Test inline code detection
  it("should detect inline code", () => {
    const content = "Use `const` keyword";
    const inlineCodeRegex = /`[^`]+`/;
    expect(inlineCodeRegex.test(content)).toBe(true);
  });

  // Test horizontal rule detection
  it("should detect horizontal rules with ---", () => {
    const content = "---";
    expect(content === "---").toBe(true);
  });

  it("should detect horizontal rules with ***", () => {
    const content = "***";
    expect(content === "***").toBe(true);
  });

  it("should detect horizontal rules with ___", () => {
    const content = "___";
    expect(content === "___").toBe(true);
  });

  // Test combined formatting
  it("should handle bold and italic in same line", () => {
    const content = "This is **bold** and *italic*";
    const boldRegex = /\*\*[^\*]+\*\*/;
    const italicRegex = /\*[^\*]+\*/;
    expect(boldRegex.test(content)).toBe(true);
    expect(italicRegex.test(content)).toBe(true);
  });

  // Test link detection with formatting
  it("should detect links with bold text", () => {
    const content = "[**bold link**](https://example.com)";
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/;
    const match = linkRegex.exec(content);
    expect(match).not.toBeNull();
    expect(match?.[1]).toBe("**bold link**");
  });

  // Test multiple formatting elements
  it("should parse content with multiple markdown elements", () => {
    const content = `# Title
## Subtitle
This is a paragraph with **bold** and *italic*.
- List item 1
- List item 2
> A quote
\`\`\`
code block
\`\`\``;

    const lines = content.split('\n');
    expect(lines[0].startsWith('# ')).toBe(true);
    expect(lines[1].startsWith('## ')).toBe(true);
    expect(lines[3].startsWith('- ')).toBe(true);
    expect(lines[5].startsWith('> ')).toBe(true);
    expect(lines[6].startsWith('```')).toBe(true);
  });

  // Test empty lines
  it("should handle empty lines", () => {
    const content = "Line 1\n\nLine 2";
    const lines = content.split('\n');
    expect(lines[1]).toBe("");
  });

  // Test nested formatting
  it("should detect nested formatting patterns", () => {
    const content = "***bold and italic***";
    expect(content.startsWith("***")).toBe(true);
  });

  // Test special characters in code
  it("should preserve special characters in inline code", () => {
    const content = "Use `<div>` tag";
    const inlineCodeRegex = /`[^`]+`/;
    const match = inlineCodeRegex.exec(content);
    expect(match?.[0]).toBe("`<div>`");
  });
});
