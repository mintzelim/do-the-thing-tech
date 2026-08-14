# Landing Page System Audit

This audit records the structural issues observed in the desktop landing capture before the page-wide consistency pass. The goal is to preserve DoTheThing’s clean pixel-art character while consolidating its layout rails, typography, panel logic, and spacing.

| Area | Verified observation | Reconciliation direction |
|---|---|---|
| Header and hero | Both use the 1240px outer rail successfully, but the hero content begins on a secondary 12px left inset while the header’s content uses a 20px inset. | Retain the hero’s open composition, but use one intentional 16–20px inner offset for its copy and visual columns. |
| Task widget | The primary task surface and the Pro Tip share a clear border, 14px radius, and soft offset shadow. Their 24px inter-panel gap reads as a useful reference rhythm. | Treat this as the primary wide-panel contract: 1240px rail, 14px radius, 1px muted-blue border, and 7px × 8px soft neutral shadow. |
| How It Works | The section intentionally sits on the canvas, which gives welcome variety, but its five cards use stronger 3px/4px dark shadows and a narrower 10px card radius. | Keep it canvas-led, but make its card radius and shadow a deliberate compact-card variant rather than an unrelated treatment. |
| Typography | The hero headline is a strong Inter 800 expression. The How It Works heading follows the same family, but the step cards use a large amount of forced center alignment and inconsistent title wrapping. | Retain the hero heading scale, establish one section-heading scale, and reserve centered text for section intros and compact informational cards. |

## Working system contract

The landing page will use one **outer rail** of 1240px maximum with 24px narrow-screen clearance. It will have two surface roles rather than one generic card: **wide panels** use `#fffefb`, `#a8afc2`, a 14px radius, and the 7px × 8px neutral shadow; **compact cards** use `#fffefb`, `#c5cada`, a 10px radius, and the smaller 3px × 4px neutral shadow. Open canvas sections remain borderless only where the composition benefits from breathing room, such as the hero and How It Works header.

> The visual system should derive variation from composition—editorial split, signal stack, wayfinder, and mascot scenes—not from competing border, radius, type, or shadow rules.

## Additional observed inconsistencies

| Area | Verified observation | Reconciliation direction |
|---|---|---|
| First CTA | The flag CTA uses the wide-panel rail well, but its 4px × 4px dark shadow differs from the task widget’s 7px × 8px neutral shadow. | Keep the flag CTA as the visual transition, but adopt the same wide-panel border and neutral shadow token. |
| Initiation panel | Its content structure is effective, but the panel has its own 1120px width and a tighter dark shadow. Its heading is notably smaller than other major headings. | Standardise it to the wide-panel rail while retaining its editorial split, signal-stack rows, and one off-angle post-it. Use the section heading scale with a narrower measure. |
| Audience panel | The audience section is a lavender whole-panel exception. Its heading is substantially larger than the nearby panel headings, and its subtitle appears in a darker/stronger weight than normal body text. | Retain the lavender section as a themed emphasis panel, but use the shared wide-panel width, title scale, subtitle weight, and compact-card treatment. |
| Compact cards | The audience cards have the correct narrative variation through their micro-scenes, but the combination of tall frames, centered copy, and varied title line counts creates uneven visual weight. | Keep the micro-scenes. Harmonise compact-card padding, title measure, body size, and minimum heights so the five cards read as one intentional set. |

| Area | Verified observation | Reconciliation direction |
|---|---|---|
| FAQ | The FAQ is a strong, readable wide panel with a comfortable interior rail, but it has the same large headline scale as the audience section despite being a denser utility section. Individual answers use a compact-card shadow that is visually strong when repeated seven times. | Keep the FAQ wide surface and readable question rows. Step its heading down one level and reduce each FAQ row to an outline-only utility item; this creates density without a stack of competing shadows. |
| Creator section | The selected Switchboard has useful personality, but its lavender surface, diagonal background split, dashed divider, oversized headline, and large unused art area introduce too many competing systems. | Retain the switchboard’s three inputs and mascot situation, but conform it to the wide-panel frame and heading scale. Replace the dashed divider with spacing and a subtle art backdrop; preserve lavender as a contained accent, not the whole surface. |

The audit confirms that the strongest recurring problem is not the brand vocabulary itself; it is **several valid component patterns being treated as separate foundations**. The implementation pass will make wide panels share one footprint, let compact content components share one quiet treatment, and use color, layout, and mascot scenes for the page’s variety.

| Area | Verified observation | Reconciliation direction |
|---|---|---|
| Wayfinder | The route-card structure is clear and the mascot guide adds personality, but the interior shell introduces a second large bordered surface inside an already bordered outer section. | Keep the mascot guide and three paths, but remove the redundant outer section frame or make the wayfinder itself the one visible wide surface. Use quiet outline-only route cards inside it. |
| Featured posts | The lavender panel repeats the audience section’s large headline and uses compact-card shadows across a two-column editorial grid. The final odd card leaves an avoidable empty column. | Retain a lavender editorial field as a varied surface role. Use a stable 2+2+1 centered grid, reduce the heading scale, and use outline-only post cards with a stronger hover state rather than repeated static shadows. |
| Final CTA | The explicit inner warm-white surface is visible, but it still reads as a standalone system because its title scale and visual stage do not yet share the nearby editorial panel cadence. | Keep the contained surface and canonical mascot. Match its title to the medium section-heading tier, use the shared wide-panel tokens, and make the mascot stage a modest closing accent. |

## First verification pass

The reconciled capture confirms the intended hierarchy at the top of the page. The hero remains open and expressive; the task widget retains the primary wide-panel role; and How It Works now reads as an open-canvas instructional sequence with a consistent compact-card variant. Its lower title scale, smaller mascot frames, and equal card rhythm reduce the previous visual competition with the hero while retaining the five-scene personality.

The middle-page review confirms that the first CTA and Signal Stack now share a stable wide-panel language despite their different layouts. The audience section keeps its lavender emphasis and five small mascot scenes, but the shared compact-card rhythm now makes the group feel coherent rather than crowded. The documented post-it remains the sole intentionally skewed element in its local composition.

The FAQ now reads as one calm support surface rather than seven competing mini-cards. The creator section retains the selected Switchboard inputs and canonical mascot situation, but its frame, title tier, and subtle art field are now consistent with the surrounding wide-panel language.

The lower-page review confirms that the Wayfinder is now one visible surface with the mascot and route cards sharing its interior rail. Featured posts retains the lavender editorial break but uses quiet cards and a deliberate centered fifth post. The final CTA now reads as a proportionate shared wide panel with the mascot as a small closing encouragement rather than a competing visual system.

## Responsive verification

At a 390px viewport, the hero proof bubble remains above the mascot stage with clear contrast and a visible tail. The removed supporting paragraph leaves enough room for the primary and secondary actions to stack before the task widget begins. The mobile sequence therefore preserves the hero’s promise, adds the proof point without crowding the headline, and maintains a clear task-entry path.

The desktop review confirms that the hero proof point and the final CTA encouragement now share the compact VT323 dialogue treatment. Surrounding section headings, descriptions, actions, and support text remain Inter-led, keeping pixel typography expressive but contained to mascot speech.
