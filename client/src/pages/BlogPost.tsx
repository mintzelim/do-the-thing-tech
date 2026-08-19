import { useEffect, useState } from "react";
import { useRoute, useLocation } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BlogContentRenderer from "@/components/BlogContentRenderer";
import Breadcrumb from "@/components/Breadcrumb";
import { updateMetaTags } from "@/lib/metaTags";
import { assetUrl } from "@/lib/assetUrl";
import { getBlogCategoryEyebrow } from "@/lib/blogCategoryUtils";
import { usePreloadedBlogPosts, type BlogPostRecord } from "@/contexts/BlogPostsContext";
import "../pixel-art-refined.css";
import "../blog-refined.css";
import "../blog-field-guide.css";
import "../blog-breadcrumb.css";

type BlogPost = BlogPostRecord;

const articleMascot = assetUrl("/manus-storage/dothething-how-it-works-breakdown-transparent_3a48d1ce.png");
const ctaMascot = assetUrl("/manus-storage/dothething-how-it-works-timer-transparent_f4de844b.png");

function SourcesSection({ sources }: { sources: Array<{ title: string; url: string }> }) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <section className="blog-sources-panel" aria-label="Article sources">
      <button type="button" className="blog-sources-toggle" onClick={() => setIsExpanded((value) => !value)} aria-expanded={isExpanded}>
        <span>SOURCES ({sources.length})</span><span className={isExpanded ? "is-open" : ""} aria-hidden="true">⌄</span>
      </button>
      {isExpanded && <ul>{sources.map((source, index) => <li key={`${source.url}-${index}`}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.title} <span aria-hidden="true">↗</span></a></li>)}</ul>}
    </section>
  );
}

function BlogPostStatus({ message, isError = false }: { message: string; isError?: boolean }) {
  return <div className="mobile-frame blog-post-page"><Navigation /><main className="blog-article-shell"><section className="blog-status-panel"><p className="blog-eyebrow">TOOLS &amp; RESOURCES</p><h1>BLOG</h1><p className={isError ? "blog-status-error" : "blog-status-copy"}>{message}</p></section></main><Footer /></div>;
}

