import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const BASE_URL = "https://dothething.tech";
const BLOG_POSTS_FILE = path.join(__dirname, "../client/public/blog-posts.json");
const SITEMAP_OUTPUTS = [
  path.join(__dirname, "../client/public/sitemap.xml"),
  path.join(__dirname, "../public/sitemap.xml"),
];

const staticPages = [
  { url: "/", priority: "1.0", changefreq: "weekly" },
  { url: "/about", priority: "0.8", changefreq: "monthly" },
  { url: "/blog", priority: "0.9", changefreq: "daily" },
  { url: "/contact", priority: "0.7", changefreq: "monthly" },
  { url: "/privacy", priority: "0.5", changefreq: "yearly" },
  { url: "/terms", priority: "0.5", changefreq: "yearly" },
];

function ensureDir(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function generateSitemap() {
  try {
    let blogPosts = [];
    if (fs.existsSync(BLOG_POSTS_FILE)) {
      const content = fs.readFileSync(BLOG_POSTS_FILE, "utf-8");
      blogPosts = JSON.parse(content);
    }

    let xmlEntries = staticPages
      .map((page) => {
        const lastmod = new Date().toISOString().split("T")[0];
        return `  <url>
    <loc>${BASE_URL}${page.url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
      })
      .join("\n");

    if (blogPosts.length > 0) {
      const blogEntries = blogPosts
        .map((post) => {
          const parsed = Date.parse(post.date || "");
          const lastmod = Number.isNaN(parsed)
            ? new Date().toISOString().split("T")[0]
            : new Date(parsed).toISOString().split("T")[0];
          return `  <url>
    <loc>${BASE_URL}/blog/${post.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
        })
        .join("\n");
      xmlEntries += "\n" + blogEntries;
    }

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlEntries}
</urlset>`;

    SITEMAP_OUTPUTS.forEach((outputPath) => {
      ensureDir(outputPath);
      fs.writeFileSync(outputPath, sitemap, "utf-8");
      console.log(`📍 Output: ${outputPath}`);
    });

    console.log(`✅ Generated sitemap.xml with ${staticPages.length + blogPosts.length} URLs`);
  } catch (error) {
    console.error("❌ Error generating sitemap:", error);
    process.exit(1);
  }
}

generateSitemap();
