import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const identityPath = path.join(process.cwd(), "client/src/lib/siteIdentity.ts");
const footerPath = path.join(process.cwd(), "client/src/components/Footer.tsx");
const entryServerPath = path.join(process.cwd(), "client/src/entry-server.tsx");

describe("GEO identity consistency", () => {
  const identitySource = fs.readFileSync(identityPath, "utf8");
  const footerSource = fs.readFileSync(footerPath, "utf8");
  const entryServerSource = fs.readFileSync(entryServerPath, "utf8");

  it("centralizes canonical official profile URLs", () => {
    expect(identitySource).toContain('instagram: "https://www.instagram.com/dothething.tech"');
    expect(identitySource).toContain('tiktok: "https://www.tiktok.com/@dothething.tech"');
    expect(identitySource).toContain('founderLinkedIn: "https://www.linkedin.com/in/mintze/"');
    expect(identitySource).toContain('founderGitHub: "https://github.com/mintzelim"');
  });

  it("uses canonical social URLs in the visible footer", () => {
    expect(footerSource).toContain("SITE_IDENTITY.officialProfiles.instagram");
    expect(footerSource).toContain("SITE_IDENTITY.officialProfiles.tiktok");
    expect(footerSource).not.toContain("?igsh=");
    expect(footerSource).not.toContain("?_r=1");
  });

  it("emits one canonical Brand entity linked to the owner and software", () => {
    expect(entryServerSource).toContain('"@type": "Brand"');
    expect(entryServerSource).toContain('"@id": `${ORIGIN}/#brand`');
    expect(entryServerSource).toContain('brand: { "@id": `${ORIGIN}/#brand` }');
    expect(entryServerSource).toContain("SITE_IDENTITY.officialProfiles.instagram");
    expect(entryServerSource).toContain("SITE_IDENTITY.officialProfiles.tiktok");
  });

  it("does not introduce mismatched commerce schema or fabricated reputation signals", () => {
    expect(entryServerSource).not.toContain('"@type": "OnlineStore"');
    expect(entryServerSource).not.toContain('"@type": "OnlineMarketplace"');
    expect(entryServerSource).not.toContain('"@type": "AggregateRating"');
    expect(entryServerSource).not.toContain("aggregateRating");
    expect(entryServerSource).toContain('"@type": "SoftwareApplication"');
  });
});
