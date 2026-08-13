export type BlogCategoryRecord = {
  category?: string | null;
};

export function getBlogCategories(posts: BlogCategoryRecord[]): string[] {
  return Array.from(
    new Set(
      posts
        .map((post) => post.category?.trim())
        .filter((category): category is string => Boolean(category)),
    ),
  ).sort();
}

export function displayBlogCategory(category?: string | null): string {
  return category?.trim() || "ADHD";
}

const BLOG_CATEGORY_EYEBROWS: Record<string, string> = {
  "ADHD": "ADHD BASICS",
  "ADHD Basics": "ADHD BASICS",
  "ADHD at Work": "ADHD AT WORK",
  "Daily Life": "DAILY LIFE",
  "Daily Routines": "DAILY ROUTINES",
  "Emotional Wellbeing": "EMOTIONAL WELLBEING",
  "Psychology": "ADHD & PSYCHOLOGY",
  "Task Management": "TASK MANAGEMENT",
  "Tools & Resources": "TOOLS & RESOURCES",
};

/** Returns concise context copy for the shared VT323 article-eyebrow treatment. */
export function getBlogCategoryEyebrow(category?: string | null): string {
  const visibleCategory = displayBlogCategory(category);
  return BLOG_CATEGORY_EYEBROWS[visibleCategory] || visibleCategory.toUpperCase();
}
