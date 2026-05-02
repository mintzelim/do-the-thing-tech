/**
 * Schema Markup Generator for Blog Posts
 * Generates JSON-LD structured data for SEO and rich snippets
 */

type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  seoKeywords: string[];
  slug: string;
  content?: string;
};

/**
 * Generate BlogPosting schema for a blog post
 * Used by Google Search, Google News, and AdSense
 */
export function generateBlogPostingSchema(post: BlogPost, siteUrl: string) {
  const postUrl = `${siteUrl}/blog/${post.slug}`;
  
  // Parse date - assuming format like "April 28, 2026"
  const dateObj = new Date(post.date);
  const isoDate = dateObj.toISOString();

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: `${siteUrl}/og-image.png`, // Default OG image - can be customized per post
    datePublished: isoDate,
    dateModified: isoDate,
    author: {
      "@type": "Organization",
      name: "DoTheThing",
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "DoTheThing",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/favicon.ico`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    keywords: post.seoKeywords.join(", "),
    articleSection: post.category,
    articleBody: post.content || post.excerpt,
  };
}

/**
 * Generate Article schema for a blog post
 * More detailed than BlogPosting
 */
export function generateArticleSchema(post: BlogPost, siteUrl: string) {
  const postUrl = `${siteUrl}/blog/${post.slug}`;
  const dateObj = new Date(post.date);
  const isoDate = dateObj.toISOString();

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: `${siteUrl}/og-image.png`,
    datePublished: isoDate,
    dateModified: isoDate,
    author: {
      "@type": "Organization",
      name: "DoTheThing",
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "DoTheThing",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/favicon.ico`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
  };
}

/**
 * Generate Breadcrumb schema for navigation
 * Shows breadcrumb trail in search results
 */
export function generateBreadcrumbSchema(post: BlogPost, siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${siteUrl}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${siteUrl}/blog/${post.slug}`,
      },
    ],
  };
}

/**
 * Generate Organization schema for the site
 * Should be added to the main layout
 */
export function generateOrganizationSchema(siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "DoTheThing",
    url: siteUrl,
    logo: `${siteUrl}/favicon.ico`,
    description: "Break down overwhelming tasks into manageable steps with AI-powered task management for ADHD.",
    sameAs: [
      // Add your social media URLs here
      // "https://twitter.com/dothething",
      // "https://linkedin.com/company/dothething",
    ],
  };
}

/**
 * Inject schema markup into the document head
 */
export function injectSchemaMarkup(schemas: any[]) {
  // Remove existing schema scripts
  const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
  existingScripts.forEach(script => {
    if (script.id?.startsWith('schema-')) {
      script.remove();
    }
  });

  // Add new schema scripts
  schemas.forEach((schema, index) => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = `schema-${index}`;
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  });
}
