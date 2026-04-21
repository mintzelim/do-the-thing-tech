# DoTheThing - Project TODO

## Design & Foundation
- [x] Define refined color palette and typography system
- [x] Create ADHD-friendly design tokens in Tailwind
- [x] Build core layout with sidebar (for ads) and main content area
- [x] Remove all Google Ads zones and code
- [x] Implement pixel art 3D aesthetic design
- [x] Update fonts to Clash Display (headlines) and Inter (body)

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
- [x] Implement pixel art 3D aesthetic fully
- [x] Remove all emojis from UI
- [x] Wire all features end-to-end
- [x] Test pixel art design on mobile and desktop
- [x] Final checkpoint with new design
