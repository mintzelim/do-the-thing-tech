import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const report = JSON.parse(fs.readFileSync(path.join(root, "docs", "blog-source-verification.json"), "utf8"));
const invalidClasses = new Set(["broken", "soft_404", "fetch_error", "http_error", "access_restricted"]);
const invalidUrls = new Set(report.entries
  .filter((entry) => invalidClasses.has(entry.classification))
  .map((entry) => entry.url));
const blogDir = path.join(root, "blog");
const files = fs.readdirSync(blogDir).filter((file) => /^\d{2}-.+\.md$/.test(file)).sort();
const changes = [];

function normalizeUrl(value) {
  try {
    const url = new URL(value.trim());
    url.hash = "";
    return url.toString();
  } catch {
    return null;
  }
}

function cleanSourcesFrontmatter(frontmatter) {
  const lines = frontmatter.split("\n");
  const output = [];
  let index = 0;
  let removed = 0;

  while (index < lines.length) {
    if (lines[index] !== "sources:") {
      output.push(lines[index++]);
      continue;
    }

    output.push(lines[index++]);
    while (index < lines.length && (/^  - /.test(lines[index]) || /^    /.test(lines[index]) || lines[index] === "")) {
      if (lines[index] === "") {
        output.push(lines[index++]);
        continue;
      }
      const block = [lines[index++]];
      while (index < lines.length && /^    /.test(lines[index])) block.push(lines[index++]);
      const urlLine = block.find((line) => /^    url:\s+/.test(line));
      const rawUrl = urlLine?.replace(/^    url:\s+["']?/, "").replace(/["']?\s*$/, "") ?? "";
      if (invalidUrls.has(normalizeUrl(rawUrl))) {
        removed += 1;
      } else {
        output.push(...block);
      }
    }
  }
  return { text: output.join("\n"), removed };
}

for (const file of files) {
  const filePath = path.join(blogDir, file);
  const raw = fs.readFileSync(filePath, "utf8");
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) continue;

  const cleanedFrontmatter = cleanSourcesFrontmatter(match[1]);
  let removedInline = 0;
  let body = match[2].replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, (full, label, url) => {
    if (!invalidUrls.has(normalizeUrl(url))) return full;
    removedInline += 1;
    return label;
  });
  for (const invalidUrl of invalidUrls) {
    if (body.includes(invalidUrl)) {
      const count = body.split(invalidUrl).length - 1;
      removedInline += count;
      body = body.split(invalidUrl).join("");
    }
  }
  const next = `---\n${cleanedFrontmatter.text}\n---\n${body}`;
  if (next !== raw) {
    fs.writeFileSync(filePath, next);
    changes.push({ file, removedDeclaredSources: cleanedFrontmatter.removed, removedInlineLinks: removedInline });
  }
}

const output = path.join(root, "docs", "blog-source-removal-log.json");
fs.writeFileSync(output, `${JSON.stringify({
  generatedAt: new Date().toISOString(),
  removedUrlCount: invalidUrls.size,
  affectedArticles: changes,
}, null, 2)}\n`);
console.log(`Removed confirmed bad destinations from ${changes.length} articles; log: ${output}`);
