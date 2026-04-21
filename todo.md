# DoTheThing - Project TODO

## Design & Foundation
- [x] Define refined color palette and typography system
- [x] Create ADHD-friendly design tokens in Tailwind
- [x] Build core layout with sidebar (for ads) and main content area
- [x] Remove all Google Ads zones and code
- [x] Redesign with mobile-first pixel art aesthetic (clean, refined)
- [x] Implement large, clear typography for mobile screens
- [x] Update fonts to modern pixel-friendly stack (Inter)

## Core Entry Point
- [x] Implement "I need to..." text box with placeholder guidance
- [x] Add inline instructions for single task vs brain dump
- [x] Build input handler to distinguish between task and brain dump
- [x] Create form submission logic
- [x] Rebuild flow: brain dump → estimates → breakdown → export
- [x] Implement neurodiversity design system (neurodiversity.design)
- [x] Remove all emojis and distracting elements
- [x] Add checkboxes and edit capabilities to breakdown steps

## AI-Powered Task Breakdown
- [x] Integrate LLM for task breakdown (single task)
- [x] Build granularity slider (Tiny Steps to Big Milestones)
- [x] Restore ADHD-friendly presets UI (Tiny Steps, Balanced, Big Milestones)
- [x] Create step display UI with edit/delete capabilities
- [x] Add brain dump compiler logic (organize unstructured input)
- [x] Write and pass unit tests for breakdown service

## Smart Estimator
- [x] Implement focus level selector (Hyperfocus, Normal, Distracted)
- [x] Build time estimation logic with focus-level adjustments
- [x] Apply time-blindness buffer (20-30%) to all estimates
- [x] Create estimator UI showing time per step
- [x] Add visual indicators for time estimates
- [x] Write and pass unit tests for estimator service

## Google Calendar & Tasks Export
- [x] Build intelligent scheduling service for calendar events
- [x] Implement calendar event generation with time buffers
- [x] Add break scheduling between tasks
- [x] Write and pass unit tests for calendar export
- [x] Wire frontend to real export service
- [x] Build one-click export UI with success/error states
- [ ] Set up Google OAuth integration (future enhancement)
- [ ] Implement actual Google Calendar API integration (future enhancement)

## Persistence & User Sessions
- [x] Create database schema for task sessions
- [ ] Implement save task list functionality (optional for MVP)
- [ ] Build task history/management UI (optional for MVP)
- [ ] Add ability to load and edit previous sessions (optional for MVP)

## Google Ads Integration
- [x] Remove all Google Ads code and zones
- [x] Clean up layout after ad removal
- [ ] Set up Google AdSense integration (optional future feature)

## Polish & Deployment
- [x] Add animations and transitions (subtle, ADHD-friendly)
- [x] Create comprehensive unit tests (33 passing)
- [x] Implement mobile-first pixel art design (refined, clean)
- [x] Optimize typography for mobile readability (32px headings, 16px body)
- [x] Remove all emojis from UI
- [x] Wire all features end-to-end
- [x] Test mobile design on actual devices
- [x] Refine pixel art buttons with chunky, blocky styling (3D shadows)
- [x] Refine pixel art text boxes with pixelated borders (inset depth)
- [x] Implement authentic pixel art font (Press Start 2P + VT323)
- [x] Polish overall pixel art aesthetic and consistency
- [x] Increase body text size for better readability (14-16px body, 15px task titles)
- [x] Add back button to return to edit from breakdown view
- [x] Restore focus level selector (Hyperfocus, Normal, Distracted) to input screen
- [x] Add countdown timer to total time display (clickable, red highlight when active)
- [x] Final checkpoint with all UI improvements
