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
          <h1 className="mobile-heading-1">BLOG</h1>
          <div className="mobile-card">
            <p className="mobile-body">Loading blog posts...</p>
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
          <h1 className="mobile-heading-1">BLOG</h1>
          <div className="mobile-card">
            <p className="mobile-body" style={{ color: '#c62828' }}>
              {error}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mobile-frame">
      <Navigation />

      <div className="mobile-content">
        {!selectedPost ? (
          <>
            <h1 className="mobile-heading-1">BLOG</h1>
            <p className="mobile-body" style={{ marginBottom: "24px" }}>
              Explore articles about ADHD, task management, productivity, and neurodiversity.
            </p>

            <div style={{ display: "grid", gap: "16px" }}>
              {posts.map((post) => (
                <button
                  key={post.id}
                  onClick={() => setSelectedPostId(post.id)}
                  style={{
                    backgroundColor: "var(--pixel-card-bg)",
                    border: "2px solid var(--pixel-border)",
                    padding: "16px",
                    textAlign: "left",
                    cursor: "pointer",
                    fontFamily: "'VT323', monospace",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "var(--pixel-accent)";
                    (e.currentTarget as HTMLElement).style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "var(--pixel-card-bg)";
                    (e.currentTarget as HTMLElement).style.color = "var(--pixel-text)";
                  }}
                >
                  <h3 className="mobile-heading-3" style={{ marginBottom: "8px" }}>
                    {post.title}
                  </h3>
                  <p className="mobile-body-sm" style={{ marginBottom: "8px" }}>
                    {post.excerpt}
                  </p>
                  <div style={{ display: "flex", gap: "12px", fontSize: "11px" }}>
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                    <span>•</span>
                    <span>{post.category}</span>
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
                padding: "8px 12px",
                marginBottom: "16px",
                fontFamily: "'VT323', monospace",
                fontSize: "12px",
                cursor: "pointer",
              }}
            >
              ← BACK TO ALL POSTS
            </button>

            <h1 className="mobile-heading-1" style={{ marginBottom: "8px" }}>
              {selectedPost.title}
            </h1>

            <div style={{ display: "flex", gap: "12px", marginBottom: "16px", fontSize: "12px" }}>
              <span>{selectedPost.date}</span>
              <span>•</span>
              <span>{selectedPost.readTime}</span>
              <span>•</span>
              <span>{selectedPost.category}</span>
            </div>

            <div className="mobile-card" style={{ marginBottom: "24px" }}>
              <div className="mobile-body" style={{ whiteSpace: "pre-wrap", lineHeight: "1.6" }}>
                {selectedPost.content}
              </div>
            </div>

            {selectedPost.sources && selectedPost.sources.length > 0 && (
              <div className="mobile-card" style={{ marginBottom: "24px" }}>
                <h3 className="mobile-heading-3" style={{ marginBottom: "12px" }}>
                  SOURCES
                </h3>
                <ul style={{ paddingLeft: "16px" }}>
                  {selectedPost.sources.map((source, idx) => (
                    <li key={idx} style={{ marginBottom: "8px" }}>
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: "var(--pixel-accent)",
                          textDecoration: "none",
                          fontFamily: "'VT323', monospace",
                          fontSize: "12px",
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
              <div className="mobile-card">
                <h3 className="mobile-heading-3" style={{ marginBottom: "12px" }}>
                  RELATED POSTS
                </h3>
                <div style={{ display: "grid", gap: "8px" }}>
                  {relatedPostsList.map((relatedPost) => (
                    <button
                      key={relatedPost.id}
                      onClick={() => setSelectedPostId(relatedPost.id)}
                      style={{
                        backgroundColor: "var(--pixel-card-bg)",
                        border: "1px solid var(--pixel-border)",
                        padding: "8px 12px",
                        textAlign: "left",
                        cursor: "pointer",
                        fontFamily: "'VT323', monospace",
                        fontSize: "12px",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.backgroundColor = "var(--pixel-accent)";
                        (e.currentTarget as HTMLElement).style.color = "white";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.backgroundColor = "var(--pixel-card-bg)";
                        (e.currentTarget as HTMLElement).style.color = "var(--pixel-text)";
                      }}
                    >
                      {relatedPost.title}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
      
      {/* Footer Navigation */}
      <Footer />
    </div>
  );
}
