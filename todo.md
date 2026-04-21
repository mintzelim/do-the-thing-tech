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

## Guest Mode & Profile System
- [ ] Implement guest mode (no login required)
- [ ] Create optional profile creation flow with skip option
- [ ] Add 5-question onboarding (neurodivergent, work env, distractions, work style, biggest challenge)
- [ ] Store profile data in database
- [ ] Create user_profiles table in schema
- [ ] Implement profile editing UI
- [ ] Add "Create Profile" button to home screen

## Personalization Engine
- [ ] Create personalization scoring system based on profile answers
- [ ] Adjust task breakdown granularity based on profile
- [ ] Customize time estimates based on work style and distractions
- [ ] Add break suggestions based on distraction patterns
- [ ] Implement personalized breakdown prompts for LLM

## Subscription & Monetization
- [ ] Implement free vs paid tier logic
- [ ] Add Stripe integration for payments
- [ ] Create subscription check for Google export features
- [ ] Add ad system for free tier (Google AdSense or similar)
- [ ] Implement ad-free experience for paid users
- [ ] Create billing/subscription management UI
- [ ] Add subscription status indicator in header

## Google Integration
- [ ] Set up Google OAuth flow for login
- [ ] Implement Google Calendar export with OAuth
- [ ] Implement Google Tasks export with OAuth
- [ ] Add login requirement check before exports
- [ ] Handle OAuth token refresh and expiration
- [ ] Add "Connect Google" button to export screen

## Database Schema Updates
- [ ] Add user_profiles table with 5 profile questions
- [ ] Add subscriptions table for tracking paid users
- [ ] Add user_preferences table for personalization settings
- [ ] Add google_oauth_tokens table for token storage
- [ ] Update users table with subscription_id foreign key

## UI/UX Improvements
- [ ] Create profile onboarding modal/flow
- [ ] Add "Skip for now" button to profile questions
- [ ] Add profile indicator in header (guest/profile created)
- [ ] Create subscription banner for free users
- [ ] Add "Upgrade to remove ads" CTA
- [ ] Create settings/profile management page
- [ ] Add Google login button to export screen

## Final Polish & Deployment
- [ ] Test guest mode flow end-to-end
- [ ] Test profile creation and personalization
- [ ] Test subscription checkout flow
- [ ] Test Google OAuth integration
- [ ] Test ad display on free tier
- [ ] Verify ad-free experience on paid tier
- [ ] Performance optimization for lightweight experience
- [ ] Final checkpoint with complete feature set
- [ ] Deploy to production

## Content & SEO
- [x] Create About page explaining ADHD and DoTheThing mission
- [x] Write 5 SEO/GEO-optimized blog posts
- [x] Integrate blog into website navigation
- [ ] Add meta tags and structured data for SEO (optional enhancement)
- [x] Create blog listing page
- [x] Add blog post routing

## Blog Post Topics (SEO/GEO Optimized - 15 Total)
- [x] Blog 1: "How ADHD Affects Task Management" (neuroscience focus)
- [x] Blog 2: "Time Blindness in ADHD: Why You're Always Late" (time management focus)
- [x] Blog 3: "Breaking Down Big Tasks: A Guide for ADHD Brains" (productivity focus)
- [x] Blog 4: "Executive Dysfunction and Task Paralysis: What's the Difference?" (education focus)
- [x] Blog 5: "Best Tools for ADHD Task Management in 2024" (tools/comparison focus)
- [x] Blog 6: "ADHD Medication and Productivity: How to Work With Your Brain Chemistry" (neuroscience focus)
- [x] Blog 7: "The Neuroscience Behind Task Avoidance: Why You Procrastinate" (psychology focus)
- [x] Blog 8: "Remote Work and ADHD: Strategies for Staying Focused at Home" (work-from-home focus)
- [x] Blog 9: "ADHD and Perfectionism: Why You Can't Finish Tasks" (psychology focus)
- [x] Blog 10: "ADHD and Relationships: How Task Management Affects Your Connections" (relationships focus)
- [x] Blog 11: "ADHD in the Workplace: How to Succeed in Your Career" (career focus)
- [x] Blog 12: "ADHD and Sleep: How Poor Sleep Makes Executive Dysfunction Worse" (health focus)
- [x] Blog 13: "ADHD and Financial Management: Why You Struggle With Money" (finance focus)
- [x] Blog 14: "ADHD and Creativity: How to Channel Hyperfocus Into Your Passion" (creativity focus)
- [x] Blog 15: "Free Tools for ADHD Task Management in 2026" (tools/resources focus)

## Final Deployment
- [x] Test About page and blog navigation
- [x] Refine typography: Press Start 2P for headlines, Inter for body text (About & Blog)
- [x] Fix: Apply Press Start 2P font class to About & Blog headlines
- [x] Fix: Increase font sizes in main tool (Home page) (36px headings, 18-20px body)
- [x] Convert blog posts from markdown to plain text (readable paragraphs)
- [x] Apply pixel art UI design to About page (cards, borders, styling)
- [x] Add all 15 SEO/GEO-optimized blog posts (2026 current date, AI visibility optimized)
- [x] Test blog post routing
- [x] Polish About page for consistent pixel art style (3D shadows, chunky borders, authentic 8-bit feel)
- [x] Fix About page colors to match Home page (no new colors, black/white/gray only)
- [x] Fix TypeScript error in storageProxy.ts
- [x] Fix JSX error in Blog.tsx
- [x] Update all fonts to VT323 (remove Press Start 2P, use VT323 for all text)
- [x] Update home page copy to "TODAY, I NEED TO..." (instead of "I NEED TO...")
- [x] Remove calendar export feature (no longer needed)
- [x] Fix slider to sync with presets (slider should match selected preset position)
- [x] Add satisfying click sound when tasks are crossed off
- [x] Add positive completion message when all tasks are done
- [x] Add tab close confirmation alert (warn before closing tab)
- [x] Persist task state so users can keep tab open and work on tasks
- [x] Implement localStorage persistence for all task state
- [x] Improve slider-preset synchronization (auto-detect closest preset)
- [x] Ensure mobile phone frame displays centered on desktop (not full width)
- [x] Add desktop-specific styling to show mobile frame mockup
- [x] Remove mobile phone frame - make it normal desktop site
- [x] Change click sound from beep to mouse click sound
- [x] Remove emoji from celebratory completion message
- [ ] Final checkpoint with complete website
- [ ] Deploy to production
