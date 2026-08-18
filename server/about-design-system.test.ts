import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const aboutPage = readFileSync(resolve(process.cwd(), "client/src/pages/About.tsx"), "utf8");
const aboutStyles = readFileSync(resolve(process.cwd(), "client/src/about-refined.css"), "utf8");
const aboutRhythm = readFileSync(resolve(process.cwd(), "client/src/about-rhythm.css"), "utf8");
const designSystem = readFileSync(resolve(process.cwd(), "docs/dothething-landing-design-system.md"), "utf8");
const visualReference = readFileSync(resolve(process.cwd(), "docs/dothething-landing-design-system.html"), "utf8");

describe("About page design-system refresh", () => {
  it("uses the landing shell, contextual eyebrow treatment, and documented visual hierarchy", () => {
    expect(aboutPage).toContain('className="mobile-frame about-page"');
    expect(aboutPage).toContain('className="about-shell"');
    expect(aboutPage).toContain("ABOUT DOTHETHING");
    expect(aboutPage).toContain("WHAT THIS TOOL SUPPORTS");
    expect(aboutPage).toContain("READY WHEN YOU ARE");
    expect(aboutPage).not.toContain("A SMALLER NEXT STEP");
    expect(aboutPage).toContain("about-panel about-creator-panel about-workbench-profile");
    expect(aboutPage).toContain("about-cta about-cta-ink about-workbench-cta");
    expect(aboutStyles).toContain("width:min(calc(100% - 32px),1240px)");
    expect(aboutStyles).toContain("border:1px solid #a8afc2");
    expect(aboutStyles).toContain("border-radius:14px");
    expect(aboutStyles).toContain("font-family:var(--ui-font)");
  });

  it("states the public business type, audience, and practical differentiator directly in the approved hero", () => {
    expect(aboutPage).toContain("DoTheThing is a free online task-breakdown tool for people with ADHD and executive-function friction.");
    expect(aboutPage).toContain("Turn brain dumps into smaller steps, focus-aware estimates, and an editable plan you can start today.");
    expect(aboutPage).not.toContain("Understanding ADHD, Task Management, and Why We Built This App");
    expect(aboutPage).toContain("This site combines lived experience with clearly sourced educational material.");
    expect(aboutPage).toContain("This tool exists because I needed it. And if you're reading this, you probably need it too.");
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

  it("uses documented layout rhythm rather than new color treatments", () => {
    expect(aboutPage).toContain("about-challenges-section about-workbench-library");
    expect(aboutPage).toContain("about-product-panel about-accent-band about-workbench-product");
    expect(aboutRhythm).toContain("grid-template-columns: repeat(12, minmax(0, 1fr))");
    expect(aboutRhythm).toContain("grid-column: 3 / span 4");
    expect(aboutRhythm).toContain("grid-template-columns: repeat(6, minmax(0, 1fr))");
    expect(aboutRhythm).toContain("background: transparent");
    expect(designSystem).toContain("Alternate public-page rhythm");
    expect(designSystem).toContain("The variation comes from proportion, alignment, and intentional row balancing—not additional color treatments.");
    expect(visualReference).toContain("Alternate layout patterns");
    expect(visualReference).toContain("Wide editorial panel");
  });

  it("applies the approved Workbench composition with measured desktop and mobile spacing", () => {
    expect(aboutPage).toContain('className="about-hero about-workbench-hero"');
    expect(aboutPage).toContain("about-workbench-profile");
    expect(aboutPage).toContain("about-workbench-mission");
    expect(aboutPage).toContain("about-workbench-library");
    expect(aboutPage).toContain("about-workbench-product");
    expect(aboutPage).toContain("about-workbench-workflow");
    expect(aboutPage).toContain("about-workbench-audience");
    expect(aboutPage).toContain("about-workbench-cta");
    expect(aboutRhythm).toContain("--workbench-panel-padding");
    expect(aboutRhythm).toContain("grid-template-areas: \"art copy\"");
    expect(aboutRhythm).toContain("width: min(calc(100% - 32px), 1120px)");
    expect(aboutRhythm).toContain("@media (max-width: 900px)");
    expect(aboutRhythm).toContain("@media (max-width: 620px)");
    expect(aboutPage).toContain("not a substitute for diagnosis or medical care");
  });

  it("uses open editorial fields rather than repeated nested card surfaces in the Workbench sections", () => {
    expect(aboutRhythm).toContain("Surface-rhythm refinement: open fields");
    expect(aboutRhythm).toContain(".about-workbench-library .about-mini-card");
    expect(aboutRhythm).toContain(".about-workbench-product .about-feature-grid .about-mini-card");
    expect(aboutRhythm).toContain(".about-workbench-workflow .about-step-card");
    expect(aboutRhythm).toContain("border-left: 1px solid #d9dce4");
    expect(aboutRhythm).toContain("background: transparent");
    expect(aboutRhythm).toContain("box-shadow: none");
  });

  it("uses the selected Pixel Post-It and Quest Ticket modules only for fitting About-page content", () => {
    expect(aboutPage).toContain('className="about-postit-note"');
    expect(aboutPage).toContain("about-quest-ticket-grid");
    expect(aboutRhythm).toContain("Selected text-first modules: Pixel Post-It for one warm reframe; Quest Tickets for actionable capabilities.");
    expect(aboutRhythm).toContain(".about-postit-note");
    expect(aboutRhythm).toContain(".about-workbench-product .about-feature-grid.about-quest-ticket-grid");
    expect(aboutRhythm).toContain("counter-reset: capability");
    expect(aboutPage).toContain("This tool exists because I needed it. And if you're reading this, you probably need it too.");
  });

  it("applies the selected Pixel Post-It treatment to the existing Common challenges grid without changing its content", () => {
    expect(aboutPage).toContain("about-challenge-grid about-postit-challenge-grid");
    expect(aboutRhythm).toContain("Pixel Post-Its make the Common challenges section feel helpful and human");
    expect(aboutRhythm).toContain(".about-postit-challenge-grid");
    expect(aboutRhythm).toContain("box-shadow: 5px 5px 0 #d9c6f4");
    expect(aboutRhythm).toContain("Common challenges section feel helpful");
    expect(aboutPage).toContain("Time Blindness");
    expect(aboutPage).toContain("Hyperfocus Variability");
  });

  it("applies the selected Focus Fan interaction to the six existing product capability cards", () => {
    expect(aboutPage).toContain("about-quest-ticket-grid about-focus-fan");
    expect(aboutPage).toContain('aria-label="Six DoTheThing product capabilities"');
    expect(aboutRhythm).toContain("Selected group interaction: Focus Fan opens six related Quest Tickets as one capability set.");
    expect(aboutRhythm).toContain(".about-focus-fan:hover .about-mini-card:nth-child(6)");
    expect(aboutRhythm).toContain("@media (prefers-reduced-motion: reduce)");
    expect(aboutPage).toContain("AI Task Breakdown");
    expect(aboutPage).toContain("No Login Required");
  });
});
