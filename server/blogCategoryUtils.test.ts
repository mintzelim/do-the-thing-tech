import { describe, expect, it } from "vitest";
import { displayBlogCategory, getBlogCategories, getBlogCategoryEyebrow } from "../client/src/lib/blogCategoryUtils";

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

  it("maps article categories to contextual eyebrow labels with an uppercase fallback", () => {
    expect(getBlogCategoryEyebrow("ADHD Basics")).toBe("ADHD BASICS");
    expect(getBlogCategoryEyebrow("ADHD")).toBe("ADHD BASICS");
    expect(getBlogCategoryEyebrow("Task Management")).toBe("TASK MANAGEMENT");
    expect(getBlogCategoryEyebrow("Tools & Resources")).toBe("TOOLS & RESOURCES");
    expect(getBlogCategoryEyebrow("Psychology")).toBe("ADHD & PSYCHOLOGY");
    expect(getBlogCategoryEyebrow("New Focus Area")).toBe("NEW FOCUS AREA");
    expect(getBlogCategoryEyebrow(undefined)).toBe("ADHD BASICS");
  });
});
