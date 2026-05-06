/**
 * Comprehensive meta tag manager for all pages
 * Updates title, description, canonical URL, Open Graph, and Twitter Card tags
 */

import {
  generateOrganizationSchema,
  generateWebSiteSchema,
  generateWebPageSchema,
  generateBlogPostingSchemaEnhanced,
  generateFAQPageSchema,
} from "./schemaMarkupEnhanced";

export interface MetaTagConfig {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  ogId?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  keywords?: string;
  schemas?: any[];
}

export function updateMetaTags(config: MetaTagConfig) {
  // Update page title
  document.title = config.title;

  // Update meta description
  updateMetaTag('name', 'description', config.description);

  // Update keywords if provided
  if (config.keywords) {
    updateMetaTag('name', 'keywords', config.keywords);
  }

  // Update canonical URL
  if (config.canonicalUrl) {
    updateCanonicalLink(config.canonicalUrl);
  }

  // Update Open Graph tags
  updateMetaTag('property', 'og:title', config.ogTitle || config.title);
  updateMetaTag('property', 'og:description', config.ogDescription || config.description);
  updateMetaTag('property', 'og:url', config.ogUrl || window.location.href);
  if (config.ogImage) {
    updateMetaTag('property', 'og:image', config.ogImage);
  }
  if (config.ogId) {
    updateMetaTag('property', 'og:id', config.ogId);
  }

  // Update Twitter Card tags
  updateMetaTag('name', 'twitter:title', config.twitterTitle || config.title);
  updateMetaTag('name', 'twitter:description', config.twitterDescription || config.description);
  updateMetaTag('name', 'twitter:url', config.ogUrl || window.location.href);
  if (config.twitterImage) {
    updateMetaTag('name', 'twitter:image', config.twitterImage);
  }

  // Inject schema markup if provided
  if (config.schemas && config.schemas.length > 0) {
    injectSchemaMarkup(config.schemas);
  }
}

function injectSchemaMarkup(schemas: any[]) {
  schemas.forEach((schema) => {
    const schemaId = schema["@id"] || schema["@type"];
    const existingScript = document.querySelector(
      `script[data-schema-id="${schemaId}"]`
    ) as HTMLScriptElement;
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-schema-id", schemaId);
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  });
}

function updateMetaTag(attribute: 'name' | 'property', attributeValue: string, content: string) {
  let element = document.querySelector(`meta[${attribute}="${attributeValue}"]`) as HTMLMetaElement;

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, attributeValue);
    document.head.appendChild(element);
  }

  element.content = content;
}

function updateCanonicalLink(url: string) {
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;

  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }

  link.href = url;
}

// Helper to get schemas for a page
function getPageSchemas(title: string, description: string, url: string) {
  return [
    generateOrganizationSchema(),
    generateWebPageSchema(title, description, url),
  ];
}

// Page-specific meta tag configurations
export const pageMetaTags = {
  home: {
    title: 'DoTheThing - Task Breakdown for ADHD Brains',
    description: 'Break down overwhelming tasks into manageable micro-steps with AI. Smart time estimation, ADHD-friendly design, and instant task organization.',
    canonicalUrl: 'https://dothething.tech',
    ogUrl: 'https://dothething.tech',
    ogId: 'https://dothething.tech/#homepage',
    keywords: 'ADHD task management, task breakdown, productivity tool, time estimation, executive dysfunction, task organization',
    get schemas() {
      return [
        generateOrganizationSchema(),
        generateWebSiteSchema(),
        generateWebPageSchema(
          'DoTheThing - Task Breakdown for ADHD Brains',
          'Break down overwhelming tasks into manageable micro-steps with AI. Smart time estimation, ADHD-friendly design, and instant task organization.',
          'https://dothething.tech'
        ),
      ];
    },
  },
  about: {
    title: 'About DoTheThing | Task Breakdown for ADHD',
    description: 'Learn about DoTheThing, the AI-powered task breakdown tool designed specifically for ADHD brains. Discover our mission and how we help with executive dysfunction.',
    canonicalUrl: 'https://dothething.tech/about',
    ogUrl: 'https://dothething.tech/about',
    ogId: 'https://dothething.tech/about#page',
    keywords: 'about DoTheThing, ADHD task management, executive dysfunction support',
    get schemas() {
      return getPageSchemas(
        'About DoTheThing | Task Breakdown for ADHD',
        'Learn about DoTheThing, the AI-powered task breakdown tool designed specifically for ADHD brains.',
        'https://dothething.tech/about'
      );
    },
  },
  blog: {
    title: 'Blog | DoTheThing - ADHD Task Management & Productivity',
    description: 'Read articles about ADHD, task management, productivity strategies, and neurodiversity. Expert insights and practical tips for managing executive dysfunction.',
    canonicalUrl: 'https://dothething.tech/blog',
    ogUrl: 'https://dothething.tech/blog',
    ogId: 'https://dothething.tech/blog#page',
    keywords: 'ADHD blog, task management articles, productivity tips, executive dysfunction, neurodiversity',
    get schemas() {
      return getPageSchemas(
        'Blog | DoTheThing - ADHD Task Management & Productivity',
        'Read articles about ADHD, task management, productivity strategies, and neurodiversity.',
        'https://dothething.tech/blog'
      );
    },
  },
  contact: {
    title: 'Contact DoTheThing | Get in Touch',
    description: 'Have questions, feedback, or partnership inquiries? Get in touch with the DoTheThing team. We\'d love to hear from you.',
    canonicalUrl: 'https://dothething.tech/contact',
    ogUrl: 'https://dothething.tech/contact',
    ogId: 'https://dothething.tech/contact#page',
    keywords: 'contact DoTheThing, feedback, partnership, support',
    get schemas() {
      return getPageSchemas(
        'Contact DoTheThing | Get in Touch',
        'Have questions, feedback, or partnership inquiries? Get in touch with the DoTheThing team.',
        'https://dothething.tech/contact'
      );
    },
  },
  privacy: {
    title: 'Privacy Policy | DoTheThing',
    description: 'Read DoTheThing\'s privacy policy. Learn how we collect, use, and protect your personal data.',
    canonicalUrl: 'https://dothething.tech/privacy',
    ogUrl: 'https://dothething.tech/privacy',
    ogId: 'https://dothething.tech/privacy#page',
    keywords: 'privacy policy, data protection, GDPR',
    get schemas() {
      return getPageSchemas(
        'Privacy Policy | DoTheThing',
        'Read DoTheThing\'s privacy policy. Learn how we collect, use, and protect your personal data.',
        'https://dothething.tech/privacy'
      );
    },
  },
  terms: {
    title: 'Terms of Service | DoTheThing',
    description: 'Read DoTheThing\'s terms of service. Understand the terms and conditions for using our platform.',
    canonicalUrl: 'https://dothething.tech/terms',
    ogUrl: 'https://dothething.tech/terms',
    ogId: 'https://dothething.tech/terms#page',
    keywords: 'terms of service, terms and conditions, legal',
    get schemas() {
      return getPageSchemas(
        'Terms of Service | DoTheThing',
        'Read DoTheThing\'s terms of service. Understand the terms and conditions for using our platform.',
        'https://dothething.tech/terms'
      );
    },
  },
};
