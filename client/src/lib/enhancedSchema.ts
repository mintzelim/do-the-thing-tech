/**
 * Enhanced Schema.org JSON-LD for comprehensive SEO and rich snippets
 * Includes Organization, Product, SoftwareApplication, WebSite, WebPage, FAQPage, and BreadcrumbList
 */

export const enhancedSchema = {
  "@context": "https://schema.org",
  "@graph": [
    // Organization Schema - Primary entity
    {
      "@type": "Organization",
      "@id": "https://www.dothething.tech/#organization",
      "name": "Boundless One Ventures",
      "alternateName": "DoTheThing",
      "url": "https://www.dothething.tech/",
      "logo": "https://www.dothething.tech/logo.png",
      "image": "https://www.dothething.tech/logo.png",
      "description": "Boundless One Ventures builds AI-powered tools for neurodivergent individuals. DoTheThing is a global SaaS platform that helps people with ADHD and executive dysfunction break down overwhelming tasks into manageable micro-steps with AI-powered time estimation.",
      "foundingDate": "2026",
      "foundingLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Kuala Lumpur",
          "addressCountry": "MY"
        }
      },
      "numberOfEmployees": {
        "@type": "QuantitativeValue",
        "value": 2
      },
      "founder": [
        {
          "@type": "Person",
          "name": "Lim Min Tze",
          "jobTitle": "Founder",
          "url": "https://www.dothething.tech/about"
        }
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "Customer Service",
        "email": "contact@dothething.tech",
        "url": "https://www.dothething.tech/contact"
      },
      "sameAs": [
        "https://www.instagram.com/dothething.tech",
        "https://www.tiktok.com/@dothething.tech"
      ]
    },

    // WebSite Schema - Root website definition
    {
      "@type": "WebSite",
      "@id": "https://www.dothething.tech/#website",
      "name": "DoTheThing",
      "url": "https://www.dothething.tech/",
      "description": "AI-powered task breakdown app for ADHD brains - global access, no login required",
      "publisher": {
        "@id": "https://www.dothething.tech/#organization"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://www.dothething.tech/blog?q={search_term_string}"
        },
        "queryInput": "required name=search_term_string"
      }
    },

    // SoftwareApplication Schema - For the AI task management tool
    {
      "@type": "SoftwareApplication",
      "@id": "https://www.dothething.tech/#software",
      "name": "DoTheThing",
      "description": "AI-powered task breakdown and time estimation tool designed for ADHD brains. Instantly breaks down overwhelming tasks into micro-steps with realistic time estimates based on focus level.",
      "applicationCategory": "Productivity",
      "operatingSystem": "Web-based (accessible globally)",
      "url": "https://www.dothething.tech/",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "ratingCount": 156,
        "bestRating": "5",
        "worstRating": "1"
      },
      "author": {
        "@id": "https://www.dothething.tech/#organization"
      },
      "publisher": {
        "@id": "https://www.dothething.tech/#organization"
      },
      "featureList": [
        "AI-powered task breakdown",
        "Focus-level detection (Hyperfocus, Normal, Distracted)",
        "Task size selection (Tiny, Balanced, Big)",
        "Smart time estimation",
        "Countdown timer",
        "No login required",
        "Mobile-optimized interface",
        "ADHD-friendly design",
        "Global access"
      ]
    },

    // WebPage Schema - Homepage
    {
      "@type": "WebPage",
      "@id": "https://www.dothething.tech/#webpage",
      "url": "https://www.dothething.tech/",
      "name": "DoTheThing — AI Task Breakdown for ADHD Brains",
      "description": "DoTheThing helps people with ADHD beat task paralysis. Enter any task, pick your focus level, and get an instant AI-powered breakdown with realistic time estimates. Free, no login required, global access.",
      "isPartOf": {
        "@id": "https://www.dothething.tech/#website"
      },
      "publisher": {
        "@id": "https://www.dothething.tech/#organization"
      },
      "mainEntity": {
        "@id": "https://www.dothething.tech/#software"
      },
      "datePublished": "2026-01-01",
      "dateModified": new Date().toISOString().split('T')[0],
      "inLanguage": "en-US",
      "primaryImageOfPage": {
        "@type": "ImageObject",
        "url": "https://www.dothething.tech/logo.png",
        "width": 1200,
        "height": 630
      }
    },

    // FAQPage Schema - For featured snippets
    {
      "@type": "FAQPage",
      "@id": "https://www.dothething.tech/#faqpage",
      "url": "https://www.dothething.tech/",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is DoTheThing?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "DoTheThing is an AI-powered task breakdown and time estimation tool designed specifically for ADHD brains. It helps you break down overwhelming tasks into manageable micro-steps with realistic time estimates based on your current focus level."
          }
        },
        {
          "@type": "Question",
          "name": "Is DoTheThing free?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, DoTheThing is completely free to use. No login required, no hidden fees, no premium tiers. Global access from any device."
          }
        },
        {
          "@type": "Question",
          "name": "Do I need to create an account?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No, DoTheThing requires no login or account creation. Simply visit the website, enter your task, and get started immediately."
          }
        },
        {
          "@type": "Question",
          "name": "How does DoTheThing help with ADHD?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "DoTheThing addresses common ADHD challenges like task initiation paralysis, time blindness, and overwhelm by breaking tasks into concrete micro-steps with time estimates tailored to your current focus level (Hyperfocus, Normal, or Distracted)."
          }
        },
        {
          "@type": "Question",
          "name": "Can I adjust the task breakdown?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, you can select your focus level (Hyperfocus, Normal, Distracted) and task size (Tiny, Balanced, Big) to get a breakdown that matches your current state and needs."
          }
        },
        {
          "@type": "Question",
          "name": "What makes DoTheThing different from other task managers?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "DoTheThing is specifically designed for ADHD brains. It focuses on task initiation and breakdown rather than complex project management, making it simple and accessible for neurodivergent users worldwide."
          }
        }
      ]
    },

    // BreadcrumbList Schema - For navigation
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.dothething.tech/#breadcrumb",
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
          "name": "About",
          "item": "https://www.dothething.tech/about"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Blog",
          "item": "https://www.dothething.tech/blog"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Contact",
          "item": "https://www.dothething.tech/contact"
        }
      ]
    }
  ]
};

/**
 * Helper function to inject schema into document head
 */
export function injectSchema(schema: typeof enhancedSchema) {
  const scriptTag = document.createElement('script');
  scriptTag.type = 'application/ld+json';
  scriptTag.textContent = JSON.stringify(schema);
  document.head.appendChild(scriptTag);
}
