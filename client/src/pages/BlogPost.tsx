import { useState, useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BlogContentRenderer from "@/components/BlogContentRenderer";
import Breadcrumb from "@/components/Breadcrumb";
import { generateBlogPostingSchema, generateArticleSchema, generateBreadcrumbSchema, injectSchemaMarkup } from "@/lib/schemaMarkup";
import { updateMetaTags } from "@/lib/metaTags";
import "../pixel-art-refined.css";

// Mobile-optimized sources section component
function SourcesSection({ sources }: { sources: Array<{ title: string; url: string }> }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mobile-card" style={{ marginBottom: "24px", padding: "16px", overflowX: "hidden" }}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          padding: "0",
          color: "var(--pixel-text)",
          fontSize: "16px",
          fontWeight: "bold",
          fontFamily: "'Roboto Mono', monospace",
          transition: "all 0.2s"
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.opacity = "0.8";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.opacity = "1";
        }}
      >
        <span>SOURCES ({sources.length})</span>
        <span style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>▼</span>
      </button>
      
      {isExpanded && (
        <ul style={{
          paddingLeft: "16px",
          margin: "12px 0 0 0",
          fontFamily: "'Roboto Mono', monospace",
          fontSize: "13px",
          fontWeight: 500,
          listStyle: "none"
        }}>
          {sources.map((source, idx) => (
            <li key={idx} style={{ marginBottom: "10px", wordBreak: "break-word" }}>
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "var(--pixel-accent)",
                  textDecoration: "none",
                  fontFamily: "'Roboto Mono', monospace",
                  fontSize: "13px",
                  transition: "all 0.2s",
                  display: "block",
                  width: "100%",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap"
                }}
                onTouchStart={(e) => {
                  (e.currentTarget as HTMLElement).style.textDecoration = "underline";
                }}
                onTouchEnd={(e) => {
                  (e.currentTarget as HTMLElement).style.textDecoration = "none";
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
      )}
    </div>
  );
}

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

export default function BlogPost() {
  const [, navigate] = useLocation();
  const [match, params] = useRoute("/blog/:slug");
  const [post, setPost] = useState<BlogPost | null>(null);
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const slug = params?.slug as string | undefined;

  // Load all blog posts
  useEffect(() => {
    const loadPosts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/blog-posts.json');
        if (!response.ok) {
          throw new Error(`Failed to load blog posts: ${response.statusText}`);
        }
        const data = await response.json();
        setAllPosts(data);
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

  // Find the specific post by slug
  useEffect(() => {
    if (slug && allPosts.length > 0) {
      const foundPost = allPosts.find(p => p.slug === slug);
      if (foundPost) {
        setPost(foundPost);
        // Update all meta tags for SEO
        updateMetaTags({
          title: `${foundPost.title} | DoTheThing Blog`,
          description: foundPost.excerpt,
          canonicalUrl: `https://dothething.tech/blog/${foundPost.slug}`,
          ogUrl: `https://dothething.tech/blog/${foundPost.slug}`,
          keywords: foundPost.seoKeywords?.join(', '),
        });

        // Inject JSON-LD schema markup for SEO and rich snippets
        const siteUrl = window.location.origin;
        const schemas = [
          generateBlogPostingSchema(foundPost, siteUrl),
          generateArticleSchema(foundPost, siteUrl),
          generateBreadcrumbSchema(foundPost, siteUrl),
        ];
        injectSchemaMarkup(schemas);
      } else {
        setError('Blog post not found.');
      }
    }
  }, [slug, allPosts]);

  const relatedPostsList = post
    ? post.relatedPosts
        .map(id => allPosts.find(p => p.id === id))
        .filter(Boolean) as BlogPost[]
    : [];

  if (!match) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="mobile-frame">
        <Navigation />
        <div className="mobile-content">
          <div style={{ maxWidth: "900px", margin: "0 auto", width: "100%", padding: "0 16px" }}>
            <h1 className="mobile-heading-1" style={{ marginBottom: "24px" }}>BLOG</h1>
            <div className="mobile-card">
              <p className="mobile-body">Loading blog post...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="mobile-frame">
        <Navigation />
        <div className="mobile-content">
          <div style={{ maxWidth: "900px", margin: "0 auto", width: "100%", padding: "0 16px" }}>
            <h1 className="mobile-heading-1" style={{ marginBottom: "24px" }}>BLOG</h1>
            <div className="mobile-card">
              <p className="mobile-body" style={{ color: '#c62828' }}>
                {error || 'Blog post not found.'}
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
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Blog", href: "/blog" },
              { label: post.title },
            ]}
          />

          <article style={{ marginBottom: "32px" }}>
            <div style={{ marginBottom: "24px" }}>
              <h1 className="mobile-heading-1" style={{ marginBottom: "12px" }}>
                {post.title}
              </h1>

              <div style={{ 
                display: "flex", 
                gap: "16px", 
                fontSize: "13px", 
                color: "var(--pixel-text-light)",
                flexWrap: "wrap",
                alignItems: "center"
              }}>
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.readTime}</span>
                <span>•</span>
                <span style={{ 
                  backgroundColor: "var(--pixel-accent)", 
                  color: "white", 
                  padding: "4px 12px",
                  fontFamily: "'VT323', monospace"
                }}>
                  {post.category}
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
                  content={post.content}
                  onInternalLinkClick={(postId) => {
                    const relatedPost = allPosts.find(p => p.id === postId);
                    if (relatedPost) {
                      navigate(`/blog/${relatedPost.slug}`, { replace: false });
                    }
                  }}
                />
              </div>
            </div>

            {post.sources && post.sources.length > 0 && (
              <SourcesSection sources={post.sources} />
            )}

            {relatedPostsList.length > 0 && (
              <div className="mobile-card" style={{ padding: "20px" }}>
                <h3 className="mobile-heading-3" style={{ marginBottom: "16px", marginTop: "0" }}>
                  RELATED POSTS
                </h3>
                <div style={{ display: "grid", gap: "12px" }}>
                  {relatedPostsList.map((relatedPost) => (
                    <a
                      key={relatedPost.id}
                      href={`/blog/${relatedPost.slug}`}
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
                        color: "var(--pixel-text)",
                        textDecoration: "none"
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
                    </a>
                  ))}
                </div>
              </div>
            )}
          </article>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
