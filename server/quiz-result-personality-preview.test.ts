import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const previewPath = resolve(process.cwd(), "docs/quiz-results-personality-preview.html");

describe("quiz result personality-style preview", () => {
  it("keeps all seven reader-facing patterns and their distinct mascot-scene directions in the approval-only preview", () => {
    const html = readFileSync(previewPath, "utf8");
    const patterns = ["classic", "inattentive", "overfocused", "temporal", "limbic", "ringOfFire", "anxious"];

    expect(html).toContain("APPROVAL-ONLY PREVIEW");
    expect(html).toContain("not connected to the live quiz");
    expect(patterns.every((pattern) => html.includes(`data-result-key=\"${pattern}\"`))).toBe(true);
    expect(html).toContain("The Spark Starter");
    expect(html).toContain("The Thought Wanderer");
    expect(html).toContain("The Deep-Dive Mind");
    expect(html).toContain("The Signal Catcher");
    expect(html).toContain("The Mood-Powered Mind");
    expect(html).toContain("The Many-Tabs Mind");
    expect(html).toContain("The Careful Scout");
    expect(html).toContain("The same mascot, a different tiny situation for each result.");
  });

  it("uses direct everyday language and preserves the non-diagnostic boundary", () => {
    const html = readFileSync(previewPath, "utf8");

    expect(html).toContain("a completely different sport");
    expect(html).toContain("sixteen tabs are playing at once");
    expect(html).toContain("climbing a mountain in flip-flops");
    expect(html).toContain("self-reflection patterns, not a medical label");
    expect(html).toContain("No clinical shorthand is needed");
  });
});
