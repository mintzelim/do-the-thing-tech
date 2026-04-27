import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BlogContentRenderer from "@/components/BlogContentRenderer";
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
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
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

  const selectedPost = selectedPostId ? posts.find(p => p.id === selectedPostId) : null;
  const relatedPostsList = selectedPost
    ? selectedPost.relatedPosts
        .map(id => posts.find(p => p.id === id))
        .filter(Boolean) as BlogPost[]
    : [];

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
          {!selectedPost ? (
            <>
              <div style={{ marginBottom: "32px" }}>
                <h1 className="mobile-heading-1" style={{ marginBottom: "12px" }}>BLOG</h1>
                <p className="mobile-body" style={{ marginBottom: "0", color: "var(--pixel-text-light)" }}>
                  Explore articles about ADHD, task management, productivity, and neurodiversity.
                </p>
              </div>

              <div style={{ display: "grid", gap: "16px", marginBottom: "32px" }}>
                {posts.map((post) => (
                  <button
                    key={post.id}
                    onClick={() => setSelectedPostId(post.id)}
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
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              <button
                onClick={() => setSelectedPostId(null)}
                style={{
                  backgroundColor: "transparent",
                  border: "2px solid var(--pixel-border)",
                  padding: "8px 16px",
                  marginBottom: "24px",
                  fontFamily: "'VT323', monospace",
                  fontSize: "14px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  display: "inline-block",
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
                ← BACK TO ALL POSTS
              </button>

              <article style={{ marginBottom: "32px" }}>
                <div style={{ marginBottom: "24px" }}>
                  <h1 className="mobile-heading-1" style={{ marginBottom: "12px" }}>
                    {selectedPost.title}
                  </h1>

                  <div style={{ 
                    display: "flex", 
                    gap: "16px", 
                    fontSize: "13px", 
                    color: "var(--pixel-text-light)",
                    flexWrap: "wrap",
                    alignItems: "center"
                  }}>
                    <span>{selectedPost.date}</span>
                    <span>•</span>
                    <span>{selectedPost.readTime}</span>
                    <span>•</span>
                    <span style={{ 
                      backgroundColor: "var(--pixel-accent)", 
                      color: "white", 
                      padding: "4px 12px",
                      fontFamily: "'VT323', monospace"
                    }}>
                      {selectedPost.category}
                    </span>
                  </div>
                </div>

                <div className="mobile-card" style={{ marginBottom: "32px", padding: "24px" }}>
                  <div style={{ 
                    fontFamily: "'Roboto Mono', monospace",
                    fontSize: "16px",
                    fontWeight: 500,
                    lineHeight: "1.8",
                    color: "var(--pixel-text)"
                  }}>
                    <BlogContentRenderer 
                      content={selectedPost.content}
                      onInternalLinkClick={(postId) => setSelectedPostId(postId)}
                    />
                  </div>
                </div>

                {selectedPost.sources && selectedPost.sources.length > 0 && (
                  <div className="mobile-card" style={{ marginBottom: "24px", padding: "20px" }}>
                    <h3 className="mobile-heading-3" style={{ marginBottom: "16px", marginTop: "0" }}>
                      SOURCES & REFERENCES
                    </h3>
                    <ul style={{ 
                      paddingLeft: "20px", 
                      margin: "0",
                      fontFamily: "'Roboto Mono', monospace",
                      fontSize: "14px",
                      fontWeight: 500
                    }}>
                      {selectedPost.sources.map((source, idx) => (
                        <li key={idx} style={{ marginBottom: "12px" }}>
                          <a
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              color: "var(--pixel-accent)",
                              textDecoration: "none",
                              fontFamily: "'Roboto Mono', monospace",
                              fontSize: "14px",
                              transition: "all 0.2s"
                            }}
                            onMouseEnter={(e) => {
                              (e.currentTarget as HTMLElement).style.textDecoration = "underline";
                            }}
                            onMouseLeave={(e) => {
                              (e.currentTarget as HTMLElement).style.textDecoration = "none";
                            }}
                          >
                            {source.title} ↗
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {relatedPostsList.length > 0 && (
                  <div className="mobile-card" style={{ padding: "20px" }}>
                    <h3 className="mobile-heading-3" style={{ marginBottom: "16px", marginTop: "0" }}>
                      RELATED POSTS
                    </h3>
                    <div style={{ display: "grid", gap: "12px" }}>
                      {relatedPostsList.map((relatedPost) => (
                        <button
                          key={relatedPost.id}
                          onClick={() => setSelectedPostId(relatedPost.id)}
                          style={{
                            backgroundColor: "var(--pixel-card-bg)",
                            border: "2px solid var(--pixel-border)",
                            padding: "12px 16px",
                            textAlign: "left",
                            cursor: "pointer",
                            fontFamily: "'VT323', monospace",
                            fontSize: "14px",
                            transition: "all 0.2s",
                            display: "block",
                            width: "100%",
                            color: "var(--pixel-text)"
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
                          {relatedPost.title}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </article>
            </>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
