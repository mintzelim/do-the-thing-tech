import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const projectRoot = path.resolve(import.meta.dirname, "..");
const home = fs.readFileSync(path.join(projectRoot, "client/src/pages/Home.tsx"), "utf8");
const styles = fs.readFileSync(path.join(projectRoot, "client/src/landing-system-reconciliation.css"), "utf8");

describe("hero mascot proof bubble", () => {
  it("moves the requested proof point into the hero mascot speech bubble", () => {
    expect(home).toContain('className="hero-mascot-proof-bubble">Free. No login. Under a minute.</p>');
    expect(home).toContain('className="reference-hero-visual"');
  });

  it("removes the redundant hero-supporting paragraph while preserving the headline, description, and actions", () => {
    expect(home).not.toContain("Type any task or brain dump the whole pile.");
    expect(home).not.toContain("reference-hero-supporting-copy");
    expect(home).toContain("Make the next thing doable.");
    expect(home).toContain("Break tasks into smaller steps, build momentum,");
    expect(home).toContain("START A TASK");
    expect(home).toContain("EXPLORE GUIDES");
  });

  it("uses the established speech-bubble treatment with responsive placement", () => {
    expect(styles).toContain(".hero-mascot-proof-bubble {");
    expect(styles).toContain("border: 2px solid var(--pixel-border)");
    expect(styles).toContain("background: #fffefb");
    expect(styles).toContain("font-family: var(--display-font)");
    expect(styles).toContain(".hero-mascot-proof-bubble::after");
    expect(styles).toContain("width: min(166px, 56%)");
  });

  it("sets the final CTA encouragement bubble in VT323 too", () => {
    expect(styles).toContain(".final-cta-surface .final-cta-bubble {");
    expect(styles).toContain("font-size: 1.12rem");
    expect((styles.match(/font-family: var\(--display-font\)/g) ?? []).length).toBeGreaterThanOrEqual(2);
  });
});
