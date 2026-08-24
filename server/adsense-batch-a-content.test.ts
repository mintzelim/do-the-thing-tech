import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const batchA = [
  "05-best-tools-for-adhd-task-management.md",
  "01-how-adhd-affects-task-management.md",
  "04-executive-dysfunction-vs-task-paralysis.md",
  "02-time-blindness-in-adhd.md",
  "03-breaking-down-big-tasks.md",
];

function readPost(filename: string) {
  return fs.readFileSync(path.join(process.cwd(), "blog", filename), "utf8");
}

describe("approved AdSense content Batch A", () => {
  it("keeps all five priority articles freshly dated, substantial, and explicitly non-diagnostic", () => {
    batchA.forEach((filename) => {
      const post = readPost(filename);
      const words = post.match(/[\p{L}\p{N}’'-]+/gu) ?? [];

      expect(post, filename).toContain('updatedDate: "2026-08-24"');
      expect(words.length, filename).toBeGreaterThan(1200);
      expect(post, filename).toContain("does not constitute medical advice");
    });
  });

  it("gives the high-impression tools article a transparent, reader-first decision method", () => {
    const post = readPost("05-best-tools-for-adhd-task-management.md");

    expect(post).toContain("## Choose by the First Blocked Moment");
    expect(post).toContain("## Try a Tool Without Building a New Personality Around It");
    expect(post).toContain("This is an **editorial guide**, not an independent laboratory test");
    expect(post).toContain("https://www.todoist.com/");
  });

  it("replaces deterministic brain and trauma framing with precise, observable support paths", () => {
    const taskManagement = readPost("01-how-adhd-affects-task-management.md");
    const executiveFunction = readPost("04-executive-dysfunction-vs-task-paralysis.md");
    const timeBlindness = readPost("02-time-blindness-in-adhd.md");

    expect(taskManagement).toContain("## Three Everyday Friction Maps");
    expect(taskManagement).not.toContain("operating system has a bug");
    expect(executiveFunction).toContain("## A Pattern, Not a Diagnosis: What to Try First");
    expect(executiveFunction).toContain("not a clinical diagnosis");
    expect(executiveFunction).not.toContain("one of the four trauma responses");
    expect(timeBlindness).toContain("## A One-Week Estimate Calibration Experiment");
    expect(timeBlindness).toContain("It is not a formal diagnosis on its own.");
    expect(timeBlindness).not.toContain("a neurological condition called time blindness");
  });

  it("adds an original worked decision process to the task-breakdown guide", () => {
    const post = readPost("03-breaking-down-big-tasks.md");

    expect(post).toContain("## A Full Worked Example: “Send the Project Update”");
    expect(post).toContain("## Direct Answer");
    expect(post).toContain("what to touch, where to begin, and what “enough” looks like");
  });
});
