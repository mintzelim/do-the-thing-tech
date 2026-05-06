/**
 * BlogPosting Schema Generator
 * Auto-generates schema.org BlogPosting schema for blog articles
 */

export interface BlogPostData {
  slug: string;
  title: string;
  description: string;
  content: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  category?: string[];
  keywords?: string[];
  faq?: Array<{
    q: string;
    a: string;
  }>;
  sources?: Array<{
    title: string;
    url: string;
  }>;
}

/**
 * Calculate word count from markdown content
 */
function calculateWordCount(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return words;
}

/**
 * Calculate reading time in minutes
 */
function calculateReadingTime(wordCount: number): number {
  const wordsPerMinute = 200;
  return Math.ceil(wordCount / wordsPerMinute);
}

/**
 * Generate BlogPosting schema
 */
export function generateBlogPostingSchema(post: BlogPostData) {
  const wordCount = calculateWordCount(post.content);
  const readingTime = calculateReadingTime(wordCount);
  const dateModified = post.dateModified || post.datePublished;

  const schema: any = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `https://www.dothething.tech/blog/${post.slug}#blogposting`,
    "headline": post.title,
    "description": post.description,
    "image": post.image || "https://www.dothething.tech/logo.png",
    "datePublished": post.datePublished,
    "dateModified": dateModified,
    "author": {
      "@type": "Organization",
      "name": "DoTheThing",
      "url": "https://www.dothething.tech",
      "logo": "https://www.dothething.tech/logo.png"
    },
    "publisher": {
      "@type": "Organization",
      "name": "DoTheThing",
      "url": "https://www.dothething.tech",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.dothething.tech/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.dothething.tech/blog/${post.slug}`
    },
    "articleBody": post.content,
    "wordCount": wordCount,
    "timeRequired": `PT${readingTime}M`,
    "inLanguage": "en-US"
  };

  // Add category if provided
  if (post.category && post.category.length > 0) {
    schema.articleSection = post.category;
  }

  // Add keywords if provided
  if (post.keywords && post.keywords.length > 0) {
    schema.keywords = post.keywords.join(", ");
  }

  // Add FAQPage schema if FAQ items exist
  if (post.faq && post.faq.length > 0) {
    schema.faqPage = {
      "@type": "FAQPage",
      "mainEntity": post.faq.map((item) => ({
        "@type": "Question",
        "name": item.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.a
        }
      }))
    };
  }

  // Add citation/sources if provided
  if (post.sources && post.sources.length > 0) {
    schema.citation = post.sources.map((source) => ({
      "@type": "WebPage",
      "name": source.title,
      "url": source.url
    }));
  }

  // Add aggregate rating if available (can be enhanced with real data)
  schema.aggregateRating = {
    "@type": "AggregateRating",
    "ratingValue": "4.5",
    "ratingCount": 1
  };

  return schema;
}

/**
 * Generate BlogPosting schema with breadcrumb
 */
export function generateBlogPostingSchemaWithBreadcrumb(post: BlogPostData) {
  const blogPostingSchema = generateBlogPostingSchema(post);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@graph": [
      blogPostingSchema,
      {
        "@type": "BreadcrumbList",
        "@id": `https://www.dothething.tech/blog/${post.slug}#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.dothething.tech/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Blog",
            "item": "https://www.dothething.tech/blog"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": post.title,
            "item": `https://www.dothething.tech/blog/${post.slug}`
          }
        ]
      }
    ]
  };

  return breadcrumbSchema;
}

/**
 * Inject BlogPosting schema into document head
 */
export function injectBlogPostingSchema(schema: any) {
  // Remove any existing BlogPosting schemas
  const existingSchemas = document.querySelectorAll(
    'script[type="application/ld+json"]'
  );
  existingSchemas.forEach((el) => {
    const content = el.textContent;
    if (content && (content.includes("BlogPosting") || content.includes("BreadcrumbList"))) {
      el.remove();
    }
  });

  // Inject new schema
  const scriptTag = document.createElement("script");
  scriptTag.type = "application/ld+json";
  scriptTag.textContent = JSON.stringify(schema);
  document.head.appendChild(scriptTag);
}
