import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const articlePath = path.join(root, "blog", "31-adhd-in-women.md");
const comparisonPath = path.join(root, "docs", "adhd-women-blog-template-comparison.html");
const article = fs.readFileSync(articlePath, "utf8");
const comparison = fs.readFileSync(comparisonPath, "utf8");
const frontmatterEnd = article.indexOf("\n---\n", 4);

if (frontmatterEnd < 0) throw new Error("The ADHD-in-women source is missing a closing frontmatter marker.");

const body = article.slice(frontmatterEnd + "\n---\n".length).trim();
const templatePattern = /(<template id="exact-article-source">)[\s\S]*?(<\/template>)/;

if (!templatePattern.test(comparison)) throw new Error("The comparison file is missing the exact-article-source template.");

fs.writeFileSync(comparisonPath, comparison.replace(templatePattern, `$1\n${body}\n$2`));
console.log("Synchronized the ADHD-in-women comparison template with the canonical article body.");
