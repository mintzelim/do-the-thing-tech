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
- [x] Update subpage fonts: VT323 for headings, Noto Sans Mono for body text (About, Contact, Privacy, Terms)
- [ ] Final checkpoint with complete website
- [ ] Deploy to production

## Final Polish & Legal Compliance
- [x] Fix footer to stay at bottom on all pages
- [x] Create Privacy Policy page
- [x] Create Terms of Service page
- [x] Add confirmation dialog when navigating away from incomplete tasks
- [x] Add top navigation bar with links to all pages
- [x] Polish and ensure responsive design consistency across all pages
- [x] Final checkpoint with complete website
- [x] Integrate Google Gemini 2.5 Flash Lite (v1 stable API, 15 req/min free tier)
- [x] Polish responsive design for mobile, tablet, and desktop
- [x] Desktop optimization (42px headings, max-width 900px, generous padding)
- [x] Tablet optimization (32px headings, balanced padding)
- [x] Mobile optimization (24px headings, full-width buttons, vertical stacking)
- [x] Final checkpoint - Ready for production
- [x] Add loading indicators for API calls (task breakdown, time estimation)
- [x] Add error messages for failed API calls
- [x] Add toast notifications for user feedback
- [x] Add retry mechanism for failed requests (with exponential backoff, max 3 attempts)
- [x] Add proper source links and citations to all blog posts (all 15 posts)
- [x] Add backlinks to related blog posts (all 15 posts)
- [x] Create vitest tests to validate blog metadata (sources and related posts - 26 tests passing)
- [x] Increase font sizes throughout app (textarea, tasks, all text)
- [x] Make countdown timer persist across page navigation (global state)
- [x] Create mobile burger menu for navigation
- [x] Keep CURRENT TASKS visible in mobile navigation
- [x] Create CURRENT TASKS page in navigation
- [x] Move breakdown/timer UI to CURRENT TASKS page
- [x] Update Home page to redirect to CURRENT TASKS after breakdown
- [x] Ensure localStorage persistence works across page navigation
- [ ] Deploy to production

## Safety Features (Phase 2)
- [x] Implement beforeunload event listener for safety warning
- [x] Add timestamp-based timer recovery to localStorage
- [x] Create pixel-art pin-tab tutorial component
- [x] Write and pass 13 vitest tests for safety features
- [x] Test all features on dev server

## File-Based Blog System (Complete)
- [x] Create /blog directory structure for Markdown files
- [x] Create blog post template with YAML frontmatter
- [x] Migrate all 15 hardcoded blog posts to .md files
- [x] Create build script to parse .md files and generate blog-posts.json
- [x] Update Blog.tsx to read from generated JSON instead of hardcoded array
- [x] Add blog build script to package.json
- [x] Install js-yaml dependency for YAML parsing
- [x] Create 22 vitest tests for blog generation validation (all passing)
- [x] Test blog rendering with file-based posts (verified: all 15 posts load, sources display, related posts work)
- [x] Document blog post creation process in BLOG_GUIDE.md
- [x] Fix blog-posts.json serving path (moved to client/public/)
- [x] Verify blog detail view shows sources and related posts
- [ ] Deploy to Vercel and verify blog posts load from JSON
- [ ] Test adding a new blog post via Markdown file


## Current Tasks (Complete)
- [x] Update textbox font styling (22px, weight 400, line-height 1.6)
- [x] Fix countdown timer accuracy and ensure it doesn't stop midway
  - [x] Rewrite TimerContext with useRef to prevent interval restart
  - [x] Fix timer display in CurrentTasks to use formatTime function
  - [x] Create 9 countdown accuracy vitest tests (all passing)
  - [x] Create 13 integration tests for timer behavior (all passing)
  - [x] Total: 22 timer tests passing, verified no skipping or stopping


