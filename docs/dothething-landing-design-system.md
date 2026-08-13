# DoTheThing Landing Page Design System

**Version:** Hybrid Pixel 2026  
**Applies to:** The public landing page, header, task widget, lower landing sections, cards, CTA panels, footer, and shared interaction patterns.

> **Design intent:** A calm, readable productivity space that retains a pixel-art identity without forcing pixel typography onto task-focused UI content. The system uses clean sans-serif reading text, compact pixel accents, warm off-white surfaces, thin ink-blue outlines, and mascot-only illustration.

## 1. Core Principles

| Principle | Rule in practice |
|---|---|
| **Readable first** | Use Inter for UI, body copy, card labels, and major headlines. Do not use pixel display type for dense text. |
| **Pixel identity, not pixel noise** | Reserve VT323 for eyebrows, tiny decorative labels, and occasional summary values. Keep raster art crisp with `image-rendering: pixelated`. |
| **One visible surface** | A section gets one card surface and one border. Do not nest bordered cards inside another bordered card unless the inner item is a repeatable grid item. |
| **Quiet hierarchy** | Prefer ink-blue text, warm-white cards, modest indigo actions, and soft offset shadows over black borders or saturated backgrounds. |
| **A smaller next step** | Headlines, controls, and images should lower cognitive load: clear choices, intentional spacing, and visible focus states. |

## 2. Foundation Tokens

### Color

| Token | Value | Use |
|---|---:|---|
| `--pixel-bg` | `#f6f5f2` | Main warm-gray page canvas |
| `--pixel-card-bg` | `#fffefb` | Primary cards and panels |
| `--pixel-border` | `#26364a` | Ink-blue focus borders and strong controls |
| `--pixel-text` | `#223047` | Body/UI foreground |
| `--pixel-text-light` | `#566273` | Supporting copy |
| `--pixel-accent` | `#5b5ce2` | Primary action, active states, numbered steps |
| `--pixel-accent-dark` | `#4a4bc4` | Hover/pressed action state and accent text |
| `--pixel-success` | `#78a83b` | Positive status and limited lime detail |
| `--pixel-shadow` | `rgba(38, 54, 74, 0.16)` | Subtle depth |
| `--panel-border` | `#a8afc2` | Main section/panel outline |
| `--card-border` | `#c5cada` | Repeated-card outline |
| `--heading-ink` | `#1f293b` | Hero and section heading color |

### Typography

| Role | Font | Weight | Scale / behavior |
|---|---|---:|---|
| **UI and body** | Inter, system sans-serif fallback | 400–800 | Default 16px body; supporting text uses 1.55–1.65 line-height. |
| **Hero H1** | Inter | 800 | `clamp(3.15rem, 6.2vw, 5.75rem)`, `line-height: .98`, tracking `-.055em`. |
| **Major section heading** | Inter | 800 | `clamp(2.45rem, 5vw, 4.6rem)`, shared centered 940px maximum. |
| **Card heading** | Inter | 800 | 1.2rem, `line-height: 1.15`, centered in card grids. |
| **Eyebrow / pixel accent** | VT323 | 400 | 1–1.22rem with increased letter spacing. The canonical eyebrow reads **“A SMALLER NEXT STEP”** and is used sparingly to introduce a headline or CTA. |
| **Supporting copy** | Inter | 400 | `clamp(1rem, 1.35vw, 1.14rem)`, muted ink, centered on a 720px grid where used beneath section headings. |

### Spacing and shape

| Token / pattern | Value | Use |
|---|---:|---|
| Page shell | `min(100% - 32px, 1240px)` | Desktop header, main content, and footer alignment |
| Section gap | 24px | Space between lower landing panels |
| Main panel padding | `clamp(22px, 4vw, 52px)` | Large landing cards |
| Repeated-card gap | 16px | How It Works, audience, FAQ, and content grids |
| Main panel radius | 14px | Header, task card, CTA, feature panels, footer |
| Repeated-card radius | 10px | Step cards, article cards, FAQ items |
| Control radius | 8px | Buttons, input groups, navigation actions |
| Panel shadow | `4px 4px 0 rgba(38,54,74,.1)` | Wide panels and CTA sections |
| Repeated-card shadow | `3px 4px 0 rgba(210,211,224,.65)` | Light, low-contrast card lift |

## 3. Page Composition

### Global shell

The primary desktop frame is **1240px wide** with a 16px outer inset. The header, task area, lower sections, and footer follow that same axis. On tablet and mobile, the outer inset becomes 12px or 16px, rather than squeezing desktop gutters.

### Hero

