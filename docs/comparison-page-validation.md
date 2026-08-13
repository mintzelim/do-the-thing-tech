# Comparison Page Design-System Validation

## Desktop review — 13 August 2026

The DoTheThing versus Goblin.tools page now renders its hero and section headings in **Inter** rather than the legacy pixel display face. The contextual eyebrow remains a compact pixel-art signal, the hero uses a single warm-white editorial panel with a transparent approved mascot, and the comparison table uses a semantic, horizontally scrollable Quiet Ledger treatment with a pale-indigo header and thin separators.

The evidence-led copy, primary-source links, screenshot attribution, and neutral tool-fit guidance remain present. The remaining validation checks are the narrow-screen table scroll, keyboard focus, full regression suite, and production build.

The desktop comparison view shows two equal-width screenshot cards with contained images, readable captions, 16px card gutters, and one card surface per screenshot. The semantic Quiet Ledger contains five preserved comparison rows and retains its pale-indigo header, aligned text columns, and thin row separators.

Final rendered-token check confirms the approved roles: the canvas is `#f6f5f2`, the hero is `#fffefb`, headings are `#1f293b`, supporting copy is `#566273`, contextual eyebrows are VT323 in `#4a4bc4`, body/table content is Inter, the Quiet Ledger header is `#f0f1fb`, and the primary action is `#5b5ce2`.

After matching the selected visual reference, the live comparison table computes to the required 1px `#c5cada` outline, 8px radius, 0.78rem table font size, and 9px cell padding. Its semantic wrapper still retains the 720px minimum table width for narrow-screen horizontal scrolling.

Following the visual correction request, the reference-aligned table now uses the explicit dark ink `#26364a` outer outline. A full cell check confirms that every table header, row heading, and body cell resolves to Inter; no table cell inherits VT323. The live header fill is `#f0f1fb` and cell padding remains 9px.

The visual design-system source was then rechecked. Its selected Quiet Ledger border uses `var(--card-border)`, which resolves to `#c5cada`, not dark ink. The live comparison table was restored to that exact 1px `#c5cada` outline. Its computed cells all remain Inter, its header remains `#f0f1fb`, and its cell padding remains 9px.
