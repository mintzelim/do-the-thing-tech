import express, { type Express } from "express";
import fs from "fs";
import { type Server } from "http";
import { nanoid } from "nanoid";
import path from "path";
import { findBlogPostBySlug, injectBlogMetadata } from "../blog-metadata.js";

export async function setupVite(app: Express, server: Server) {
  // Development only - dynamically import Vite to avoid loading in production
  if (process.env.NODE_ENV !== "development") {
    return;
  }
  
  const { createServer: createViteServer } = await import("vite");
  const configFile = path.resolve(import.meta.dirname, "../..", "vite.config.ts");

  const vite = await createViteServer({
    configFile,
    server: {
      middlewareMode: true,
      hmr: { server },
      allowedHosts: true,
    },
    appType: "custom",
  });


  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "../..",
        "client",
        "index.html"
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      
      // Inject blog metadata for blog post routes
      const blogSlugMatch = url.match(/^\/blog\/([^/?]+)/);
      if (blogSlugMatch) {
        const slug = blogSlugMatch[1];
        const post = findBlogPostBySlug(slug);
        if (post) {
          template = injectBlogMetadata(template, post);
        }
      }
      
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  const distPath = path.resolve(process.cwd(), "dist", "public");
  
  if (!fs.existsSync(distPath)) {
    console.error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
    return;
  }

  // Serve static files
  app.use(express.static(distPath, { 
    maxAge: "1d",
    etag: false 
  }));

  // SPA fallback - serve index.html for all non-file routes
  app.use("*", (req, res) => {
    try {
      const indexPath = path.resolve(distPath, "index.html");
      let template = fs.readFileSync(indexPath, "utf-8");
      
      // Inject Organization schema on all pages
      const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "DoTheThing",
        "url": "https://dothething.tech",
        "logo": "https://dothething.tech/favicon.ico",
        "description": "Break down overwhelming tasks into manageable steps with AI-powered task management for ADHD",
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "Customer Support",
          "url": "https://dothething.tech/contact"
        }
      };
      const orgSchemaScript = `<script type="application/ld+json">${JSON.stringify(organizationSchema)}</script>`;
      template = template.replace(/<\/head>/, `${orgSchemaScript}</head>`);
      
      // Inject blog metadata for blog post routes in production
      const blogSlugMatch = req.originalUrl.match(/^\/blog\/([^/?]+)/);
      if (blogSlugMatch) {
        const slug = blogSlugMatch[1];
        const post = findBlogPostBySlug(slug);
        if (post) {
          template = injectBlogMetadata(template, post);
        }
      }
      
      res.status(200).set({ "Content-Type": "text/html" }).end(template);
    } catch (e) {
      console.error("Error serving index.html:", e);
      res.status(500).end("Internal Server Error");
    }
  });
}
