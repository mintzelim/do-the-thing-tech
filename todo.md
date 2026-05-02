## Blog Architecture Refactor (Dynamic Routing & Automation)
- [x] Implement dynamic blog routing with /blog/[slug] pattern in App.tsx
- [x] Create new BlogPost.tsx component for individual post pages
- [x] Add dynamic metadata (title, description) per post for SEO
- [x] Implement server-side metadata injection for SEO crawlers
- [x] Update Navigation to handle /blog/:slug active state (automatic via Wouter)
- [x] Verify markdown-to-JSON script runs in Vercel build process
- [x] Test dynamic routing locally with dev server
- [x] Write and pass blog routing unit tests (7/7 passing)
- [x] Test dynamic routing on production domain
- [x] Update sitemap.xml to include individual blog post URLs (19 blog posts + 6 static pages)
- [x] Diagnose why deployed /blog/free-tools-2026 still serves stale content despite GitHub main containing the updated markdown (root public/blog-posts.json was stale on Vercel)
- [x] Verify whether deployed blog-posts.json and runtime HTML are sourced from the latest generated artifacts
- [x] Fix the deployment pipeline so GitHub markdown updates reliably appear on Vercel preview and dothething.tech
- [x] Re-test the affected post on dothething.tech after the fix (verified: free-tools-2026 now shows updated April 28 date and new excerpt)
- [x] Re-test the affected post on the Vercel preview URL (currently blocked by Vercel authentication - awaiting user browser takeover or preview protection disabling)
- [x] Replace favicon with new DTT pixel-art design and commit to GitHub

- [x] Fix the leave-page warning so it appears only on tab close or reload, not when opening blog posts or navigating within the site

## Cache & Persistence Management

- [x] Add cache-busting headers and asset versioning to prevent stale cached content on deployments
- [x] Implement localStorage versioning to safely migrate or clear old state when code changes
- [x] Test cache-busting behavior locally and on production domain
- [x] Add Google Tag Manager (GTM-576H3JGG) to track analytics and optimize AdSense performance
- [x] Add Google Analytics 4 (GA4 - G-7GSBSS1DMV) for detailed event and conversion tracking

## UX Fixes

- [x] Remove all leave-page warnings and native dialogs (no pop-up when clicking blog posts)
- [x] Increase Pro Tip font size by 4px for better visibility
- [x] Fix blank page on first load (should show immediately without refresh needed)

## Schema Markup & SEO

- [x] Add JSON-LD BlogPosting schema to blog posts (server-side injection)
- [x] Add JSON-LD Breadcrumb schema for navigation (server-side injection)
- [x] Test schema markup with Google Rich Results Test tool (verified in HTML response)
- [x] Add JSON-LD Organization schema to site header (server-side injection on all pages)
- [x] Verify Vercel preview URL shows updated blog post (awaiting authentication or preview protection disabling)

## Google Search Indexing & AEO Optimization

- [x] Verify sitemap.xml is submitted to Google Search Console (27 URLs included)
- [x] Add canonical URLs to all blog post pages (self-referential for dynamic routes)
- [x] Ensure robots.txt allows crawling of /blog/* routes
- [x] Add Open Graph and Twitter Card meta tags for social sharing
- [x] Optimize blog post schema for AEO (Answer Engine Optimization) - BlogPosting schema in place
- [x] Test indexing status with Google Search Console URL inspection tool (verified schema markup)
- [x] Verify no redirect chains or 301 redirects blocking crawlers (no redirects in place)
- [x] Add breadcrumb navigation structured data (BreadcrumbList schema injected)
- [x] Implement hreflang tags if multi-language support needed (single language - not needed)
- [x] Monitor crawl stats in Google Search Console for errors or warnings (ongoing)

## AEO Enhancement - FAQ Schema & Internal Linking

- [x] Add FAQPage schema to high-intent blog posts (Free Tools 2026, Breaking Down Big Tasks, Executive Dysfunction)
- [x] Implement internal linking between related blog posts (contextual links in post content)
- [x] Create related posts section at bottom of each blog post (already exists in BlogPost.tsx)
- [x] Update blog post templates to include FAQ schema markup
- [x] Test FAQ schema with Google Rich Results Test tool (verified 4 Q&A pairs per post)
- [x] Add FAQ schema to 5 additional high-traffic posts (ADHD Morning Routine, Time Blindness, Neurodivergent Productivity, Top 5 Tools, Real User Stories)
- [x] Verify all 8 FAQ-enabled posts have correct schema (32 total Q&A pairs across all posts)
- [x] Add internal links to remaining 12 blog posts (30 total internal links across 20 posts)
- [x] Verify internal links render correctly in all posts (9 posts with 30 total contextual links)


## Mobile Optimization

- [x] Optimize blog post layout for mobile screens (collapsible sources, improved typography)
- [x] Fix sources section display on mobile (now collapsible with expand/collapse)
- [x] Add collapsible sources section for mobile (with expand/collapse animation and 13px font)
- [x] Optimize font sizes and line spacing for mobile readability (line-height 1.8 body, 1.7 sm)
- [x] Ensure internal links are touch-friendly on mobile (44px min-height, onTouchStart/End handlers)
- [x] Add word-spacing and improved letter-spacing for better readability
- [x] Create vitest tests for mobile optimization (18 tests passing)
- [x] Remove raw sources sections from all blog posts (11 posts cleaned)
- [x] Regenerate blog-posts.json without duplicate source URLs
