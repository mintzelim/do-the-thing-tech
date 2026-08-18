# DoTheThing FAQ Page — Approval-Only Exploration

> **Status: selection and content approval only.** This document does not create a public route, alter navigation, change current page copy, or emit new structured data.

## Purpose

The proposed `/faq` page gives people and crawlers one canonical location for concise, product-specific answers. It consolidates verified questions already present on the homepage, About page, Privacy page, and Editorial Standards page. It is not intended to manufacture search coverage, medical claims, reviews, ratings, or unsupported performance promises.

## Proposed visible page

The page now follows the **landing-page system exactly**, rather than borrowing a looser utility-page interpretation. It uses the shared 1240px header shell, the actual logo asset and header proportions, the open asymmetric `reference-hero-layout`, the approved abstract lavender mascot scene, the same Inter 800 hero scale and tracking, and a VT323 contextual eyebrow reading **SUPPORT & CLARITY**. The mascot uses a compact warm-white speech bubble in the established pixel treatment; its text is VT323.

The FAQ content begins below the open hero as one full-width landing `content-section`: warm-white `#fffefb`, a 1px `#a8afc2` outline, 14px radius, 7px × 8px neutral shadow, and the same `clamp(22px, 4vw, 52px)` gutters. It does **not** place a generic FAQ card inside another panel. Instead, each repeatable question is the existing compact FAQ-item pattern: `#c5cada` outline, 10px radius, no competing shadow, Inter 800 question text, and readable Inter answer text. The main reading experience remains three labelled groups—**Getting started**, **Using the tool**, and **Trust & support**—with native expandable rows.

| Design decision | Proposed approach | Reason |
|---|---|---|
| Hero | Exact landing open canvas: asymmetric copy/mascot split | Reuses the live hero’s 1240px shell, column proportions, Inter display tier, contextual eyebrow, actions, and mobile stack. |
| Reading layout | One landing wide panel with a 960px FAQ-item reading measure | Matches the home FAQ system without nesting a generic content card inside another card. |
| Answers | Short paragraphs, with helpful internal links where relevant | Gives a direct answer first and a legitimate next path second. |
| Expand/collapse | Native `<details>` rows | Accessible, keyboard-friendly, and familiar without JavaScript dependency. |
| End state | Landing-system primary and secondary actions after a thin divider | Keeps the purpose practical while using the approved 48px action treatment. |

## Proposed question set

All proposed answers are grounded in current visible site copy or published policy pages. The final page will display the exact same questions and answers that its `/faq` FAQPage structured data emits.

| Group | Proposed question | Source of truth |
|---|---|---|
| Getting started | What is DoTheThing? | Shared public product description and homepage FAQPage schema |
| Getting started | Is DoTheThing free? | Homepage FAQ and product description |
| Getting started | Do I need an account? | Homepage FAQ and product description |
| Getting started | Can I use it for a brain dump? | Homepage FAQ |
| Using the tool | What does the focus-level setting do? | Homepage FAQ and About workflow |
| Using the tool | What is the difference between Tiny Steps, Balanced, and Big Milestones? | Homepage FAQ and About workflow |
| Using the tool | Can I edit a task breakdown? | About product-feature section |
| Using the tool | What kinds of tasks can I use it for? | Homepage FAQ |
| Trust & support | Is DoTheThing medical advice or an ADHD diagnosis tool? | About page and editorial boundaries |
| Trust & support | Where are my tasks stored? | Privacy Policy |
| Trust & support | Where can I read the editorial standards? | Editorial Standards page |
| Trust & support | How can I contact DoTheThing? | Contact page and support email |

## Approved content boundaries

The page will not claim a clinical outcome, individual diagnosis, medical treatment, user rating, number of customers, data-security guarantee, or a comparison result that the public site cannot substantiate. The privacy answer will link to the policy and retain its exact current boundary that task data is stored locally in the browser. The medical-boundary answer will direct people with clinical questions to qualified care rather than presenting a productivity tool as treatment.

## Proposed technical integration after approval

| Area | Change after approval |
|---|---|
| Route | Add the public `/faq` route before the fallback route. |
| Rendering | Add an SSR title, meta description, canonical URL, WebPage graph, SoftwareApplication graph, and page-specific FAQPage graph. |
| Duplicate markup | Keep homepage visible FAQ copy unchanged, but make `/faq` the canonical location for the shared product FAQPage schema to avoid duplicate question markup across page types. |
| Navigation | Add **FAQ** only to the footer’s **TRUST** group; do not crowd the existing top navigation. |
| Discovery | Add `/faq` to the sitemap and make the page reachable through the footer. |
| Quality control | Add route, metadata, FAQ-schema parity, sitemap, footer-link, accessibility, and responsive regression coverage. |

## Approval request

If this direction is approved, I will build it exactly as the accompanying visual exploration shows: an open hero, one non-nested reading rail, three labelled FAQ groups, native expandable rows, and a compact support close. No homepage or blog copy will be rewritten.

## Visual reconciliation check

The revised exploration was visually checked at desktop width after reconciliation. It now uses the landing header proportions and action treatment, the open hero’s existing left-copy/right-mascot composition, the live `#fffefb` wide-panel geometry with `#a8afc2` outline and 7px × 8px neutral shadow, the same centered Inter 800 section-heading tier, `#c5cada` compact FAQ rows with 10px corners, and the landing mobile stack behavior. The former dark exploration banner, substitute navigation shell, dashed hero note, and generic 900px card were removed because they were not part of the approved landing system.

## Implementation visual check

The first development render confirmed the page content, route, footer discovery link, and wording. It also showed that the FAQ route was loading the landing reconciliation’s proof-bubble positioning rule but not the base hero visual geometry rule: browser inspection measured a block-level, unconstrained mascot stage instead of the landing hero’s flex-centred contained stage. The production implementation now explicitly defines the FAQ-scoped stage geometry before final desktop and mobile verification. The same inspection showed that the shared navigation’s base header geometry was absent from this route during direct development rendering, so the page also needs an exact scoped fallback for the existing header shell rather than a new header design.

The corrected development render now measures the expected 184px pixel logo, a constrained 406px mascot stage with 300px minimum height, and a contained 406px-wide mascot image inside the desktop hero column. The header shell is restored to the shared 1240px rail with its existing relative placement. This is the same landing-system composition, not a separate FAQ header or mascot treatment.

A 390px-wide mobile render was also checked. It uses the shared compact header and menu control, places the mascot stage above the copy as the landing system requires, keeps the **ASK AWAY.** speech bubble clear of the mascot, preserves the Inter 800 heading hierarchy, and stacks the two 48px actions without crowding the page edge.
