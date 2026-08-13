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

  it("keeps the applied Time Blindness image original, descriptive, and production-safe while remaining images are queued", () => {
    const timeBlindness = readPost("02-time-blindness-in-adhd.md");
    expect(timeBlindness).toContain('featuredImage: "/manus-storage/blog-time-blindness-featured_3c63db49.png"');
    expect(timeBlindness).toContain('featuredImageAlt: "Lavender pixel mascot using a large clock and visual time cues"');
  });

  it("preserves the practical safety boundary in the AI task-breakdown guide", () => {
    expect(readPost("24-ai-that-breaks-down-tasks-adhd.md")).toContain("do not diagnose ADHD");
  });
});
