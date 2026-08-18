# Pro Tip Panel Exploration

> **Approval-only.** These three directions explore the homepage side-panel treatment for the existing pin-tab guidance. The current live panel and its functional close action remain unchanged until a direction is selected.

## Fixed content and behavior

Every direction retains the exact selected text: **“Pro Tip: Pin this tab so I stay safe while you work!”**, **“Pin this tab to keep your tasks close. Check off steps and keep track as you go!”**, and the **“GOT IT”** dismissal. The component remains a single side-rail unit next to the task widget, not a card nested within another card. The close affordance remains available, and body copy stays in Inter.

## Option 01 · Pixel Post-It — recommended

A single Pixel Post-It becomes the panel itself. It now reuses the exact approved component treatment from the landing design system: `#fff8bf` surface, `1px solid var(--border)`, `8px` radius, `4px 4px 0 #d9c6f4` shadow, `-1.1deg` rotation, compact VT323 label, and Inter reading copy. The current disk glyph acts as a compact utility stamp; no new pin, outline colour, or shadow treatment is introduced.

Use this when the tip should feel **warm, optional, and encouraging** rather than like a product feature. This is the strongest fit for the current one-off reminder.

## Option 02 · Tab Checkpoint

A calm warm-white note with an indigo top rail and a miniature pixel browser-tab edge. The icon, title, instruction, and action sit on an editorial grid, while a small `KEEP THIS OPEN` stamp supplies personality without relying on a Post-It surface.

Use this when the tip should feel like a **product helper** and remain closest to the existing panel foundation.

## Option 03 · Saved for Later

The side rail becomes an open composition: a lavender utility tag on the left and one narrow warm-white instruction sheet on the right, held together by a small lime bookmark tab. This creates more visual rhythm while preserving a single semantic panel.

Use this when the tip should feel like a **small piece of useful desk stationery** rather than a notification card.

## Shared constraints

All options use the landing rail, the quiet blue-gray `#a8afc2` or `#c5cada` outlines where appropriate, Inter for all reading copy, and VT323 only for the compact label. They retain one visible surface per tip, use a touch-safe `GOT IT` button, stack naturally on narrow screens, and remove decorative transforms under `prefers-reduced-motion`.
