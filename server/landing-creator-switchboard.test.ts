import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const homeContent = readFileSync(resolve(process.cwd(), "client/src/components/HomeContent.tsx"), "utf8");
const homeStyles = readFileSync(resolve(process.cwd(), "client/src/pixel-art-refined.css"), "utf8");
const aboutPage = readFileSync(resolve(process.cwd(), "client/src/pages/About.tsx"), "utf8");
const aboutStyles = readFileSync(resolve(process.cwd(), "client/src/about-rhythm.css"), "utf8");
const designSystemHtml = readFileSync(resolve(process.cwd(), "docs/dothething-landing-design-system.html"), "utf8");
const designSystemMarkdown = readFileSync(resolve(process.cwd(), "docs/dothething-landing-design-system.md"), "utf8");

describe("Landing-page creator Empathy Switchboard", () => {
  it("applies the selected structure to the existing landing creator copy and route", () => {
    expect(homeContent).toContain('className="content-section landing-creator-switchboard"');
    expect(homeContent).toContain('id="landing-creator-heading"');
    expect(homeContent).toContain("Built by Someone Who Gets It");
    expect(homeContent).toContain("DoTheThing was built by Lim Min Tze");
    expect(homeContent).toContain("The site separates lived experience from research");
    expect(homeContent).toContain('href="/about"');
    expect(homeContent).toContain("LEARN MORE ABOUT THE CREATOR");
    expect(homeContent).toContain('className="reference-eyebrow landing-creator-kicker"');
    expect(homeContent).toContain('className="reference-primary-action landing-creator-action"');
    expect(homeContent).toContain("dothething-how-it-works-brain-dump-transparent_805dc4d4.png");
  });

  it("renders the three Switchboard inputs as visible explanatory structure with responsive and reduced-motion treatment", () => {
    for (const label of ["LIVED EXPERIENCE", "PRODUCT PRACTICE", "RESEARCH &amp; INTERVIEWS"]) {
      expect(homeContent).toContain(label);
    }
    expect(homeContent).toContain('aria-label="The product perspectives that shape DoTheThing"');
    expect(homeContent).toContain('className="landing-creator-input"');
    expect(homeStyles).toContain(".landing-creator-switchboard");
    expect(homeStyles).toContain(".landing-creator-inputs");
    expect(homeStyles).toContain(".landing-creator-art");
    expect(homeStyles).toContain("font-family:var(--ui-font)!important");
    expect(homeStyles).toContain("font-weight:800!important");
    expect(homeStyles).toContain("font-size:clamp(2.45rem,5vw,4.6rem)!important");
    expect(homeStyles).toContain("@media (max-width:860px)");
    expect(homeStyles).toContain("@media (prefers-reduced-motion: reduce)");
  });

  it("restores the About-page creator composition and records the correct landing-page selection", () => {
    expect(aboutPage).toContain("about-workbench-profile");
    expect(aboutPage).not.toContain("about-switchboard-profile");
    expect(aboutPage).not.toContain("about-switchboard-inputs");
    expect(aboutStyles).not.toContain(".about-switchboard-profile");
    expect(designSystemHtml).toContain("LANDING-PAGE CREATOR SECTION");
    expect(designSystemHtml).toContain("landing-page “Built by Someone Who Gets It” section");
    expect(designSystemHtml).toContain("OPTION 02 · EMPATHY SWITCHBOARD · SELECTED");
    expect(designSystemMarkdown).toContain("Landing-page creator section options");
    expect(designSystemMarkdown).toContain("existing **“Built by Someone Who Gets It”** headline");
  });
});
