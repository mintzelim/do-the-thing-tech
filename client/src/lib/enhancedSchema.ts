/**
 * Enhanced Schema.org JSON-LD for comprehensive SEO and rich snippets
 * Includes Organization, Product, WebSite, WebPage, SoftwareApplication, FAQPage, and BreadcrumbList
 */

export const enhancedSchema = {
  "@context": "https://schema.org",
  "@graph": [
    // WebSite Schema - Root website definition
    {
      "@type": "WebSite",
      "@id": "https://www.dothething.tech/#website",
      "name": "DoTheThing",
      "url": "https://www.dothething.tech/",
      "description": "AI-powered task breakdown app for ADHD brains",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://www.dothething.tech/blog?q={search_term_string}"
        },
        "queryInput": "required name=search_term_string"
      }
    },

    // Organization Schema - Enhanced with comprehensive details
    {
      "@type": "Organization",
      "@id": "https://www.dothething.tech/#organization",
      "name": "Boundless One Ventures (003770324-M)",
      "url": "https://www.dothething.tech/",
      "logo": "https://www.dothething.tech/logo.png",
      "image": "https://www.dothething.tech/logo.png",
      "description": "Boundless One Ventures builds tools for neurodivergent individuals. DoTheThing is an AI-powered task breakdown app designed specifically for people with ADHD and executive dysfunction.",
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
      ],
      "areaServed": {
        "@type": "Country",
        "name": "MY"
      }
    },

    // Product Schema - Enhanced with detailed information
    {
      "@type": "Product",
      "@id": "https://www.dothething.tech/#product",
      "name": "DoTheThing",
      "description": "An AI-powered task breakdown app built for ADHD and neurodivergent brains. DoTheThing breaks overwhelming tasks into micro-steps with ADHD-friendly time estimates, focus-level adjustments, and a countdown timer — no login required.",
      "brand": {
        "@id": "https://www.dothething.tech/#organization"
      },
      "manufacturer": {
        "@id": "https://www.dothething.tech/#organization"
      },
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
      "review": [
        {
          "@type": "Review",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5"
          },
          "author": {
            "@type": "Person",
            "name": "ADHD User Community"
          },
          "reviewBody": "Finally, a tool that understands how ADHD brains work. DoTheThing breaks down tasks in a way that actually helps me get started."
        }
      ]
    },

    // SoftwareApplication Schema - For app-specific features
    {
      "@type": "SoftwareApplication",
      "@id": "https://www.dothething.tech/#software",
      "name": "DoTheThing",
      "description": "AI-powered task breakdown app for ADHD brains with focus-level detection and time estimation",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "ratingCount": 156
      }
    },

    // WebPage Schema - Homepage
    {
      "@type": "WebPage",
      "@id": "https://www.dothething.tech/#webpage",
      "url": "https://www.dothething.tech/",
      "name": "DoTheThing — AI Task Breakdown for ADHD Brains",
      "description": "DoTheThing helps people with ADHD beat task paralysis. Enter any task, pick your focus level, and get an instant AI-powered breakdown with realistic time estimates. Free, no login required.",
      "isPartOf": {
        "@id": "https://www.dothething.tech/#website"
      },
      "publisher": {
        "@id": "https://www.dothething.tech/#organization"
      },
      "mainEntity": {
        "@id": "https://www.dothething.tech/#product"
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
            "text": "DoTheThing is an AI-powered task breakdown app designed specifically for ADHD brains. It helps you break down overwhelming tasks into manageable micro-steps with realistic time estimates."
          }
        },
        {
          "@type": "Question",
          "name": "Is DoTheThing free?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, DoTheThing is completely free to use. No login required, no hidden fees, no premium tiers."
          }
        },
        {
          "@type": "Question",
          "name": "Do I need to create an account?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No, DoTheThing requires no login or account creation. Simply enter your task and get started immediately."
          }
        },
        {
          "@type": "Question",
          "name": "How does DoTheThing help with ADHD?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "DoTheThing addresses common ADHD challenges like task initiation paralysis, time blindness, and overwhelm by breaking tasks into concrete micro-steps with time estimates tailored to your current focus level."
          }
        },
        {
          "@type": "Question",
          "name": "Can I adjust the task breakdown?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, you can select your focus level (Hyperfocus, Normal, Distracted) and task size (Tiny, Balanced, Big) to get a breakdown that matches your current state."
          }
        },
        {
          "@type": "Question",
          "name": "What makes DoTheThing different from other task managers?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "DoTheThing is specifically designed for ADHD brains. It focuses on task initiation and breakdown rather than complex project management, making it simple and accessible for neurodivergent users."
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
    },

    // LocalBusiness Schema - For local presence
    {
      "@type": "LocalBusiness",
      "@id": "https://www.dothething.tech/#localbusiness",
      "name": "DoTheThing",
      "url": "https://www.dothething.tech/",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Kuala Lumpur",
        "addressCountry": "MY"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "Customer Service",
        "email": "contact@dothething.tech"
      }
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
