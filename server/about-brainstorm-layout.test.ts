import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const reference = readFileSync(resolve(process.cwd(), "docs/About Page Brainstorm Layout.html"), "utf8");

describe("About Page Brainstorm Layout reference", () => {
  it("presents three distinct full-page About layout directions", () => {
    expect(reference).toContain("OPTION 01 · THE FIELD GUIDE");
    expect(reference).toContain("OPTION 02 · THE OPEN PATH");
    expect(reference).toContain("OPTION 03 · THE WORKBENCH");
    expect(reference).toContain("MEET THE CREATOR");
    expect(reference).toContain("OUR MISSION");
    expect(reference).toContain("HOW IT WORKS");
    expect(reference).toContain("READY TO DO THE THING?");
  });

  it("adheres to the established typography, mascot, surface, and responsive contracts", () => {
    expect(reference).toContain("Inter:wght@400;500;600;700;800");
    expect(reference).toContain("VT323");
    expect(reference).toContain("--canvas: #f6f5f2");
    expect(reference).toContain("--surface: #fffefb");
    expect(reference).toContain("--accent: #5b5ce2");
    expect(reference).toContain("transparent abstract purple creature only");
    expect(reference).toContain("No human pixel art");
    expect(reference).toContain("@media (max-width: 680px)");
    expect(reference).toContain("@media (prefers-reduced-motion: reduce)");
    expect(reference).toContain("one visible surface per panel");
  });
});
