# Blog Quiet Ledger Validation

## Shared renderer check — 13 August 2026

The shared markdown renderer now gives every rendered blog table the `quiet-ledger-table` class and semantic column headers. The `ADHD and Remote Work: Strategies for Success` article was used as the live representative check. Its rendered table resolves to the selected Quiet Ledger values: **Inter** in every header and body cell, a **1px `#c5cada`** outer outline, a **`#f0f1fb`** header fill, and **9px** cell padding. The wrapper preserves a 720px minimum table width with horizontal scrolling for narrow screens.

The same rendered article now resolves to **Inter** for its hero, excerpt, body copy, and Quiet Ledger cells. The previous article-level VT323 inheritance has been removed from readable content; VT323 remains limited to compact contextual eyebrow labels.

## Real-device-width hero correction — 14 August 2026

The reported 720px-width article view was measured before and after the correction. Before the fix, the implicit `blog-article-shell` grid column expanded to 762px inside a 673px reading shell, clipping the heading, metadata, byline, featured image, and mascot. The mobile shell now explicitly uses `grid-template-columns: minmax(0, 1fr)` and constrains its article child. A repeat measurement reported a 673px article shell, hero, title copy, headline, mascot, and featured image inside a 705px document with no horizontal overflow. The post-fix rendered capture confirms a fully wrapped title, contained compact mascot, readable metadata and byline, and a contained featured image.
