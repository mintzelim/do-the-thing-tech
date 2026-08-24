import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const report = JSON.parse(fs.readFileSync(path.join(root, "docs", "blog-source-verification.json"), "utf8"));
const problemClasses = new Set(["broken", "soft_404", "fetch_error", "http_error", "access_restricted"]);
const problems = report.entries.filter((entry) => problemClasses.has(entry.classification));
const byFile = new Map();

for (const entry of problems) {
  for (const reference of entry.references) {
    const list = byFile.get(reference.file) ?? [];
    list.push({ ...entry, reference });
    byFile.set(reference.file, list);
  }
}

const lines = [
  "# Blog Citation Remediation Worklist",
  "",
  `Generated: ${report.generatedAt}`,
  "",
  `The verifier checked **${report.uniqueUrlCount} unique external URLs**. This worklist lists **${problems.length} non-reachable, soft-404, HTTP-error, fetch-error, or access-restricted destinations**. A restricted page is not automatically wrong, but it needs manual identity review or an accessible replacement before it is relied on as a citation.`,
  "",
];

for (const [file, entries] of [...byFile.entries()].sort(([a], [b]) => a.localeCompare(b))) {
  lines.push("## `" + file + "`", "");
  for (const entry of entries.sort((a, b) => a.url.localeCompare(b.url))) {
    const title = entry.pageTitle ? ` — retrieved title: “${entry.pageTitle}”` : "";
    lines.push(`- **${entry.classification}** (${entry.status || "no HTTP status"}): [${entry.reference.label || entry.url}](${entry.url})${title}`);
  }
  lines.push("");
}

fs.writeFileSync(path.join(root, "docs", "blog-source-remediation-worklist.md"), `${lines.join("\n")}\n`);
console.log(`Wrote grouped worklist for ${problems.length} problematic URLs across ${byFile.size} articles.`);
