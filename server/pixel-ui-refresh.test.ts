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

describe("homepage visual-edit safeguards", () => {
  it("replaces the marked visual-only plan preview with the existing Pro Tip without removing the task input workflow", () => {
    const home = readFileSync(resolve(process.cwd(), "client/src/pages/Home.tsx"), "utf8");
    const tutorial = readFileSync(resolve(process.cwd(), "client/src/components/PinTabTutorial.tsx"), "utf8");

    expect(home).not.toContain('className="reference-plan-card"');
    expect(home).not.toContain("Today’s plan");
    expect(home).not.toContain("VIEW FULL PLAN");
    expect(home).toContain('className="reference-pro-tip-slot"');
    expect(home).toContain('variant="task-side-panel"');
    expect(home).toContain('id="widget"');
    expect(home).toContain("BREAK IT DOWN");
    expect(home).toContain("PinTabTutorial");
    expect(tutorial).toContain('variant?: "default" | "task-side-panel"');
    expect(tutorial).toContain("Pro Tip: Pin this tab so I stay safe while you work!");
    expect(stylesheet).toContain(".reference-task-layout{display:grid;grid-template-columns:minmax(0,1fr) 330px;align-items:start;gap:24px;margin:0 0 34px}");
    expect(stylesheet).toContain(".reference-pro-tip-panel");
  });

  it("adds the selected Corner Burst as a decorative, design-system-aligned input cue without changing typing behavior", () => {
    const home = readFileSync(resolve(process.cwd(), "client/src/pages/Home.tsx"), "utf8");

    expect(home).toContain('className="reference-task-input-cue"');
    expect(home).toContain('className="reference-input-corner-burst" aria-hidden="true">BRAIN DUMP HERE!');
    expect(home).toContain('aria-label="Task or brain dump"');
    expect(home).toContain('value={brainDump}');
    expect(home).toContain('onChange={(e) => setBrainDump(e.target.value)}');
    expect(stylesheet).toContain(".reference-task-input-cue{position:relative;margin-bottom:10px}");
    expect(stylesheet).toContain("border:2px solid var(--pixel-border)");
    expect(stylesheet).toContain("background:#ffd24a");
    expect(stylesheet).toContain("box-shadow:2px 2px 0 var(--pixel-border)");
    expect(stylesheet).toContain("transform:rotate(-6deg)");
    expect(stylesheet).toContain("pointer-events:none");
    expect(stylesheet).toContain("@media(max-width:560px){.reference-input-corner-burst");
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

  it("uses the selected Signal Stack to preserve each Initiation Problem statement in a scan-first layout", () => {
    const homeContent = readFileSync(
      resolve(process.cwd(), "client/src/components/HomeContent.tsx"),
      "utf8",
    );

    expect(homeContent).toContain('className="initiation-panel-features initiation-signal-stack"');
    expect((homeContent.match(/className="initiation-signal-strip"/g) ?? []).length).toBe(6);
    expect((homeContent.match(/className="initiation-signal-note"/g) ?? []).length).toBe(0);
    expect((homeContent.match(/className="initiation-access-highlight"/g) ?? []).length).toBe(0);
    expect((homeContent.match(/className="initiation-post-it"/g) ?? []).length).toBe(1);
    expect(homeContent).toContain("AI task breakdown.</strong> Vague becomes specific in seconds.");
    expect(homeContent).toContain("Focus-level adjustment.</strong> Estimates match today's capacity, whatever that looks like.");
    expect(homeContent).toContain("ADHD time buffers.</strong> 20–30% built into every estimate.");
    expect(homeContent).toContain("Visual countdown timer.</strong> Time becomes something you can see.");
    expect(homeContent).toContain("Brain dump mode.</strong> Type the whole pile. The AI finds the work.");
    expect(homeContent).toContain("Free. No login.</strong> Open the tab. Start.");
    expect(homeContent).toContain("You can start and you can finish!");
    expect(stylesheet).toContain(".initiation-panel-features.initiation-signal-stack{display:grid;gap:0");
    expect(stylesheet).toContain(".initiation-signal-strip{display:grid;grid-template-columns:34px minmax(0,1fr)");
    expect(stylesheet).toContain(".initiation-post-it{margin:22px 0 0;padding:15px 16px 17px");
    expect(stylesheet).toContain("box-shadow:3px 3px 0 #d9c6f4");
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
    expect((homeContent.match(/className="audience-card-world"/g) ?? []).length).toBe(5);
    expect(homeContent).toContain("A Productivity Tool for Anyone Whose Brain Works Differently");
    expect(homeContent).toContain("Our AI task breakdown tool is for:");
    expect(homeContent).toContain("<h3>Students</h3>");
    expect(homeContent).toContain("<h3>Remote Workers & Freelancers</h3>");
    expect(homeContent).toContain("<h3>Employees & Corporate Teams</h3>");
    expect(homeContent).toContain("<h3>Project Managers</h3>");
    expect(homeContent).toContain("<h3>Parents</h3>");
    expect(homeContent).toContain('Bypassing academic overwhelm and the "blank page" syndrome.');
    expect(homeContent).toContain("For when you're your own boss and your initiation system is jamming.");
    expect(homeContent).toContain('Stop losing hours to "prep work."');
    expect(homeContent).toContain('Use it to convert a vague "milestone"');
    expect(homeContent).toContain("Managing the invisible mental load of household admin and family logistics.");
    expect(homeContent).not.toContain("<strong>Students:</strong>");
    expect(homeContent).not.toContain("<strong>Remote Workers & Freelancers:</strong>");
    expect(homeContent).not.toContain("<strong>Employees & Corporate Teams:</strong>");
    expect(homeContent).not.toContain("<strong>Project Managers:</strong>");
    expect(homeContent).not.toContain("<strong>Parents:</strong>");
    expect(homeContent).not.toContain("<strong></strong>");
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
    expect(stylesheet).toContain("flex:0 0 108px!important;width:132px!important;min-width:0!important;max-width:132px!important;height:108px!important;max-height:108px!important");
    expect(stylesheet).toContain("flex-basis:96px!important;width:120px!important;max-width:120px!important;height:96px!important;max-height:96px!important");
    expect(stylesheet).toContain(".audience-card{display:flex;flex-direction:column;align-items:center;min-height:437px;padding:20px");
    expect(stylesheet).toContain("@media (min-width:761px){.audience-card{min-height:360px;padding:16px}");
    expect(stylesheet).toContain(".audience-card,.audience-card:last-child{grid-column:auto;width:auto;min-height:0;padding:20px}");
    expect(stylesheet).toContain(".audience-card h3{margin:0 0 8px");
    expect(stylesheet).toContain("max-width:1120px");
    expect(stylesheet).toContain(".audience-card:nth-child(4){grid-column:2/span 2}");
    expect(stylesheet).toContain(".audience-card:last-child{grid-column:1/-1");
    expect(stylesheet).toContain(".audience-card{overflow:hidden}");
    expect(stylesheet).toContain(".audience-card-world{position:relative;display:flex;align-items:flex-end");
    expect(stylesheet).toContain(".audience-card-world .audience-card-mascot{position:relative;z-index:1;margin:0 auto!important}");
  });
});

describe("How It Works surface cleanup", () => {
  it("keeps the heading and cards directly on the page canvas without an outer warm-white panel", () => {
    const homeContent = readFileSync(
      resolve(process.cwd(), "client/src/components/HomeContent.tsx"),
      "utf8",
    );
    const surfaceStyles = readFileSync(
      resolve(process.cwd(), "client/src/how-it-works-surface.css"),
      "utf8",
    );

    expect(homeContent).toContain('className="content-section how-it-works-section"');
    expect(surfaceStyles).toContain("background: transparent !important");
    expect(surfaceStyles).toContain("border: 0 !important");
    expect(surfaceStyles).toContain("box-shadow: none !important");
    expect(surfaceStyles).toContain("padding: 0 !important");
  });
});
