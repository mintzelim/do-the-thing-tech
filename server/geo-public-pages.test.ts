import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const app = readFileSync(resolve(process.cwd(), "client/src/App.tsx"), "utf8");
const proof = readFileSync(resolve(process.cwd(), "client/src/pages/ProductProof.tsx"), "utf8");
const comparison = readFileSync(resolve(process.cwd(), "client/src/pages/GoblinToolsComparison.tsx"), "utf8");
const standards = readFileSync(resolve(process.cwd(), "client/src/pages/EditorialStandards.tsx"), "utf8");
const media = readFileSync(resolve(process.cwd(), "client/src/pages/MediaKit.tsx"), "utf8");
const article = readFileSync(resolve(process.cwd(), "client/src/pages/BlogPost.tsx"), "utf8");
const about = readFileSync(resolve(process.cwd(), "client/src/pages/About.tsx"), "utf8");
const geoStyles = readFileSync(resolve(process.cwd(), "client/src/geo-pages.css"), "utf8");
const sitemap = readFileSync(resolve(process.cwd(), "scripts/generate-sitemap.mjs"), "utf8");
const ssr = readFileSync(resolve(process.cwd(), "client/src/entry-server.tsx"), "utf8");

describe("GEO product proof and comparison routes", () => {
  it("registers the product-proof and comparison routes in the app, sitemap, and SSR metadata map", () => {
    expect(app).toContain('path={"/how-it-works"}');
    expect(app).toContain('path={"/compare/goblin-tools"}');
    expect(sitemap).toContain('url: "/how-it-works"');
    expect(sitemap).toContain('url: "/compare/goblin-tools"');
    expect(ssr).toContain('path === "/how-it-works"');
    expect(ssr).toContain('path === "/compare/goblin-tools"');
  });

  it("states practical boundaries and avoids medical claims in the product-proof page", () => {
    expect(proof).toContain("WHEN STARTING IS THE HARD PART");
    expect(proof).toContain("does not diagnose or treat ADHD");
    expect(proof).toContain("not a promise about a particular outcome");
    expect(proof).toContain('href="/privacy"');
  });

  it("uses an attributed, fact-based comparison with official Goblin.tools links and side-by-side screenshots", () => {
    expect(comparison).toContain("HONEST TOOL SELECTION");
    expect(comparison).toContain("not clinical outcomes or a universal “best” tool");
    expect(comparison).toContain("dothething-workflow-home_6bd7e560.png");
    expect(comparison).toContain("goblin-tools-magic-todo-2026-08-13_a38f7bda.webp");
    expect(comparison).toContain('href="https://goblin.tools/ToDo"');
    expect(comparison).toContain("Screenshots show the public interfaces viewed on 13 August 2026");
  });

  it("applies the documented public-page comparison rhythm without weakening the evidence-led content", () => {
    expect(comparison).toContain('comparison-page');
    expect(comparison).toContain('comparison-hero');
    expect(comparison).toContain('comparison-canvas-field');
    expect(comparison).toContain('comparison-ledger');
    expect(comparison).toContain('comparison-fit-grid');
    expect(comparison).toContain('comparison-citation-strip');
    expect(geoStyles).toContain('.comparison-page{background:#f6f5f2;color:#223047}');
    expect(geoStyles).toContain('font-family:Inter,ui-sans-serif,system-ui,sans-serif');
    expect(geoStyles).toContain('background:#fffefb');
    expect(geoStyles).toContain('color:#566273');
    expect(geoStyles).toContain('background:#5b5ce2');
    expect(geoStyles).toContain('border:1px solid #26364a!important;border-collapse:separate!important;border-spacing:0!important;border-radius:8px!important');
    expect(geoStyles).toContain('padding:9px;border-bottom:1px solid #d9dce4');
    expect(geoStyles).toContain('font-family:Inter,ui-sans-serif,system-ui,sans-serif!important');
  });

  it("adds visible authorship, first-party editorial boundaries, and a correction path", () => {
    expect(app).toContain('path={"/editorial-standards"}');
    expect(sitemap).toContain('url: "/editorial-standards"');
    expect(ssr).toContain('path === "/editorial-standards"');
    expect(article).toContain("Written by");
    expect(article).toContain('href="/about#author"');
    expect(article).toContain('href="/editorial-standards"');
    expect(about).toContain('id="author"');
    expect(standards).toContain("does not replace advice from a qualified health professional");
    expect(standards).toContain("support@dothething.tech");
    expect(standards).toContain("avoid invented ratings, testimonials, or unverified superiority claims");
  });

  it("provides a factual independent-review information page without soliciting positive sentiment", () => {
    expect(app).toContain('path={"/media"}');
    expect(sitemap).toContain('url: "/media"');
    expect(ssr).toContain('path === "/media"');
    expect(media).toContain("WE DO NOT ASK FOR POSITIVE REVIEWS");
    expect(media).toContain("do not provide payment or benefits in exchange for a positive opinion");
    expect(media).toContain("support@dothething.tech");
  });
});
