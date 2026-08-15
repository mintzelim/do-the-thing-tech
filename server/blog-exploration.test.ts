import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const exploration = readFileSync(resolve(process.cwd(), "docs/blog-exploration.html"), "utf8");
const liveTemplate = readFileSync(resolve(process.cwd(), "client/src/pages/BlogPost.tsx"), "utf8");

describe("standalone Blog Exploration", () => {
  it("adapts the supplied editorial rhythm into an isolated DoTheThing concept file", () => {
    expect(exploration).toContain("EXPLORATION ONLY");
    expect(exploration).toContain("not connected to the live site");
    expect(exploration).toContain("ADHD in Women: The Symptoms Nobody Told You About");
    expect(exploration).toContain("QUIET LEDGER · CYCLE-AWARE PLANNING");
    expect(exploration).toContain("PIXEL POST-IT · ONE PER ARTICLE");
    expect(exploration).toContain("GUIDED PROGRESS");
    expect(exploration).toContain("Frequently Asked Questions");
    expect(exploration).toContain("Source Ledger");
    expect(exploration).toContain("More ways to make things workable");
    expect(exploration).toContain("Make the next thing doable.");
    expect(exploration).toContain("dothething-how-it-works-breakdown-transparent_3a48d1ce.png");
  });

  it("does not wire the standalone exploration into the live BlogPost component", () => {
    expect(liveTemplate).not.toContain("blog-exploration.html");
    expect(liveTemplate).not.toContain("EXPLORATION ONLY");
    expect(liveTemplate).not.toContain("More ways to make things workable");
  });
});
