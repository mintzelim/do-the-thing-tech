# Reported Blog URL Availability Audit

## Published-site observations

| Requested URL | Observed published-page result | Initial interpretation |
|---|---|---|
| `/blog/adhd-and-anxiety` | Renders the public DoTheThing shell with the title **“Page not found \| DoTheThing”** and body copy **“Blog post not found.”** | The requested slug is not currently in the published blog registry; this is not a robots or network block. |
| `/blog/adhd-burnout` | Renders the public DoTheThing shell with the title **“Page not found \| DoTheThing”** and body copy **“Blog post not found.”** | The requested slug is not currently in the published blog registry; this is not a robots or network block. |

The remaining requested URLs require registry, sitemap, and crawl-control comparison before deciding whether an exact canonical redirect is appropriate. No redirects should be added merely to convert a missing topic into an unrelated article.

## Registry, sitemap, and crawler-control comparison

The crawler is allowed to fetch blog URLs: `robots.txt` allows both `/blog/` and `/blog/*`, and the generated sitemap includes each exact existing article slug reported in the audit. The reported exact article URLs—such as `adhd-medication-and-productivity`, `neuroscience-task-avoidance`, `adhd-relationships`, `adhd-workplace`, `adhd-sleep`, `adhd-financial-management`, `adhd-creativity`, `free-tools-2026`, `neurodivergent-productivity-7-tactics`, `why-simpler-adhd-friendly-apps-work-better`, and `how-to-break-down-tasks-adhd`—all have matching source markdown and sitemap entries. A direct published-site check confirmed that `adhd-medication-and-productivity` renders as an article.

`/blog/adhd-burnout` is a clear legacy shorthand for the existing `/blog/adhd-burnout-recovery` article, so the application now issues a permanent redirect to that canonical article. In contrast, no existing source article or sitemap entry corresponds to `/blog/adhd-and-anxiety` or `/blog/adhd-and-emotional-dysregulation`; those requests correctly remain missing rather than being redirected to unrelated content.
