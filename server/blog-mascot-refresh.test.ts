import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const replacementSlugs = [
  "01-how-adhd-affects-task-management",
  "02-time-blindness-in-adhd",
  "03-breaking-down-big-tasks",
  "04-executive-dysfunction-vs-task-paralysis",
  "05-best-tools-for-adhd-task-management",
  "06-adhd-medication-and-productivity",
  "07-neuroscience-task-avoidance",
  "08-remote-work-adhd",
  "09-adhd-perfectionism",
  "10-adhd-relationships",
  "11-adhd-workplace",
  "12-adhd-sleep",
  "13-adhd-financial-management",
  "14-adhd-creativity",
  "15-free-tools-2026",
  "16-neurodivergent-productivity-7-tactics",
  "17-why-simpler-adhd-friendly-apps-work-better",
  "18-one-task-is-enough-simple-self-acceptance",
  "19-adhd-morning-routine-no-motivation-1",
  "20-how-to-break-down-tasks-adhd",
  "21-adhd-best-jobs-creativity-hyperfocus",
  "22-does-adhd-go-away",
  "23-best-adhd-tools-2026",
  "24-ai-that-breaks-down-tasks-adhd",
  "25-adhd-never-finish-anything",
  "26-adhd-symptoms-adults",
  "27-uncommon-adhd-symptoms",
  "28-adhd-burnout-recovery",
  "29-adhd-vs-autism-vs-audhd",
  "30-rejection-sensitive-dysphoria-rsd",
  "31-adhd-in-women",
];

describe("canonical blog mascot refresh", () => {
  it("maps the first replacement batch to newly generated article-specific featured illustrations", () => {
    for (const slug of replacementSlugs) {
      const source = readFileSync(resolve(process.cwd(), `blog/${slug}.md`), "utf8");
      expect(source).toMatch(/^featuredImage: "\/manus-storage\/featured-\d{2}-.+_[a-f0-9]{8}\.png"$/m);
      expect(source).toMatch(/^featuredImageAlt:/m);
    }
  });

  it("keeps the old mixed mascot references out of the regenerated first batch", () => {
    const sources = replacementSlugs.map((slug) => readFileSync(resolve(process.cwd(), `blog/${slug}.md`), "utf8")).join("\n");
    expect(sources).not.toContain("dothething-how-it-works-focus-transparent");
    expect(sources).not.toContain("dothething-how-it-works-brain-dump-transparent");
    expect(sources).not.toContain("dothething-how-it-works-breakdown-transparent");
    expect(sources).not.toContain("dothething-how-it-works-timer-transparent");
  });
});
