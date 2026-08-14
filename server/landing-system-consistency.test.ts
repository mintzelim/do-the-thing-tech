import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const projectRoot = path.resolve(import.meta.dirname, "..");
const reconciliation = fs.readFileSync(path.join(projectRoot, "client/src/landing-system-reconciliation.css"), "utf8");
const homeContent = fs.readFileSync(path.join(projectRoot, "client/src/components/HomeContent.tsx"), "utf8");
const homePage = fs.readFileSync(path.join(projectRoot, "client/src/pages/Home.tsx"), "utf8");

describe("landing-page design-system reconciliation", () => {
  it("defines one shared rail, wide-panel contract, and compact-card contract", () => {
    expect(reconciliation).toContain("--landing-rail: 1240px");
    expect(reconciliation).toContain("--landing-panel-radius: 14px");
    expect(reconciliation).toContain("--landing-panel-shadow: 7px 8px 0 rgba(210, 211, 224, .7)");
    expect(reconciliation).toContain("--landing-item-radius: 10px");
    expect(reconciliation).toContain("--landing-card-shadow: 3px 4px 0 rgba(210, 211, 224, .65)");
  });

  it("uses Inter-led display hierarchy and readable supporting copy across landing sections", () => {
    expect(reconciliation).toContain("font-family: var(--ui-font) !important");
    expect(reconciliation).toContain("font-weight: 800 !important");
    expect(reconciliation).toContain("letter-spacing: -.055em !important");
    expect(reconciliation).toContain("--landing-copy-leading: 1.6");
  });

  it("governs outer gaps, panel padding, and content starts with one responsive spacing scale", () => {
    expect(reconciliation).toContain("--landing-section-gap: 38px");
    expect(reconciliation).toContain("--landing-section-pad: 38px");
    expect(reconciliation).toContain("--landing-content-gap: 24px");
    expect(reconciliation).toContain("gap: var(--landing-section-gap)");
    expect(reconciliation).toContain("padding: 0 !important");
    expect(reconciliation).toContain("--landing-section-gap: 34px");
    expect(reconciliation).toContain("--landing-section-gap: 29px");
    expect(reconciliation).toContain("--landing-content-gap: 20px");
  });

  it("preserves varied section compositions while normalizing their surface rules", () => {
    expect(reconciliation).toContain(".content-section.how-it-works-section");
    expect(reconciliation).toContain(".content-section.audience-section");
    expect(reconciliation).toContain(".landing-creator-switchboard");
    expect(reconciliation).toContain(".learning-path-wayfinder");
    expect(reconciliation).toContain(".final-cta-surface");
  });

  it("removes redundant wayfinder shell treatment and calms dense utility cards", () => {
    expect(reconciliation).toContain(".learning-path-wayfinder");
    expect(reconciliation).toContain("background: transparent");
    expect(reconciliation).toContain(".faq-item,\n.home-content-sections .blog-link-card");
    expect(reconciliation).toContain("box-shadow: none !important");
  });

  it("adds semantics-only section hooks without changing landing content", () => {
    expect(homeContent).toContain('className="content-section faq-section"');
    expect(homeContent).toContain('className="content-section featured-posts-section"');
    expect(homeContent).toContain('className="featured-posts-action-wrap"');
    expect(homeContent).not.toContain("marginBottom: '32px'");
    expect(homeContent).toContain("Try DoTheThing Now");
    expect(homeContent).toContain("Built for the Initiation Problem");
    expect(homeContent).toContain("A Productivity Tool for Anyone Whose Brain Works Differently");
    expect(homePage).toContain('import "../landing-system-reconciliation.css"');
  });
});