## Contact Page (Complete)
- [x] Create Contact.tsx page component with form (matches pixel art aesthetic)
- [x] Add contact form submission endpoint (uses notifyOwner to send to support@dothething.my)
- [x] Add Contact link to navigation (visible in desktop and mobile menus)
- [x] Create 18 vitest tests for contact form validation (all passing)
- [x] Create 14 vitest tests for contact router integration (all passing)
- [x] Verify contact page displays correctly in browser
- [x] Test end-to-end form submission in browser (verified: form submits, clears, no errors)


## SEO Fixes (Complete)
- [x] Add proper page title (30-60 characters) to home page - "DoTheThing - AI Task Breakdown for ADHD Productivity" (52 chars)
- [x] Add meta description (50-160 characters) to home page - "Break down overwhelming tasks into manageable steps with AI..." (136 chars)
- [x] Add keywords meta tag to home page - "ADHD task management, task breakdown, productivity tool, time estimation, executive dysfunction, task organization"
- [x] Verify SEO improvements on / route (all meta tags verified in browser console)


## Footer Updates (Complete)
- [x] Add CONTACT link to footer (Home, About, Privacy, Terms, Contact pages)
- [x] Verified: Blog.tsx and NotFound.tsx don't have footers (no changes needed)


## Bug Fixes (Complete)
- [x] Fix Total Time display to show sum of all breakdown task durations
- [x] Update Total Time when tasks are added, edited, or deleted
- [x] Create 8 vitest tests for Total Time calculation (all passing)
- [x] Verified in browser: Total Time updates correctly when tasks are edited or deleted


## Task Completion Feature (Complete)
- [x] Update CurrentTasks component to handle checkbox completion
- [x] Implement time deduction when tasks are marked complete
- [x] Update progress counter to reflect completed tasks
- [x] Add satisfying click sound when task is completed
- [x] Create vitest tests for task completion logic
- [x] Test in browser and verify timer updates correctly


## Time Estimation Bug Fix (Complete)
- [x] Review current time estimation logic
- [x] Fix focus level multipliers (Hyperfocus, Normal, Distracted)
- [x] Ensure estimates are returned in minutes, not seconds
- [x] Create tests for focus level adjustments
- [x] Test in browser and verify estimates are correct
- [x] Fix JSON extraction to handle markdown code blocks from Gemini
- [x] Fix LLM service to report actual model used in fallback chain
- [x] Revert to proven working JSON extraction logic (brace counting + manual regex)
- [x] Implement Gemini fallback chain (Flash Lite → Flash → Pro)


## Timing System Audit (Complete)
- [x] Audit focus-level time estimation logic for Hyperfocus, Normal, and Distracted
- [x] Verify generated subtask times are stored and displayed consistently in minutes
- [x] Fix total time calculation so it always reflects editable remaining subtasks
- [x] Fix countdown timer so it stays synchronized with edited, completed, and deleted subtasks
- [x] Add targeted tests for estimate, total, countdown, edit, completion, and delete behavior
- [x] Verify timing behavior end-to-end in the app UI

## Current Request Clarification
- [x] Ensure time estimation remains the core feature and feels intelligent after recent timer changes
- [x] Ensure user edits to subtask time immediately update both total time and countdown
- [x] Ensure deleting a subtask immediately updates both total time and countdown
- [x] Ensure completing a subtask deducts its remaining time without corrupting countdown state
- [x] Normalize rule: subtask estimates are stored in minutes, countdown state is stored in seconds only
- [x] Align root breakdown view and Current Tasks view to use the same timing rules
- [x] Run 42 targeted timing and estimator tests with all passing

- [x] Validate focus-level estimation quality with deterministic tests covering Hyperfocus, Normal, and Distracted outputs in minutes and realistic ranges
- [x] Fix numeric input editing so replacing a subtask minute value does not append digits and verify total/countdown update correctly after edit
- [x] Add end-to-end verification that editing, deleting, and completing subtasks keeps total time and active countdown synchronized without unit confusion

