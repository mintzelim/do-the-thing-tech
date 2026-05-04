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
  slug: string;
};

export default function BlogCategories() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const response = await fetch("/blog-posts.json");
        const data = await response.json();
        setPosts(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading blog posts:", error);
        setIsLoading(false);
      }
    };

    loadPosts();
  }, []);

  // Get unique categories and count posts per category
  const categories = Array.from(
    new Map(
      posts.map((post) => [
        post.category,
        posts.filter((p) => p.category === post.category).length,
      ])
    ).entries()
  ).sort((a, b) => b[1] - a[1]); // Sort by post count descending

  const filteredPosts = selectedCategory
    ? posts.filter((post) => post.category === selectedCategory)
    : posts;

  return (
    <div className="mobile-frame">
      <Navigation />

      <div className="mobile-content">
        <div style={{ maxWidth: "900px", margin: "0 auto", width: "100%", padding: "0 16px" }}>
          <a
            href="/blog"
            style={{
              backgroundColor: "transparent",
              border: "2px solid var(--pixel-border)",
              padding: "8px 16px",
              marginBottom: "24px",
              marginTop: "16px",
              fontFamily: "'VT323', monospace",
              fontSize: "14px",
              cursor: "pointer",
              transition: "all 0.2s",
              display: "inline-block",
              textDecoration: "none",
              color: "var(--pixel-text)",
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
            ← BACK TO BLOG
          </a>

          <h1 className="mobile-heading-1" style={{ marginBottom: "8px", marginTop: "24px" }}>
            BLOG CATEGORIES
          </h1>
          <p className="mobile-body" style={{ color: "var(--pixel-text-light)", marginBottom: "32px" }}>
            Browse posts by topic
          </p>

          {/* Category Filter */}
          <div style={{ marginBottom: "32px" }}>
            <div style={{ marginBottom: "16px" }}>
              <button
                onClick={() => setSelectedCategory(null)}
                style={{
                  backgroundColor: selectedCategory === null ? "var(--pixel-accent)" : "transparent",
                  color: selectedCategory === null ? "white" : "var(--pixel-text)",
                  border: "2px solid var(--pixel-border)",
                  padding: "8px 16px",
                  marginRight: "8px",
                  marginBottom: "8px",
                  fontFamily: "'VT323', monospace",
                  fontSize: "14px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (selectedCategory !== null) {
                    const el = e.currentTarget as HTMLElement;
                    el.style.backgroundColor = "var(--pixel-accent)";
                    el.style.color = "white";
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedCategory !== null) {
                    const el = e.currentTarget as HTMLElement;
                    el.style.backgroundColor = "transparent";
                    el.style.color = "var(--pixel-text)";
                  }
                }}
              >
                ALL ({posts.length})
              </button>

              {categories.map(([category, count]) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  style={{
                    backgroundColor: selectedCategory === category ? "var(--pixel-accent)" : "transparent",
                    color: selectedCategory === category ? "white" : "var(--pixel-text)",
                    border: "2px solid var(--pixel-border)",
                    padding: "8px 16px",
                    marginRight: "8px",
                    marginBottom: "8px",
                    fontFamily: "'VT323', monospace",
                    fontSize: "14px",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    if (selectedCategory !== category) {
                      const el = e.currentTarget as HTMLElement;
                      el.style.backgroundColor = "var(--pixel-accent)";
                      el.style.color = "white";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedCategory !== category) {
                      const el = e.currentTarget as HTMLElement;
                      el.style.backgroundColor = "transparent";
                      el.style.color = "var(--pixel-text)";
                    }
                  }}
                >
                  {category} ({count})
                </button>
              ))}
            </div>
          </div>

          {/* Posts List */}
          {isLoading ? (
            <div className="mobile-card" style={{ padding: "24px" }}>
              <p className="mobile-body">Loading categories...</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="mobile-card" style={{ padding: "24px" }}>
              <p className="mobile-body" style={{ color: "var(--pixel-text-light)" }}>
                No posts found in this category.
              </p>
            </div>
          ) : (
            <div style={{ display: "grid", gap: "16px", marginBottom: "32px" }}>
              {filteredPosts.map((post) => (
                <a
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  style={{
                    backgroundColor: "var(--pixel-card-bg)",
                    border: "2px solid var(--pixel-border)",
                    padding: "16px",
                    textDecoration: "none",
                    color: "var(--pixel-text)",
                    transition: "all 0.2s",
                    display: "block",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.backgroundColor = "var(--pixel-accent)";
                    el.style.color = "white";
                    el.style.transform = "translate(-2px, -2px)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.backgroundColor = "var(--pixel-card-bg)";
                    el.style.color = "var(--pixel-text)";
                    el.style.transform = "translate(0, 0)";
                  }}
                >
                  <h3 className="mobile-heading-3" style={{ marginTop: "0", marginBottom: "8px" }}>
                    {post.title}
                  </h3>
                  <p className="mobile-body" style={{ marginBottom: "12px", fontSize: "14px" }}>
                    {post.excerpt}
                  </p>
                  <div style={{
                    display: "flex",
                    gap: "12px",
                    fontSize: "12px",
                    color: "var(--pixel-text-light)",
                    flexWrap: "wrap",
                  }}>
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
