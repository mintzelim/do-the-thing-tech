import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const markdown = readFileSync(resolve(process.cwd(), "docs/dothething-landing-design-system.md"), "utf8");
const html = readFileSync(resolve(process.cwd(), "docs/dothething-landing-design-system.html"), "utf8");
const enhancedSchema = readFileSync(resolve(process.cwd(), "client/src/lib/enhancedSchema.ts"), "utf8");
const homeContent = readFileSync(resolve(process.cwd(), "client/src/components/HomeContent.tsx"), "utf8");
const aboutPage = readFileSync(resolve(process.cwd(), "client/src/pages/About.tsx"), "utf8");

describe("landing-page design-system documentation", () => {
  it("documents the implemented hybrid pixel tokens and shared text grid", () => {
    for (const document of [markdown, html]) {
      expect(document).toContain("#f6f5f2");
      expect(document).toContain("#fffefb");
      expect(document).toContain("#5b5ce2");
      expect(document).toContain("Inter");
      expect(document).toContain("VT323");
      expect(document).toContain("720px");
      expect(document).toContain("1240px");
      expect(document).toContain("transparent");
    }
  });

  it("covers the shared shell, canonical eyebrow, and accessible motion contract", () => {
    for (const document of [markdown, html]) {
      expect(document).toContain("A SMALLER NEXT STEP");
      expect(document).toContain("Header");
      expect(document).toContain("Footer");
      expect(document).toContain("prefers-reduced-motion");
      expect(document).toContain("160ms");
    }

    expect(markdown).toContain("Contextual eyebrow pattern");
    expect(markdown).toContain("Motion and Interaction");
    expect(markdown).toContain("Alternate public-page rhythm");
    expect(markdown).toContain("Wide editorial panel");
    expect(html).toContain("site-header-demo");
    expect(html).toContain("site-footer-demo");
    expect(html).toContain("rhythm-demo");
    expect(html).toContain("Alternate layout patterns");
    expect(html).toContain("ARTICLE DATA PRESENTATION");
    expect(html).toContain("OPTION 01 · QUIET LEDGER");
    expect(html).toContain("OPTION 02 · GUIDED COMPARISON");
    expect(html).toContain("COMPONENT · CONTEXT STRIPS");
    expect(html).toContain("Selected use criteria");
    expect(markdown).toContain("Quiet Ledger table");
    expect(markdown).toContain("Guided progress chart");
    expect(markdown).toContain("Numbered action steps");
    expect(markdown).toContain("Context strips");
    expect(html).toContain("NAVIGATION CONTEXT");
    expect(html).toContain("OPTION 01 · INLINE TRAIL");
    expect(html).toContain("OPTION 02 · SEGMENTED TRAIL");
    expect(html).toContain("OPTION 03 · RETURN PATH");
    expect(html).toContain("POST–BRAIN-DUMP FLOW");
    expect(html).toContain("OPTION 01 · FOCUS QUEUE");
    expect(html).toContain("OPTION 02 · NEXT ACTION SPLIT");
    expect(html).toContain("OPTION 03 · PROGRESS PATH");
    expect(html).toContain("task-preview-row");
    expect(html).toContain("Selected implementation: Focus Queue");
    expect(html).toContain("Playful image-free modules");
    expect(html).toContain("OPTION 01 · PIXEL POST-IT");
    expect(html).toContain("OPTION 02 · QUEST TICKET");
    expect(html).toContain("OPTION 03 · CHECKPOINT FLAG");
    expect(html).toContain("illustrated-card system");
    expect(html).toContain("OPTION 01 · PIXEL POST-IT · SELECTED");
    expect(html).toContain("OPTION 02 · QUEST TICKET · SELECTED");
    expect(html).toContain("Six-card group interactions");
    expect(html).toContain("OPTION 01 · FOCUS FAN");
    expect(html).toContain("OPTION 02 · CHECK-IN WAVE");
    expect(html).toContain("OPTION 03 · ROUTE MAP");
    expect(html).toContain("group-demo fan-deck");
    expect(html).toContain("group-demo wave-queue");
    expect(html).toContain("group-demo trail-map");
    expect(html).toContain("OPTION 01 · FOCUS FAN · SELECTED");
    expect(html).toContain("@media(prefers-reduced-motion:reduce)");
    expect(html).toContain("hover-demo:focus-visible");
    expect(markdown).toContain("Current Tasks: Focus Queue");
    expect(markdown).toContain("Content modules: illustrated and image-free");
    expect(markdown).toContain("Pixel Post-It");
    expect(markdown).toContain("Quest Ticket");
    expect(markdown).toContain("Group interaction: Focus Fan");
    expect(markdown).toContain("YOUR FOCUS QUEUE");
    expect(markdown).toContain("Add Task utility");
    expect(markdown).toContain("Breadcrumbs");
    expect(markdown).toContain("Inline Trail");
  });

  it("presents six mascot-led audience-card options without changing the live audience section", () => {
    expect(html).toContain('id="audience-card-options"');
    expect(html).toContain("OPTION 01 · MASCOT MISSIONS");
    expect(html).toContain("OPTION 02 · LITTLE WORLDS");
    expect(html).toContain("OPTION 03 · TEAM PASSPORTS");
    expect(html).toContain("OPTION 04 · TAKE-OFF DECK");
    expect(html).toContain("OPTION 05 · MASCOT PARADE");
    expect(html).toContain("OPTION 06 · POCKET ARCADE");
    expect(html).toContain('role="group" aria-label="Take-Off Deck audience-card interaction preview"');
    expect(html).toContain('role="group" aria-label="Mascot Parade audience-card interaction preview"');
    expect(html).toContain('role="group" aria-label="Pocket Arcade audience-card interaction preview"');
    expect(html).toContain("@media(prefers-reduced-motion:reduce)");
  });

  it("presents three selection-only Initiation Problem layout options using approved card patterns", () => {
    expect(html).toContain('id="initiation-layout-options"');
    expect(html).toContain("OPTION 01 · THE QUEST BOARD");
    expect(html).toContain("OPTION 02 · THE SIGNAL STACK");
    expect(html).toContain("OPTION 03 · THE FOCUS FAN CONTROL ROOM");
    expect(html).toContain("Selected implementation:</strong> Option 02 · The Signal Stack");
    expect(html).toContain("You can start and you can finish!");
    expect(html).toContain("06 · Free, no login");
    expect(html).toContain("Quest Ticket");
    expect(html).toContain("Pixel Post-It");
    expect(html).toContain("Context Strips");
    expect(html).toContain('role="group" aria-label="Focus Fan Initiation Problem capability preview"');
    expect(html).toContain("@media(prefers-reduced-motion:reduce)");
    expect(markdown).toContain("Initiation Problem: Signal Stack");
    expect(markdown).toContain("**Signal Stack** is the selected treatment");
    expect(markdown).toContain("360px minimum height");
    expect(markdown).toContain("You can start and you can finish!");
  });

  it("presents three selection-only New sticker input cues without changing the live task widget", () => {
    expect(html).toContain('id="widget-new-sticker-options"');
    expect(html).toContain("OPTION 01 · CORNER BURST");
    expect(html).toContain("OPTION 02 · FIELD NUDGE");
    expect(html).toContain("OPTION 03 · LABEL NUDGE");
    expect(html).toContain("BRAIN DUMP HERE!");
    expect(html).toContain("TYPE ANYTHING");
    expect(html).toContain("START HERE");
    expect(html).toContain("border:2px solid #26364a");
    expect(html).toContain("box-shadow:2px 2px 0 #26364a");
    expect(html).toContain("pointer-events:none");
    expect(html).toContain("textarea readonly");
    expect(homeContent).not.toContain("BRAIN DUMP HERE!");
    expect(homeContent).not.toContain("TYPE ANYTHING");
    expect(homeContent).not.toContain("new-sticker");
  });

  it("records Corner Burst as the selected live input cue", () => {
    expect(html).toContain("Selected implementation:</strong> Option 01 · Corner Burst is now applied");
    expect(markdown).toContain("The selected input cue is **Option 01 · Corner Burst**");
    expect(markdown).toContain("BRAIN DUMP HERE!");
    expect(markdown).toContain("2px ink-blue border");
  });

  it("presents three mascot-led interactive learning-path layouts without changing the live section", () => {
    expect(html).toContain('id="learning-path-layout-options"');
    expect(html).toContain("OPTION 01 · MASCOT WAYFINDER");
    expect(html).toContain("OPTION 02 · PATH PARADE");
    expect(html).toContain("OPTION 03 · QUEST CONSTELLATION");
    expect(html).toContain('role="group" aria-label="Mascot Wayfinder learning-path interaction preview"');
    expect(html).toContain('role="group" aria-label="Path Parade learning-path interaction preview"');
    expect(html).toContain('role="group" aria-label="Quest Constellation learning-path interaction preview"');
    expect(html).toContain("STARTING FEELS IMPOSSIBLE");
    expect(html).toContain("TIME KEEPS GETTING AWAY");
    expect(html).toContain("WORK WITHOUT THE OVERWHELM");
    expect(html).toContain("@media(prefers-reduced-motion:reduce)");
    expect(homeContent).not.toContain("learning-mascot");
    expect(homeContent).not.toContain("Mascot Wayfinder");
    expect(homeContent).not.toContain("Path Parade");
    expect(homeContent).not.toContain("Quest Constellation");
  });

  it("records Mascot Wayfinder as the selected linked learning-path system", () => {
    expect(html).toContain("Selected implementation:</strong> Option 01 · Mascot Wayfinder is now applied");
    expect(markdown).toContain("The selected **Option 01 · Mascot Wayfinder**");
    expect(markdown).toContain("links directly to its first recommended article");
    expect(markdown).toContain("do not show blog-title lists inside the route card");
  });

  it("presents ten Figma-informed card-layout adaptations without changing the live site", () => {
    expect(html).toContain('id="figma-card-layout-options"');
    expect(html).toContain("FIGMA-INSPIRED CARD LIBRARY");
    for (const option of ["EDITORIAL SPLIT", "COMPACT IDENTITY ROW", "THREE-PART SNAPSHOT", "QUIET METRIC LEDGER", "MEDIA-FIRST STORY", "NUMBERED FEATURE", "CENTERED FACT HUB", "TAG-RAIL UTILITY", "DATE-RAIL NOTE", "PROGRESS PULSE"]) {
      expect(html).toContain(option);
    }
    expect(html).toContain("warm canvas, single-surface rhythm, Inter reading hierarchy");
    expect(html).toContain("selection-only references");
    expect(html).toContain("@media(max-width:780px)");
    expect(html).toContain("@media(prefers-reduced-motion:reduce)");
    expect(html).toContain("original grid, spacing, and proportion logic");
    expect(html).toContain("figma-source-grid");
    expect(html).toContain("SOURCE-MEASURED FIGMA BOARD");
    expect(html).toContain("figma-measured-board");
    expect(html).toContain("repeat(5,540px)");
    expect(html).toContain("gap:36px");
    expect(html).toContain("540px frame");
    expect(html).toContain("Scroll horizontally on smaller screens");
    for (const geometryClass of ["p-editorial", "p-identity", "p-snapshot", "p-ledger", "p-media-story", "p-numbered", "p-fact-hub", "p-tag-rail", "p-date-note", "p-progress"]) {
      expect(html).toContain(geometryClass);
    }
    expect(html).toContain("figma-option-label");
    expect(homeContent).not.toContain("FIGMA-INSPIRED CARD LIBRARY");
    expect(homeContent).not.toContain("PROGRESS PULSE");
    expect(markdown).toContain("fixed **540px frame**");
    expect(markdown).toContain("**36px gutter**");
  });

  it("presents three playful creator-section directions and records Empathy Switchboard on the intended landing page", () => {
    expect(html).toContain('id="creator-layout-options"');
    expect(html).toContain("Make “built by someone who gets it” feel more alive");
    expect(html).toContain("OPTION 01 · ORIGIN ARCADE");
    expect(html).toContain("OPTION 02 · EMPATHY SWITCHBOARD");
    expect(html).toContain("OPTION 03 · THE ORIGIN QUEST LOG");
    expect(html).toContain('role="group" aria-label="Origin Arcade creator section preview"');
    expect(html).toContain('role="group" aria-label="Empathy Switchboard creator section preview"');
    expect(html).toContain('role="group" aria-label="Origin Quest Log creator section preview"');
    expect(html).toContain("prefers-reduced-motion");
    expect(markdown).toContain("Landing-page creator section options");
    expect(markdown).toContain("Origin Arcade");
    expect(markdown).toContain("Empathy Switchboard");
    expect(markdown).toContain("The Origin Quest Log");
    expect(aboutPage).not.toContain("Origin Arcade");
    expect(aboutPage).not.toContain("Empathy Switchboard");
    expect(aboutPage).not.toContain("The Origin Quest Log");
    expect(homeContent).toContain("landing-creator-switchboard");
    expect(homeContent).toContain("LIVED EXPERIENCE");
    expect(homeContent).toContain("PRODUCT PRACTICE");
  });

  it("presents three selection-only final CTA alignment directions without changing the live CTA", () => {
    expect(html).toContain('id="final-cta-alignment-options"');
    expect(html).toContain("OPTION 01 · BALANCED BUDDY");
    expect(html).toContain("OPTION 01 · BALANCED BUDDY · SELECTED");
    expect(html).toContain("OPTION 02 · ACTION PEDESTAL");
    expect(html).toContain("OPTION 03 · FINISH-LINE GUIDE");
    expect(html).toContain('role="group" aria-label="Balanced Buddy final CTA alignment preview"');
    expect(html).toContain('role="group" aria-label="Action Pedestal final CTA alignment preview"');
    expect(html).toContain('role="group" aria-label="Finish-Line Guide final CTA alignment preview"');
    expect(html).toContain("You got this.");
    expect(html).toContain("audience-howitworks-remote-workers_7ce7f448.png");
    expect(html).toContain("prefers-reduced-motion");
    expect(markdown).toContain("Final CTA alignment options");
    expect(markdown).toContain("Balanced Buddy");
    expect(markdown).toContain("Action Pedestal");
    expect(markdown).toContain("Finish-Line Guide");
    expect(markdown).toContain("**Selected implementation: Option 01 · Balanced Buddy.**");
    expect(markdown).toContain("no dotted vertical divider");
    expect(homeContent).not.toContain("BALANCED BUDDY");
    expect(homeContent).not.toContain("ACTION PEDESTAL");
    expect(homeContent).not.toContain("FINISH-LINE GUIDE");
  });

  it("does not fabricate aggregate ratings in structured data", () => {
    expect(enhancedSchema).not.toContain('"aggregateRating"');
    expect(enhancedSchema).not.toContain("ratingCount");
    expect(enhancedSchema).not.toContain('"SearchAction"');
    expect(enhancedSchema).not.toContain("https://www.dothething.tech");
    expect(enhancedSchema).toContain('"@id": "https://dothething.tech/#organization"');
  });
});
