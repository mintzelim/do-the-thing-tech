import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const markdown = readFileSync(resolve(process.cwd(), "docs/dothething-landing-design-system.md"), "utf8");
const html = readFileSync(resolve(process.cwd(), "docs/dothething-landing-design-system.html"), "utf8");

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
    expect(markdown).toContain("Current Tasks: Focus Queue");
    expect(markdown).toContain("YOUR FOCUS QUEUE");
    expect(markdown).toContain("Add Task utility");
    expect(markdown).toContain("Breadcrumbs");
    expect(markdown).toContain("Inline Trail");
  });
});
