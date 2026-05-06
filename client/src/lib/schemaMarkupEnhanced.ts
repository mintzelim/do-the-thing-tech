/**
 * Enhanced schema markup utilities with Organization schema and improved Open Graph
 */

export interface OrganizationSchema {
  "@context": string;
  "@type": string;
  "@id": string;
  name: string;
  url: string;
  logo: string;
  description: string;
  sameAs: string[];
  contactPoint: {
    "@type": string;
    telephone: string;
    contactType: string;
  };
  address: {
    "@type": string;
    addressCountry: string;
  };
}

export function generateOrganizationSchema(): OrganizationSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://dothething.tech/#organization",
    name: "DoTheThing",
    url: "https://dothething.tech",
    logo: "https://dothething.tech/logo.png",
    description: "AI-powered task breakdown tool designed for ADHD brains. Break down overwhelming tasks into manageable micro-steps with smart time estimation.",
    sameAs: [
      "https://twitter.com/dothething",
      "https://www.linkedin.com/company/dothething",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-XXX-XXX-XXXX",
      contactType: "Customer Support",
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "US",
    },
  };
}

export interface WebSiteSchema {
  "@context": string;
  "@type": string;
  "@id": string;
  name: string;
  url: string;
  potentialAction: {
    "@type": string;
    target: {
      "@type": string;
      urlTemplate: string;
    };
    queryInput: string;
  };
  publisher: {
    "@id": string;
  };
}

export function generateWebSiteSchema(): WebSiteSchema {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://dothething.tech/#website",
    name: "DoTheThing",
    url: "https://dothething.tech",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://dothething.tech/search?q={search_term_string}",
      },
      queryInput: "required name=search_term_string",
    },
    publisher: {
      "@id": "https://dothething.tech/#organization",
    },
  };
}

export interface WebPageSchema {
  "@context": string;
  "@type": string;
  "@id": string;
  name: string;
  description: string;
  url: string;
  isPartOf: {
    "@id": string;
  };
  publisher: {
    "@id": string;
  };
  datePublished?: string;
  dateModified?: string;
  inLanguage?: string;
  image?: string;
}

export function generateWebPageSchema(
  title: string,
  description: string,
  url: string,
  datePublished?: string,
  dateModified?: string,
  image?: string
): WebPageSchema {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url,
    name: title,
    description: description,
    url: url,
    isPartOf: {
      "@id": "https://dothething.tech/#website",
    },
    publisher: {
      "@id": "https://dothething.tech/#organization",
    },
    ...(datePublished && { datePublished }),
    ...(dateModified && { dateModified }),
    ...(image && { image }),
    inLanguage: "en-US",
  };
}

export interface BlogPostingSchema {
  "@context": string;
  "@type": string;
  "@id": string;
  headline: string;
  description: string;
  image?: string;
  datePublished: string;
  dateModified: string;
  author: {
    "@type": string;
    name: string;
  };
  publisher: {
    "@id": string;
  };
  isPartOf: {
    "@id": string;
  };
  inLanguage: string;
  keywords: string;
  articleBody?: string;
}

export function generateBlogPostingSchemaEnhanced(
  post: any,
  siteUrl: string
): BlogPostingSchema {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${siteUrl}/blog/${post.slug}#blogPosting`,
    headline: post.title,
    description: post.excerpt,
    image: post.image || `${siteUrl}/og-image.png`,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: "DoTheThing",
    },
    publisher: {
      "@id": "https://dothething.tech/#organization",
    },
    isPartOf: {
      "@id": "https://dothething.tech/#website",
    },
    inLanguage: "en-US",
    keywords: post.seoKeywords?.join(", ") || "",
  };
}

export interface FAQPageSchema {
  "@context": string;
  "@type": string;
  "@id": string;
  name: string;
  description: string;
  url: string;
  mainEntity: Array<{
    "@type": string;
    "@id": string;
    name: string;
    acceptedAnswer: {
      "@type": string;
      text: string;
    };
  }>;
}

export function generateFAQPageSchema(
  faqItems: Array<{ q: string; a: string }>,
  pageUrl: string
): FAQPageSchema {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": pageUrl,
    name: "Frequently Asked Questions",
    description: "Common questions about DoTheThing and ADHD task management",
    url: pageUrl,
    mainEntity: faqItems.map((item, index) => ({
      "@type": "Question",
      "@id": `${pageUrl}#faq-${index}`,
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

export function injectSchemaMarkupEnhanced(schemas: any[]) {
  schemas.forEach((schema) => {
    // Remove existing script if present
    const existingScript = document.querySelector(
      `script[data-schema-id="${schema["@id"]}"]`
    );
    if (existingScript) {
      existingScript.remove();
    }

    // Create and inject new script
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-schema-id", schema["@id"]);
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  });
}
