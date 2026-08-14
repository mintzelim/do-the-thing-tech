import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const aboutPage = readFileSync(resolve(process.cwd(), "client/src/pages/About.tsx"), "utf8");
const aboutStyles = readFileSync(resolve(process.cwd(), "client/src/about-rhythm.css"), "utf8");
const designSystemHtml = readFileSync(resolve(process.cwd(), "docs/dothething-landing-design-system.html"), "utf8");
const designSystemMarkdown = readFileSync(resolve(process.cwd(), "docs/dothething-landing-design-system.md"), "utf8");

describe("About creator Empathy Switchboard", () => {
  it("applies the selected layout while retaining the existing creator narrative, evidence, and profile links", () => {
    expect(aboutPage).toContain('about-switchboard-profile');
    expect(aboutPage).toContain('role="group"');
    expect(aboutPage).toContain('aria-labelledby="creator-heading"');
    expect(aboutPage).toContain("MEET THE CREATOR");
    expect(aboutPage).toContain("Lim Min Tze — founder, product developer, and the person behind DoTheThing.");
    expect(aboutPage).toContain("This site combines lived experience with clearly sourced educational material.");
    expect(aboutPage).toContain("DoTheThing was built by");
    expect(aboutPage).toContain("I spent months researching ADHD neuroscience");
    expect(aboutPage).toContain("Founder of");
    expect(aboutPage).toContain("Interviewed 50+ people with ADHD");
    expect(aboutPage).toContain("This tool exists because I needed it.");
    expect(aboutPage).toContain("https://www.linkedin.com/in/min-tze-lim");
    expect(aboutPage).toContain("https://github.com/mintzelim");
    expect(aboutPage).toContain("support@dothething.tech");
  });

  it("renders the three selected Switchboard inputs as visible explanatory structure, not interactive controls", () => {
    for (const label of ["LIVED EXPERIENCE", "PRODUCT PRACTICE", "RESEARCH &amp; INTERVIEWS"]) {
      expect(aboutPage).toContain(label);
    }
    expect(aboutPage).toContain("aria-label=\"The creator perspectives that shaped DoTheThing\"");
    expect(aboutPage).toContain('className="about-switchboard-row"');
    expect(aboutPage).toContain('<i aria-hidden="true"></i><b>LIVED EXPERIENCE</b><span>ON</span>');
    expect(aboutStyles).toContain(".about-switchboard-inputs");
    expect(aboutStyles).toContain(".about-switchboard-row");
    expect(aboutStyles).toContain(".about-switchboard-art");
    expect(aboutStyles).toContain("@media (prefers-reduced-motion: reduce)");
  });

  it("records Empathy Switchboard as the selected design-system implementation", () => {
    expect(designSystemHtml).toContain("Selected implementation:</strong> Option 02 · Empathy Switchboard is now applied");
    expect(designSystemHtml).toContain("OPTION 02 · EMPATHY SWITCHBOARD · SELECTED");
    expect(designSystemMarkdown).toContain("**Selected implementation: Empathy Switchboard.**");
    expect(designSystemMarkdown).toContain("existing **“MEET THE CREATOR”** heading");
  });
});
