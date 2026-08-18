import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { FAQ_GROUPS, FAQ_ITEMS, FAQ_PAGE_META } from "../client/src/lib/faqContent";

const page = readFileSync(resolve(process.cwd(), "client/src/pages/FAQ.tsx"), "utf8");
const entry = readFileSync(resolve(process.cwd(), "client/src/entry-server.tsx"), "utf8");
const app = readFileSync(resolve(process.cwd(), "client/src/App.tsx"), "utf8");
const footer = readFileSync(resolve(process.cwd(), "client/src/components/Footer.tsx"), "utf8");
const sitemap = readFileSync(resolve(process.cwd(), "scripts/generate-sitemap.mjs"), "utf8");
const faqHeroStage = readFileSync(resolve(process.cwd(), "client/src/faq-hero-stage.css"), "utf8");

describe("canonical public FAQ page", () => {
  it("uses one verified source of 12 visible product, support, privacy, and boundary answers", () => {
    expect(FAQ_GROUPS).toHaveLength(3);
    expect(FAQ_ITEMS).toHaveLength(12);
    expect(FAQ_GROUPS.map((group) => group.id)).toEqual(["start", "use", "trust"]);
    expect(FAQ_ITEMS.map((item) => item.question)).toContain("Is DoTheThing medical advice or an ADHD diagnosis tool?");
    expect(FAQ_ITEMS.every((item) => item.answer.length > 20)).toBe(true);
  });

  it("renders the approved landing hero and maps every visible group from the shared source", () => {
    expect(page).toContain('SUPPORT &amp; CLARITY');
    expect(page).toContain('Questions, answered simply.');
    expect(page).toContain('FAQ_GROUPS.map((group)');
    expect(page).toContain('hero-mascot-proof-bubble faq-hero-bubble');
    expect(page).toContain('<Footer />');
    expect(page).toContain('START A TASK');
  });

  it("keeps the direct FAQ route on the shared landing header rail and contained mascot stage", () => {
    expect(faqHeroStage).toContain('.faq-public-page .reference-header-shell');
    expect(faqHeroStage).toContain('width: 184px');
    expect(faqHeroStage).toContain('.faq-public-page .reference-hero-visual');
    expect(faqHeroStage).toContain('display: flex !important');
    expect(faqHeroStage).toContain('min-height: 300px !important');
    expect(faqHeroStage).toContain('max-height: 360px !important');
  });

  it("emits the exact shared FAQ content only on the canonical /faq schema graph", () => {
    expect(entry).toContain('function faqPageSchema()');
    expect(entry).toContain('mainEntity: FAQ_ITEMS.map');
    expect(entry).toContain('if (path === "/faq")');
    expect(entry).toContain('canonicalPath: "/faq"');
    expect(entry).toContain('FAQ_PAGE_META.title');
    expect(entry).not.toContain('faqSchema()]');
  });

  it("provides canonical client metadata, a public route, footer discovery, and sitemap discovery", () => {
    expect(FAQ_PAGE_META.canonicalUrl).toBe("https://dothething.tech/faq");
    expect(app).toContain('Route path={"/faq"} component={FAQ}');
    expect(footer).toContain('["FAQ", "/faq"]');
    expect(sitemap).toContain('{ url: "/faq", priority: "0.7", changefreq: "monthly" }');
  });
});
