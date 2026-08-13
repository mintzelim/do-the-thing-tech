import { createContext, useContext } from "react";

export type BlogPostRecord = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  wordCount?: number;
  updatedDate?: string;
  seoKeywords: string[];
  sources: Array<{ title: string; url: string }>;
  relatedPosts: string[];
  content: string;
  slug: string;
  faq?: Array<{ q: string; a: string }>;
  featuredImage?: string;
  featuredImageAlt?: string;
};

const BlogPostsContext = createContext<BlogPostRecord[] | null>(null);

export function BlogPostsProvider({ initialPosts, children }: { initialPosts?: BlogPostRecord[] | null; children: React.ReactNode }) {
  return <BlogPostsContext.Provider value={initialPosts ?? null}>{children}</BlogPostsContext.Provider>;
}

export function usePreloadedBlogPosts() {
  return useContext(BlogPostsContext);
}
