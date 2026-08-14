import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const markdown = readFileSync(resolve(process.cwd(), "docs/dothething-landing-design-system.md"), "utf8");
const html = readFileSync(resolve(process.cwd(), "docs/dothething-landing-design-system.html"), "utf8");
const enhancedSchema = readFileSync(resolve(process.cwd(), "client/src/lib/enhancedSchema.ts"), "utf8");

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
    expect(html).toContain("Quest Ticket");
    expect(html).toContain("Pixel Post-It");
    expect(html).toContain("Context Strips");
    expect(html).toContain('role="group" aria-label="Focus Fan Initiation Problem capability preview"');
    expect(html).toContain("@media(prefers-reduced-motion:reduce)");
  });

  it("does not fabricate aggregate ratings in structured data", () => {
    expect(enhancedSchema).not.toContain('"aggregateRating"');
    expect(enhancedSchema).not.toContain("ratingCount");
    expect(enhancedSchema).not.toContain('"SearchAction"');
    expect(enhancedSchema).not.toContain("https://www.dothething.tech");
    expect(enhancedSchema).toContain('"@id": "https://dothething.tech/#organization"');
  });
});
