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
