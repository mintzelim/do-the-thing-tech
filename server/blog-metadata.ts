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
  primaryEntity?: string;
  secondaryEntities?: string[];
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
 * Calculate approximate word count from blog post content
 */
function calculateWordCount(content: string): number {
  return content.trim().split(/\s+/).length;
}

/**
 * Generate JSON-LD BlogPosting schema for a blog post
 */
function generateBlogPostSchema(post: BlogPost, baseUrl: string): string {
  const postUrl = `${baseUrl}/blog/${post.slug}`;
  const dateObj = new Date(post.date);
  const isoDate = dateObj.toISOString();
  const wordCount = calculateWordCount(post.content);
  const readingTimeMinutes = Math.ceil(wordCount / 200);

  const schema: any = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${postUrl}#article`,
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage
      ? {
          "@type": "ImageObject",
          url: post.featuredImage,
          width: 1200,
          height: 630,
        }
      : `${baseUrl}/og-image.png`,
    datePublished: isoDate,
    dateModified: isoDate,
    author: [
      {
        "@type": "Organization",
        name: "DoTheThing",
        url: baseUrl,
      },
      {
        "@type": "Person",
        name: "Lim Min Tze",
        url: "https://github.com/mintzelim",
        description: "Founder of Boundless One Ventures. Product developer with personal ADHD experience. 10+ years in tech.",
        knowsAbout: ["ADHD", "Executive Dysfunction", "Time Blindness", "Neurodivergent Productivity"],
      },
    ],
    publisher: {
      "@type": "Organization",
      name: "DoTheThing",
      url: baseUrl,
      description: "AI-powered task breakdown tool for ADHD brains",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/favicon.ico`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    keywords: post.seoKeywords.join(", "),
    articleSection: post.category,
    wordCount: wordCount,
    timeRequired: `PT${readingTimeMinutes}M`,
    inLanguage: "en-US",
  };

  // Add primaryEntity if available
  if (post.primaryEntity) {
    schema.about = {
      "@type": "Thing",
      name: post.primaryEntity,
    };
  }

  // Add secondaryEntities if available
  if (post.secondaryEntities && post.secondaryEntities.length > 0) {
    schema.mentions = post.secondaryEntities.map((entity: string) => ({
      "@type": "Thing",
      name: entity,
    }));
  }

  // Add citation schema for sources — critical for GEO/AEO (Google, Perplexity, ChatGPT attribute sources)
  if (post.sources && post.sources.length > 0) {
    schema.citation = post.sources.map((source: { title: string; url: string }) => ({
      "@type": "WebPage",
      "name": source.title,
      "url": source.url,
    }));
  }

  return JSON.stringify(schema);
}

/**
 * Generate JSON-LD BreadcrumbList schema for navigation
 */
function generateBreadcrumbSchema(post: BlogPost, baseUrl: string): string {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${baseUrl}/blog/${post.slug}#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        url: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        url: `${baseUrl}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        url: `${baseUrl}/blog/${post.slug}`,
      },
    ],
  };

  return JSON.stringify(schema);
}

/**
 * Generate FAQ schema from blog post frontmatter FAQ data
 * Reads directly from the post's YAML faq field instead of a hardcoded lookup
 */
function generateFAQSchema(post: BlogPost): string | null {
  if (!post.faq || post.faq.length === 0) {
    return null;
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": post.faq.map((item: { q: string; a: string }) => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a
      }
    }))
  };

  return JSON.stringify(schema);
}

/**
 * Inject blog post metadata and schema markup into HTML template
 * Replaces default site-wide metadata with post-specific metadata
 */
export function injectBlogMetadata(
  htmlTemplate: string,
  post: BlogPost,
  baseUrl: string = "https://dothething.tech"
): string {
  const postUrl = `${baseUrl}/blog/${post.slug}`;
  const keywords = post.seoKeywords.join(", ");
  const ogImage = `${baseUrl}/og-image.png`;
  
  // Generate schema markup
  const blogPostSchema = generateBlogPostSchema(post, baseUrl);
  const breadcrumbSchema = generateBreadcrumbSchema(post, baseUrl);
  const faqSchema = generateFAQSchema(post);

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

  // Replace canonical URL (remove site-wide, add post-specific)
  result = result.replace(
    /<link rel="canonical" href="[^"]*" \/>/,
    `<link rel="canonical" href="${postUrl}" />`
  );

  // Replace Open Graph tags (remove site-wide, add post-specific)
  result = result.replace(
    /<meta property="og:type" content="[^"]*" \/>/,
    `<meta property="og:type" content="article" />`
  );
  result = result.replace(
    /<meta property="og:url" content="[^"]*" \/>/,
    `<meta property="og:url" content="${postUrl}" />`
  );
  result = result.replace(
    /<meta property="og:title" content="[^"]*" \/>/,
    `<meta property="og:title" content="${escapeHtml(post.title)}" />`
  );
  result = result.replace(
    /<meta property="og:description" content="[^"]*" \/>/,
    `<meta property="og:description" content="${escapeHtml(post.excerpt)}" />`
  );
  result = result.replace(
    <meta property="og:image" content="[^"]*" \/>,
    `<meta property="og:image" content="${ogImage}" />`
  );

  // Add article-specific Open Graph tags if not present
  if (!result.includes('property="article:published_time"')) {
    const articleOgTags = `    <meta property="article:published_time" content="${new Date(post.date).toISOString()}" />
    <meta property="article:section" content="${escapeHtml(post.category)}" />
    `;
    result = result.replace(/<meta property="og:image"[^>]*\/>/, `$&\n${articleOgTags}`);
  }

  // Replace Twitter Card tags (remove site-wide, add post-specific)
  result = result.replace(
    /<meta name="twitter:card" content="[^"]*" \/>/,
    `<meta name="twitter:card" content="summary_large_image" />`
  );
  result = result.replace(
    /<meta name="twitter:url" content="[^"]*" \/>/,
    `<meta name="twitter:url" content="${postUrl}" />`
  );
  result = result.replace(
    /<meta name="twitter:title" content="[^"]*" \/>/,
    `<meta name="twitter:title" content="${escapeHtml(post.title)}" />`
  );
  result = result.replace(
    /<meta name="twitter:description" content="[^"]*" \/>/,
    `<meta name="twitter:description" content="${escapeHtml(post.excerpt)}" />`
  );
  result = result.replace(
    /<meta name="twitter:image" content="[^"]*" \/>/,
    `<meta name="twitter:image" content="${ogImage}" />`
  );

  // Inject schema markup before closing </head>
  let schemaMarkup = `
    <script type="application/ld+json">${blogPostSchema}</script>
    <script type="application/ld+json">${breadcrumbSchema}</script>
  `;
  
  // Add FAQ schema if available for this post
  if (faqSchema) {
    schemaMarkup += `
    <script type="application/ld+json">${faqSchema}</script>
  `;
  }
  
  result = result.replace(
    /<\/head>/,
    `${schemaMarkup}</head>`
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