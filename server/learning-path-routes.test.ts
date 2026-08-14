import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const app = readFileSync(resolve(process.cwd(), "client/src/App.tsx"), "utf8");
const data = readFileSync(resolve(process.cwd(), "client/src/lib/learningPaths.ts"), "utf8");
const home = readFileSync(resolve(process.cwd(), "client/src/components/HomeContent.tsx"), "utf8");
const homeStyles = readFileSync(resolve(process.cwd(), "client/src/pixel-art-refined.css"), "utf8");
const ssr = readFileSync(resolve(process.cwd(), "client/src/entry-server.tsx"), "utf8");
const sitemap = readFileSync(resolve(process.cwd(), "scripts/generate-sitemap.mjs"), "utf8");

describe("single-click Mascot Wayfinder learning paths", () => {
  it("keeps each clean pathway card as one direct link to its first recommended article", () => {
    expect(home).toContain('className="learning-path-wayfinder"');
    expect(home).toContain('className="learning-path-mascot-guide"');
    expect(home).toContain('className="learning-path-card"');
    expect(home).toContain('href={path.posts[0].href}');
    expect(home).toContain('aria-label={`Read ${path.posts[0].label} to start the ${path.title} learning path`}');
    expect(home).not.toContain('className="learning-path-article-labels"');
    expect(home).not.toContain('path.posts.map((post) => <span key={post.href}>{post.label}</span>)');
    expect(homeStyles).toContain(".learning-path-card{min-height:176px}");
  });

  it("retains paired article recommendations without adding destination-page routing infrastructure", () => {
    expect(data).toContain("posts: [");
    expect(data).not.toContain("slug:");
    expect(app).not.toContain('/start-here/:slug');
    expect(ssr).not.toContain('path.startsWith("/start-here/")');
    expect(sitemap).not.toContain('/start-here/');
  });

  it("uses the documented clean pixel-art Wayfinder system with responsive and reduced-motion safeguards", () => {
    expect(homeStyles).toContain(".learning-path-wayfinder{display:grid");
    expect(homeStyles).toContain(".learning-path-card-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr))");
    expect(homeStyles).toContain("@media(max-width:640px){.learning-paths-section");
    expect(homeStyles).toContain("@media(prefers-reduced-motion:reduce)");
  });
});