The hero uses an asymmetric two-column layout: copy on the left and the abstract lavender mascot scene on the right. The composition uses generous blank space and never puts the headline inside a bordered card. The content order becomes stacked below 860px, with the illustration placed before the copy.

### Task widget

The widget pairs a flexible task-entry card with a fixed 330px “Today’s plan” card on desktop. At widths below 860px it becomes one column. Energy and breakdown-size choices are segmented controls, not pills floating inside nested cards.

### Section headline grid

Major lower-section headings use the same Inter headline treatment as the hero. The headline itself is capped at **940px**. Its subtitle and audience supporting line sit on a **720px centered text grid**, with a 30px intentional pause between the audience subtitle and its introductory sentence.

## 4. Components

### Header

The shared header sits in the same 1240px shell as the page content, with a 16px desktop top margin. It uses a warm-white panel, a 1px `#a8afc2` outline, a 14px radius, and a soft downwards shadow. It is a **site-level navigation pattern**, not a nested content card.

| Header part | Implemented rule |
|---|---|
| **Brand** | Use the pixel-rendered DoTheThing logo at 184px wide on desktop and 148px on narrow mobile. Keep the brand control at least 48px tall. |
| **Desktop navigation** | Use quiet Inter links at 0.88rem, 42px minimum height, 8px radius, and 6px inter-link gaps. The active and hover state is pale indigo with a subtle border. |
| **Primary action** | Use the indigo header action at 44px minimum height, with a 3px indigo offset shadow. It darkens on hover without changing the navigation layout. |
| **Mobile behavior** | At 860px, replace desktop navigation with a 42px menu control and an optional task shortcut. The expanded menu is a separate 12px-radius warm-white panel beneath the header. |

### Footer

The shared footer uses the same centered 1240px shell and intentionally feels like the closing panel of the page rather than a full-bleed utility bar. It has a warm-white surface, a 1px `#a8afc2` outline, a 14px radius, and a low-contrast offset shadow. Keep the footer 24px below the main content and 16px from the viewport edge.

Footer links and controls use Inter at approximately 0.8rem. Preserve readable text contrast, visible link labels, and a clear route back into the product. At mobile widths, reduce the outer shell to a 12px inset while retaining the same panel treatment.

### Canonical eyebrow: “A SMALLER NEXT STEP”

> **“A SMALLER NEXT STEP” is the canonical eyebrow in the DoTheThing heading system.** It labels the hierarchy before the headline; it is not a second headline, a navigation item, or body copy.

Use the eyebrow immediately above a hero, section headline, or CTA title when a compact pixel-art signal helps establish the next action. Set it in VT323 at 1–1.22rem, 0.09em letter spacing, and `--pixel-accent-dark`. The hero version pairs the text with a restrained lime spark. Keep a 10–18px gap below the eyebrow before the Inter headline. Do not set sentence-length copy in the eyebrow style, repeat it mechanically before every heading, or use it to replace semantic heading levels.

### Primary and secondary buttons

| Variant | Background | Border | Text | Behavior |
|---|---|---|---|---|
| **Primary** | `#5b5ce2` | `#4a4bc4` | White | Hover darkens; lifts by 2px; 48px minimum height. |
| **Secondary** | Transparent / warm white | Accent indigo | Accent indigo | Hover uses a pale-indigo wash. |
| **Segmented option** | White | Cool gray | Ink | Active state uses pale indigo plus a 3px indigo inset base. |

Buttons use Inter at 700 weight, 0.98rem, 8px radius, and 12px × 22px padding. Do not use all-caps by default.

### Cards and panels

Main panels use a 1px panel border, 14px radius, and one offset shadow. Repeated content cards use a lighter 1px border, 10px radius, and a smaller cool-gray shadow. Avoid borders inside an already bordered wide panel unless the interior contains repeatable card items.

### How It Works cards

Five desktop cards use equal-width columns and 16px gutters. Each card uses: a 34px indigo number, a 132px × 108px transparent mascot illustration stage, a centered 1.2rem heading, and centered 0.98rem supporting copy. At 1100px the grid changes to three columns, then two below 860px, and one column at 560px.

### Audience cards

The audience section mirrors How It Works density: the same **132px × 108px** illustration stage, 1.2rem heading, 0.98rem body, 20px padding, and 437px desktop minimum height. The five supplied illustrations remain centered and use transparent backgrounds. At 1200px the final two cards are centered in a six-column grid; at 760px the grid becomes two columns, with the final card centered; at 560px it becomes one column.

### CTA panel

The CTA is a single wide 1120px panel, never a landscape card inside another section card. It has a compact transparent flag-on-island illustration left of a text block. On mobile, the panel becomes one column and centers its eyebrow, headline, supporting copy, and button.

