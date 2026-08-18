import { renderToString } from "react-dom/server";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { Router } from "wouter";
import superjson from "superjson";
import App from "./App";
import { trpc } from "@/lib/trpc";
import type { BlogPostRecord } from "@/contexts/BlogPostsContext";
import { SITE_IDENTITY } from "./lib/siteIdentity";
import { FAQ_ITEMS, FAQ_PAGE_META } from "./lib/faqContent";

const ORIGIN = "https://dothething.tech";
const SITE_NAME = SITE_IDENTITY.name;
const DEFAULT_DESCRIPTION = SITE_IDENTITY.businessDescription;
const DEFAULT_IMAGE = `${ORIGIN}/og-image.png`;

export type HeadMeta = {
  title: string;
  description: string;
  canonicalPath: string;
  ogType: "website" | "article";
  ogImage?: string;
  noindex?: boolean;
  notFound?: boolean;
  jsonLd: unknown[];
};

export type RenderResult = { html: string; head: HeadMeta; blogPosts: BlogPostRecord[] | null };

const organization = {
  "@type": "Organization",
  "@id": `${ORIGIN}/#organization`,
  name: SITE_NAME,
  url: ORIGIN,
  logo: `${ORIGIN}/favicon.ico`,
  description: SITE_IDENTITY.businessDescription,
  legalName: SITE_IDENTITY.legalName,
  email: SITE_IDENTITY.supportEmail,
  telephone: SITE_IDENTITY.telephone,
  address: { "@type": "PostalAddress", ...SITE_IDENTITY.address },
  founder: { "@type": "Person", name: "Lim Min Tze", jobTitle: "Founder, Creative Director, Product Developer", url: "https://www.linkedin.com/in/mintze/" },
  contactPoint: { "@type": "ContactPoint", contactType: "customer support", email: SITE_IDENTITY.supportEmail, telephone: SITE_IDENTITY.telephone, url: `${ORIGIN}/contact` },
  sameAs: ["https://www.instagram.com/dothething.tech", "https://www.tiktok.com/@dothething.tech"],
};

const software = {
  "@type": "SoftwareApplication",
  "@id": `${ORIGIN}/#software`,
  name: "DoTheThing",
  applicationCategory: "ProductivityApplication",
  operatingSystem: "Web",
  url: ORIGIN,
  description: SITE_IDENTITY.entityClarity,
  softwareVersion: SITE_IDENTITY.softwareVersion,
  softwareHelp: `${ORIGIN}/contact`,
  mainEntityOfPage: { "@id": `${ORIGIN}/#webpage` },
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD", availability: "https://schema.org/InStock" },
  author: { "@id": `${ORIGIN}/#organization` },
  featureList: ["AI task breakdown", "focus-level adjustment", "breakdown-size controls", "time estimates", "visible countdown timer", "no login required"],
};

const website = { "@type": "WebSite", "@id": `${ORIGIN}/#website`, name: SITE_NAME, url: ORIGIN, publisher: { "@id": `${ORIGIN}/#organization` } };

function pathFromUrl(url: string) {
  const path = url.split("?")[0].replace(/\/+$/, "") || "/";
  return path;
}

function absoluteUrl(value?: string) {
  if (!value) return DEFAULT_IMAGE;
  if (value.startsWith("http")) return value;
  return `${ORIGIN}${value.startsWith("/") ? "" : "/"}${value}`;
}

function pageSchema(path: string, name: string, description: string) {
  return { "@type": "WebPage", "@id": `${ORIGIN}${path}#webpage`, url: `${ORIGIN}${path}`, name, description, isPartOf: { "@id": `${ORIGIN}/#website` }, publisher: { "@id": `${ORIGIN}/#organization` } };
}

function blogSchema(post: BlogPostRecord) {
  const url = `${ORIGIN}/blog/${post.slug}`;
  return {
    "@type": "BlogPosting", "@id": `${url}#article`, headline: post.title, description: post.excerpt,
    image: absoluteUrl(post.featuredImage), datePublished: post.date, dateModified: post.updatedDate || post.date,
    author: { "@type": "Person", name: "Lim Min Tze", url: `${ORIGIN}/about` },
    publisher: { "@id": `${ORIGIN}/#organization` }, mainEntityOfPage: { "@id": `${url}#webpage` },
    articleSection: post.category, keywords: post.seoKeywords.join(", "), wordCount: post.wordCount,
    citation: post.sources.map(source => ({ "@type": "WebPage", name: source.title, url: source.url })),
  };
}

