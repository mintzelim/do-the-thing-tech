import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const aboutPage = readFileSync(resolve(process.cwd(), "client/src/pages/About.tsx"), "utf8");
const aboutStyles = readFileSync(resolve(process.cwd(), "client/src/about-refined.css"), "utf8");

describe("About page design-system refresh", () => {
  it("uses the landing shell, contextual eyebrow treatment, and documented visual hierarchy", () => {
    expect(aboutPage).toContain('className="mobile-frame about-page"');
    expect(aboutPage).toContain('className="about-shell"');
    expect(aboutPage).toContain("ABOUT DOTHETHING");
    expect(aboutPage).toContain("WHAT THIS TOOL SUPPORTS");
    expect(aboutPage).toContain("READY WHEN YOU ARE");
    expect(aboutPage).not.toContain("A SMALLER NEXT STEP");
    expect(aboutPage).toContain('className="about-panel about-creator-panel"');
    expect(aboutPage).toContain('className="about-cta about-cta-ink"');
    expect(aboutStyles).toContain("width:min(calc(100% - 32px),1240px)");
    expect(aboutStyles).toContain("border:1px solid #a8afc2");
    expect(aboutStyles).toContain("border-radius:14px");
    expect(aboutStyles).toContain("font-family:var(--ui-font)");
  });

  it("uses existing abstract purple mascot assets rather than human creator artwork", () => {
    expect(aboutPage).toContain("dothething-how-it-works-focus-transparent_c55dcc2f.png");
    expect(aboutPage).toContain("dothething-how-it-works-brain-dump-transparent_805dc4d4.png");
    expect(aboutPage).toContain("dothething-how-it-works-breakdown-transparent_3a48d1ce.png");
    expect(aboutPage).toContain("dothething-how-it-works-timer-transparent_f4de844b.png");
    expect(aboutPage).not.toContain("dothething-creator-avatar_65ec01fa.png");
    expect(aboutStyles).toContain("image-rendering:pixelated");
  });

  it("preserves concise, reduced-motion-safe interactions and responsive panel behavior", () => {
    expect(aboutStyles).toContain("transform 140ms");
    expect(aboutStyles).toContain("@media (prefers-reduced-motion:reduce)");
    expect(aboutStyles).toContain("@media (max-width:860px)");
    expect(aboutStyles).toContain("@media (max-width:560px)");
    expect(aboutPage).toContain("Creator professional profiles");
    expect(aboutPage).toContain("not a substitute for diagnosis or medical care");
  });
});
