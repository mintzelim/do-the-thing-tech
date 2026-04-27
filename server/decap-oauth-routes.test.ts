import { describe, expect, it } from "vitest";
import { buildDecapAuthorizeUrl, renderDecapAuthResponse } from "./_core/oauth";

describe("Decap CMS OAuth helpers", () => {
  it("builds a GitHub authorize URL that points back to the Decap callback", () => {
    const url = new URL(buildDecapAuthorizeUrl("https://dothething.tech", "state-123"));

    expect(url.origin + url.pathname).toBe("https://github.com/login/oauth/authorize");
    expect(url.searchParams.get("client_id")).toBe("Ov23liZGqgbtyWXMd5qv");
    expect(url.searchParams.get("redirect_uri")).toBe(
      "https://dothething.tech/api/decap/callback",
    );
    expect(url.searchParams.get("scope")).toBe("repo");
    expect(url.searchParams.get("state")).toBe("state-123");
  });

  it("renders the success callback HTML Decap CMS expects", () => {
    const html = renderDecapAuthResponse("success", {
      token: "sample-token",
      provider: "github",
    });

    expect(html).toContain("authorizing:github");
    expect(html).toContain("authorization:github:success:");
    expect(html).toContain("sample-token");
    expect(html).toContain('window.close()');
  });

  it("renders an error callback HTML without exposing unsafe tags", () => {
    const html = renderDecapAuthResponse("error", {
      error: "github_oauth_failed",
      error_description: "Unexpected <script>alert(1)</script>",
    });

    expect(html).toContain("authorization:github:error:");
    expect(html).not.toContain("<script>alert(1)</script>");
    expect(html).toContain("\\u003cscript>alert(1)\\u003c/script>");
  });
});
