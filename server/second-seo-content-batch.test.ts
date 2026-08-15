import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const highIntentPosts = [
  "02-time-blindness-in-adhd.md",
  "03-breaking-down-big-tasks.md",
  "04-executive-dysfunction-vs-task-paralysis.md",
  "05-best-tools-for-adhd-task-management.md",
  "08-remote-work-adhd.md",
  "09-adhd-perfectionism.md",
  "24-ai-that-breaks-down-tasks-adhd.md",
];

const commonMistakePosts = [
  "01-how-adhd-affects-task-management.md",
  "22-does-adhd-go-away.md",
  "23-best-adhd-tools-2026.md",
  "25-adhd-never-finish-anything.md",
  "28-adhd-burnout-recovery.md",
  "29-adhd-vs-autism-vs-audhd.md",
  "30-rejection-sensitive-dysphoria-rsd.md",
  "31-adhd-in-women.md",
];

function readPost(filename: string) {
  return fs.readFileSync(path.resolve(process.cwd(), "blog", filename), "utf8");
}

describe("approved second SEO content batch", () => {
  it("keeps every high-intent guide above the useful-depth threshold with practical common-mistake guidance", () => {
    for (const filename of highIntentPosts) {
      const post = readPost(filename);
      const words = post.match(/\b[\w’'-]+\b/g) ?? [];
      expect(words.length, filename).toBeGreaterThanOrEqual(800);
      expect(post, filename).toMatch(/updatedDate:\s*["']2026-08-13["']/);
      expect(post, filename).toContain("## Common Mistakes");
    }
  });

  it("preserves source attribution across the batch", () => {
    for (const filename of highIntentPosts) {
      const post = readPost(filename);
      expect(post, filename).toContain("sources:");
      expect(post, filename).toContain("https://");
    }
  });

  it("keeps every high-intent featured image original, descriptive, and production-safe", () => {
    const expectedImages = [
      ["02-time-blindness-in-adhd.md", "featured-02-time-blindness-in-adhd_[a-f0-9]{8}\.png", "Lavender pixel mascot using a large clock and visual time cues"],
      ["03-breaking-down-big-tasks.md", "featured-03-breaking-down-big-tasks_[a-f0-9]{8}\.png", "A purple pixel-art mascot turns one large task block into smaller stepping stones."],
      ["04-executive-dysfunction-vs-task-paralysis.md", "featured-04-executive-dysfunction-vs-task-paralysis_[a-f0-9]{8}\.png", "A purple pixel-art mascot stands beside two distinct task-start barriers."],
      ["05-best-tools-for-adhd-task-management.md", "featured-05-best-tools-for-adhd-task-management_[a-f0-9]{8}\.png", "A purple pixel-art mascot chooses a simple task-management toolkit."],
      ["08-remote-work-adhd.md", "featured-08-remote-work-adhd_[a-f0-9]{8}\.png", "A purple pixel-art mascot works at a simple remote desk with one visible task."],
      ["09-adhd-perfectionism.md", "featured-09-adhd-perfectionism_[a-f0-9]{8}\.png", "A purple pixel-art mascot moves an imperfect task card toward completion."],
      ["24-ai-that-breaks-down-tasks-adhd.md", "blog-ai-task-breakdown-featured_5bae34ae\.png", "A purple pixel-art mascot uses an AI helper to divide one task into smaller cards."],
    ];

    for (const [filename, imageKey, altText] of expectedImages) {
      const post = readPost(filename);
      expect(post, filename).toMatch(new RegExp(`^featuredImage: "/manus-storage/${imageKey}"$`, "m"));
      expect(post, filename).toContain(`featuredImageAlt: "${altText}"`);
    }
  });

  it("preserves the practical safety boundary in the AI task-breakdown guide", () => {
    expect(readPost("24-ai-that-breaks-down-tasks-adhd.md")).toContain("do not diagnose ADHD");
  });

  it("keeps practical Common Mistakes guidance in the eight remaining authority articles", () => {
    for (const filename of commonMistakePosts) {
      const post = readPost(filename);
      expect(post, filename).toContain("## Common Mistakes");
      expect(post, filename).toMatch(/- \*\*.+\*\*/);
    }
    expect(readPost("29-adhd-vs-autism-vs-audhd.md")).toContain("qualified professional");
    expect(readPost("30-rejection-sensitive-dysphoria-rsd.md")).toContain("not a formal diagnosis");
    expect(readPost("31-adhd-in-women.md")).toContain("qualified clinician");
  });
});
