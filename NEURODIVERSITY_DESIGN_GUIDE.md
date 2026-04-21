# DoTheThing - Neurodiversity Design System Implementation

Based on https://www.neurodiversity.design/

## Core Principles for ADHD & Neurodivergent Users

### 1. **Numbers & Spacing**
- Use consistent, predictable spacing (multiples of 8px or 4px)
- Avoid overwhelming layouts with too many elements
- Group related items clearly
- Provide breathing room between sections

### 2. **Typography**
- **Headlines:** Clash Display (distinctive, modern)
- **Body:** Inter (clean, dyslexia-friendly)
- Font sizes: minimum 16px for body text
- Line height: 1.5 or higher for readability
- Avoid all-caps text (harder to read)
- Use left-aligned text (easier to scan)

### 3. **Color Palette (Neurodiversity Design System)**
- **Calm, accessible colors** that don't overstimulate
- Avoid harsh contrasts or neon colors
- Use soft, muted tones
- Ensure sufficient contrast for readability (WCAG AA minimum)
- Consider color-blind accessibility
- Suggested palette:
  - Primary: Soft blue (#4A90E2)
  - Secondary: Warm gray (#7F8C8D)
  - Accent: Gentle green (#52C41A)
  - Background: Off-white or light gray (#F5F5F5)
  - Text: Dark gray (#2C3E50)

### 4. **Buttons & Inputs**
- Large, clear, easy-to-click targets (minimum 44x44px)
- High contrast between button and background
- Clear, descriptive labels (no jargon)
- Provide visual feedback on hover/focus
- Use consistent button styles
- No hover-only information

### 5. **Interface Design**
- **Minimize cognitive load:**
  - One primary action per screen
  - Clear hierarchy of information
  - Avoid unnecessary decorations
  - Remove distracting elements
- **Provide structure:**
  - Clear sections and groupings
  - Consistent layout patterns
  - Predictable navigation
- **Support focus:**
  - Minimize distractions
  - No auto-playing media
  - No flashing or rapid animations
  - Provide focus indicators

### 6. **Communications**
- Use plain, clear language
- Avoid jargon and metaphors
- Be literal and direct
- Short sentences and paragraphs
- Use lists for multiple items
- Provide clear error messages
- Confirm important actions

### 7. **Animations**
- **Minimal and purposeful:**
  - Avoid unnecessary motion
  - Provide option to reduce animations
  - No flashing (>3 per second)
  - No auto-playing videos
- **Smooth transitions:**
  - 200-300ms duration
  - Easing functions (ease-in-out)
  - Predictable movement

## DoTheThing Specific Implementation

### User Flow (No Emojis)
1. **Brain Dump Entry** → Simple text area with clear instructions
2. **Smart Estimates** → Shows time estimates with focus level adjustment
3. **Smart Breakdown** → Editable steps with checkboxes and time per step
4. **Export Button** → One-click export to Google Calendar

### UI Elements to Remove
- All emojis (distracting for ADHD users)
- Unnecessary icons
- Decorative elements
- Auto-playing content
- Hover-only information

### UI Elements to Add
- Clear focus indicators
- Checkboxes for task completion
- Edit/delete buttons for each step
- Time estimates per step
- Focus level selector (Hyperfocus, Normal, Distracted)
- Export button (prominent, clear)
- Save session button

### Spacing & Layout
- Sidebar: 300px (ads)
- Main content: Full width with max-width 900px
- Padding: 24px or 32px
- Gap between sections: 24px
- Gap between items: 16px

### Color Usage
- Background: #F5F5F5 (light gray)
- Card background: #FFFFFF (white)
- Primary text: #2C3E50 (dark gray)
- Secondary text: #7F8C8D (warm gray)
- Primary action: #4A90E2 (soft blue)
- Success: #52C41A (gentle green)
- Warning: #FAAD14 (warm amber)
- Error: #F5222D (soft red)
- Borders: #E8E8E8 (light gray)

### Typography Scale
- H1: 32px, bold
- H2: 24px, bold
- H3: 20px, bold
- Body: 16px, regular
- Small: 14px, regular
- Label: 14px, medium

### Accessibility Checklist
- [ ] No emojis used
- [ ] Minimum 16px font size for body text
- [ ] Line height 1.5 or higher
- [ ] Color contrast ratio 4.5:1 for text
- [ ] Focus indicators visible on all interactive elements
- [ ] Keyboard navigation fully supported
- [ ] No auto-playing media
- [ ] Clear, descriptive labels
- [ ] Error messages are clear
- [ ] Animations can be disabled
- [ ] No flashing content
- [ ] Mobile responsive

## References
- Neurodiversity Design System: https://www.neurodiversity.design/
- WCAG 2.1 Guidelines: https://www.w3.org/WAI/WCAG21/quickref/
- ADHD-Friendly Design: https://www.smashingmagazine.com/2025/06/designing-for-neurodiversity/
