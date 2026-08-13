import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const priorityPosts = [
  "06-adhd-medication-and-productivity.md",
  "07-neuroscience-task-avoidance.md",
  "10-adhd-relationships.md",
  "11-adhd-workplace.md",
  "12-adhd-sleep.md",
  "14-adhd-creativity.md",
  "16-neurodivergent-productivity-7-tactics.md",
  "17-why-simpler-adhd-friendly-apps-work-better.md",
  "18-one-task-is-enough-simple-self-acceptance.md",
];

function readPost(filename: string) {
  return fs.readFileSync(path.resolve(process.cwd(), "blog", filename), "utf8");
}

describe("targeted SEO content improvements", () => {
  it("keeps every priority article above the useful-depth threshold", () => {
    for (const filename of priorityPosts) {
      const words = readPost(filename).match(/\b[\w’'-]+\b/g) ?? [];
      expect(words.length, filename).toBeGreaterThanOrEqual(800);
    }
  });

  it("keeps featured-image metadata, update dates, and practical gotcha guidance", () => {
    for (const filename of priorityPosts) {
      const post = readPost(filename);
      expect(post, filename).toContain('updatedDate: "2026-08-13"');
      expect(post, filename).toMatch(/featuredImage: "\/manus-storage\/dothething-how-it-works-/);
      expect(post, filename).toContain("featuredImageAlt:");
      expect(post, filename).toContain("## Common Mistakes to Avoid");
      expect(post, filename).toContain("](/blog/");
    }
  });

  it("preserves medical-safety language in the medication and sleep articles", () => {
    expect(readPost("06-adhd-medication-and-productivity.md")).toContain("does not constitute medical advice");
    expect(readPost("12-adhd-sleep.md")).toContain("does not constitute medical advice");
  });

  it("uses the current JAN ADHD resource rather than the retired workplace URL", () => {
    const workplacePost = readPost("11-adhd-workplace.md");
    expect(workplacePost).toContain("Attention-Deficit-Hyperactivity-Disorder-AD-HD.cfm");
    expect(workplacePost).not.toContain("Attention-Deficit-Hyperactivity-Disorder-ADHD.cfm");
  });
});
