# Google Growth and AdSense Readiness Audit

## Account baseline — 24 August 2026

The signed-in Google account has owner access to the `sc-domain:dothething.tech` Search Console property. Search Console shows **19 indexed pages** and **24 non-indexed pages**. The primary open indexing issue is **20 pages crawled but currently not indexed**; Google also reports three page-with-redirect URLs and one redirect error. The submitted `https://dothething.tech/sitemap.xml` is successful, but its most recent read is **8 May 2026** and it reports **28 discovered pages**, which is older than the current 42-URL sitemap.

Google Analytics is active for the property behind measurement ID `G-7GSBSS1DMV`. Its 7-day home report showed 121 active users, 167 views, 119 first visits, and **0 key events**. This confirms collection is live but no business-conversion events have been configured yet.

## Technical tags observed

The site already loads GTM container `GTM-576H3JGG`, GA4 measurement ID `G-7GSBSS1DMV`, and the AdSense account declaration `ca-pub-1282191245289713`. The next audit step is to inspect the Tag Manager container and AdSense Sites status, then design an event plan before changing any account configuration.

## AdSense status

The AdSense account is active but not yet activated for earnings: AdSense reports that payment information and a site connection are still required. The `dothething.tech` site is listed as **Needs attention** with status detail **Low value content** and `ads.txt` status **Not found**. The last site-status update shown was 19 July 2026.

This status means that adding more ad tags will not resolve the application result. The immediate technical remediation is to publish a valid `ads.txt` file for publisher ID `ca-pub-1282191245289713`. The parallel content and site-quality remediation needs to make the original editorial value, human oversight, author accountability, accessible navigation, and substantive product usefulness clearer before an AdSense review is requested again.

**Update:** the public `https://dothething.tech/ads.txt` endpoint currently returns the correct AdSense record, `google.com, pub-1282191245289713, DIRECT, f08c47fec0942fa0`. The AdSense dashboard has not reflected this yet, so its **Check for updates** control should be used only after the technical and content-readiness work is complete. Google notes that status changes can take several days, or longer for sites with few ad requests.

## Measurement finding

Analytics collection is working, but the property reports **0 key events**. The implementation needs a small, explicit event taxonomy focused on meaningful product actions—such as completed task breakdowns, task check-offs, timer starts, quiz completions, and outbound guide actions—rather than inflated click tracking.

The public privacy policy and terms are present and indexable, and `robots.txt` allows the public site and declares the sitemap. However, the privacy notice does not yet describe the existing Google Analytics, Tag Manager, AdSense, advertising cookies, or consent choices. No explicit application-level data-layer event dispatches were found in the frontend source, so product-action measurement will require an approved implementation rather than only Tag Manager configuration.

## Recommended next implementation

| Priority | Change | Why it matters | Approval or account action required |
| --- | --- | --- | --- |
| 1 | Keep the verified `ads.txt` record live and use AdSense **Check for updates** after publication validation | Resolves the stale “Not found” read; it does not by itself resolve the low-value-content decision. | User confirmation before the AdSense-side check. |
| 2 | Update the privacy notice and implement a consent-aware Google tag approach | The site already loads GA4, GTM, and AdSense. Visitors should be told about these services and given a relevant choice where required. | User decision on personalised advertising and the consent approach. |
| 3 | Add a small product-event layer: `task_breakdown_completed`, `task_completed`, `timer_started`, `quiz_completed`, and `guide_opened` | Measures meaningful actions instead of vanity clicks. Event payloads must never include raw task text, quiz answers, diagnoses, or other potentially sensitive user input. | User approval for the event set and which one becomes the primary GA4 key event. |
| 4 | Improve the first-party value case before requesting another AdSense review | The active AdSense blocker is “Low value content,” not an absent tag. Prioritize distinct, reviewed guide content, explicit author and editorial accountability, practical tool outcomes, and a refreshed sitemap/indexing cadence. | User approval for any content or information-architecture changes; user confirmation before requesting a new AdSense review. |
| 5 | Resubmit or refresh the sitemap in Search Console after the current 42-URL sitemap is published | Search Console last read the sitemap in May and currently reports only 28 discovered pages. | User confirmation before the Search Console submission. |

## Proposed GA4 event contract

| Event | Trigger | Safe parameters | Recommended key event? |
| --- | --- | --- | --- |
| `task_breakdown_completed` | A task-breakdown response successfully reaches the Current Tasks view | `input_mode`, `step_count_bucket`, `focus_level` | Yes — primary product-value signal |
| `task_completed` | A user checks off a task | `task_position_bucket`, `session_task_count_bucket` | No |
| `timer_started` | A visible task timer starts | `timer_source` | No |
| `quiz_completed` | A user reaches a quiz result | `result_key` only | Optional — learning-path engagement |
| `guide_opened` | A user follows an internal learning-guide link | `guide_slug`, `source_section` | No |

No event should transmit raw brain-dump text, task names, quiz-answer text, or medical/health inference data. Google’s event guidance supports custom and recommended events, while Analytics key events should be configured deliberately rather than by marking general page views as conversions.[1][2]

## References

[1]: https://developers.google.com/analytics/devguides/collection/ga4/reference/events "Google Analytics — Recommended events"
[2]: https://support.google.com/analytics/answer/12844695?hl=en "Google Analytics — Create or modify key events"
[3]: https://support.google.com/adsense/answer/12171612?hl=en "Google AdSense — Ads.txt guide"

## Account actions completed — 24 August 2026

The refreshed `https://dothething.tech/sitemap.xml` was submitted in the verified Search Console domain property. Google accepted it successfully on 24 August 2026 and now reports **42 discovered pages**. No URL-removal or manual indexing action was used.

AdSense still shows the site as **Needs attention** for **Low value content**, despite the valid public `ads.txt` file. The account’s site-detail view did not expose a standalone **Check for updates** action; it exposes only site ownership, the active policy violation, and a **Request review** control. No confirmation checkbox was selected and no AdSense content review was requested. The ads.txt status must therefore be allowed to refresh automatically or be revisited once the content-quality remediation is genuinely complete.

GA4 now has `task_breakdown_completed` configured as a **key event**. It uses the direct, code-based event name implemented on the site, has no default monetary value, and counts once per event. The configuration is ready to receive the new privacy-safe events as visitors use the task-breakdown flow; the GA4 Events view will initially show no stream data until it receives its first production event.
