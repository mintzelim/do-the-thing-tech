# Remaining Featured Image Production Brief

All six covers use the established **DoTheThing clean pixel-art editorial system**: 16:9 landscape; warm beige `#f6f5f2` canvas; warm-white `#fffefb` highlights; navy ink `#26364a`; restrained indigo `#5b5ce2`; a limited lime accent; and the approved abstract lavender rectangular mascot. Each image must contain **no text, no people, no medical imagery, no logos, and no interface screenshots**.

| Article source | Asset key | Editorial scene | Descriptive alt text |
| --- | --- | --- | --- |
| `03-breaking-down-big-tasks.md` | `blog-breaking-down-big-tasks-featured` | Mascot turns one oversized navy task block into four small stepping stones with a lime sequence arrow. | “A purple pixel-art mascot turns one large task block into smaller stepping stones.” |
| `04-executive-dysfunction-vs-task-paralysis.md` | `blog-executive-dysfunction-task-paralysis-featured` | Two side-by-side, clearly distinct paths: a stalled start gate and a frozen task block, both with a calm next-step cue. | “A purple pixel-art mascot stands beside two distinct task-start barriers.” |
| `05-best-tools-for-adhd-task-management.md` | `blog-best-tools-adhd-task-management-featured` | Mascot chooses a small, uncluttered toolkit: a task card, timer, and simple check mark. | “A purple pixel-art mascot chooses a simple task-management toolkit.” |
| `08-remote-work-adhd.md` | `blog-remote-work-adhd-featured` | Mascot at a minimal remote desk with a timer, one task card, and clear start cue. | “A purple pixel-art mascot works at a simple remote desk with one visible task.” |
| `09-adhd-perfectionism.md` | `blog-adhd-perfectionism-featured` | Mascot releases a carefully imperfect task card toward a completed-check flag. | “A purple pixel-art mascot moves an imperfect task card toward completion.” |
| `24-ai-that-breaks-down-tasks-adhd.md` | `blog-ai-task-breakdown-featured` | Mascot and a small friendly indigo helper light divide one task card into three actionable cards. | “A purple pixel-art mascot uses an AI helper to divide one task into smaller cards.” |

## Prompt guardrails

The mascot must remain abstract and consistent: a lavender rectangular creature with a simple dark face, short legs, and no human characteristics. Keep each scene sparse, editorial, and readable at a small blog-card size. The central concept should sit in the middle-to-right of the canvas, leaving a calm area on the left for flexible layout cropping. Do not render words, code, productivity dashboards, browser windows, medical symbols, or a diagnostic claim.

## Application sequence

After generation, use the compressed public asset URL in the corresponding Markdown frontmatter, preserve the source filename in the asset key, run `pnpm build` to regenerate `blog-posts.json`, and visually verify the article header image on desktop and narrow screens.