## 5. Illustration System

Use only the approved abstract lavender mascot identity: a rounded/rectangular lavender character, dark indigo outline, square eyes, and compact pixel silhouette. Avoid human pixel art.

| Rule | Requirement |
|---|---|
| Background | Transparent PNG for card and panel art. |
| Rendering | `image-rendering: pixelated`; use `object-fit: contain`. |
| Palette | Lavender and indigo with off-white and restrained lime accents. |
| Detail | One clear metaphor per image: timer, task list, stepping stones, flag, notebook, or checklist. |
| Avoid | Beige rectangles behind assets, photographic texture, detailed backgrounds, text inside art, or a different mascot body style. |

## 6. Responsive Rules

| Breakpoint | Layout behavior |
|---:|---|
| **1200px** | Audience grid becomes six internal columns so two incomplete-row cards can be centered. |
| **1100px** | How It Works changes from five to three columns. |
| **860px** | Header switches to mobile controls; hero/task layout become single-column. |
| **768px** | CTA stacks and section heading scale reduces to `clamp(2.15rem, 10vw, 3.25rem)`. |
| **760px** | Audience cards become two columns. |
| **560px** | Header tightens; card grids become one column; section panels use 28px × 18px padding. |

## 7. Motion and Interaction

Motion should acknowledge an interaction without introducing cognitive noise. The system favors short transitions and small positional shifts rather than decorative looping animation.

| Interaction | Implemented behavior | Timing |
|---|---|---:|
| **Navigation links** | Pale-indigo background, border, and ink changes on hover or active state. | 160ms ease |
| **Hero actions** | Primary and secondary actions lift by 2px on hover; the primary action also darkens. | 140ms transform; 160ms color/background |
| **Header action** | Indigo action darkens on hover while retaining its fixed 3px offset shadow. | Short color transition; no layout movement |
| **Blog and content cards** | Cards lift by 2px and gain an accent border only when the movement reinforces clickability. | 160ms ease |
| **Press feedback** | Existing task controls move by 2px × 2px when pressed, echoing the small offset-shadow language. | Short active-state response |

Only animate `transform`, `opacity`, and color-related properties. Do not animate layout dimensions, use large parallax effects, or introduce looping decoration that competes with task completion. Keyboard-initiated navigation should remain immediate.

The global reduced-motion rule respects `prefers-reduced-motion: reduce` by reducing transition and animation durations to 0.01ms, limiting animation iterations, and restoring normal scroll behavior. Any future non-essential motion must preserve this behavior.

## 8. Accessibility and Interaction

All keyboard-reachable controls use a **3px indigo focus ring** with a 3px offset. Primary actions and mobile controls preserve a 48px minimum height. Motion is limited to short 120–160ms transitions for hover and active feedback, and is suppressed under `prefers-reduced-motion`. Use semantic headings, descriptive image alt text, and visible text labels; do not communicate state with color alone.

## 9. Do / Do Not

| Do | Do not |
|---|---|
| Keep text on the shared content center. | Mix left-aligned and centered supporting text inside a single section without a layout reason. |
| Use one clear panel surface per feature area. | Create border-within-border card stacks. |
| Use Inter for reading and actions. | Set dense UI or multi-line card copy in a pixel font. |
| Let mascot illustrations remain transparent and contained. | Add solid beige or gray image backdrops. |
| Keep controls explicit and touch-friendly. | Replace labels with ambiguous icon-only choices. |
| Center incomplete grid rows intentionally. | Leave a lonely final card visually stranded on the left. |
| Use “A SMALLER NEXT STEP” as a compact hierarchy cue. | Turn the eyebrow into a paragraph or duplicate the headline. |
| Use short hover and press feedback to confirm an action. | Use constant motion, delayed keyboard actions, or layout-shifting effects. |

## 10. Implementation Checklist

When adding a new landing section, first align its panel width to the 1240px shell, choose whether it needs one wide panel or a repeated-card grid, and apply the established Inter headline system. If the section needs an eyebrow, use the canonical “A SMALLER NEXT STEP” treatment above the headline rather than inventing a competing accent style. Use the 720px centered text grid for supporting copy that sits below a centered headline. Reuse the 14px/10px radius hierarchy, thin blue-gray outlines, and muted offset shadows. Test header, footer, and section behavior at desktop, tablet, and 560px mobile widths before publishing.

## 11. Reference Validation

The companion HTML reference was checked in a browser on 13 August 2026 at desktop width. Its token swatches, shared typography sample, header and footer demonstrations, canonical eyebrow sample, motion contract, five-card demonstration, CTA example, responsive contract, and implementation rules rendered as clear, readable panels that match the live landing-page treatment.
