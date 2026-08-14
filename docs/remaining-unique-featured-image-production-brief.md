# Remaining Unique Featured-Image Production Brief

Each cover follows the established **DoTheThing clean pixel-art editorial system**: a 16:9 landscape canvas; warm beige `#f6f5f2`; warm-white `#fffefb` highlights; navy ink `#26364a`; restrained indigo `#5b5ce2`; a limited lime accent; and the approved abstract lavender rectangular mascot. Every image must contain **no text, no people, no medical imagery, no logos, no dashboard/browser interface, and no diagnostic claim**. Keep the main concept middle-right with calm negative space on the left for blog-card crops.

| Article source | Asset key | Editorial scene | Descriptive alt text |
| --- | --- | --- | --- |
| `01-how-adhd-affects-task-management.md` | `blog-how-adhd-affects-task-management-featured` | Mascot turns a scattered set of small task tiles into one orderly short path with a lime first-step marker. | “A purple pixel-art mascot arranges scattered task tiles into a clear path.” |
| `13-adhd-financial-management.md` | `blog-adhd-financial-management-featured` | Mascot puts a bill envelope, small wallet, and calendar tile into three simple labelled-free storage slots. | “A purple pixel-art mascot organizes an envelope, wallet, and calendar tile.” |
| `15-free-tools-2026.md` | `blog-free-tools-adhd-featured` | Mascot opens a compact toolbox containing a timer, checklist, and capture note, each simple and uncluttered. | “A purple pixel-art mascot opens a simple toolkit with a timer and checklist.” |
| `19-adhd-morning-routine-no-motivation-1.md` | `blog-adhd-morning-routine-featured` | Mascot takes one small step from a bedside moon toward a sunrise and one ready task tile. | “A purple pixel-art mascot takes one small step from night toward a morning task.” |
| `20-how-to-break-down-tasks-adhd.md` | `blog-how-to-break-down-tasks-featured` | Mascot unfolds a large blank task map into a gentle three-stop route with small flags. | “A purple pixel-art mascot unfolds a large task map into a three-stop route.” |
| `21-adhd-best-jobs-creativity-hyperfocus.md` | `blog-best-jobs-adhd-featured` | Mascot stands at a friendly fork with three distinct work-symbol paths: a lightbulb, a paint palette, and a building block. | “A purple pixel-art mascot stands at three creative work paths.” |
| `22-does-adhd-go-away.md` | `blog-does-adhd-go-away-featured` | Mascot walks beside a continuous winding path through three neutral life-stage waypoints, with an open support sign but no wording. | “A purple pixel-art mascot walks beside a continuous path through three life stages.” |
| `26-adhd-symptoms-adults.md` | `blog-adhd-symptoms-adults-featured` | Mascot notices several everyday task cues floating around one calm home-and-work scene, then chooses one visible next-step card. | “A purple pixel-art mascot notices everyday task cues and chooses one next step.” |

## Prompt guardrails

The mascot remains a lavender rectangular creature with a simple dark face, short legs, and no human characteristics. Scenes stay sparse and readable at small card scale. Use only visual metaphors; do not render words, currencies, medical symbols, medication, charts, productivity interfaces, code, or a clinical interpretation.

## Shared-asset replacements

The following five articles currently reuse illustration assets assigned elsewhere. Replace only these duplicate assignments; the paired articles retain their already distinct source image. Apply the same 16:9, text-free, middle-right composition and clean pixel-art palette specified above.

| Article source | Asset key | Editorial scene | Descriptive alt text |
| --- | --- | --- | --- |
| `14-adhd-creativity.md` | `blog-adhd-creativity-featured` | Mascot gathers a few floating lavender pixel sparks into one open blank idea canvas. | “A purple pixel-art mascot gathers creative sparks into an open idea canvas.” |
| `16-neurodivergent-productivity-7-tactics.md` | `blog-neurodivergent-productivity-tactics-featured` | Mascot stands beside seven small, abstract tactic tiles arranged as a gentle orbit. | “A purple pixel-art mascot uses seven small productivity tactic tiles.” |
| `10-adhd-relationships.md` | `blog-adhd-relationships-featured` | Mascot sends one warm message tile across a small bridge toward a heart-shaped signal, without people. | “A purple pixel-art mascot sends a message across a small bridge.” |
| `17-why-simpler-adhd-friendly-apps-work-better.md` | `blog-simpler-adhd-apps-featured` | Mascot chooses one clear blank task tile while a distant cluster of tiny confusing tiles fades back. | “A purple pixel-art mascot chooses one simple task tile over a cluttered set.” |
| `18-one-task-is-enough-simple-self-acceptance.md` | `blog-one-task-enough-featured` | Mascot rests beside one gently completed task tile and a small calm star, emphasizing enoughness without text. | “A purple pixel-art mascot rests beside one completed task tile.” |

## Application sequence

Reference the reserved production URL in each source file’s `featuredImage` field, add the paired `featuredImageAlt` text exactly as specified, run `pnpm build` to regenerate both public `blog-posts.json` registries, and verify each key is represented in the generated public metadata.
