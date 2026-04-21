# DoTheThing - Project TODO

## Design & Foundation
- [x] Define refined color palette and typography system
- [x] Create ADHD-friendly design tokens in Tailwind
- [x] Build core layout with sidebar (for ads) and main content area
- [x] Set up Google Ads placeholder zones (sidebar + bottom banner)
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
- [x] Implement ADHD-friendly presets (auto-position slider)
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
- [ ] Set up Google OAuth integration
- [ ] Implement actual Google Calendar API integration
- [ ] Implement Google Tasks export
- [ ] Build one-click export UI

## Persistence & User Sessions
- [x] Create database schema for task sessions
- [ ] Implement save task list functionality
- [ ] Build task history/management UI
- [ ] Add ability to load and edit previous sessions

## Google Ads Integration
- [x] Set up Google Ads placeholder zones (sidebar + bottom banner)
- [x] Ensure ads are non-intrusive and clearly separated
- [ ] Set up Google AdSense integration

## Polish & Deployment
- [x] Add animations and transitions (subtle, ADHD-friendly)
- [x] Create comprehensive unit tests (33 passing)
- [ ] Implement neurodiversity design system fully
- [ ] Remove all emojis from UI
- [ ] Test all features end-to-end in browser
- [ ] Optimize performance
- [ ] Final checkpoint and ready for production
