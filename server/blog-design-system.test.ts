import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const blogIndex = readFileSync(resolve(process.cwd(), "client/src/pages/Blog.tsx"), "utf8");
const blogPost = readFileSync(resolve(process.cwd(), "client/src/pages/BlogPost.tsx"), "utf8");
const styles = readFileSync(resolve(process.cwd(), "client/src/blog-refined.css"), "utf8");
const breadcrumbStyles = readFileSync(resolve(process.cwd(), "client/src/blog-breadcrumb.css"), "utf8");

describe("blog design-system refresh", () => {
  it("uses the landing shell, canonical eyebrow, filters, and card grid on the blog index", () => {
    expect(blogIndex).toContain('className="mobile-frame blog-page"');
    expect(blogIndex).toContain('className="blog-shell"');
    expect(blogIndex).toContain("TOOLS &amp; RESOURCES");
    expect(blogIndex).not.toContain("A SMALLER NEXT STEP");
    expect(blogIndex).toContain('className="blog-filter-panel"');
    expect(blogIndex).toContain('className="blog-post-grid"');
    expect(blogIndex).toContain("dothething-how-it-works-brain-dump-transparent_805dc4d4.png");
  });

  it("preserves article metadata, server-rendered schema compatibility, sources, CTA, and related-post navigation in the refined template", () => {
    expect(blogPost).toContain("updateMetaTags({ title: `${foundPost.title} | DoTheThing Blog`");
    expect(blogPost).not.toContain("injectBlogPostingSchema(");
    expect(blogPost).toContain('className="blog-article-hero"');
    expect(blogPost).toContain('className="blog-article-body"');
    expect(blogPost).toContain('className="blog-sources-panel"');
    expect(blogPost).toContain('className="blog-article-cta"');
    expect(blogPost).toContain('className="blog-related-section"');
    expect(blogPost).toContain("dothething-how-it-works-breakdown-transparent_3a48d1ce.png");
    expect(blogPost).toContain("dothething-how-it-works-timer-transparent_f4de844b.png");
    expect(blogPost).toContain("getBlogCategoryEyebrow(post.category)");
    expect(blogPost).toContain('import "../blog-breadcrumb.css"');
    expect(blogPost).toContain("START WHEN READY");
    expect(blogPost).not.toContain("A SMALLER NEXT STEP");
    expect(blogPost).not.toContain('className="blog-article-category"');
  });

  it("applies documented panel, card, motion, and reduced-motion rules without reintroducing heavy legacy styling", () => {
    expect(styles).toContain("width:min(calc(100% - 32px),1240px)");
    expect(styles).toContain("border:1px solid #a8afc2");
    expect(styles).toContain("border-radius:14px");
    expect(styles).toContain("border:1px solid #c5cada");
    expect(styles).toContain("transform 140ms");
    expect(styles).toContain("@media (prefers-reduced-motion:reduce)");
    expect(styles).toContain("@media (max-width:860px)");
    expect(styles).toContain("@media (max-width:560px)");
    expect(breadcrumbStyles).toContain(".blog-breadcrumb");
    expect(breadcrumbStyles).toContain(".blog-breadcrumb-current");
    expect(breadcrumbStyles).toContain("@media (prefers-reduced-motion:reduce)");
  });
});
