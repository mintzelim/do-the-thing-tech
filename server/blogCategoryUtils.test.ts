import { describe, expect, it } from "vitest";
import { displayBlogCategory, getBlogCategories } from "../client/src/lib/blogCategoryUtils";

describe("blog category helpers", () => {
  it("omits empty and whitespace-only categories while deduplicating values", () => {
    expect(
      getBlogCategories([
        { category: "Psychology" },
        { category: "" },
        { category: "  " },
        { category: " ADHD Basics " },
        { category: "Psychology" },
        { category: null },
      ]),
    ).toEqual(["ADHD Basics", "Psychology"]);
  });

  it("provides a visible fallback label for posts without a category", () => {
    expect(displayBlogCategory(undefined)).toBe("ADHD");
    expect(displayBlogCategory("  ")).toBe("ADHD");
    expect(displayBlogCategory("Tools & Resources")).toBe("Tools & Resources");
  });
});