## Recent Fixes (Complete)
- [x] Fix auto-redirect issue when creating new tasks after completion (localStorage cleared)
- [x] Simplify LLM service to use only Gemini 2.5 Flash Lite
- [x] Improve task breakdown prompt for better subtask decomposition
- [x] Add pixel-art styled error modal for API failures
- [x] Implement Gemini fallback chain (Flash Lite to Flash to Pro)
- [x] Optimize SEO title
- [x] Add click sound for task completion
- [x] Verify Google Adsense code is correctly configured
- [x] Ensure code is Vercel deployment ready
- [x] Smart navigation - only show CURRENT TASKS when tasks exist

- [ ] Fix Vercel live domain returning DEPLOYMENT_NOT_FOUND at www.dothething.tech


## Current Tasks Page Enhancements (Complete)
- [x] HOME button in navigation should navigate to homepage
- [x] Add drag-and-drop reordering with six-dot drag handle
- [x] Show grabbing cursor when dragging tasks
- [x] Make task titles editable inline
- [x] Add + icon button to add custom tasks
- [x] Persist reordered task list to localStorage
- [x] Test drag-and-drop on mobile and desktop
- [x] Implement snappy pixel-art drag movement (instant snap, no smooth animation)
- [x] Add blocky 3D shadow effect when item is grabbed (shift up-left with shadow down-right)

## Task Editing Enhancements
- [x] Add EDIT button for task titles (not just double-click)
- [x] Add EDIT button for task descriptions
- [x] Add description field to added/custom tasks
- [x] Allow editing description inline with EDIT button
- [x] Persist description changes to localStorage
- [x] Write vitest tests for task editing features (12 tests passing)

## Footer Consistency
- [x] Create shared footer component used across all pages
- [x] Apply consistent footer to Homepage
- [x] Apply consistent footer to About page
- [x] Apply consistent footer to Blog page
- [x] Apply consistent footer to Contact page
- [x] Apply consistent footer to Privacy page
- [x] Apply consistent footer to Terms page
- [x] Verify footer styling matches pixel-art aesthetic

## Public Access Without Manus Login (In Progress)
- [ ] Audit all auth checks and login-dependent UI in the public site flow
- [ ] Remove login requirement from the core task breakdown, current tasks, blog, about, contact, privacy, and terms pages
- [ ] Ensure anonymous users can use the app without Manus authentication
- [ ] Add tests for anonymous access behavior
- [ ] Verify deployed/public access works without login


## Safety Features Refinements (Phase 3) - COMPLETE
- [x] Create custom pixel-art beforeunload modal (replaces native browser warning)
- [x] Update modal message to "If you close the tab, I'll forget everything we did! Are you sure?"
- [x] Move Pro Tip tutorial to Home page (after BREAK IT DOWN button) - ALWAYS SHOWING
- [x] Keep Pro Tip tutorial on CurrentTasks page (fixed position, bottom-right) - SHOWS ON FIRST VISIT
- [x] Update PinTabTutorial component to accept showAfterBreakdown prop
- [x] Add BeforeUnloadModal to App.tsx global context
- [x] Test custom modal and Pro Tip tutorial on dev server - VERIFIED WORKING
- [x] Simplify Pro Tip logic to show on Home always, CurrentTasks on first visit only
- [x] All 13 vitest tests passing for safety features


## Timer Deduction on Task Completion (Complete)
- [x] When user checks off a task, deduct that task's remaining time from countdown timer
- [x] Update toggleStepComplete in CurrentTasks to call adjustTime when task is completed
- [x] Timer only deducts when timer is active
- [x] Test in browser: verified timer decreases when task is checked off

## CurrentTasks Footer Fix (Complete)
- [x] Replace custom footer HTML in CurrentTasks with shared Footer component
- [x] Verify footer is consistent with other pages (HOME, ABOUT, BLOG, CONTACT, PRIVACY, TERMS)
- [x] Test in browser: footer now displays correctly on CurrentTasks page

