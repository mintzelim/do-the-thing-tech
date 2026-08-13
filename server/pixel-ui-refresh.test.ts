import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const stylesheet = readFileSync(
  resolve(process.cwd(), "client/src/pixel-art-refined.css"),
  "utf8",
);

describe("approved hybrid pixel-art UI refresh", () => {
  it("keeps the readable UI font separate from the pixel display font", () => {
    expect(stylesheet).toContain('--ui-font: Inter');
    expect(stylesheet).toContain('--display-font: VT323');
    expect(stylesheet).toContain("body { font-family: var(--ui-font)");
    expect(stylesheet).toContain("font-family: var(--display-font) !important");
  });

  it("defines the calm warm canvas, ink border, and indigo action palette", () => {
    expect(stylesheet).toContain("--pixel-bg: #f6f5f2");
    expect(stylesheet).toContain("--pixel-border: #26364a");
    expect(stylesheet).toContain("--pixel-accent: #5b5ce2");
    expect(stylesheet).toContain("--pixel-card-bg: #fffefb");
  });

  it("provides visible keyboard focus and mobile touch-target safeguards", () => {
    expect(stylesheet).toContain("button:focus-visible");
    expect(stylesheet).toContain("outline-offset: 3px");
    expect(stylesheet).toContain("min-height: 48px");
    expect(stylesheet).toContain("@media (prefers-reduced-motion: reduce)");
  });

  it("keeps the refresh presentation-only and preserves the existing widget anchor", () => {
    expect(stylesheet).toContain("#widget { scroll-margin-top: 24px; }");
    expect(stylesheet).toContain("Visual-only scope: existing routes, content, and feature classes remain unchanged.");
  });
});


describe("post-hero copy preservation", () => {
  it("keeps the approved lower landing section copy in the source", () => {
    const homeContent = readFileSync(
      resolve(process.cwd(), "client/src/components/HomeContent.tsx"),
      "utf8",
    );

    const preservedCopy = [
      "How It Works",
      "Five steps. Under a minute.",
      "Built for the Initiation Problem",
      "A Productivity Tool for Anyone Whose Brain Works Differently",
      "Frequently Asked Questions",
      "Built by Someone Who Gets It",
      "Start Here: Choose Your Learning Path",
      "Featured Posts: ADHD & Productivity",
      "Try DoTheThing Now",
    ];

    for (const copy of preservedCopy) {
      expect(homeContent).toContain(copy);
    }
    expect(homeContent).not.toContain("The AI Does the Planning. You Do the Thing.");
    expect(homeContent).not.toContain("You know the feeling. Task open. Brain closed.");
  });
});


describe("mascot-only How It Works cards", () => {
  it("keeps the five step labels and uses the approved mascot illustrations", () => {
    const homeContent = readFileSync(
      resolve(process.cwd(), "client/src/components/HomeContent.tsx"),
      "utf8",
    );

    expect((homeContent.match(/className="how-it-works-mascot"/g) ?? []).length).toBe(5);
    expect(homeContent).toContain("Brain Dump");
    expect(homeContent).toContain("Pick Your Focus Level");
    expect(homeContent).toContain("Choose Your Breakdown Size");
    expect(homeContent).toContain("Get Your Breakdown");
    expect(homeContent).toContain("Use the Timer");
    expect(stylesheet).toContain(".how-it-works-mascot");
  });
});


describe("single-surface landing panels", () => {
  it("keeps the Initiation Problem and CTA wrappers transparent so each section has one visible card", () => {
    const homeContent = readFileSync(
      resolve(process.cwd(), "client/src/components/HomeContent.tsx"),
      "utf8",
    );

    expect(homeContent).toContain('className="initiation-feature-panel"');
    expect(homeContent).toContain('className="cta-reference-card"');
    expect(stylesheet).toContain(".content-section.initiation-section,.content-section.cta-section{background:transparent");
    expect(stylesheet).toContain("border-left:0");
  });
});


describe("hero-matched CTA and headlines", () => {
  it("preserves the CTA copy, widget anchor, and unified headline styling", () => {
    const homeContent = readFileSync(
      resolve(process.cwd(), "client/src/components/HomeContent.tsx"),
      "utf8",
    );

    expect(homeContent).toContain("Ready to Break Down Your First Task?");
    expect(homeContent).toContain("Stop overthinking. Start with one small step.");
    expect(homeContent).toContain('href="#widget"');
    expect(homeContent).toContain("/manus-storage/dothething-cta-flag_aa5cdcdc.png");
    expect(stylesheet).toContain(".content-section > .section-heading");
    expect(stylesheet).toContain(".cta-reference-card");
    expect(stylesheet).toContain("object-fit:contain");
    expect(stylesheet).toContain("transform:none");
  });
});

describe("shared landing-section text alignment", () => {
  it("centers the How It Works and audience headline support copy on one text grid", () => {
    expect(stylesheet).toContain(".content-section > .section-heading + .section-subtitle,.audience-section > .section-subtitle{display:block;width:min(100%,720px)");
    expect(stylesheet).toContain("margin-right:auto!important;margin-left:auto!important;text-align:center!important");
    expect(stylesheet).toContain(".audience-support-copy{width:min(100%,720px)");
    expect(stylesheet).toContain("margin:30px auto 0!important");
  });
});


describe("mascot-led audience grid", () => {
  it("keeps five audience groups with mascot-only image assets and preserved audience copy", () => {
    const homeContent = readFileSync(
      resolve(process.cwd(), "client/src/components/HomeContent.tsx"),
      "utf8",
    );

    expect((homeContent.match(/className="audience-card"/g) ?? []).length).toBe(5);
    expect((homeContent.match(/className="audience-card-mascot"/g) ?? []).length).toBe(5);
    expect(homeContent).toContain("A Productivity Tool for Anyone Whose Brain Works Differently");
    expect(homeContent).toContain("Our AI task breakdown tool is for:");
    expect(homeContent).toContain("Remote Workers & Freelancers:");
    expect(homeContent).toContain("Employees & Corporate Teams:");
    expect(homeContent).toContain("Project Managers:");
    expect(homeContent).toContain("Parents:");
    expect(homeContent).toContain("WHO World Mental Health Survey");
    expect(homeContent).toContain("audience-howitworks-students_4055d5ad.png");
    expect(homeContent).toContain("audience-howitworks-remote-workers_7ce7f448.png");
    expect(homeContent).toContain("audience-howitworks-employees_e7e52497.png");
    expect(homeContent).toContain("audience-howitworks-project-managers_4856400a.png");
    expect(homeContent).toContain("audience-howitworks-parents_e566bb8e.png");
    expect(homeContent).not.toContain("Image generation failed");
    expect(homeContent).not.toContain("audience-howitworks-students_2a4f1f43.png");
    expect(homeContent).not.toContain("audience-students-pixel_");
    expect(stylesheet).toContain(".audience-grid{display:grid;width:100%;max-width:1120px;grid-template-columns:repeat(5");
    expect(stylesheet).toContain(".audience-card-mascot");
    expect(stylesheet).toContain("width:min(100%,132px);height:108px");
    expect(stylesheet).toContain(".audience-card{display:flex;flex-direction:column;align-items:center;min-height:437px;padding:20px");
    expect(stylesheet).toContain(".audience-card h3{margin:0 0 8px");
    expect(stylesheet).toContain("max-width:1120px");
    expect(stylesheet).toContain(".audience-card:nth-child(4){grid-column:2/span 2}");
    expect(stylesheet).toContain(".audience-card:last-child{grid-column:1/-1");
  });
});
