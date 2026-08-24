import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const blogDir = path.join(root, "blog");
const articleFiles = fs.readdirSync(blogDir)
  .filter((file) => /^\d{2}-.+\.md$/.test(file))
  .sort();

const rows = articleFiles.map((file) => {
  const raw = fs.readFileSync(path.join(blogDir, file), "utf8");
  const frontMatter = raw.match(/^---([\s\S]*?)---\s*/)?.[1] ?? "";
  const body = raw.replace(/^---[\s\S]*?---\s*/, "");
  const wordCount = (body.match(/[\p{L}\p{N}’'-]+/gu) ?? []).length;
  const h2Count = (body.match(/^##\s+/gm) ?? []).length;
  const h3Count = (body.match(/^###\s+/gm) ?? []).length;
  const markdownLinks = (body.match(/\[[^\]]+\]\([^)]+\)/g) ?? []);
  const externalLinks = markdownLinks.filter((link) => /\]\(https?:\/\//.test(link)).length;
  const internalLinks = markdownLinks.filter((link) => /\]\(\/[^)]*\)/.test(link)).length;
  const declaredSources = (frontMatter.match(/^\s+url:\s+["']?https?:\/\//gm) ?? []).length;
  const faqItems = (frontMatter.match(/^\s+- (?:question|q):/gm) ?? []).length;
  const sourceHeading = /^##\s+(Sources|References|Further reading)\b/im.test(body) || declaredSources > 0;
  const faqHeading = /^##\s+.*\bFAQ\b/im.test(body) || faqItems > 0;
  const directAnswer = /^(?:##\s+)?(?:Direct answer|TL;DR|Quick answer)\b/im.test(body);
  const updatedDate = frontMatter.match(/^updatedDate:\s+["']?([^\n"']+)/m)?.[1]?.trim() ?? null;
  const score =
    Math.min(wordCount / 2500, 1) * 35 +
    Math.min(h2Count / 7, 1) * 15 +
    Math.min((externalLinks + declaredSources) / 5, 1) * 20 +
    (sourceHeading ? 12 : 0) +
    (faqHeading ? 10 : 0) +
    (directAnswer ? 8 : 0);

  return {
    file,
    wordCount,
    h2Count,
    h3Count,
    internalLinks,
    externalLinks,
    declaredSources,
    faqItems,
    updatedDate,
    sourceHeading,
    faqHeading,
    directAnswer,
    baselineScore: Number(score.toFixed(1)),
  };
});

const summary = {
  generatedAt: new Date().toISOString(),
  articleCount: rows.length,
  averageWords: Math.round(rows.reduce((sum, row) => sum + row.wordCount, 0) / rows.length),
  articles: rows.sort((a, b) => a.baselineScore - b.baselineScore || a.wordCount - b.wordCount),
};

const output = path.join(root, "docs", "adsense-content-inventory.json");
fs.writeFileSync(output, `${JSON.stringify(summary, null, 2)}\n`);
console.log(`Audited ${rows.length} articles → ${output}`);
console.table(summary.articles.slice(0, 12));
