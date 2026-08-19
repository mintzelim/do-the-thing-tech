import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const comparisonPath = resolve(process.cwd(), "docs/adhd-women-blog-template-comparison.html");

describe("ADHD in Women blog template comparison", () => {
  it("keeps both requested approval-only article templates in the comparison", () => {
    const html = readFileSync(comparisonPath, "utf8");

    expect(html).toContain("APPROVAL-ONLY PREVIEW");
    expect(html).toContain("OPTION 01 · THE FIELD GUIDE");
    expect(html).toContain("OPTION 02 · FOCUS LEDGER");
    expect(html).toContain("ADHD in Women: The Symptoms Nobody Told You About");
    expect(html).toContain("not connected to the live blog");
  });

  it("documents one restrained, accessible reading-progress system for each preview", () => {
    const html = readFileSync(comparisonPath, "utf8");

    expect((html.match(/READING PROGRESS/g) || []).length).toBe(2);
    expect((html.match(/class="progress-track" role="progressbar"/g) || []).length).toBe(2);
    expect(html).toContain("aria-valuenow");
    expect(html).toContain("prefers-reduced-motion");
    expect(html).toContain("preview.addEventListener('scroll', update");
  });

  it("embeds the exact live ADHD in Women article body for both visual templates", () => {
    const html = readFileSync(comparisonPath, "utf8");
    const source = readFileSync(resolve(process.cwd(), "blog/31-adhd-in-women.md"), "utf8");
    const frontmatterEnd = source.indexOf("\n---\n", 4);
    const liveArticleBody = frontmatterEnd >= 0 ? source.slice(frontmatterEnd + "\n---\n".length).trim() : "";
    const embeddedArticleBody = html.match(/<template id="exact-article-source">([\s\S]*?)<\/template>/)?.[1]?.trim();

    expect(liveArticleBody).toBeTruthy();
    expect(embeddedArticleBody).toBe(liveArticleBody);
    expect(html).toContain("data-exact-content");
    expect(html).toContain("renderMarkdown(exactSource)");
  });

  it("uses approved cards and one source-derived Pixel Post-It in the selected Field Guide treatment", () => {
    const html = readFileSync(comparisonPath, "utf8");

    expect(html).toContain("field-guide-card-stack");
    expect(html).toContain("border-radius: 10px");
    expect(html).toContain("box-shadow: 3px 4px 0 rgba(210, 211, 224, .65)");
    expect(html).toContain("field-guide-postit");
    expect(html).toContain("background: var(--warm-yellow)");
    expect(html).toContain("transform: rotate(-1.1deg)");
    expect(html).toContain('"The way out isn\'t more effort. It\'s less masking."');
    expect(html).toContain('class="field-hero-map" aria-hidden="true"></div>');
  });

  it("offers three approval-only, exact-text hierarchy choices for research-detail quotations", () => {
    const html = readFileSync(comparisonPath, "utf8");
    const systematicReview = "A 2025 systematic review in the Journal of Attention Disorders found ADHD symptoms worsen in the mid-luteal and premenstrual phases, affecting emotional regulation, executive function, attention, and concentration. Medication can also feel less effective during these windows.";

    expect((html.match(/data-research-treatment-option=/g) || []).length).toBe(3);
    expect(html).toContain("OPTION 01 · WHISPER NOTE");
    expect(html).toContain("OPTION 02 · CURIOUS FOLD");
    expect(html).toContain("OPTION 03 · MARGIN FOOTNOTE");
    expect((html.match(/A 2025 systematic review in the <em>Journal of Attention Disorders<\/em> found ADHD symptoms worsen/g) || []).length).toBe(3);
    expect(html).toContain('class="research-fold"');
    expect(html).toContain("research-treatment-option summary:focus-visible");
    expect(systematicReview).toContain("Medication can also feel less effective during these windows.");
  });
});
