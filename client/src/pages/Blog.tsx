import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import "../pixel-art-refined.css";

type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  seoKeywords: string[];
  sources: Array<{ title: string; url: string }>;
  relatedPosts: string[];
  content: string;
  slug: string;
};

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load blog posts from generated JSON
  useEffect(() => {
    const loadPosts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/blog-posts.json');
        if (!response.ok) {
          throw new Error(`Failed to load blog posts: ${response.statusText}`);
        }
        const data = await response.json();
        setPosts(data);
        setError(null);
      } catch (err) {
        console.error('Error loading blog posts:', err);
        setError('Failed to load blog posts. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
  }, []);

  if (isLoading) {
    return (
      <div className="mobile-frame">
        <Navigation />
        <div className="mobile-content">
          <div style={{ maxWidth: "900px", margin: "0 auto", width: "100%", padding: "0 16px" }}>
            <h1 className="mobile-heading-1" style={{ marginBottom: "24px" }}>BLOG</h1>
            <div className="mobile-card">
              <p className="mobile-body">Loading blog posts...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mobile-frame">
        <Navigation />
        <div className="mobile-content">
          <div style={{ maxWidth: "900px", margin: "0 auto", width: "100%", padding: "0 16px" }}>
            <h1 className="mobile-heading-1" style={{ marginBottom: "24px" }}>BLOG</h1>
            <div className="mobile-card">
              <p className="mobile-body" style={{ color: '#c62828' }}>
                {error}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mobile-frame">
      <Navigation />

      <div className="mobile-content">
        <div style={{ maxWidth: "900px", margin: "0 auto", width: "100%", padding: "0 16px" }}>
          <div style={{ marginBottom: "32px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px" }}>
              <div>
                <h1 className="mobile-heading-1" style={{ marginBottom: "12px" }}>BLOG</h1>
                <p className="mobile-body" style={{ marginBottom: "0", color: "var(--pixel-text-light)" }}>
                  Explore articles about ADHD, task management, productivity, and neurodiversity.
                </p>
              </div>
              <a
                href="/blog/categories"
                style={{
                  backgroundColor: "transparent",
                  border: "2px solid var(--pixel-border)",
                  padding: "8px 16px",
                  fontFamily: "'VT323', monospace",
                  fontSize: "14px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  textDecoration: "none",
                  color: "var(--pixel-text)",
                  whiteSpace: "nowrap",
                  marginTop: "4px"
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.backgroundColor = "var(--pixel-accent)";
                  el.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.backgroundColor = "transparent";
                  el.style.color = "var(--pixel-text)";
                }}
              >
                CATEGORIES
              </a>
            </div>
          </div>

          <div style={{ display: "grid", gap: "16px", marginBottom: "32px" }}>
            {posts.map((post) => (
              <a
                key={post.id}
                href={`/blog/${post.slug}`}
                style={{
                  backgroundColor: "var(--pixel-card-bg)",
                  border: "3px solid var(--pixel-border)",
                  padding: "20px",
                  textAlign: "left",
                  cursor: "pointer",
                  fontFamily: "'VT323', monospace",
                  transition: "all 0.2s ease",
                  boxShadow: "4px 4px 0 rgba(0, 0, 0, 0.1)",
                  position: "relative",
                  display: "block",
                  width: "100%",
                  textDecoration: "none",
                  color: "var(--pixel-text)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  // Use a light accent background instead of full purple for better contrast
                  el.style.backgroundColor = "#e0e7ff";
                  el.style.color = "var(--pixel-text)";
                  el.style.transform = "translate(-2px, -2px)";
                  el.style.boxShadow = "6px 6px 0 rgba(0, 0, 0, 0.15)";
                  // Update tag styling for hover state
                  const tag = el.querySelector('span[style*="background-color"]') as HTMLElement;
                  if (tag) {
                    tag.style.backgroundColor = "var(--pixel-accent)";
                    tag.style.color = "white";
                  }
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.backgroundColor = "var(--pixel-card-bg)";
                  el.style.color = "var(--pixel-text)";
                  el.style.transform = "translate(0, 0)";
                  el.style.boxShadow = "4px 4px 0 rgba(0, 0, 0, 0.1)";
                }}
              >
                <h3 className="mobile-heading-3" style={{ marginBottom: "8px", marginTop: "0" }}>
                  {post.title}
                </h3>
                <p className="mobile-body-sm" style={{ marginBottom: "12px", color: "var(--pixel-text-light)" }}>
                  {post.excerpt}
                </p>
                <div style={{ display: "flex", gap: "12px", fontSize: "12px", color: "var(--pixel-text-light)" }}>
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                  <span>•</span>
                  <span style={{ 
                    backgroundColor: "var(--pixel-accent)", 
                    color: "white", 
                    padding: "2px 8px",
                    fontFamily: "'VT323', monospace"
                  }}>
                    {post.category}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
