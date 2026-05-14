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
 * Generate BlogPosting schema (without nested FAQPage)
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

  // Add citation/sources if provided
  if (post.sources && post.sources.length > 0) {
    schema.citation = post.sources.map((source) => ({
      "@type": "WebPage",
      "name": source.title,
      "url": source.url
    }));
  }

  // Aggregate rating removed - only add if actual ratings are available

  return schema;
}

/**
 * Generate FAQPage schema for blog post
 */
export function generateBlogFAQPageSchema(post: BlogPostData) {
  if (!post.faq || post.faq.length === 0) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `https://www.dothething.tech/blog/${post.slug}#faqpage`,
    "url": `https://www.dothething.tech/blog/${post.slug}`,
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

/**
 * Generate BreadcrumbList schema for blog post
 */
export function generateBlogBreadcrumbSchema(post: BlogPostData) {
  return {
    "@context": "https://schema.org",
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
  };
}

/**
 * Generate complete schema with @graph for blog post
 * Includes FAQPage schema if FAQ items are available
 */
export function generateBlogPostingSchemaWithBreadcrumb(post: BlogPostData) {
  const blogPostingSchema = generateBlogPostingSchema(post);
  const breadcrumbSchema = generateBlogBreadcrumbSchema(post);
  const faqSchema = generateBlogFAQPageSchema(post);

  const graphArray = [blogPostingSchema, breadcrumbSchema];
  if (faqSchema) {
    graphArray.push(faqSchema);
  }

  return {
    "@context": "https://schema.org",
    "@graph": graphArray
  };
}

/**
 * Inject BlogPosting schema into document head
 * Injects individual schemas separately to avoid conflicts with main site schema
 */
export function injectBlogPostingSchema(schema: any) {
  // Remove homepage FAQ schema to avoid conflicts
  const existingHomepageFAQ = document.querySelector('script[data-schema="homepage-faq"]');
  if (existingHomepageFAQ) {
    existingHomepageFAQ.remove();
  }
  
  // Remove any existing blog post-specific schemas
  const existingSchemas = document.querySelectorAll(
    'script[type="application/ld+json"]'
  );
  existingSchemas.forEach((el) => {
    const content = el.textContent;
    // Only remove blog post schemas (those with blog post slug in URL)
    if (content && content.includes('/blog/') && (content.includes("#blogposting") || content.includes("#faqpage") || content.includes("#breadcrumb"))) {
      el.remove();
    }
  });
  
  // Inject schemas individually to avoid conflicts with main site schema
  if (schema['@graph']) {
    // Inject each schema in the graph separately
    schema['@graph'].forEach((item: any) => {
      const scriptTag = document.createElement("script");
      scriptTag.type = "application/ld+json";
      scriptTag.setAttribute('data-schema', 'blog-post');
      const itemSchema = {
        "@context": "https://schema.org",
        ...item
      };
      scriptTag.textContent = JSON.stringify(itemSchema);
      document.head.appendChild(scriptTag);
    });
  } else {
    // Inject single schema
    const scriptTag = document.createElement("script");
    scriptTag.type = "application/ld+json";
    scriptTag.setAttribute('data-schema', 'blog-post');
    scriptTag.textContent = JSON.stringify(schema);
    document.head.appendChild(scriptTag);
  }
}