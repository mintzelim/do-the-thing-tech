import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const inventoryPath = path.join(process.cwd(), "docs", "adsense-content-inventory.json");
const auditPath = path.join(process.cwd(), "docs", "adsense-content-audit.md");

describe("AdSense content audit", () => {
  it("keeps a complete deterministic inventory of the 31 canonical articles", () => {
    const inventory = JSON.parse(fs.readFileSync(inventoryPath, "utf8"));

    expect(inventory.articleCount).toBe(31);
    expect(inventory.articles).toHaveLength(31);
    expect(inventory.articles.every((article: { declaredSources: number }) => article.declaredSources >= 3)).toBe(true);
    expect(inventory.articles.filter((article: { updatedDate: string | null }) => Boolean(article.updatedDate))).toHaveLength(28);
  });

  it("documents the first five remediation priorities without modifying article copy", () => {
    const audit = fs.readFileSync(auditPath, "utf8");

    [
      "05-best-tools-for-adhd-task-management",
      "01-how-adhd-affects-task-management",
      "04-executive-dysfunction-vs-task-paralysis",
      "02-time-blindness-in-adhd",
      "03-breaking-down-big-tasks",
    ].forEach((file) => expect(audit).toContain(file));

    expect(audit).toContain("This audit does not alter any article copy.");
    expect(audit).toContain("No content will be changed without a separate explicit approval.");
  });
});
