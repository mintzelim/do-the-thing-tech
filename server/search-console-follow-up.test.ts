import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const tracker = readFileSync(resolve(process.cwd(), "todo.md"), "utf8");
const guidance = readFileSync(
  resolve(process.cwd(), "docs/search-console-homepage-indexing-follow-up.md"),
  "utf8",
);

describe("Search Console homepage indexing follow-up", () => {
  it("records the confirmed canonical homepage indexing request", () => {
    expect(tracker).toContain(
      "[x] Resubmit homepage URL to Google Search Console — user confirmed request indexing for https://dothething.tech/ on 2026-08-14",
    );
    expect(guidance).toContain("https://dothething.tech/");
    expect(guidance).toContain("dothething.tech` Domain property");
  });

  it("documents inspection-led monitoring instead of repeated indexing requests", () => {
    expect(guidance).toContain("URL Inspection");
    expect(guidance).toContain("Test live URL");
    expect(guidance).toContain("repeating the same request does not accelerate crawling");
    expect(guidance).toContain("Google-selected canonical");
  });
});
