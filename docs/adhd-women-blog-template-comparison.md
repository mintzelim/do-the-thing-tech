# ADHD in Women · Field Guide vs Focus Ledger

> **Approval-only record.** This comparison does not change the live blog template or article copy.

The HTML preview at `docs/adhd-women-blog-template-comparison.html` uses the current **ADHD in Women: The Symptoms Nobody Told You About** article as the content reference for both layouts. It compares the two remaining selected-direction candidates without introducing a third reading system.

| Direction | Reader-facing difference | Best fit | Reading-progress treatment |
| --- | --- | --- | --- |
| **Option 01 · The Field Guide** | A gentle destination visual and short three-point start map before the uninterrupted article rail. | Foundational explainers and ADHD Basics articles where early orientation reduces cognitive load. | A slim sticky line with an accessible percentage label. It remains secondary to the map and reading copy. |
| **Option 02 · Focus Ledger** | A quiet authorship, update, evidence, and medical-boundary signal rail; direct answer and TL;DR lead into a source-aware article column. | Research-backed explainers where provenance and current context deserve early visibility. | The same slim sticky line, paired with the source-aware rail rather than a separate floating module. |

## Shared progress-bar contract

The progress bar is a visible in-page orientation cue, not schema or metadata. It updates only from reader scroll, has a matching `role="progressbar"` with current value, and respects reduced-motion preferences by avoiding decorative animation. On small screens, it remains one thin sticky line with text rather than becoming a new control surface.

## Selection boundary

Once the user selects **Field Guide** or **Focus Ledger**, implementation will apply that template consistently across live posts and add the shared reading-progress behavior. No post-body text, citation, source, table, metadata, route, or non-diagnostic boundary will be rewritten as part of the layout work.

## Visual review

Desktop review confirms the two options sit side by side within the landing rail without competing with the page introduction. The Field Guide’s contained reader rail updated from `0% · START HERE` to `80% · NEARLY THERE` when scrolled, while the Focus Ledger remained independently at its starting state. Both progress lines stay visually secondary to the article hierarchy.
