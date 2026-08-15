import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const exploration = readFileSync(resolve(process.cwd(), "docs/blog-exploration.html"), "utf8");
const liveTemplate = readFileSync(resolve(process.cwd(), "client/src/pages/BlogPost.tsx"), "utf8");
const liveArticle = readFileSync(resolve(process.cwd(), "blog/31-adhd-in-women.md"), "utf8");

describe("standalone Blog Exploration", () => {
  it("adapts the supplied editorial rhythm into an isolated DoTheThing concept file", () => {
    expect(exploration).toContain("EXPLORATION ONLY");
    expect(exploration).toContain("not connected to the live site");
    expect(exploration).toContain("ADHD in Women: The Symptoms Nobody Told You About");
    expect(exploration).toContain("ADHD in women looks internal, not hyperactive — and hormones make it worse.");
    expect(exploration).toContain("QUIET LEDGER · CYCLE-AWARE PLANNING");
    expect(exploration).toContain("QUIET LEDGER · THE 7 SYMPTOMS WOMEN ACTUALLY EXPERIENCE");
    expect(exploration).toContain("PIXEL POST-IT · ARTICLE REFRAME");
    expect(exploration).toContain("GUIDED PROGRESS");
    expect(exploration).toContain("Frequently Asked Questions");
    expect(exploration).toContain("<h2>Sources</h2>");
    expect(exploration).toContain("More ways to make things workable");
    expect(exploration).toContain("Make the next thing doable.");
    expect(exploration).toContain("dothething-how-it-works-breakdown-transparent_3a48d1ce.png");
  });

  it("uses the published ADHD in Women article wording in the selected presentation modules", () => {
    const exactArticlePassages = [
      "You've spent years feeling like you're running on a treadmill that's slightly too fast.",
      "The 7 Symptoms Women Actually Experience",
      "The Hormonal Story: Estrogen, Dopamine, and Your Cycle",
      "The way out isn't more effort. It's less masking.",
      "What to Do: From \"I Think This Is Me\" to \"I'm Building a Life That Works\"",
      "Changing treatment around your cycle without clinical guidance.",
      "Will understanding my ADHD actually change anything?",
      "Women with ADHD face later diagnosis, ECNP Congress study",
    ];

    for (const passage of exactArticlePassages) {
      expect(liveArticle).toContain(passage);
      expect(exploration).toContain(passage);
    }
  });

  it("does not wire the standalone exploration into the live BlogPost component", () => {
    expect(liveTemplate).not.toContain("blog-exploration.html");
    expect(liveTemplate).not.toContain("EXPLORATION ONLY");
    expect(liveTemplate).not.toContain("More ways to make things workable");
  });
});
