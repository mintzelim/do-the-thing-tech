import { describe, it, expect } from "vitest";

const GITHUB_CLIENT_ID = "Ov23liZGqgbtyWXMd5qv";

describe("Decap CMS GitHub OAuth secret", () => {
  it("accepts the configured client credentials at GitHub's OAuth token endpoint", async () => {
    const clientSecret = process.env.GITHUB_CLIENT_SECRET;

    expect(clientSecret, "GITHUB_CLIENT_SECRET must be configured").toBeTruthy();

    const response = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: GITHUB_CLIENT_ID,
        client_secret: clientSecret,
        code: "manus-secret-validation",
      }),
    });

    expect(response.ok).toBe(true);

    const payload = (await response.json()) as { error?: string; error_description?: string };

    expect(payload.error, `Unexpected GitHub OAuth response: ${JSON.stringify(payload)}`).not.toBe(
      "incorrect_client_credentials",
    );
    expect(payload.error, `Unexpected GitHub OAuth response: ${JSON.stringify(payload)}`).toBe(
      "bad_verification_code",
    );
  }, 15000);
});