## BeforeUnload Modal Fix (Complete)
- [x] Fix native browser warning showing alongside custom modal
- [x] Updated BeforeUnloadModal to properly prevent default beforeunload behavior
- [x] e.preventDefault() and e.returnValue now suppress native warning
- [x] Only custom pixel-art modal shows when user tries to close tab
- [x] Refactored to check allowLeave flag before showing anything

## Pro Tip Tutorial Improvements (Complete)
- [x] Pro Tip now always visible on CurrentTasks page at the top
- [x] User can close Pro Tip with X button
- [x] Pro Tip closure persists in localStorage
- [x] Pro Tip still shows on Home page after BREAK IT DOWN
- [x] Both Pro Tips have consistent styling with 💾 icon

## Pockets Full Modal (Complete)
- [x] Create PocketsFullModal component with pixel-art styling (🎒 icon, custom modal)
- [x] Add logic to detect existing tasks and show modal on BREAK IT DOWN
- [x] Implement TAKE ME THERE button (navigate to CurrentTasks)
- [x] Implement START OVER button (clear tasks and proceed)
- [x] Write vitest tests for pockets full modal logic (6 tests passing)
- [x] Test in browser: verify modal shows when trying to break down with existing tasks


## Timer Increase on Manual Task Addition (Complete)
- [x] When user adds a task manually, increase countdown timer by that task's estimated time
- [x] Update the timer display to reflect the new total time
- [x] Ensure timer continues counting down from the new total
- [x] Write vitest tests for timer increase on manual task addition (8 tests passing)
- [x] Test in browser: verify timer increases when adding tasks (verified: 25m → 40m when adding 15m task)


## Timer Adjustment on Task Time Edit (Complete)
- [x] When user edits a task's time estimate, calculate the difference
- [x] If timer is active, adjust timer by the time difference
- [x] Example: change task from 5min to 10min = +5min to timer
- [x] Write vitest tests for timer adjustment on task edit (9 tests passing)
- [x] Test in browser: verify timer adjusts when editing task times (verified: 36m 20s → 41m 11s when changing task from 5min to 10min)


## Timer Decrease on Task Deletion (Complete)
- [x] When user deletes a task, decrease countdown timer by that task's estimated time
- [x] Only adjust timer if timer is active
- [x] Update deleteStep function to call adjustTime with negative value
- [x] Write vitest tests for timer decrease on task deletion (8 tests passing)
- [x] Test in browser: verify timer decreases when deleting tasks (verified: 38m 3s → 27m 44s when deleting 10m task)


## Blog Post Template & AEO Optimization (Complete)
- [x] Create new AEO-optimized blog template with frontmatter metadata
- [x] Update Template.md with new structure (Frontmatter, AEO Snippet, Key Takeaways, Modules A-D, CTA)
- [x] Refactor all 15 existing blog posts to follow new template
- [x] Add primaryEntity and secondaryEntities to all blog posts
- [x] Verify all blog posts have updated frontmatter with new fields
- [x] All 15 blog posts now include: id, title, excerpt, date, readTime, category, primaryEntity, secondaryEntities, seoKeywords, sources, relatedPosts


## Blog Post Inline Links (Complete)
- [x] Support markdown links in blog post content (e.g., [text](url))
- [x] Allow linking to other blog posts by ID (e.g., [Related Post](post:2))
- [x] Allow linking to external resources with full URLs
- [x] Create BlogContentRenderer component to parse and render links
- [x] Write vitest tests for link parsing (11 tests passing)
- [x] Update Blog.tsx to use BlogContentRenderer component


