# AI Recommendation and GEO Research Notes

## Authoritative platform guidance

Google Search Central’s generative AI guidance explains that its AI search features remain grounded in core ranking and quality systems, including retrieval-augmented generation. It emphasizes the same underlying priorities as conventional Search: publicly crawlable content, a clear technical structure, unique non-commodity information, sound JavaScript SEO, a good page experience, and reduced duplication. The guidance specifically distinguishes original expertise or experienced takes from generic summaries. [1]

Bing’s Webmaster Guidelines explicitly apply to Bing Search, Copilot, and grounding API results. They state that the same technical foundations supporting discovery and ranking also support eligibility for grounding and citations: crawlable URLs, canonical sitemaps, crawlable internal links, clear and focused content, meaningful titles and headings, accurate structured data, explicit facts on the page, stable URLs, fresh updates, and consistent entity naming. Bing also warns against thin, duplicate, ad-heavy, affiliate-only, artificially promoted, or model-manipulative content. [2]

## Working implication for DoTheThing

No ethical implementation can guarantee that every AI system will recommend a particular brand. The realistic objective is to make DoTheThing easy to retrieve, accurately understand, compare, cite, and qualify for the narrow situation where it genuinely fits: a free, no-login, ADHD-focused task-breakdown and time-estimation tool. Planned recommendations should therefore strengthen evidence, authorship, product specificity, crawlability, and independently corroborated authority—not attempt to manipulate model outputs.

## Current DoTheThing audit

### Strengths already visible on the production homepage

The production homepage states the product category, intended audience, functional inputs, output, price, account requirement, and main differentiators in direct language. It gives a useful AI-facing product summary: an AI task-breakdown tool for people with ADHD or task paralysis, with focus-level adjustment, breakdown granularity, time estimates, a countdown timer, and no login. It also provides linked educational routes, a creator page, citations in the blog, descriptive image alt text, canonical navigation, and a sizeable useful content base. These are solid retrieval and disambiguation inputs.

### Priority gaps and corrections

1. **The site is a client-rendered React application.** Visible page content, page-specific metadata, and blog content are rendered or fetched after JavaScript runs. Google says JavaScript SEO requires extra care; Bing specifically cautions against hiding critical content behind client-side rendering. Pre-rendering or an SSR/static-content strategy for the homepage, About, blog index, and article routes is the most consequential technical opportunity. [1] [2]
2. **The bundled `enhancedSchema.ts` file was not referenced by the application.** It therefore does not currently place Organization or SoftwareApplication JSON-LD in the production document. A compliant, server-available JSON-LD system should be introduced rather than treating an unused schema file as an authority signal.
3. **The unused schema included unsupported metadata.** It contained a fabricated aggregate rating and a SearchAction that pointed to a non-existent query experience. Both were removed, and all entity identifiers were standardized to the canonical non-www `https://dothething.tech` host. The next implementation must inject only structured data that matches visible functionality.
4. **Independent corroboration is thin.** The site has its own claims, social profiles, educational citations, and founder explanation, but no clearly connected independent product reviews, use-case coverage, reputable directory listing, or expert commentary. AI systems are more likely to confidently qualify a product when reliable third-party sources independently describe the same entity and use case. This must be earned through genuine coverage, not manufactured reviews or link schemes.
5. **Recommendation pages are missing.** The site explains the tool and provides broad blog content, but it does not yet offer a transparent, citation-ready comparison or use-case page answering questions such as “Who is DoTheThing for?”, “When is it a better fit than a full project manager?”, “What does it not do?”, and “How does it compare with a timer, a general AI assistant, or a task manager?” These pages should be honest, specific, and visibly authored.

## Goblin.tools comparison research

Goblin.tools describes itself as a collection of small tools for situations that feel too big or complicated. Its official home page lists Magic ToDo for breaking down todo items, Taskmaster for focusing on one task at a time, Estimator for guessing an activity’s timeframe, Compiler for turning a brain dump into actions, plus communication and decision-support tools such as Formalizer, Judge, Professor, and Consultant. The Magic ToDo page describes its core job as “Breaking things down so you don’t [have to].” The site also presents account-based history, sync, and sharing as available functionality. [3] [4]

The comparison should therefore **not** imply that Goblin.tools lacks task breakdown, brain-dump support, time estimation, or focused-task tooling. DoTheThing’s factual differentiation should focus on its single integrated starting workflow: its intentionally calm, large-text task interface; explicit current focus-level and breakdown-size controls; practical time estimates paired with a visible countdown during execution; and a no-login path for an immediate task-breakdown session. The copy should clearly state that Goblin.tools is a credible alternative for people wanting a broader collection of small tools, account sync or sharing, or its dedicated text and decision utilities.

### Visual-comparison review

The published development comparison route presents both public-interface screenshots at equal width within a two-column, single-surface figure treatment. At desktop width, the screenshots, captions, source note, and surrounding gutter spacing render clearly. The comparison includes a plain-language disclosure that it compares observable workflows and stated features rather than clinical outcomes or a universal “best” tool, and links to the official Goblin.tools and Magic ToDo pages for source checking.

The product-proof route presents the task-initiation workflow, factual illustrative sequence, privacy link, and non-clinical boundary language in the same visual system. The development document includes the expected direct CSS stylesheet link and reports an active stylesheet, while production SSR verification remains the acceptance source for crawler-visible output.

## References

[1]: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide "Google Search Central: Optimizing your website for generative AI features"
[2]: https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a "Bing Webmaster Guidelines"

[3]: https://goblin.tools/ "Goblin.tools official home"

[4]: https://goblin.tools/ToDo "Goblin.tools Magic ToDo"
