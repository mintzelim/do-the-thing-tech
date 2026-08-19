import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const blogIndex = readFileSync(resolve(process.cwd(), "client/src/pages/Blog.tsx"), "utf8");
const blogPost = readFileSync(resolve(process.cwd(), "client/src/pages/BlogPost.tsx"), "utf8");
const blogContentRenderer = readFileSync(resolve(process.cwd(), "client/src/components/BlogContentRenderer.tsx"), "utf8");
const tableRenderer = blogContentRenderer.slice(
  blogContentRenderer.indexOf("// Tables"),
  blogContentRenderer.indexOf("// Horizontal rule"),
);
const styles = readFileSync(resolve(process.cwd(), "client/src/blog-refined.css"), "utf8");
const fieldGuideStyles = readFileSync(resolve(process.cwd(), "client/src/blog-field-guide.css"), "utf8");
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
    expect(blogPost).toContain('className="blog-article-hero blog-field-guide-header"');
    expect(blogPost).toContain('className="blog-field-guide-article"');
    expect(blogPost).toContain('className="blog-reading-progress"');
    expect(blogPost).toContain('role="progressbar"');
    expect(blogPost).toContain('aria-valuetext={`${readingProgress}% read`}');
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

  it("uses the selected Field Guide components and makes research-detail quotations visually secondary without changing renderer text", () => {
    expect(blogContentRenderer).toContain("field-guide-tldr-stack");
    expect(blogContentRenderer).toContain("field-guide-tldr-card");
    expect(blogContentRenderer).toContain("line.substring(3).trim().toLowerCase() === 'tl;dr'");
    expect(blogContentRenderer).toContain("The way out isn't more effort. It's less masking.");
    expect(blogContentRenderer).toContain("field-guide-postit");
    expect(blogContentRenderer).toContain('replace(/^\\*\\*(.+)\\*\\*$/, "$1")');
    expect(blogContentRenderer).toContain("blog-evidence-note");
    expect(blogContentRenderer).toContain("Research detail");
    expect(fieldGuideStyles).toContain(".blog-article-body .field-guide-tldr-stack");
    expect(fieldGuideStyles).toContain("grid-template-columns: repeat(2, minmax(0, 1fr))");
    expect(fieldGuideStyles).toContain("background: #fff8bf");
    expect(fieldGuideStyles).toContain("transform: rotate(-1.1deg)");
    expect(fieldGuideStyles).toContain(".blog-article-body .blog-evidence-note");
    expect(fieldGuideStyles).toContain("font-size: .84rem");
    expect(fieldGuideStyles).toContain("border-left: 1px solid #d5d9e2 !important");
    expect(fieldGuideStyles).toContain("background: transparent !important");
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

  it("uses the selected Quiet Ledger system for every markdown table", () => {
    expect(tableRenderer).toContain('className="quiet-ledger-wrap"');
    expect(tableRenderer).toContain('className="quiet-ledger-table"');
    expect(tableRenderer).toContain('scope="col"');
    expect(tableRenderer).not.toContain("VT323");
    expect(styles).toContain('.quiet-ledger-table{width:100%;min-width:720px;overflow:hidden;border:1px solid #c5cada!important;border-collapse:separate!important;border-spacing:0!important;border-radius:8px!important');
    expect(styles).toContain('padding:9px!important;border:0!important;border-bottom:1px solid #d9dce4!important');
    expect(styles).toContain('background:#f0f1fb!important;color:#1f293b!important;font-weight:800!important');
  });

  it("keeps article reading content readable and structurally contained on narrow screens", () => {
    expect(styles).toContain('.blog-article-shell{width:min(calc(100% - 24px),680px)!important;gap:20px!important;padding:20px 0 44px!important}');
    expect(styles).toContain('.blog-article-hero h1{font-size:clamp(2.35rem,10.5vw,3.7rem)!important;line-height:1.02!important}');
    expect(styles).toContain('.blog-article-body{padding:28px 20px!important;border-radius:10px!important}');
    expect(styles).toContain('.blog-article-body img{max-width:100%!important;height:auto!important}');
    expect(styles).toContain('.blog-article-body .quiet-ledger-wrap{margin:20px 0!important;-webkit-overflow-scrolling:touch}');
    expect(styles).toContain('font-family:Inter,ui-sans-serif,system-ui,sans-serif!important');
    expect(styles).toContain('.blog-post-page,.blog-article-shell,.blog-article-hero,.blog-article-title-copy,.blog-article-mascot,.blog-article-meta,.blog-article-feature,.blog-article-body,.blog-article-body>div,.blog-sources-panel,.blog-article-cta,.blog-related-section{min-width:0;max-width:100%;box-sizing:border-box}');
    expect(styles).toContain('.blog-article-hero{grid-template-columns:minmax(0,1fr)!important}');
    expect(styles).toContain('.blog-article-body .quiet-ledger-wrap{max-width:100%!important;overflow-x:auto!important}');
    expect(styles).toContain('.blog-post-page .blog-article-hero{display:flex!important;flex-direction:column!important;align-items:stretch!important;min-height:0!important;gap:12px!important;padding:4px 0 14px!important;overflow:hidden}');
    expect(styles).toContain('.blog-post-page .blog-article-shell{width:min(calc(100% - 32px),680px)!important;max-width:100%!important;grid-template-columns:minmax(0,1fr)!important}');
    expect(styles).toContain('.blog-post-page .blog-article-shell>article{width:100%!important;min-width:0!important;max-width:100%!important}');
    expect(styles).toContain('.blog-post-page .blog-article-mascot{order:-1!important;display:flex!important;min-height:76px!important;justify-content:flex-end!important;align-items:center!important;overflow:hidden}');
    expect(styles).toContain('.blog-post-page .blog-article-feature img{display:block!important;width:100%!important;max-width:100%!important;height:auto!important;max-height:340px!important;object-fit:cover!important}');
    expect(fieldGuideStyles).toContain(".blog-article-body .field-guide-tldr-stack {\n    grid-template-columns: 1fr;");
    expect(fieldGuideStyles).toContain(".blog-reading-progress {\n    gap: 9px;");
    expect(breadcrumbStyles).toContain('text-overflow:ellipsis');
    expect(breadcrumbStyles).toContain('.blog-breadcrumb-item:last-child{min-width:0;overflow:hidden}');
  });
});
