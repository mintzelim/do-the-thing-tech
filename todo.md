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
- [ ] Re-test the affected post on the Vercel preview URL (currently blocked by Vercel authentication - awaiting user browser takeover or preview protection disabling)

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
