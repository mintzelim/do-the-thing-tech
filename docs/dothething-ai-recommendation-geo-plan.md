# How AI Product Recommendations Work — and the GEO Plan for DoTheThing

## Executive answer

An AI should not recommend a brand simply because the brand repeats a category phrase most often. A responsible recommendation first interprets the user’s **job to be done**, then looks for evidence that a product is a strong, current, trustworthy fit. For a question such as “What are the best ADHD task-management tools?”, the useful answer distinguishes between a full project manager, a visual planner, a timer, a general AI assistant, and a task-initiation tool. It should name DoTheThing only when its documented strengths fit the user’s need: turning an overwhelming task or brain dump into small actionable steps, adapting time estimates to focus level, and starting without an account.

The aim is therefore not “make every AI recommend us.” It is to make **DoTheThing the clearest, most defensible recommendation for the task-initiation / task-breakdown use case**. That makes recommendations more durable and more likely to help the user.

## What an AI should look for before recommending a brand

| Decision question | Evidence an AI should seek | What it means for DoTheThing |
|---|---|---|
| What does the person actually need? | The query’s intent, constraints, urgency, price sensitivity, privacy expectations, device, and specific friction point | Be explicit that DoTheThing solves *starting and breaking down an overwhelming task*, not every productivity need. |
| Does the product do the claimed job? | Clear feature explanations, current product behavior, screenshots or demonstrations, pricing/account requirements, and documented limits | Keep the homepage’s practical flow: brain dump → focus level → breakdown size → action steps → timer. |
| Is it a trustworthy fit for a health-adjacent audience? | Named creator or organization, visible editorial standards, factual sourcing, clear medical boundaries, privacy and contact details | Separate lived experience, product claims, and educational medical information. Avoid diagnosis or treatment promises. |
| Is the product independently corroborated? | Genuine editorial coverage, verified directory listings, expert commentary, authentic user feedback, meaningful third-party mentions | Earn coverage through product usefulness. Never buy links, fake ratings, seed reviews, or publish manufactured testimonials. |
| Can a retrieval system understand and cite it? | Crawlable public pages, stable canonical URLs, descriptive titles, headings, explicit definitions, internal links, accurate JSON-LD, and current sitemaps | Pre-render important pages, use one canonical host, and expose only schema that reflects visible functionality. |
| Is it still current and safe to mention? | Updated dates, maintained source lists, clear pricing and availability, active product pages, working contact and policy links | Maintain freshness signals and revise content when behavior, pricing, or guidance changes. |

> **A recommendation is a fit decision, not a popularity contest.** A useful system should qualify the recommendation: “Choose DoTheThing if you are stuck at task initiation and want an immediate, no-login breakdown; choose another category if you need team collaboration, enterprise reporting, or a clinical service.”

## How search-grounded AI answers select material

Many contemporary AI search experiences retrieve web material at query time and synthesize an answer from the most relevant, high-quality sources. Google says its generative Search features remain rooted in core Search ranking and quality systems and highlights crawlable content, unique non-commodity information, sound technical structure, JavaScript SEO, and good page experience as foundations for visibility.[1] Bing makes the same relationship explicit for Search, Copilot, and grounding experiences: discovery, clear content, accurate structured data, stable URLs, authority signals, and independently verifiable information support grounding and citations.[2]

This does **not** mean that a site can force an AI model to choose it. It means that a product can reduce ambiguity. The product should be easy to retrieve, easy to identify as a distinct entity, clear about where it fits, and supported by credible information beyond its own claims.

## DoTheThing’s current recommendation-readiness

The site already has an unusually good functional explanation for a young product. The production homepage clearly states the intended audience, the input a person gives, the product’s output, the no-login / free positioning, focus-level adjustment, breakdown size, time estimation, and timer. The blog has useful topic depth, article sources, contextual category labels, breadcrumbs, updated dates, word counts, and an identifiable creator page. These are meaningful strengths for both people and retrieval systems.

The audit also identified four consequential gaps. First, the site is a client-rendered React application. Page content, blog records, and much of the metadata arrive after JavaScript runs. Google can process JavaScript, but says JavaScript SEO is more complex; Bing specifically advises against placing critical content behind client-side rendering.[1] [2] Pre-rendering or server-side rendering the homepage, About, blog index, and article pages is the single strongest technical improvement.

