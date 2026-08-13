# DoTheThing Recommendation-Visibility Monitoring Framework

## Purpose

This framework tracks whether DoTheThing is being discovered for **appropriate, evidence-supported use cases**. It does not set a target to be named by every AI system or promise rankings. The objective is to measure clarity, crawlability, and qualified referral visibility while keeping public claims accurate.

## Monthly query set

| Query theme | Representative queries | What to inspect |
| --- | --- | --- |
| Task initiation | `ADHD task initiation tool`, `tool to start overwhelming tasks` | Whether DoTheThing’s use case is represented accurately and the product-proof page is discoverable. |
| Task breakdown | `best ADHD task breakdown tool`, `break a task into small steps ADHD` | Whether comparison and how-it-works pages receive impressions and qualified clicks. |
| Time awareness | `ADHD time blindness timer`, `focus aware task estimates ADHD` | Whether the product is surfaced for its actual timer and estimate workflow, not claims it does not make. |
| Tool selection | `Goblin.tools alternative`, `Goblin tools vs task breakdown app` | Whether the transparent comparison is crawled and cited accurately. |

## Measurement routine

| Signal | Where to look | Record each month |
| --- | --- | --- |
| Search impressions and clicks | Google Search Console Performance report | Query, page, country, device, impressions, clicks, CTR, and average position. |
| Crawl and indexing status | Google Search Console Pages report and URL Inspection | Index state for `/how-it-works`, `/compare/goblin-tools`, `/editorial-standards`, and `/media`; any canonical or enhancement errors. |
| Bing discovery | Bing Webmaster Tools Search Performance and URL Inspection | Query/page impressions, crawl errors, and indexed status for the same core pages. |
| Referral quality | Existing analytics dashboard | Referrer, landing page, engaged session or completed task-start event where available. Do not infer an AI recommendation from an unverified referrer. |
| Manual AI quality check | A documented, private log of representative prompts | Date, product named or not, accuracy of description, sources cited, and factual corrections needed. Do not automate prompts or create synthetic engagement. |

## Evidence log template

| Date | Surface | Query or prompt | Result | Accuracy assessment | Follow-up |
| --- | --- | --- | --- | --- | --- |
| YYYY-MM-DD | Search Console / Bing / manual AI check | Exact query | Factual observation | Accurate / incomplete / incorrect | Fix page, source, schema, or no action |

## Guardrails

> Do not buy reviews, create testimonials, seed product discussions, demand positive coverage, fabricate ratings, or claim that a model recommends DoTheThing when it does not. Correct factual errors through first-party product pages and verifiable sources instead.

Use the official Google guidance on AI-search visibility and Bing webmaster guidance as the operational baseline. [1] [2]

## References

[1]: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide "Google Search: AI features and your website"

[2]: https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a "Bing Webmaster Guidelines"
