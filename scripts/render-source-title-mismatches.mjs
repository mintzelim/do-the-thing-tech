import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const report = JSON.parse(fs.readFileSync(path.join(root, "docs", "blog-source-verification.json"), "utf8"));
const stopWords = new Set(["and", "the", "for", "with", "from", "in", "of", "a", "an", "to", "by", "on", "at", "about", "adhd", "article", "study", "guide", "overview", "official", "page", "website"]);
const tokens = (value) => new Set((value.toLowerCase().match(/[a-z]{3,}/g) ?? []).filter((token) => !stopWords.has(token)));
const overlap = (left, right) => {
  const a = tokens(left);
  const b = tokens(right);
  if (!a.size || !b.size) return 1;
  return [...a].filter((token) => b.has(token)).length / Math.min(a.size, b.size);
};

const candidates = [];
for (const entry of report.entries.filter((entry) => entry.classification === "reachable" && entry.pageTitle)) {
  for (const reference of entry.references.filter((reference) => reference.kind === "declared_source" && reference.label)) {
    const score = overlap(reference.label, entry.pageTitle);
    if (score < 0.2) candidates.push({ file: reference.file, label: reference.label, pageTitle: entry.pageTitle, score: Number(score.toFixed(2)), url: entry.url });
  }
}

const lines = [
  "# Reachable Citation Title-Mismatch Review",
  "",
  `Generated: ${report.generatedAt}`,
  "",
  "This is a conservative **manual-review queue**, not a finding that every entry is wrong. It flags a reachable source when meaningful words in its declared label have little overlap with the retrieved page title. Each candidate must be corrected, retained with an accurate label, or removed after review.",
  "",
  "| Article | Declared label | Retrieved title | Overlap | URL |",
  "| --- | --- | --- | ---: | --- |",
  ...candidates.sort((a, b) => a.file.localeCompare(b.file) || a.score - b.score).map((item) => `| \`${item.file}\` | ${item.label.replaceAll("|", "\\|")} | ${item.pageTitle.replaceAll("|", "\\|")} | ${item.score} | ${item.url} |`),
  "",
];

fs.writeFileSync(path.join(root, "docs", "blog-source-title-mismatch-review.md"), `${lines.join("\n")}\n`);
console.log(`Flagged ${candidates.length} reachable source labels for manual title review.`);