## Blog Post Markdown Formatting (Complete)
- [x] Support headings (H1-H3) with different sizes and proper styling
- [x] Support bold (**text**) and italic (*text*) formatting
- [x] Support unordered (- item) and ordered (1. item) lists with indentation
- [x] Support blockquotes (> text) with left border styling
- [x] Support code blocks (```code```) and inline code (`code`)
- [x] Support horizontal rules (---, ***, ___)
- [x] Update BlogContentRenderer with full markdown support
- [x] Write vitest tests for markdown parsing (19 tests passing)
- [x] Inline links support maintained with markdown formatting
- [x] Updated TEMPLATE.md with markdown examples
- [x] Updated all 15 blog posts with markdown formatting
- [x] Added section headers (## and ###) for better structure
- [x] Added bold formatting to key terms and highlights


## Blog Post Markdown Rendering Fix (Complete)
- [x] Fixed generate-blog-posts.mjs to preserve markdown instead of stripping it
- [x] Regenerated blog-posts.json with markdown formatting preserved
- [x] Verified blog post rendering with proper headings, lists, blockquotes, and spacing
- [x] All blog posts now display with proper formatting (H1/H2/H3, bold, lists, blockquotes)


## GitHub Blog Post Auto-Update Workflow (Complete)
- [x] Verified GitHub integration is configured (user_github remote)
- [x] Added new blog post: "Does ADHD Go Away?" from user upload
- [x] Regenerated blog-posts.json with new post (16 total)
- [x] Pushed to GitHub main branch
- [x] Verified dev server running with new blog post
- [x] Documented workflow: Upload markdown to /blog folder → Auto-regenerate JSON → Live site updates


## Blog Table Formatting Fix (Complete)
- [x] Fix table rendering in blog posts (proper borders, alignment, spacing)
- [x] Add CSS styling for markdown tables
- [x] Test table display on all blog posts

## Font Styling Updates (Complete)
- [x] Keep VT323 font for all headings (H1, H2, H3) across all pages
- [x] Change body text to Noto Sans Mono Normal for blog posts
- [x] Change body text to Noto Sans Mono Normal for all subpages (About, Contact, Privacy, Terms)
- [x] Keep Home page and CurrentTasks with original font styling
- [x] Update BlogContentRenderer to apply correct fonts
- [x] Update subpage components to apply correct fonts
- [x] Test font rendering on dev server


## Public Access Implementation (Complete)
- [x] Remove Manus OAuth requirement from all pages
- [x] Make site completely public without login
- [x] Change protectedProcedure to publicProcedure for task endpoints
- [x] Handle null user context gracefully

## Typography Sizing Updates (Complete)
- [x] Apply H1: 32px-40px sizing to all headings (clamp 32-40px)
- [x] Apply H2: 24px-28px sizing to subheadings (clamp 24-28px)
- [x] Apply Body Text: 16px-18px sizing (16px base, 18px large)
- [x] Apply Button Text: 18px-20px sizing (18px)
- [x] Apply Captions/Small: 12px-14px sizing (14px)
- [x] Import Roboto Mono font (weight 500)
- [x] Keep VT323 for Home page and Current Tasks (all text)
- [x] Use Roboto Mono weight 500 for blog posts body text
- [x] Use Roboto Mono weight 500 for About, Contact, Privacy, Terms pages

- [x] Fix Vercel production runtime crash caused by missing lightningcss native binary during requests to / and favicon assets
- [x] Verify the production runtime no longer loads lightningcss in the local production bundle
- [ ] Confirm Vercel serves homepage and favicon assets without 500 errors after redeploy
- [x] Identify all production environment variables required for the Vercel deployment
- [x] Configure or document GOOGLE_GEMINI_API_KEY and any other required secrets for Vercel
- [ ] Confirm the Vercel deployment boots successfully after secrets are added
- [x] Audit all production environment variables and reduce Vercel requirements to the minimum necessary set
- [x] Make Manus-specific auth and platform variables optional for public Vercel deployment where possible
- [ ] Document the exact final environment variables needed in Vercel after code hardening
