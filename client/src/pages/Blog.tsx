import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { updateMetaTags, pageMetaTags } from "@/lib/metaTags";
import { displayBlogCategory, getBlogCategories } from "@/lib/blogCategoryUtils";
import { assetUrl } from "@/lib/assetUrl";
import { usePreloadedBlogPosts, type BlogPostRecord } from "@/contexts/BlogPostsContext";
import "../pixel-art-refined.css";
import "../blog-refined.css";

type BlogPost = BlogPostRecord;

const blogMascot = assetUrl("/manus-storage/dothething-how-it-works-brain-dump-transparent_805dc4d4.png");

function BlogStatus({ message, isError = false }: { message: string; isError?: boolean }) {
  return (
    <div className="mobile-frame blog-page">
      <Navigation />
      <main className="blog-shell"><section className="blog-status-panel"><p className="blog-eyebrow">TOOLS &amp; RESOURCES</p><h1>BLOG</h1><p className={isError ? "blog-status-error" : "blog-status-copy"}>{message}</p></section></main>
      <Footer />
    </div>
  );
}

export default function Blog() {
  const preloadedPosts = usePreloadedBlogPosts();
  const [posts, setPosts] = useState<BlogPost[]>(() => preloadedPosts ?? []);
  const [isLoading, setIsLoading] = useState(() => preloadedPosts === null);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    updateMetaTags(pageMetaTags.blog);
  }, []);

  useEffect(() => {
    if (preloadedPosts !== null) {
      setPosts(preloadedPosts);
      setIsLoading(false);
      return;
    }
    const loadPosts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/blog-posts.json?v=${Date.now()}`, { cache: "no-store" });
        if (!response.ok) throw new Error(`Failed to load blog posts: ${response.statusText}`);
        setPosts(await response.json());
        setError(null);
      } catch (err) {
        console.error("Error loading blog posts:", err);
        setError("Failed to load blog posts. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    loadPosts();
  }, [preloadedPosts]);

  const categories = getBlogCategories(posts);
  const filteredPosts = selectedCategory ? posts.filter((post) => post.category === selectedCategory) : posts;

  if (isLoading) return <BlogStatus message="Loading blog posts..." />;
  if (error) return <BlogStatus message={error} isError />;

  return (
    <div className="mobile-frame blog-page">
      <Navigation />
      <main className="blog-shell">
        <section className="blog-index-hero" aria-labelledby="blog-page-title">
          <div className="blog-index-copy">
            <p className="blog-eyebrow"><span aria-hidden="true">✦</span> TOOLS &amp; RESOURCES</p>
            <h1 id="blog-page-title">BLOG</h1>
            <p>Explore articles about ADHD, task management, productivity, and neurodiversity.</p>
          </div>
          <div className="blog-index-art" aria-hidden="true"><img src={blogMascot} alt="" /></div>
        </section>

        <section className="blog-filter-panel" aria-label="Filter articles by category">
          <p className="blog-panel-label">EXPLORE GUIDES</p>
          <h2>Find the next useful read</h2>
          <div className="blog-filter-list">
            <button type="button" className={selectedCategory === null ? "blog-filter is-active" : "blog-filter"} onClick={() => setSelectedCategory(null)}>ALL</button>
            {categories.map((category) => (
              <button type="button" key={category} className={selectedCategory === category ? "blog-filter is-active" : "blog-filter"} onClick={() => setSelectedCategory(category)}>{category}</button>
            ))}
          </div>
        </section>

        <section className="blog-post-grid" aria-live="polite" aria-label="Blog posts">
          {filteredPosts.map((post) => (
            <a className="blog-post-card" key={post.id} href={`/blog/${post.slug}`}>
              <div className="blog-card-image-wrap">
                {post.featuredImage ? <img src={post.featuredImage} alt={post.featuredImageAlt || post.title} className="blog-card-image" /> : <img src={blogMascot} alt="" className="blog-card-mascot" aria-hidden="true" />}
              </div>
              <div className="blog-card-copy">
                <p className="blog-card-category">{displayBlogCategory(post.category)}</p>
                <h2>{post.title}</h2>
                <p className="blog-card-excerpt">{post.excerpt}</p>
                <div className="blog-card-meta"><span>{post.date}</span><span aria-hidden="true">•</span><span>{post.readTime}</span></div>
              </div>
            </a>
          ))}
        </section>

        {filteredPosts.length === 0 && <section className="blog-empty-panel"><p>No posts found in this category.</p></section>}
      </main>
      <Footer />
    </div>
  );
}
