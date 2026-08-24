import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const inventoryPath = path.join(process.cwd(), "docs", "adsense-content-inventory.json");
const auditPath = path.join(process.cwd(), "docs", "adsense-content-audit.md");
const verificationPath = path.join(process.cwd(), "docs", "blog-source-verification.json");
const remediationWorklistPath = path.join(process.cwd(), "docs", "blog-source-remediation-worklist.md");
const titleMismatchPath = path.join(process.cwd(), "docs", "blog-source-title-mismatch-review.md");

describe("AdSense content audit", () => {
  it("keeps a complete deterministic inventory of the 31 canonical articles", () => {
    const inventory = JSON.parse(fs.readFileSync(inventoryPath, "utf8"));

    expect(inventory.articleCount).toBe(31);
    expect(inventory.articles).toHaveLength(31);
    expect(inventory.articles.every((article: { declaredSources: number }) => article.declaredSources >= 2)).toBe(true);
    expect(inventory.articles.filter((article: { updatedDate: string | null }) => Boolean(article.updatedDate)).length).toBeGreaterThanOrEqual(29);
  });

  it("documents the first five remediation priorities and the approval boundary that governed later changes", () => {
    const audit = fs.readFileSync(auditPath, "utf8");

    [
      "05-best-tools-for-adhd-task-management",
      "01-how-adhd-affects-task-management",
      "04-executive-dysfunction-vs-task-paralysis",
      "02-time-blindness-in-adhd",
      "03-breaking-down-big-tasks",
    ].forEach((file) => expect(audit).toContain(file));

    expect(audit).toContain("This audit does not alter any article copy.");
    expect(audit).toContain("No content was changed without a separate explicit approval.");
  });

  it("keeps every published external citation reachable or independently manually verified", () => {
    const verification = JSON.parse(fs.readFileSync(verificationPath, "utf8"));
    const worklist = fs.readFileSync(remediationWorklistPath, "utf8");
    const mismatchReview = fs.readFileSync(titleMismatchPath, "utf8");

    expect(verification.articleCount).toBe(31);
    expect(verification.uniqueUrlCount).toBeGreaterThan(0);
    expect(verification.entries.every((entry: { classification: string }) => ["reachable", "manually_verified"].includes(entry.classification))).toBe(true);
    expect(worklist).toContain("lists **0 non-reachable");
    expect(mismatchReview).not.toContain("| `");
  });
});
