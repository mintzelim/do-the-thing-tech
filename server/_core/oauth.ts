import crypto from "crypto";
import { parse as parseCookie } from "cookie";
import { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";
import type { Express, Request, Response } from "express";
import * as db from "../db";
import { getSessionCookieOptions } from "./cookies";
import { sdk } from "./sdk";

const DECAP_STATE_COOKIE = "decap_oauth_state";
const GITHUB_CLIENT_ID = "Ov23liZGqgbtyWXMd5qv";
const GITHUB_SCOPE = "repo";

function getQueryParam(req: Request, key: string): string | undefined {
  const value = req.query[key];
  return typeof value === "string" ? value : undefined;
}

function getRequestOrigin(req: Request): string {
  const forwardedProto = req.headers["x-forwarded-proto"];
  const protocol =
    typeof forwardedProto === "string"
      ? forwardedProto.split(",")[0]
      : req.protocol || "https";
  const forwardedHost = req.headers["x-forwarded-host"];
  const host = typeof forwardedHost === "string" ? forwardedHost : req.get("host");

  if (!host) {
    throw new Error("Unable to determine request host for OAuth redirect");
  }

  return `${protocol}://${host}`;
}

function getCookieValue(req: Request, cookieName: string): string | undefined {
  const header = req.headers.cookie;
  if (!header) {
    return undefined;
  }

  const cookies = parseCookie(header);
  return cookies[cookieName];
}

function escapeForInlineScript(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export function renderDecapAuthResponse(
  status: "success" | "error",
  content: Record<string, unknown>,
): string {
  const serializedContent = escapeForInlineScript(content);

  return `<!doctype html>
<html>
  <body>
    <script>
      (function () {
        const sendResult = function (message) {
          if (!window.opener) {
            return;
          }

          window.opener.postMessage(
            'authorization:github:${status}:' + ${serializedContent},
            message.origin,
          );
          window.removeEventListener('message', sendResult, false);
          window.close();
        };

        window.addEventListener('message', sendResult, false);
        if (window.opener) {
          window.opener.postMessage('authorizing:github', '*');
        }
      })();
    </script>
  </body>
</html>`;
}

export function buildDecapAuthorizeUrl(origin: string, state: string): string {
  const authorizeUrl = new URL("https://github.com/login/oauth/authorize");
  authorizeUrl.searchParams.set("client_id", GITHUB_CLIENT_ID);
  authorizeUrl.searchParams.set("redirect_uri", `${origin}/api/decap/callback`);
  authorizeUrl.searchParams.set("scope", GITHUB_SCOPE);
  authorizeUrl.searchParams.set("state", state);
  return authorizeUrl.toString();
}

async function exchangeGithubCodeForToken(code: string, origin: string) {
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  if (!clientSecret) {
    throw new Error("GITHUB_CLIENT_SECRET is not configured");
  }

  const response = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "User-Agent": "dothething-decap-cms",
    },
    body: JSON.stringify({
      client_id: GITHUB_CLIENT_ID,
      client_secret: clientSecret,
      code,
      redirect_uri: `${origin}/api/decap/callback`,
    }),
  });

  const payload = (await response.json()) as {
    access_token?: string;
    error?: string;
    error_description?: string;
  };

  if (!response.ok || payload.error || !payload.access_token) {
    throw new Error(payload.error_description || payload.error || "GitHub token exchange failed");
  }

  return payload.access_token;
}

async function handleDecapAuth(req: Request, res: Response) {
  try {
    const origin = getRequestOrigin(req);
    const state = crypto.randomBytes(24).toString("hex");
    const secure = origin.startsWith("https://");

    res.cookie(DECAP_STATE_COOKIE, state, {
      httpOnly: true,
      sameSite: "lax",
      secure,
      path: "/",
      maxAge: 10 * 60 * 1000,
    });

    res.redirect(302, buildDecapAuthorizeUrl(origin, state));
  } catch (error) {
    console.error("[Decap OAuth] Auth redirect failed", error);
    res.status(500).send("Unable to start GitHub authentication for Decap CMS.");
  }
}

async function handleDecapCallback(req: Request, res: Response) {
  const code = getQueryParam(req, "code");
  const state = getQueryParam(req, "state");
  const expectedState = getCookieValue(req, DECAP_STATE_COOKIE);

  if (!code || !state || !expectedState || state !== expectedState) {
    res
      .status(400)
      .type("html")
      .send(
        renderDecapAuthResponse("error", {
          error: "invalid_oauth_state",
          error_description: "The Decap CMS OAuth state is missing or invalid.",
        }),
      );
    return;
  }

  try {
    const origin = getRequestOrigin(req);
    const token = await exchangeGithubCodeForToken(code, origin);

    res.clearCookie(DECAP_STATE_COOKIE, { path: "/" });
    res.status(200).type("html").send(
      renderDecapAuthResponse("success", {
        token,
        provider: "github",
      }),
    );
  } catch (error) {
    console.error("[Decap OAuth] Callback failed", error);
    res.clearCookie(DECAP_STATE_COOKIE, { path: "/" });
    res.status(401).type("html").send(
      renderDecapAuthResponse("error", {
        error: "github_oauth_failed",
        error_description:
          error instanceof Error ? error.message : "GitHub authentication failed.",
      }),
    );
  }
}

export function registerOAuthRoutes(app: Express) {
  app.get("/api/oauth/callback", async (req: Request, res: Response) => {
    const code = getQueryParam(req, "code");
    const state = getQueryParam(req, "state");

    if (!code || !state) {
      res.status(400).json({ error: "code and state are required" });
      return;
    }

    try {
      const tokenResponse = await sdk.exchangeCodeForToken(code, state);
      const userInfo = await sdk.getUserInfo(tokenResponse.accessToken);

      if (!userInfo.openId) {
        res.status(400).json({ error: "openId missing from user info" });
        return;
      }

      await db.upsertUser({
        openId: userInfo.openId,
        name: userInfo.name || null,
        email: userInfo.email ?? null,
        loginMethod: userInfo.loginMethod ?? userInfo.platform ?? null,
        lastSignedIn: new Date(),
      });

      const sessionToken = await sdk.createSessionToken(userInfo.openId, {
        name: userInfo.name || "",
        expiresInMs: ONE_YEAR_MS,
      });

      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });

      res.redirect(302, "/");
    } catch (error) {
      console.error("[OAuth] Callback failed", error);
      res.status(500).json({ error: "OAuth callback failed" });
    }
  });

  app.get("/api/decap/auth", handleDecapAuth);
  app.get("/auth", handleDecapAuth);

  app.get("/api/decap/callback", handleDecapCallback);
  app.get("/callback", handleDecapCallback);
}
