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

### Canonical mascot identity

The lavender creature is a **single, fixed character**, not a loose illustration style. Keep its compact rounded-rectangle silhouette, two navy square eyes, minimal friendly expression, lavender front plane, deep navy-purple side/shadow planes, dark navy pixel outline, and restrained upper-left highlight exactly consistent with the approved audience and editorial references. Reuse an approved asset whenever possible. Do not humanize, recolor, redraw, smooth, change the facial language, or alter the mascot’s proportions for a new situation. Props and speech bubbles may vary; the character must not.

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
| **Eyebrow / pixel accent** | VT323 | 400 | 1–1.22rem with increased letter spacing. This is a **styling pattern, not fixed copy**; use a short context label such as **“TOOLS & RESOURCES”**, **“BEHIND THE TOOL”**, or **“READY WHEN YOU ARE.”** |
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

The selected input cue is **Option 01 · Corner Burst**: a compact yellow **“BRAIN DUMP HERE!”** sticker placed on the upper-right edge of the textarea. It is the only yellow exception in the widget and follows the system’s own 2px ink-blue border, 2px ink-blue offset shadow, restrained six-degree rotation, Inter 800 text, 4px control radius, and 10px desktop inset. The sticker is decorative (`aria-hidden`, non-interactive) and must never cover the placeholder, focus indicator, or typing surface. At 560px and below, reduce its size and inset without moving it into the text field.

### Learning paths

The selected **Option 01 · Mascot Wayfinder** treats each of the three learning paths as one full-card link. Keep each card clean: show only its problem title, short description, number, and directional arrow. Each card links directly to its first recommended article so visitors can simply begin there; do not show blog-title lists inside the route card. Use one transparent mascot guide beside the group, a single warm-white Wayfinder field, equal route cards, keyboard-visible group feedback, and a one-column mobile stack.

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

### Contextual eyebrow pattern

> **The DoTheThing eyebrow is a reusable VT323 hierarchy treatment—not a fixed “A SMALLER NEXT STEP” label.** It introduces a headline with context-specific copy; it is not a second headline, a navigation item, or body copy.

Use the eyebrow immediately above a hero, section headline, or CTA title when a compact pixel-art signal helps establish context. Set it in VT323 at 1–1.22rem, 0.09em letter spacing, and `--pixel-accent-dark`. The hero version may pair the copy with a restrained lime spark. Keep a 10–18px gap below it before the Inter headline. Examples include **“TOOLS & RESOURCES”** for an article, **“BEHIND THE TOOL”** for creator context, and **“READY WHEN YOU ARE”** for a CTA. **“A SMALLER NEXT STEP”** remains an optional homepage message, not a required repeated label.

On an individual blog article, derive the eyebrow from the article’s category so the styling supplies hierarchy while the copy supplies topical context.

| Article category | Article eyebrow |
|---|---|
| ADHD / ADHD Basics | **ADHD BASICS** |
| ADHD at Work | **ADHD AT WORK** |
| Daily Life | **DAILY LIFE** |
| Daily Routines | **DAILY ROUTINES** |
| Emotional Wellbeing | **EMOTIONAL WELLBEING** |
| Psychology | **ADHD & PSYCHOLOGY** |
| Task Management | **TASK MANAGEMENT** |
| Tools & Resources | **TOOLS & RESOURCES** |

If a new category has no explicit mapping, use its trimmed uppercase category name. Never replace the semantic category metadata or structured data; the eyebrow is a supplementary visual label.

### Breadcrumbs

Breadcrumbs appear on article pages to show the reader’s location and to provide a low-friction route back to the guide index. They use Inter, semantic navigation with an `aria-label`, visible text links, and a non-linked current-page label. Use them once, directly above the article header; do not repeat the current title elsewhere in the breadcrumb.

| Proposal | Visual treatment | Best use |
|---|---|---|
| **Inline Trail** | Quiet text path with slim slash separators, no surface or border. | Long article titles and content-led pages where the trail should remain visually recessive. |
| **Segmented Trail** | Each navigable level is a small warm-white outlined control; the current title remains plain text. | Shorter guide routes where the navigation itself benefits from a little more touch clarity. |
| **Return Path** | A compact “Back to Blog” action paired with a small current-location line. | Mobile-first articles or a deep guide series where returning to the index is the reader’s main navigation need. |