export default function BlogPost() {
  const [, navigate] = useLocation();
  const [match, params] = useRoute("/blog/:slug");
  const preloadedPosts = usePreloadedBlogPosts();
  const slug = params?.slug as string | undefined;
  const [post, setPost] = useState<BlogPost | null>(() => preloadedPosts?.find((candidate) => candidate.slug === slug) ?? null);
  const [allPosts, setAllPosts] = useState<BlogPost[]>(() => preloadedPosts ?? []);
  const [isLoading, setIsLoading] = useState(() => preloadedPosts === null);
  const [error, setError] = useState<string | null>(null);
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    if (preloadedPosts !== null) {
      setAllPosts(preloadedPosts);
      setPost(preloadedPosts.find((candidate) => candidate.slug === slug) ?? null);
      setIsLoading(false);
      return;
    }
    const loadPosts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/blog-posts.json?v=${Date.now()}`, { cache: "no-store" });
        if (!response.ok) throw new Error(`Failed to load blog posts: ${response.statusText}`);
        setAllPosts(await response.json());
        setError(null);
      } catch (err) {
        console.error("Error loading blog posts:", err);
        setError("Failed to load blog posts. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    loadPosts();
  }, [preloadedPosts, slug]);

  useEffect(() => {
    if (!slug || allPosts.length === 0) return;
    const foundPost = allPosts.find((candidate) => candidate.slug === slug);
    if (!foundPost) { setError("Blog post not found."); return; }
    setPost(foundPost);
    const blogPostUrl = `https://dothething.tech/blog/${foundPost.slug}`;
    updateMetaTags({ title: `${foundPost.title} | DoTheThing Blog`, description: foundPost.excerpt, canonicalUrl: blogPostUrl, ogUrl: blogPostUrl, ogId: `${blogPostUrl}#blogpost`, keywords: foundPost.seoKeywords?.join(", ") });
  }, [slug, allPosts]);

  useEffect(() => {
    if (!post) return;
    const updateReadingProgress = () => {
      const article = document.querySelector<HTMLElement>(".blog-field-guide-article");
      if (!article) return;
      const articleStart = window.scrollY + article.getBoundingClientRect().top;
      const readableDistance = Math.max(article.offsetHeight - window.innerHeight, 1);
      const value = Math.min(100, Math.max(0, Math.round(((window.scrollY - articleStart + 128) / readableDistance) * 100)));
      setReadingProgress(value);
    };
    updateReadingProgress();
    window.addEventListener("scroll", updateReadingProgress, { passive: true });
    window.addEventListener("resize", updateReadingProgress);
    return () => {
      window.removeEventListener("scroll", updateReadingProgress);
      window.removeEventListener("resize", updateReadingProgress);
    };
  }, [post]);

  const relatedPostsList = post ? post.relatedPosts.map((id) => allPosts.find((candidate) => candidate.id === id)).filter(Boolean) as BlogPost[] : [];
  if (!match) return null;
  if (isLoading) return <BlogPostStatus message="Loading blog post..." />;
  if (error || !post) return <BlogPostStatus message={error || "Blog post not found."} isError />;
  const articleEyebrow = getBlogCategoryEyebrow(post.category);

  return (
    <div className="mobile-frame blog-post-page">
      <Navigation />
      <main className="blog-article-shell">
        <div className="blog-reading-progress" role="progressbar" aria-label="Reading progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={readingProgress} aria-valuetext={`${readingProgress}% read`}>
          <span className="blog-reading-progress-label" aria-hidden="true">READING <b>{readingProgress}%</b></span>
          <span className="blog-reading-progress-track" aria-hidden="true"><span className="blog-reading-progress-fill" style={{ transform: `scaleX(${readingProgress / 100})` }} /></span>
        </div>
        <div className="blog-breadcrumb-wrap"><Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: post.title }]} /></div>
        <article className="blog-field-guide-article">
          <header className="blog-article-hero blog-field-guide-header">
            <div className="blog-article-title-copy">
              <p className="blog-eyebrow"><span aria-hidden="true">✦</span> {articleEyebrow}</p>
              <h1>{post.title}</h1>
              <p className="blog-article-excerpt">{post.excerpt}</p>
              <div className="blog-article-meta"><span>Published {post.date}</span>{post.updatedDate && <><span aria-hidden="true">•</span><span>Updated {post.updatedDate}</span></>}<span aria-hidden="true">•</span><span>{post.readTime}</span>{post.wordCount && <><span aria-hidden="true">•</span><span>{post.wordCount.toLocaleString()} words</span></>}</div>
              <p className="blog-article-byline">Written by <a href="/about#author">Lim Min Tze</a>, Founder, Creative Director, Product Developer at DoTheThing. <a href="/editorial-standards">Editorial standards</a></p>
            </div>
            <div className="blog-article-mascot" aria-hidden="true"><img src={articleMascot} alt="" /></div>
          </header>

          {post.featuredImage && <figure className="blog-article-feature"><img src={post.featuredImage} alt={post.featuredImageAlt || post.title} /></figure>}
          <div className="blog-article-body"><BlogContentRenderer content={post.content} onInternalLinkClick={(postId) => { const relatedPost = allPosts.find((candidate) => candidate.id === postId); if (relatedPost) navigate(`/blog/${relatedPost.slug}`, { replace: false }); }} /></div>
          {post.sources && post.sources.length > 0 && <SourcesSection sources={post.sources} />}

          <section className="blog-article-cta" aria-labelledby="article-cta-heading">
            <div className="blog-article-cta-art" aria-hidden="true"><img src={ctaMascot} alt="" /></div>
            <div><p className="blog-eyebrow">START WHEN READY</p><h2 id="article-cta-heading">READY TO BREAK DOWN YOUR TASKS?</h2><p>Use DoTheThing to turn your brain dump into actionable steps. Free. No login. Works in under a minute.</p><a href="/">OPEN DOTHETHING <span aria-hidden="true">→</span></a></div>
          </section>

          {relatedPostsList.length > 0 && <section className="blog-related-section" aria-labelledby="related-posts-heading"><p className="blog-panel-label">KEEP GOING</p><h2 id="related-posts-heading">RELATED POSTS</h2><div>{relatedPostsList.map((relatedPost) => <a key={relatedPost.id} href={`/blog/${relatedPost.slug}`}><p>{relatedPost.category}</p><h3>{relatedPost.title}</h3><span>Read guide <span aria-hidden="true">→</span></span></a>)}</div></section>}
        </article>
      </main>
      <Footer />
    </div>
  );
}
