import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  seoKeywords: string[];
  sources: Array<{ title: string; url: string }>;
  relatedPosts: string[];
  content: string;
  slug: string;
};

let cachedPosts: BlogPost[] | null = null;

/**
 * Load blog posts from the generated JSON file
 */
export function loadBlogPosts(): BlogPost[] {
  if (cachedPosts !== null) {
    return cachedPosts;
  }

  const blogPostsPath = path.join(__dirname, "../client/public/blog-posts.json");
  
  if (!fs.existsSync(blogPostsPath)) {
    console.warn(`Blog posts file not found at ${blogPostsPath}`);
    return [];
  }

  try {
    const content = fs.readFileSync(blogPostsPath, "utf-8");
    cachedPosts = JSON.parse(content);
    return cachedPosts as BlogPost[];
  } catch (error) {
    console.error("Error loading blog posts:", error);
    return [];
  }
}

/**
 * Find a blog post by slug
 */
export function findBlogPostBySlug(slug: string): BlogPost | undefined {
  const posts = loadBlogPosts();
  return posts.find(post => post.slug === slug);
}

/**
 * Inject blog post metadata into HTML template
 */
export function injectBlogMetadata(
  htmlTemplate: string,
  post: BlogPost,
  baseUrl: string = "https://dothething.tech"
): string {
  const postUrl = `${baseUrl}/blog/${post.slug}`;
  const keywords = post.seoKeywords.join(", ");
  
  // Create metadata tags
  const metaTags = `
    <title>${post.title} | DoTheThing Blog</title>
    <meta name="description" content="${escapeHtml(post.excerpt)}" />
    <meta name="keywords" content="${escapeHtml(keywords)}" />
    <meta name="og:title" content="${escapeHtml(post.title)}" />
    <meta name="og:description" content="${escapeHtml(post.excerpt)}" />
    <meta name="og:type" content="article" />
    <meta name="og:url" content="${postUrl}" />
    <meta name="article:published_time" content="${post.date}" />
    <meta name="article:section" content="${escapeHtml(post.category)}" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="${escapeHtml(post.title)}" />
    <meta name="twitter:description" content="${escapeHtml(post.excerpt)}" />
  `;

  // Replace the default title and meta tags
  let result = htmlTemplate;
  
  // Replace title tag
  result = result.replace(
    /<title>[^<]*<\/title>/,
    `<title>${escapeHtml(post.title)} | DoTheThing Blog</title>`
  );
  
  // Replace description meta tag
  result = result.replace(
    /<meta name="description" content="[^"]*" \/>/,
    `<meta name="description" content="${escapeHtml(post.excerpt)}" />`
  );
  
  // Replace keywords meta tag
  result = result.replace(
    /<meta name="keywords" content="[^"]*" \/>/,
    `<meta name="keywords" content="${escapeHtml(keywords)}" />`
  );

  return result;
}

/**
 * Escape HTML special characters
 */
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}
