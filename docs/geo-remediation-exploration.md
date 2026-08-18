# Remaining GEO Scanner Flags — Approval-Only Remediation Comparison

> **Status: approval only.** This document does not alter a public route, schema, visible page copy, or metadata.

## Verified current state

| Scanner flag | Evidence on the published site | Recommended handling |
|---|---|---|
| CRAWL_ERROR for `/blog/adhd-vs-autism-vs-audhd` and `/blog/uncommon-adhd-symptoms` | Both routes return HTTP 200, self-canonicalize, emit `index, follow`, appear in the sitemap, and are allowed by `robots.txt`. | **No source change.** Ask the audit tool to retry or refresh its cache. |
| About `aggregateRating` missing | No verified customer rating dataset exists. | **Do not add it.** Adding a value would be false structured data. |
| About entity clarity and offering detail | The live page names the audience, task breakdown, focus adjustment, estimates, timer, editable steps, guest access, support path, ownership, and review date. | **No visible copy change.** Existing factual content covers the signal. |
| About freshness | The footer has a factual product-information review label and relevant articles display `updatedDate`. | **No change.** The signal is already present. |
| Description quality on ADHD Sleep and Free Tools | Current live descriptions match the source excerpts exactly and have no markup noise. | Optional source-level tightening only, shown below. |

## Optional exact description refinement

The changes below affect the page description in search and AI previews only; they do not rewrite any post-hero page copy.

| Page | Current source description | Approval-only proposed description |
|---|---|---|
| About | Learn who built DoTheThing, what the tool is designed to help with, and the boundaries of its practical ADHD-friendly task workflow. | **DoTheThing is a free online task-breakdown tool for people with ADHD and executive-function friction. It turns brain dumps into actionable steps, focus-aware estimates, and editable task plans.** |
| ADHD Sleep | Explore the complex relationship between ADHD and sleep, including delayed sleep phase syndrome, racing thoughts, and practical strategies for better rest. | **ADHD and sleep guide: why delayed sleep timing, racing thoughts, and time blindness can make rest harder, plus practical, non-medical strategies to try.** |
| Free Tools 2026 | A comprehensive review of the best free tools for ADHD adults, from task management to focus aids. | **Compare 15 free ADHD-friendly tools for task planning, focus, and time management in 2026, with free-tier context, practical trade-offs, and provider-verification notes.** |

## Protected boundaries

The remediation will **not** add an `aggregateRating`, fabricate reviews, claim medical treatment or diagnosis, inject scanner diagnostic JSON, change protected visible post-hero copy, or redirect the two healthy article URLs. A selected description change will remain plain text in the existing source metadata and will be covered by source-to-SSR regression tests.

## Decision required

Choose one of the following directions.

| Direction | Outcome |
|---|---|
| **A — Evidence only** | Publish the audit evidence and request an external scan refresh. No website metadata changes. |
| **B — Tighten the three descriptions** | Apply the exact three source-level description changes above, then test and publish. |
