# Quiz Design-System Reconciliation

> **Approval-only.** This exploration does not change `/quiz`, the ten-question scoring logic, navigation, footer, result calculation, or the current public copy. It proposes one cohesive DoTheThing visual language for the quiz landing page, question flow, and result view.

## Audit: why the current quiz feels separate

The current quiz is a complete but separate visual product. It uses full-bleed photographic/sky backgrounds, fixed attachments, dark overlays, `Press_Start_2P` for all reading copy, saturated purple blocks, 4px black borders, animal-character cards, emoji decoration, and a different button/shadow grammar. The approved DoTheThing system instead uses an open warm-gray canvas, the 1240px rail, Inter-led readable hierarchy, VT323 only for compact context labels, warm-white panels, quiet blue-gray outlines, restrained lavender/lime/yellow accents, and the canonical lavender mascot.

| System contract | Current quiz | Required reconciliation |
|---|---|---|
| Page canvas | Full-bleed sky/landscape image | `#f6f5f2` open canvas with measured 1240px rail |
| Reading hierarchy | Pixel font used for all text | Inter 800 headlines and Inter body; VT323 labels only |
| Surfaces | Black 4px outlines, saturated blocks | One `#fffefb` wide panel per stage; `#a8afc2` outlines; 14px/10px radii |
| Identity | Multiple animal characters and emoji | Canonical lavender mascot as guide; neutral pixel symbols where needed |
| Quiz progression | Separate full-screen game shell | Same Focus Queue / task-widget logic: visible position, one clear next choice |
| Results | “Type” reveal card | Clear “pattern snapshot” with a non-diagnostic boundary and a practical next action |

## Preserved functionality

All directions preserve the 10 questions, four answer options per question, scoring weights, result calculation, retake action, return-to-landing action, shared Navigation and Footer, and keyboard-accessible answer buttons. They make no claim that the quiz diagnoses ADHD or a clinical subtype; any future copy review should use a transparent self-reflection boundary.

## Option 01 · Focus Field — recommended

**One calm product journey.** The quiz becomes a direct sibling of the homepage task tool rather than a separate mini-game.

| Stage | Proposed composition |
|---|---|
| Landing hero | Open two-column rail: contextual VT323 eyebrow, Inter 800 title and short explanation on the left; canonical lavender mascot with a compact speech bubble on the right. No image background or hero card. |
| Seven-pattern preview | One warm-white wide panel with a concise explanation and seven quiet 10px “signal cards.” Replace the noisy animal-photo grid with short, equal cards and a single mascot guide. |
| Why take it | A single Signal Stack panel: existing three outcomes become numbered context strips, with no emoji or saturated feature cards. |
| Question flow | A contained Focus Queue: progress label and slim indigo meter at the top, one question inside an open reading area, then four large Inter answer rows. The selected state is pale indigo with an ink-blue inset rule. |
| Results | One Pattern Snapshot wide panel with result name, thoughtful explanation, retake, and one clear tool action back to `#widget`. A small visible boundary explains that it is a reflection tool, not a diagnosis. |

This is the strongest fit because it makes every stage feel like the same calm, focus-aware product experience the visitor just saw on the homepage.

## Option 02 · Pattern Field Guide

**More editorial, less application-like.** The landing page and preview sections use the appearance of a compact source-aware field guide, then transition into a simple worksheet for the questions.

| Stage | Proposed composition |
|---|---|
| Landing hero | Open editorial hero with eyebrow, Inter display title, compact subtitle, and a canonical mascot holding a guide card. |
| Seven-pattern preview | Quiet Ledger-style grouped table/cards: each label, everyday pattern, and practical note occupies one clean row. |
| Question flow | A centered worksheet panel with a “Question 03 of 10” VT323 label, an Inter question headline, and answer rows separated by blue-gray rules. |
| Results | An editorial “what this may help you notice” page with a practical first action and related learning link. |

Use this direction if the quiz should function primarily as a learning resource alongside the blog. It is calm and authoritative, but less playful than Focus Field.

## Option 03 · Gentle Questline

**The most playful system-consistent option.** The quiz uses the canonical mascot as a quiet companion across ten checkpoints, without turning the experience into a dark game screen.

| Stage | Proposed composition |
|---|---|
| Landing hero | The mascot crosses a small transparent pixel path; the rest remains the open landing canvas. |
| Seven-pattern preview | Seven compact “trail markers” with label, one-line explanation, and numbered pixel mark. |
| Question flow | Ten short, visible checkpoint markers along a thin rail; one current marker is indigo, completed markers are lavender. The question and answers retain the same warm-white Focus Queue panel. |
| Results | The mascot reaches a small flag beside a “Your reflection” panel, then offers a practical next action. |

Use this if the quiz should feel gently celebratory. It remains on-system only if the mascot stays restrained, the question interface remains Inter-led, and the animation reduces to a static state under `prefers-reduced-motion`.

## Shared implementation rules

All approved directions would use `--landing-rail: 1240px`, warm-gray page canvas, `#fffefb` panel surfaces, `#a8afc2` wide-panel borders, 14px wide-panel radius, 10px answer-card radius, and the light landing shadows. The hero stays open; no new image background, 4px black outline, all-pixel-font reading block, emoji decoration, or nested card is retained. Every choice must be focusable, have a visible focus state, provide a 44px minimum action target, and work in a one-column mobile stack.

## Recommendation

Choose **Option 01 · Focus Field**. It preserves the quiz’s useful interaction while directly borrowing the homepage’s successful focus-aware task-widget language. It will make the quiz feel like DoTheThing—not like a separate pixel-art website.
