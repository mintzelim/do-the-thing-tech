import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const identity = readFileSync(resolve(process.cwd(), "client/src/lib/siteIdentity.ts"), "utf8");
const home = readFileSync(resolve(process.cwd(), "client/src/pages/Home.tsx"), "utf8");
const contact = readFileSync(resolve(process.cwd(), "client/src/pages/Contact.tsx"), "utf8");
const footer = readFileSync(resolve(process.cwd(), "client/src/components/Footer.tsx"), "utf8");
const entry = readFileSync(resolve(process.cwd(), "client/src/entry-server.tsx"), "utf8");

describe("approved NAP, entity clarity, and freshness signals", () => {
  it("keeps approved NAP details in one reusable public identity source", () => {
    expect(identity).toContain('name: "DoTheThing"');
    expect(identity).toContain('legalName: "Boundless One Ventures"');
    expect(identity).toContain('telephone: "+60166467024"');
    expect(identity).toContain('addressLine: "15B-8-4, Mont Kiara Pines, Jalan Kiara 1, Mont Kiara, 50480 Kuala Lumpur, Malaysia"');
  });

  it("keeps detailed NAP on the Contact page while the shared Option 01 footer stays compact", () => {
    expect(home).toContain("SITE_IDENTITY.entityClarity");
    expect(footer).toContain("SITE_IDENTITY.ownershipStatement");
    expect(footer).toContain("SITE_IDENTITY.supportEmail");
    expect(footer).toContain("SITE_IDENTITY.productReviewedLabel");
    expect(footer).not.toContain("SITE_IDENTITY.addressLine");
    expect(footer).not.toContain("SITE_IDENTITY.telephoneHref");
    expect(contact).toContain("SITE_IDENTITY.ownershipStatement");
    expect(contact).toContain("SITE_IDENTITY.telephoneHref");
    expect(contact).toContain("SITE_IDENTITY.addressLine");
  });

  it("keeps the same public identity and valid software fields in server-rendered JSON-LD", () => {
    expect(entry).toContain("description: SITE_IDENTITY.businessDescription");
    expect(entry).toContain("legalName: SITE_IDENTITY.legalName");
    expect(entry).toContain("softwareVersion: SITE_IDENTITY.softwareVersion");
    expect(entry).not.toContain("aggregateRating");
  });
});
