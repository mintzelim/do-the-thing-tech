import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const footer = readFileSync(resolve(process.cwd(), "client/src/components/Footer.tsx"), "utf8");
const styles = readFileSync(resolve(process.cwd(), "client/src/footer.css"), "utf8");

describe("selected Directory footer", () => {
  it("exposes the selected four navigation groups and all new public GEO routes", () => {
    expect(footer).toContain('title: "PRODUCT"');
    expect(footer).toContain('title: "LEARN"');
    expect(footer).toContain('title: "TRUST"');
    expect(footer).toContain('title: "EXPLORE"');
    expect(footer).toContain('["How it works", "/how-it-works"]');
    expect(footer).toContain('["Editorial standards", "/editorial-standards"]');
    expect(footer).toContain('["Compare with Goblin.tools", "/compare/goblin-tools"]');
    expect(footer).toContain('["Media information", "/media"]');
  });

  it("uses readable Inter body links and a responsive Directory grid", () => {
    expect(styles).toContain('font-family:Inter,ui-sans-serif,system-ui,sans-serif');
    expect(styles).toContain('font-family:VT323,"Courier New",monospace');
    expect(styles).toContain('grid-template-columns:repeat(4,minmax(0,1fr))');
    expect(styles).toContain('@media(max-width:900px)');
    expect(styles).toContain('@media(max-width:560px)');
  });
});
