# Task Input Cue Exploration

> **Status: approval-only.** This document does not change the live task input, its placeholder, stored draft behavior, or task-generation flow.

## Intent

The task field should unmistakably communicate that it accepts free-form typing, including a fuzzy or messy brain dump. The cue must remain a visual invitation, not a scripted form fill. The real textarea remains empty until the visitor types, and the cue disappears as soon as the field receives focus or has a value.

## Option 01 — Gentle Typewriter (recommended)

A faint, VT323-style visual example appears inside the empty field with a 1px lavender blinking cursor. The example gently types, pauses, then clears to the next relatable prompt. The small Corner Burst remains in its existing position.

> “Email the dentist, reply to Sam, and work out why the laundry is now a chair.”

This is the clearest option because the cue occurs exactly where typing begins, without adding an extra surface.

## Option 02 — Block Cursor

A square pixel cursor gently pulses beside a rotating example. It carries a slightly more retro-terminal character than Option 01 while remaining clear at a glance.

## Option 03 — Step Cursor

An underscore cursor makes two very small forward movements before pausing beside a fixed prompt. The existing **DUMP → BREAK DOWN → START** sequence sits above it as a light sense of momentum.

## Required behavior for any approved option

| Requirement | Constraint |
|---|---|
| Entry | The actual textarea stays blank until the visitor enters text; examples never submit, prefill, or overwrite input. |
| Focus | The overlay hides on focus and remains hidden after a value is entered. |
| Motion | With `prefers-reduced-motion: reduce`, use the first static example and a non-animated cursor. |
| Typography | The example and cursor use VT323; surrounding interface text remains Inter. |
| Accessibility | The visual overlay is `aria-hidden`; the textarea retains its existing accessible label. |
| Copy | Examples are relatable, kind, and task-oriented; they do not make medical or diagnostic claims. |

## Recommended prompt rotation

1. “Email the dentist, reply to Sam, and work out why the laundry is now a chair.”
2. “Write the report. Start the report. Open the report. You know—the report.”
3. “Plan the presentation that is next week and currently exists as a haunted tab.”
4. “Sort the insurance forms, buy food, and somehow answer three messages.”

## Visual review

The desktop exploration confirms that all three directions remain inside one existing input-surface pattern, retain the yellow Corner Burst, and keep the visual example secondary to the typed task. Option 01 is the clearest and least visually busy; its prompt and small lavender cursor make the text-entry affordance explicit without adding a second control or card.
