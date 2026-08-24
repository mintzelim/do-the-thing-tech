import fs from "node:fs";
import path from "node:path";
import YAML from "js-yaml";

const root = process.cwd();
const blogDir = path.join(root, "blog");
const outputPath = path.join(root, "docs", "blog-source-verification.json");
const manualVerificationPath = path.join(root, "docs", "blog-source-manual-verifications.json");
const manualVerifications = fs.existsSync(manualVerificationPath)
  ? JSON.parse(fs.readFileSync(manualVerificationPath, "utf8")).entries ?? {}
  : {};
const articleFiles = fs.readdirSync(blogDir)
  .filter((file) => /^\d{2}-.+\.md$/.test(file))
  .sort();

function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { frontmatter: {}, body: raw };
  return { frontmatter: YAML.load(match[1]) ?? {}, body: match[2] };
}

function normalizeUrl(value) {
  try {
    const url = new URL(value.trim());
    url.hash = "";
    return url.toString();
  } catch {
    return null;
  }
}

function extractTitle(html) {
  const match = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return match ? match[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 240) : "";
}

function classify(status, error, pageTitle = "") {
  if (error) return "fetch_error";
  if (/\b(page|article) not found\b|\b404\b|error: doi not found/i.test(pageTitle)) return "soft_404";
  if (status >= 200 && status < 400) return "reachable";
  if ([401, 403, 406, 429].includes(status)) return "access_restricted";
  if ([404, 410].includes(status)) return "broken";
  return "http_error";
}

async function inspect(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15_000);
  try {
    const response = await fetch(url, {
      redirect: "follow",
      signal: controller.signal,
      headers: { "user-agent": "DoTheThingSourceVerifier/1.0 (+https://dothething.tech)" },
    });
    const contentType = response.headers.get("content-type") ?? "";
    const sample = contentType.includes("text/html") ? (await response.text()).slice(0, 100_000) : "";
    return {
      status: response.status,
      finalUrl: response.url,
      pageTitle: extractTitle(sample),
      contentType,
      error: "",
    };
  } catch (error) {
    return {
      status: 0,
      finalUrl: "",
      pageTitle: "",
      contentType: "",
      error: error instanceof Error ? error.message : String(error),
    };
  } finally {
    clearTimeout(timeout);
  }
}

const references = [];
for (const file of articleFiles) {
  const raw = fs.readFileSync(path.join(blogDir, file), "utf8");
  const { frontmatter, body } = parseFrontmatter(raw);
  for (const source of Array.isArray(frontmatter.sources) ? frontmatter.sources : []) {
    const url = normalizeUrl(source?.url ?? "");
    if (url) references.push({ file, kind: "declared_source", label: source?.title ?? "", url });
  }
  for (const match of body.matchAll(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g)) {
    const url = normalizeUrl(match[2]);
    if (url) references.push({ file, kind: "inline_citation", label: match[1], url });
  }
}

const byUrl = new Map();
for (const reference of references) {
  const entry = byUrl.get(reference.url) ?? { url: reference.url, references: [] };
  entry.references.push({ file: reference.file, kind: reference.kind, label: reference.label });
  byUrl.set(reference.url, entry);
}

const entries = [...byUrl.values()].sort((a, b) => a.url.localeCompare(b.url));
const concurrency = 6;
let cursor = 0;
await Promise.all(Array.from({ length: concurrency }, async () => {
  while (cursor < entries.length) {
    const index = cursor++;
    const entry = entries[index];
    const result = await inspect(entry.url);
    const manual = manualVerifications[entry.url];
    Object.assign(entry, result, {
      classification: manual ? "manually_verified" : classify(result.status, result.error, result.pageTitle),
      manualVerification: manual ?? null,
      pageTitle: manual?.title ?? result.pageTitle,
    });
    process.stdout.write(`${index + 1}/${entries.length} ${entry.classification} ${entry.status || "ERR"} ${entry.url}\n`);
  }
}));

const counts = entries.reduce((accumulator, entry) => {
  accumulator[entry.classification] = (accumulator[entry.classification] ?? 0) + 1;
  return accumulator;
}, {});

const report = {
  generatedAt: new Date().toISOString(),
  articleCount: articleFiles.length,
  referenceCount: references.length,
  uniqueUrlCount: entries.length,
  counts,
  entries,
};

fs.writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`);
console.log(`Verified ${entries.length} unique external URLs → ${outputPath}`);
