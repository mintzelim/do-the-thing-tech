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
- [x] Apply time-blindness buffer (15-30%) to all estimates
- [x] Create estimator UI showing time per step
- [x] Add visual indicators for time estimates
- [x] Write and pass unit tests for estimator service

## Google Calendar & Tasks Export
- [ ] Set up Google OAuth integration
- [ ] Implement Google Calendar export with scheduling logic
- [ ] Implement Google Tasks export
- [ ] Build one-click export UI
- [ ] Add intelligent scheduling to find available time slots

## Persistence & User Sessions
- [x] Create database schema for task sessions
- [ ] Implement save task list functionality
- [ ] Build task history/management UI
- [ ] Add ability to load and edit previous sessions

## Google Ads Integration
- [x] Set up Google Ads placeholder zones (sidebar + bottom banner)
- [ ] Set up Google AdSense integration
- [ ] Ensure ads are non-intrusive and clearly separated

## Polish & Deployment
- [x] Add animations and transitions (subtle, ADHD-friendly)
- [ ] Refine visual design and micro-interactions
- [ ] Test all features end-to-end
- [ ] Optimize performance
- [ ] Create checkpoint and deploy