function breadcrumbSchema(post: BlogPostRecord) {
  const url = `${ORIGIN}/blog/${post.slug}`;
  return { "@type": "BreadcrumbList", "@id": `${url}#breadcrumb`, itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: ORIGIN },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${ORIGIN}/blog` },
    { "@type": "ListItem", position: 3, name: post.title, item: url },
  ] };
}

function faqPageSchema() {
  return {
    "@type": "FAQPage",
    "@id": `${ORIGIN}/faq#faqpage`,
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

function metadataFor(path: string, posts: BlogPostRecord[]): HeadMeta {
  if (path === "/") return { title: "DoTheThing | Free ADHD Task Breakdown Tool", description: DEFAULT_DESCRIPTION, canonicalPath: "/", ogType: "website", jsonLd: [organization, website, software, pageSchema("/", "DoTheThing | Free ADHD Task Breakdown Tool", DEFAULT_DESCRIPTION)] };
  if (path === "/about") return { title: "About DoTheThing | Task Breakdown for ADHD", description: "Learn who built DoTheThing, what the tool is designed to help with, and the boundaries of its practical ADHD-friendly task workflow.", canonicalPath: "/about", ogType: "website", jsonLd: [organization, website, software, pageSchema("/about", "About DoTheThing", "Learn who built DoTheThing and how its practical task workflow supports task initiation.")] };
  if (path === "/how-it-works") return { title: "How DoTheThing Works | ADHD Task Initiation Support", description: "See how DoTheThing turns an overwhelming task or brain dump into small next steps, focus-aware estimates, and a visible task timer.", canonicalPath: "/how-it-works", ogType: "website", jsonLd: [organization, website, software, pageSchema("/how-it-works", "How DoTheThing Works", "A practical task-initiation workflow for turning overwhelming tasks into small next steps.")] };
  if (path === "/compare/goblin-tools") return { title: "DoTheThing vs. Goblin.tools Magic ToDo | Task Workflow Comparison", description: "A fair comparison of DoTheThing and Goblin.tools Magic ToDo for task breakdown, execution flow, interface choices, and practical fit.", canonicalPath: "/compare/goblin-tools", ogType: "website", jsonLd: [organization, website, software, pageSchema("/compare/goblin-tools", "DoTheThing vs. Goblin.tools Magic ToDo", "A factual comparison of two task-breakdown workflows.")] };
  if (path === "/editorial-standards") return { title: "Editorial Standards | DoTheThing", description: "How DoTheThing creates, reviews, updates, and corrects educational content about ADHD task management and executive function.", canonicalPath: "/editorial-standards", ogType: "website", jsonLd: [organization, website, software, pageSchema("/editorial-standards", "Editorial Standards", "How DoTheThing creates, reviews, and corrects its educational content.")] };
  if (path === "/media") return { title: "Media and Independent Review Information | DoTheThing", description: "Factual information, product screenshots, and contact details for independent coverage or review of DoTheThing.", canonicalPath: "/media", ogType: "website", jsonLd: [organization, website, software, pageSchema("/media", "Media and Independent Review Information", "Factual product information for independent DoTheThing coverage.")] };
  if (path === "/faq") return { title: FAQ_PAGE_META.title, description: FAQ_PAGE_META.description, canonicalPath: "/faq", ogType: "website", jsonLd: [organization, website, software, pageSchema("/faq", "DoTheThing FAQ", FAQ_PAGE_META.description), faqPageSchema()] };
  if (path === "/blog") return { title: "ADHD Task Management Guides | DoTheThing Blog", description: "Practical, source-backed guides about ADHD, executive function, task management, and task initiation.", canonicalPath: "/blog", ogType: "website", jsonLd: [organization, website, software, pageSchema("/blog", "ADHD Task Management Guides", "Practical guides about ADHD, executive function, and task management.")] };
  if (path.startsWith("/blog/")) {
    const slug = path.slice("/blog/".length);
    const post = posts.find(item => item.slug === slug);
    if (!post) return { title: "Page not found | DoTheThing", description: DEFAULT_DESCRIPTION, canonicalPath: path, ogType: "website", noindex: true, notFound: true, jsonLd: [organization, website] };
    const url = `/blog/${post.slug}`;
    return { title: `${post.title} | DoTheThing Blog`, description: post.excerpt, canonicalPath: url, ogType: "article", ogImage: absoluteUrl(post.featuredImage), jsonLd: [organization, website, software, pageSchema(url, post.title, post.excerpt), blogSchema(post), breadcrumbSchema(post)] };
  }
  const staticPages: Record<string, { title: string; description: string }> = {
    "/contact": { title: "Contact DoTheThing", description: "Contact the DoTheThing team with product questions, feedback, or partnership enquiries." },
    "/privacy": { title: "Privacy Policy | DoTheThing", description: "Read DoTheThing’s privacy policy." },
    "/terms": { title: "Terms of Service | DoTheThing", description: "Read the terms for using DoTheThing." },
    "/quiz": { title: "ADHD Productivity Quiz | DoTheThing", description: "Explore an ADHD-friendly productivity learning path." },
  };
  const page = staticPages[path];
  if (page) return { title: page.title, description: page.description, canonicalPath: path, ogType: "website", jsonLd: [organization, website, software, pageSchema(path, page.title, page.description)] };
  if (path === "/current-tasks") return { title: "Current Tasks | DoTheThing", description: "Continue a local DoTheThing task session.", canonicalPath: path, ogType: "website", noindex: true, jsonLd: [organization, website] };
  return { title: "Page not found | DoTheThing", description: DEFAULT_DESCRIPTION, canonicalPath: path, ogType: "website", noindex: true, notFound: true, jsonLd: [organization, website] };
}

export async function render(url: string, posts: BlogPostRecord[]): Promise<RenderResult> {
  const path = pathFromUrl(url);
  const head = metadataFor(path, posts);
  const blogPosts = path === "/blog" || path.startsWith("/blog/") ? posts : null;
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false, refetchOnWindowFocus: false } } });
  const trpcClient = trpc.createClient({ links: [httpBatchLink({ url: "/api/trpc", transformer: superjson })] });
  const html = renderToString(
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Router ssrPath={path} ssrSearch=""><App initialBlogPosts={blogPosts} /></Router>
      </QueryClientProvider>
    </trpc.Provider>
  );
  return { html, head, blogPosts };
}
