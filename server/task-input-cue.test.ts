import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = path.resolve(import.meta.dirname, "..");
const home = fs.readFileSync(path.join(projectRoot, "client/src/pages/Home.tsx"), "utf8");
const styles = fs.readFileSync(path.join(projectRoot, "client/src/pixel-art-refined.css"), "utf8");

describe("selected Gentle Typewriter task-input cue", () => {
  it("uses rotating, relatable examples as a visual-only overlay instead of input data", () => {
    expect(home).toContain("const taskInputCuePrompts = [");
    expect(home).toContain("Email the dentist, reply to Sam");
    expect(home).toContain("Write the report. Start the report.");
    expect(home).toContain('className="reference-task-input-overlay" aria-hidden="true"');
    expect(home).toContain("taskInputCuePrompts.map((prompt, index) => (");
    expect(home).not.toContain("setBrainDump(taskInputCuePrompts");
  });

  it("shows the cue only while the field is empty and not focused, preserving normal text entry", () => {
    expect(home).toContain("!brainDump && !isTaskInputFocused");
    expect(home).toContain('aria-label="Task or brain dump"');
    expect(home).toContain("onFocus={() => setIsTaskInputFocused(true)}");
    expect(home).toContain("onBlur={() => setIsTaskInputFocused(false)}");
    expect(home).toContain("onChange={(e) => setBrainDump(e.target.value)}");
  });

  it("uses the selected VT323-style cursor and honors reduced-motion preferences", () => {
    expect(styles).toContain(".reference-task-input-overlay");
    expect(styles).toContain("pointer-events:none");
    expect(styles).toContain("font-family:var(--display-font)!important");
    expect(styles).toContain(".reference-task-input-cursor");
    expect(styles).toContain("reference-task-cursor-blink");
    expect(styles).toContain("animation:reference-task-prompt-rotate 20s steps(1,end) infinite");
    expect(styles).toContain("@keyframes reference-task-prompt-rotate{0%,25%{opacity:1");
    expect(styles).toContain("25.01%,100%{opacity:0");
    expect(styles).toContain("@media(prefers-reduced-motion:reduce)");
    expect(styles).toContain(".reference-task-input-prompt:first-child{opacity:1}");
  });
});
