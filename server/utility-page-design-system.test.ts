import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const contact = readFileSync(resolve(process.cwd(), "client/src/pages/Contact.tsx"), "utf8");
const privacy = readFileSync(resolve(process.cwd(), "client/src/pages/Privacy.tsx"), "utf8");
const terms = readFileSync(resolve(process.cwd(), "client/src/pages/Terms.tsx"), "utf8");
const styles = readFileSync(resolve(process.cwd(), "client/src/utility-pages.css"), "utf8");

describe("utility page design system", () => {
  it("preserves the Contact form behavior while applying the shared public-page shell", () => {
    expect(contact).toContain('className="mobile-frame utility-page"');
    expect(contact).toContain('className="utility-contact-form"');
    expect(contact).toContain('className="utility-submit"');
    expect(contact).toContain("contactMutation.mutateAsync");
    expect(contact).toContain("SITE_IDENTITY.supportEmail");
  });

  it("preserves Privacy and Terms legal copy in the shared readable legal-page system", () => {
    for (const page of [privacy, terms]) {
      expect(page).toContain('className="mobile-frame utility-page"');
      expect(page).toContain('className="utility-legal-panel"');
      expect(page).toContain('className="utility-legal-copy"');
      expect(page).toContain("Last Updated: April 2026");
    }
    expect(privacy).toContain("Information Collection and Use");
    expect(terms).toContain("Terms of Service");
  });

  it("uses the documented warm canvas, warm-white panels, Inter reading hierarchy, compact VT323 date, and responsive spacing", () => {
    expect(styles).toContain('.utility-page{min-height:100vh;background:#f6f5f2;color:#223047;font-family:Inter');
    expect(styles).toContain('background:#fffefb');
    expect(styles).toContain('font-family:VT323,"Courier New",monospace');
    expect(styles).toContain('border:1px solid #a8afc2;border-radius:14px');
    expect(styles).toContain('.utility-page .reference-header-shell{width:min(calc(100% - 32px),1240px);margin:16px auto 0');
    expect(styles).toContain('.utility-page .reference-brand-logo{width:184px;height:auto;image-rendering:pixelated}');
    expect(styles).toContain('@media(max-width:560px)');
  });
});
