import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const viteServer = readFileSync(resolve(process.cwd(), "server/_core/vite.ts"), "utf8");
const robots = readFileSync(resolve(process.cwd(), "client/public/robots.txt"), "utf8");
const sitemap = readFileSync(resolve(process.cwd(), "client/public/sitemap.xml"), "utf8");

describe("reported blog URL availability", () => {
  it("keeps crawling open for the blog and sends the one equivalent legacy slug to its canonical article", () => {
    expect(robots).toContain("Allow: /blog/");
    expect(robots).toContain("Allow: /blog/*");
    expect(viteServer).toContain('"/blog/adhd-burnout": "/blog/adhd-burnout-recovery"');
    expect(viteServer).toContain('LEGACY_BLOG_REDIRECTS[req.originalUrl.split("?")[0]]');
    expect(viteServer).toContain("res.redirect(301, canonicalPath)");
  });

  it("keeps every reported exact article slug in the generated sitemap and source registry", () => {
    const reportedArticles: Record<string, string> = {
      "breaking-down-big-tasks": "03-breaking-down-big-tasks.md",
      "best-tools-for-adhd-task-management": "05-best-tools-for-adhd-task-management.md",
      "adhd-medication-and-productivity": "06-adhd-medication-and-productivity.md",
      "neuroscience-task-avoidance": "07-neuroscience-task-avoidance.md",
      "adhd-relationships": "10-adhd-relationships.md",
      "adhd-workplace": "11-adhd-workplace.md",
      "adhd-sleep": "12-adhd-sleep.md",
      "adhd-financial-management": "13-adhd-financial-management.md",
      "adhd-creativity": "14-adhd-creativity.md",
      "free-tools-2026": "15-free-tools-2026.md",
      "neurodivergent-productivity-7-tactics": "16-neurodivergent-productivity-7-tactics.md",
      "why-simpler-adhd-friendly-apps-work-better": "17-why-simpler-adhd-friendly-apps-work-better.md",
      "how-to-break-down-tasks-adhd": "20-how-to-break-down-tasks-adhd.md",
    };

    for (const [slug, filename] of Object.entries(reportedArticles)) {
      expect(sitemap).toContain(`<loc>https://dothething.tech/blog/${slug}</loc>`);
      expect(existsSync(resolve(process.cwd(), "blog", filename))).toBe(true);
    }
  });
});
