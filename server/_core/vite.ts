import express, { type Express, type Request, type Response } from "express";
import fs from "fs";
import { type Server } from "http";
import { nanoid } from "nanoid";
import path from "path";
import { loadBlogPosts } from "../blog-metadata.js";

const ORIGIN = "https://dothething.tech";
const SITE_NAME = "DoTheThing";
const FALLBACK_DESCRIPTION = "Free, no-login task breakdown for ADHD and executive-function friction.";

type SsrHead = {
  title: string;
  description: string;
  canonicalPath: string;
  ogType: "website" | "article";
  ogImage?: string;
  noindex?: boolean;
  notFound?: boolean;
  jsonLd: unknown[];
};

const escapeHtml = (value: string) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
const metaText = (value: string, limit: number) => {
  const normalized = value.replace(/[#*_`~]+/g, "").replace(/\s+/g, " ").trim();
  return normalized.length <= limit ? normalized : `${normalized.slice(0, limit - 1).trimEnd()}…`;
};
const absoluteUrl = (value?: string) => {
  if (!value) return `${ORIGIN}/og-image.png`;
  if (value.startsWith("http")) return value;
  return `${ORIGIN}${value.startsWith("/") ? "" : "/"}${value}`;
};

function buildHeadTags(head: SsrHead) {
  const title = escapeHtml(metaText(head.title, 70) || SITE_NAME);
  const description = escapeHtml(metaText(head.description, 200));
  const canonical = `${ORIGIN}${head.canonicalPath}`;
  const image = absoluteUrl(head.ogImage);
  const schema = JSON.stringify({ "@context": "https://schema.org", "@graph": head.jsonLd }).replace(/</g, "\\u003c");
  return [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    `<meta name="robots" content="${head.noindex || head.notFound ? "noindex, follow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"}" />`,
    `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:type" content="${head.ogType}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:image" content="${escapeHtml(image)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<meta name="twitter:image" content="${escapeHtml(image)}" />`,
    `<script type="application/ld+json">${schema}</script>`,
  ].join("\n");
}

function composeHtml(template: string, appHtml: string, head: SsrHead, blogPosts: unknown) {
  const state = JSON.stringify(blogPosts).replace(/</g, "\\u003c");
  const stateScript = `<script>window.__DTT_BLOG_POSTS__=${state};window.__DTT_SSR_PATH__=${JSON.stringify(head.canonicalPath)};</script>`;
  return template
    .replace("<!--app-head-->", () => buildHeadTags(head))
    .replace("<!--app-html-->", () => appHtml)
    .replace("</body>", () => `${stateScript}</body>`);
}

async function renderPage(url: string, template: string) {
  const serverEntryPath = path.resolve(process.cwd(), "dist", "server-ssr", "entry-server.js");
  const { render } = await import(serverEntryPath);
  const result = await render(url, loadBlogPosts());
  return { ...result, page: composeHtml(template, result.html, result.head, result.blogPosts) };
}

export async function setupVite(app: Express, server: Server) {
  if (process.env.NODE_ENV !== "development") return;
  const { createServer: createViteServer } = await import("vite");
  const configFile = path.resolve(import.meta.dirname, "../..", "vite.config.ts");
  const vite = await createViteServer({ configFile, server: { middlewareMode: true, hmr: { server }, allowedHosts: true }, appType: "custom" });
  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    try {
      const templatePath = path.resolve(import.meta.dirname, "../..", "client", "index.html");
      let template = await fs.promises.readFile(templatePath, "utf-8");
      template = template.replace(`src="/src/entry-client.tsx"`, `src="/src/entry-client.tsx?v=${nanoid()}"`);
      template = await vite.transformIndexHtml(req.originalUrl, template);
      template = template.replace("</head>", `<link rel="stylesheet" href="/src/index.css?direct" data-ssr-dev-css></head>`);
      const { render } = await vite.ssrLoadModule("/src/entry-server.tsx");
      const result = await render(req.originalUrl, loadBlogPosts());
      res.status(result.head.notFound ? 404 : 200).set("Cache-Control", "no-cache").type("html").end(composeHtml(template, result.html, result.head, result.blogPosts));
    } catch (error) {
      vite.ssrFixStacktrace(error as Error);
      console.error("[SSR] dev render failed:", error);
      next(error);
    }
  });
}

export function serveStatic(app: Express) {
  const distPath = path.resolve(process.cwd(), "dist", "public");
  if (!fs.existsSync(distPath)) {
    console.error(`Could not find the build directory: ${distPath}`);
    return;
  }
  app.use((req: Request, res: Response, next) => {
    if (req.path === "/index.html") return res.redirect(301, "/");
    if (req.path !== "/" && /\/+$/ .test(req.path)) return res.redirect(301, req.path.replace(/\/+$/, "") + req.originalUrl.slice(req.path.length));
    next();
  });
  app.use(express.static(distPath, { index: false, redirect: false, maxAge: "1d", etag: false }));
  app.use("*", async (req, res) => {
    const templatePath = path.resolve(distPath, "index.html");
    try {
      const template = await fs.promises.readFile(templatePath, "utf-8");
      const result = await renderPage(req.originalUrl, template);
      res.status(result.head.notFound ? 404 : 200).set("Cache-Control", "no-cache").type("html").end(result.page);
    } catch (error) {
      console.error("[SSR] render failed, serving shell:", error);
      const template = await fs.promises.readFile(templatePath, "utf-8");
      const fallbackHead: SsrHead = { title: SITE_NAME, description: FALLBACK_DESCRIPTION, canonicalPath: "/", ogType: "website", jsonLd: [] };
      res.status(200).set("Cache-Control", "no-cache").type("html").end(composeHtml(template, "", fallbackHead, null));
    }
  });
}