At mobile widths, preserve the Home and Blog links, truncate only the current label, and keep at least a 44px target for any standalone return control. The breadcrumb never becomes a page heading or a filter control.

### Primary and secondary buttons

| Variant | Background | Border | Text | Behavior |
|---|---|---|---|---|
| **Primary** | `#5b5ce2` | `#4a4bc4` | White | Hover darkens; lifts by 2px; 48px minimum height. |
| **Secondary** | Transparent / warm white | Accent indigo | Accent indigo | Hover uses a pale-indigo wash. |
| **Segmented option** | White | Cool gray | Ink | Active state uses pale indigo plus a 3px indigo inset base. |

Buttons use Inter at 700 weight, 0.98rem, 8px radius, and 12px × 22px padding. Do not use all-caps by default.

### Cards and panels

Main panels use a 1px panel border, 14px radius, and one offset shadow. Repeated content cards use a lighter 1px border, 10px radius, and a smaller cool-gray shadow. Avoid borders inside an already bordered wide panel unless the interior contains repeatable card items.

### Landing-page creator section options

The landing-page “Built by Someone Who Gets It” section has three **selection-only** layout directions in the visual design-system reference. Each direction preserves the existing landing-page copy, the creator route, lived-experience context, sourced-research context, and lavender mascot constraint. A selection changes composition and motion only; it must not rewrite or shorten the existing landing-page claims.

**Selected implementation: Empathy Switchboard.** The landing-page creator section now uses the three visible input rows for lived experience, product practice, and research/interviews. The existing **“Built by Someone Who Gets It”** headline, two supporting paragraphs, creator route, and mascot image remain unchanged.

| Option | Layout logic | Appropriate use |
|---|---|---|
| **Origin Arcade** | A three-stage vertical signal rail—Friction, Lived, Built—leads into one generous narrative column and three proof signals. | The lived-to-built arc should feel playful, but the biography needs first priority. |
| **Empathy Switchboard** | Three connected, non-functional visual inputs represent lived experience, product practice, and research alongside the creator narrative. | The section should clearly show that product decisions come from several real sources, not one generic claim. |
| **The Origin Quest Log** | A compact numbered route frames the creator narrative as friction, learning, and a practical tool. | The personal story needs an energetic, memorable rhythm without human illustration or an over-carded layout. |

For all three options, hover or keyboard focus may move the mascot only with a restrained transform over 180ms. The interaction is decorative and cannot conceal copy or change navigation. On narrow screens, each option becomes a linear reading sequence and respects `prefers-reduced-motion`.

### Figma-informed card library

The Figma-informed card library is a **selection-only reference board**, not a live-site component set. Its layout geometry follows the supplied source board rather than the public site’s normal responsive card grid: every preview uses a fixed **540px frame**, neighbouring source columns have a **36px gutter**, and the board retains five columns on wide screens. On narrower screens, provide horizontal scrolling rather than compressing a source card into a new proportion.

Each card retains its own source-derived rhythm. Do not standardise them to one shared inset or height. The board includes a large centred callout, shallow identity and time-rail rows, a two-by-two visual quartet, a progress note, a media-plus-metadata frame, a numbered editorial rail, a fact matrix with an overlapping mascot, a tag-rail utility, and a paced editorial note. Use only DoTheThing’s colour, font, border, and mascot conventions as the styling layer; the measured frame, gutter, alignment rails, and vertical sequencing are structural constraints.

### Content modules: illustrated and image-free

Use the existing **illustrated card** when the transparent purple mascot or another approved image makes a concept easier to understand. Do not leave an empty illustration stage in a text-first module. For information that works without an image, two image-free systems are approved and should be applied by content purpose—not mixed arbitrarily inside the same group.