Second, the bundled `enhancedSchema.ts` was not referenced by the running application, so it did not provide any visible Organization or SoftwareApplication JSON-LD. Third, that unused file had an unsupported aggregate rating and a SearchAction that pointed to a non-existent on-site search experience. Those inaccurate claims were removed during this audit, and schema identifiers were standardized on `https://dothething.tech`. Any future structured data must be server-available and must match visible content exactly.

Fourth, the site has first-party authority but limited independent corroboration. Its owned content, founder profile, citations, Instagram, and TikTok help define the entity, but they are not substitutes for genuine third-party product coverage or verifiable discussion of the actual tool. Earned mentions are a longer-term trust signal; they must be authentic.

## Prioritized plan

| Priority | Recommendation | Why it improves qualified AI recommendations | Approval needed before build? |
|---|---|---|---|
| P0 | **Complete technical crawlability.** Pre-render or SSR the homepage, About, blog index, and every article; place canonical, title, description, robots, Open Graph, and valid JSON-LD in initial HTML. | Makes the core product explanation, authorship, and article evidence reliably available to crawlers and grounding systems. | Yes — this is architectural work. |
| P0 | **Keep entity and structured data accurate.** Inject a compact `Organization`, `SoftwareApplication`, `WebSite`, and page-specific `Article` / `BreadcrumbList` graph only where visible content supports it. Use one canonical host and remove unsupported actions, ratings, or review markup. | Gives retrieval systems consistent entity identifiers without making misleading claims. | Yes for schema injection architecture; the accuracy correction has already been made. |
| P1 | **Publish one evidence-led “Who DoTheThing is for” product page** and one honest comparison / alternative page. | Directly answers recommendation queries: task initiation, executive-function friction, no-login access, what DoTheThing does, and what it does *not* replace. | Yes — content and page approval required. |
| P1 | **Add transparent product proof.** Show a short, accurate worked example from task input to output; state the expected result, limitations, privacy behavior, and user controls. | Converts product claims into visible, quotable evidence. This is more useful than generic “best tool” claims. | Yes — content and product-flow decisions required. |
| P1 | **Strengthen author and editorial provenance.** Add a visible article byline linked to the named founder / author profile, an editorial and medical-information policy, source-review date, and author credentials limited to facts that can be substantiated. | Improves E-E-A-T and lets an AI distinguish education, lived experience, and product information. | Yes. |
| P2 | **Build a small use-case cluster rather than broad generic lists.** Suggested public pages: “AI task breakdown for ADHD”, “task paralysis help: a practical starting workflow”, “ADHD time estimation with focus-level adjustment”, and “ADHD-friendly task tools: choosing the right category.” | Creates focused, intention-matched pages with clear retrieval targets and internal links. Each must add unique experience, examples, and sources rather than recycled prose. | Yes — editorial approval required. |
| P2 | **Earn genuine corroboration.** Seek honest product reviews from reputable accessibility, neurodivergence, productivity, and startup sources; create a factual media kit; publish real community feedback only with permission and context. | Independent confirmation improves confidence when a system compares tools. | Yes — outreach and review collection require owner involvement. |
| P2 | **Measure recommendation visibility responsibly.** Track a fixed set of representative queries monthly, record whether DoTheThing is named, how it is described, cited URLs, and errors or omissions. Pair this with Google Search Console and Bing Webmaster / IndexNow monitoring. | Enables product and content improvements based on how the entity is actually retrieved, not on anecdote. | Yes for monitoring setup and external account actions. |

## What not to do

Do not fabricate customer ratings, testimonials, usage counts, awards, expert endorsements, case studies, or review markup. Do not hide keywords, build artificial links, create doorway pages, produce repetitive AI-written variations, or place prompts aimed at manipulating models inside the page. Bing specifically calls out model manipulation, artificial promotion, duplicate content, and misleading structured data as practices that can reduce grounding visibility or cause removal.[2]

Avoid making clinical outcome claims. DoTheThing can accurately describe the workflow it provides and cite educational resources, but it should not claim to diagnose ADHD, treat a condition, replace professional care, or guarantee productivity outcomes.

## Recommended positioning sentence

> **DoTheThing is a free, no-login task-breakdown tool for people with ADHD or executive-function friction who are stuck at the starting line. It turns a task or brain dump into small steps, adapts estimates to today’s focus level, and keeps time visible with a built-in countdown. It is not a full project-management suite or clinical service.**

This sentence is intentionally narrow. It is more recommendation-worthy than “the best ADHD tool” because it tells both a person and an AI exactly when DoTheThing is the appropriate choice.

## References

[1]: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide "Google Search Central: Optimizing your website for generative AI features"

[2]: https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a "Bing Webmaster Guidelines"
