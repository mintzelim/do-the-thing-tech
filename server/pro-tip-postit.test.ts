import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = path.resolve(import.meta.dirname, "..");
const tutorial = fs.readFileSync(path.join(projectRoot, "client/src/components/PinTabTutorial.tsx"), "utf8");
const styles = fs.readFileSync(path.join(projectRoot, "client/src/pixel-art-refined.css"), "utf8");

describe("selected Pro Tip Pixel Post-It", () => {
  it("applies the Post-It treatment only to the homepage side-panel variant", () => {
    expect(tutorial).toContain('"reference-pro-tip-panel reference-pro-tip-post-it"');
    expect(tutorial).toContain('className="flex items-start gap-3 reference-pro-tip-content"');
  });

  it("keeps the existing instruction, action, and dismiss control intact", () => {
    expect(tutorial).toContain("Pro Tip: Pin this tab so I stay safe while you work!");
    expect(tutorial).toContain("Pin this tab to keep your tasks close. Check off steps and keep track as you go!");
    expect(tutorial).toContain("GOT IT");
    expect(tutorial).toContain('aria-label="Close tutorial"');
  });

  it("uses the exact approved Pixel Post-It surface, outline, shadow, rotation, and motion fallback", () => {
    expect(styles).toContain(".reference-pro-tip-panel.reference-pro-tip-post-it");
    expect(styles).toContain("padding:16px 17px 17px");
    expect(styles).toContain("border:1px solid #a8afc2");
    expect(styles).toContain("border-radius:8px");
    expect(styles).toContain("background:#fff8bf");
    expect(styles).toContain("box-shadow:4px 4px 0 #d9c6f4");
    expect(styles).toContain("transform:rotate(-1.1deg)");
    expect(styles).toContain("@media(prefers-reduced-motion:reduce){.reference-pro-tip-panel.reference-pro-tip-post-it{transform:none}");
  });
});