| System | Selected use | Treatment | Avoid when |
|---|---|---|---|
| **Illustrated card** | A concept needs a mascot or visual analogy to be clearer. | One compact transparent illustration stage above the title, then centered or left-aligned copy as the section requires. | The illustration is decorative only or the content is a long factual list. |
| **Pixel Post-It** | A short reframe, lived-experience note, definition, or helpful reminder. | One warm-white folded-corner note with an ink outline and a quiet lavender offset shadow. Use it as a single emphasis moment, not a grid. | There are multiple equal-priority statements, lengthy source material, or a need for an action sequence. |
| **Quest Ticket** | An action prompt, task step, tool capability, or small useful challenge. | A compact indigo ticket marker, dashed stub divider, and readable Inter copy. Use a consistent ticket grid for one action-oriented group. | Content is legal, clinical, heavily sourced, or merely descriptive rather than actionable. |

Pixel Post-It may carry a slight static rotation for a friendly note-like quality. Quest Ticket uses numbered circles only to reinforce a collection of capabilities or actions, not to imply a required order unless the surrounding heading says so. Both systems stack to one column on narrow screens and preserve visible text-first hierarchy.

### Group interaction: Focus Fan

**Focus Fan** is the selected interaction for a group of exactly six closely related cards, such as the six DoTheThing product capabilities. The default state is a stable, fully readable three-by-two grid. On pointer hover or keyboard focus of the group, the six cards open outward as a small fan over 180ms, using only transform and border/shadow feedback. The interaction should clarify that the six cards form one useful set; it must not hide labels, require pointer precision, or imply that a card has been activated.

Do not use Focus Fan for fewer than six cards, for unrelated content, or for groups that already have individual hover interactions. At narrow widths and whenever reduced motion is requested, retain the same static, readable grid with no transform effect.

### Alternate public-page rhythm

Public authority and resource pages may alternate **three approved compositional modes** to create hierarchy without abandoning the calm landing system. The variation comes from proportion, alignment, and intentional row balancing—not additional color treatments. Use the same warm-white panel surface, ink outline, and quiet shadow where a panel is appropriate.

| Pattern | Surface and layout | Appropriate use |
|---|---|---|
| **Editorial split** | One warm-white panel pairs a transparent mascot illustration with a text block. Alternate the illustration from left to right between successive content areas while retaining the 14px panel radius, one 1px outline, and one low-contrast shadow. | Mission, audience, or creator context where a structural reset helps the reader move through longer authority content. |
| **Canvas card field** | The outer section stays transparent on the warm-gray canvas; repeated white cards become the only visible surfaces. Incomplete rows are centered deliberately. | A short collection of challenges, principles, or steps that benefits from a scannable grid. |
| **Wide editorial panel** | A single warm-white panel uses an asymmetric text-and-mascot header, followed by a deliberately paced grid when repeatable features are needed. It does not add a second enclosing surface or a new page color. | Product differentiation, a key value proposition, or a decisive CTA. |

Keep these layouts concise, retain the same 14px radius and 1px ink outline, and preserve the short transform/color interaction rules. At mobile widths, every split stacks to one column and the card field becomes a single column.

### How It Works cards

Five desktop cards use equal-width columns and 16px gutters. Each card uses: a 34px indigo number, a 132px × 108px transparent mascot illustration stage, a centered 1.2rem heading, and centered 0.98rem supporting copy. At 1100px the grid changes to three columns, then two below 860px, and one column at 560px.

### Audience cards

The audience section mirrors How It Works density: the same **132px × 108px** illustration stage, 1.2rem heading, and 0.98rem body. To keep the Little Worlds scenes lively rather than vertically stretched, desktop cards use a **360px minimum height**, a 16px frame, and a 116px scene stage. The supplied illustrations remain centered and use transparent backgrounds. At 1200px the final two cards are centered in a six-column grid; at 760px the grid becomes two columns, with the final card centered; at 560px it becomes one column and retains its compact, content-led mobile height.

### Initiation Problem: Signal Stack

**Signal Stack** is the selected treatment for the “Built for the Initiation Problem” section. It keeps one wide, warm-white editorial panel. The existing eyebrow, Inter display heading, and three explanatory paragraphs remain in the left reading column; all six product capabilities become a numbered set of Context Strips on the right. The **Free · No Login** statement remains the sixth strip, using the exact same scan-first styling as the first five capabilities. A single lightweight Pixel Post-It beneath the explanatory copy carries the encouragement: “You can start and you can finish!”

