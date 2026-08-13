# Data-Presentation Option Gallery Audit

**Date:** 13 August 2026

The standalone visual reference at `docs/dothething-landing-design-system.html#data-options` now contains three selectable article data-presentation families. Browser verification confirmed one table treatment, one chart-container sample, and one bullet-list sample for each option.

| Option | Table treatment | Chart treatment | Bullet-list treatment |
|---|---|---|---|
| **01 — Quiet Ledger** | Conventional header-row table with soft dividers | Compact vertical bars with a quiet legend | Indigo check markers |
| **02 — Guided Comparison** | Action-first stacked comparison rows | Labelled horizontal progress bars | Numbered action steps |
| **03 — Field Notes** | Margin-label editorial rows | Minimal trend line with points | Lime-edged explanatory notes |

The browser reported **3 options, 3 table samples, 3 chart samples, and 3 list samples**. The gallery is strictly a design-system preview; none of the options has been applied to live article templates.

## Selected system update

The selected written system now designates **Quiet Ledger** as the sole table pattern, retains the **Focus bar** and **Guided progress** chart patterns, retains **Check bullets** and **Numbered action steps**, and renames the former Field Notes table sample to **Context Strips**. The design-system regression suite passed after the corresponding usage guidance was added to both references.

During file-protocol browser verification, Chromium retained a stale rendered document despite the source file and regression test reflecting the updated content. The source-of-truth HTML and Markdown references contain the selected labels and use criteria; a cache-bypassed reload is required for the local browser preview to display the newest revision.

## Contextual blog navigation audit

Local browser verification confirmed that the selected **Inline Trail** renders as a quiet `Home / Blog / current article` path above article headers, with the first two levels linked and the article title presented as the current location. The **AI That Breaks Down Tasks** article rendered the mapped **TOOLS & RESOURCES** eyebrow. A subsequent article titled *The Best Tools for ADHD Task Management* also rendered **TOOLS & RESOURCES**, which is correct for its underlying generated category; its title alone does not override the category-to-eyebrow mapping.

The category-specific route `/blog/how-to-break-down-tasks-adhd` then verified the other requested mapping: its generated **Task Management** category rendered the contextual **TASK MANAGEMENT** eyebrow while retaining the same selected Inline Trail semantics and styling.

After removal of the legacy visible category line, the same Task Management article was visually rechecked. Its header now renders **TASK MANAGEMENT** exactly once above the title; publication date, update date, reading time, word count, structured category metadata, and the Inline Trail remain present.