The Signal Stack is appropriate when explanatory product copy needs priority and the supporting capabilities should be quick to scan. Use Inter for all capability text, VT323 only for the compact `01–06` labels, thin blue-gray separators between strips, and one small lavender-shadowed Post-It in the editorial column. On screens below 900px, stack the reading column above the strip list. The original feature statements remain unchanged; the Post-It adds one concise encouragement rather than replacing a capability.

### CTA panel

The CTA is a single wide 1120px panel, never a landscape card inside another section card. It has a compact transparent flag-on-island illustration left of a text block. On mobile, the panel becomes one column and centers its eyebrow, headline, supporting copy, and button.

### Article data presentation

Use the selected components below to make evidence and practical guidance easier to scan without making an educational article feel like a dashboard. **Quiet Ledger is the only table system.** The other patterns are deliberately named as chart, list, or editorial components rather than tables.

| Component | Use it when | Do not use it when |
|---|---|---|
| **Quiet Ledger table** | The reader needs to compare two or more consistent variables across short rows, such as a method, its benefit, and its limitation. Keep a real semantic table, a visible header row, and concise cells. | The content is a narrative sequence, a decision path, or has uneven prose-heavy cells. |
| **Focus bar chart** | Comparing a small number of discrete values or categories with the same unit. Use a visible legend and a short caption that states the measure and time frame. | The reader needs to understand an order of actions, a part-to-whole relationship, or an unquantified idea. |
| **Guided progress chart** | Showing a bounded progression through labelled stages, such as start, focus, and reset. Labels must remain visible; the bars do not replace written explanation. | The bar lengths could be read as precise data without a defensible scale. |
| **Check bullets** | A parallel set of tips, signs, or self-checks where order does not matter. Keep each point to one clear idea. | The reader must complete actions in sequence. |
| **Numbered action steps** | A process, routine, or troubleshooting sequence where the order materially changes the outcome. | The list is a collection of interchangeable suggestions. |
| **Context strips** | A short editorial orientation pattern such as **Now / Next / Later**, **Notice / Test / Keep**, or a definition with an adjacent practical implication. It is a non-tabular component. | Comparing repeated values, presenting numeric data, or claiming a ranked result. |

All data components use Inter for reading, thin blue-gray outlines, the restrained indigo/lime palette, visible headings, and normal document flow. On narrow screens, tables stay horizontally scrollable rather than compressing text beyond readability; chart and list components stack as ordinary document blocks.

### Current Tasks: Focus Queue

The selected post–brain-dump state is **Focus Queue**: one calm linear task list led by a single, clickable time-and-progress summary. It is a task-management view, not a dashboard. Preserve the existing task order, checkbox, editable estimate, edit and delete controls, drag behavior, timer behavior, and add-task function; the design system changes hierarchy and presentation only.

| Element | Focus Queue rule |
|---|---|
| **Page header** | Use a context-specific VT323 eyebrow, **“YOUR FOCUS QUEUE,”** above an Inter 800 display heading, **“CURRENT TASKS.”** The eyebrow supplies context; the heading supplies the page name. |
| **Back control** | Use the secondary action style: 44px minimum height, 8px radius, thin indigo border, transparent/warm-white surface, and a left arrow with the visible **BACK** label. Do not use a detached pixel-only button. |
| **Summary bridge** | Place one pale-indigo 14px summary panel below the header. It contains the timer state, a large VT323 time value, a visible start/stop cue, and progress. The full panel is the timer control. |
| **Task row** | Use one repeated warm-white 10px card per task. The drag grip, checkbox, and Inter task title share the first grid row, with tops aligned within 2px. Description and time/edit/delete controls sit beneath inside the title column. |
| **Task controls** | Use compact Inter controls: a readable numeric duration input with the visible **MIN** label, indigo **EDIT**, and a restrained red outlined **DELETE** action. Preserve explicit text labels. |
| **Add Task utility** | Use a full-width transparent dashed control with a visible plus and **ADD TASK** label. It is a utility action, not a primary CTA; use pale indigo only on hover. |
| **Pro Tip** | Use one quiet warm-white 10px inline card above the header. Keep its close control, explicit pinning guidance, and compact disk indicator. |

At 700px, reduce the outer shell to a 12px inset while preserving the summary and one-column card queue. At 520px, stack the header controls, retain the shared drag-grip/checkbox/title row, and let the compact task controls wrap without losing their labels.

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
