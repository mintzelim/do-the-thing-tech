import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { updateMetaTags } from "@/lib/metaTags";
import "../pixel-art-refined.css";
import "../geo-pages.css";

const meta = {
  title: "Editorial Standards | DoTheThing",
  description: "How DoTheThing creates, reviews, updates, and corrects educational content about ADHD task management and executive function.",
  canonicalUrl: "https://dothething.tech/editorial-standards",
  ogUrl: "https://dothething.tech/editorial-standards",
};

export default function EditorialStandards() {
  useEffect(() => { updateMetaTags(meta); }, []);
  return (
    <div className="mobile-frame geo-page">
      <Navigation />
      <main className="geo-shell">
        <section className="geo-hero" aria-labelledby="standards-heading"><p className="geo-eyebrow">HOW WE EARN ATTENTION</p><h1 id="standards-heading">EDITORIAL STANDARDS</h1><p className="geo-lead">DoTheThing publishes practical education about task initiation and ADHD-related executive-function friction. We aim to make the advice clear, sourced where claims are factual, and honest about what a productivity tool can and cannot do.</p></section>
        <section className="geo-workflow" aria-labelledby="principles-heading"><div className="geo-section-heading"><p className="geo-eyebrow">THE WORKING RULES</p><h2 id="principles-heading">USEFUL, CHECKABLE, AND CAREFUL</h2></div><ol className="geo-step-list"><li><span className="geo-step-number" aria-hidden="true">01</span><div><h3>Source factual claims</h3><p>Articles link to their references when they discuss research, clinical concepts, statistics, or healthcare information. We prefer primary research, clinical guidance, and credible institutions over unsupported summaries.</p></div></li><li><span className="geo-step-number" aria-hidden="true">02</span><div><h3>Separate lived experience from general evidence</h3><p>Founder perspective and product experience are labelled as first-party context. They are not presented as universal evidence or clinical expertise.</p></div></li><li><span className="geo-step-number" aria-hidden="true">03</span><div><h3>Keep medical boundaries visible</h3><p>DoTheThing is not a diagnostic, treatment, or crisis-support service. Educational content does not replace advice from a qualified health professional.</p></div></li><li><span className="geo-step-number" aria-hidden="true">04</span><div><h3>Correct and update</h3><p>We review dated guidance and article maintenance dates. If you spot an error, outdated source, or unclear claim, email <a href="mailto:support@dothething.tech">support@dothething.tech</a>.</p></div></li></ol></section>
        <section className="geo-boundaries" aria-labelledby="byline-heading"><div className="geo-section-heading"><p className="geo-eyebrow">VISIBLE ACCOUNTABILITY</p><h2 id="byline-heading">WHO WRITES FOR DOTHETHING</h2></div><div className="geo-boundary-grid"><article><p className="geo-label">AUTHOR</p><h3>Lim Min Tze</h3><p>Founder and product developer of DoTheThing. Article bylines identify this role and link back to the creator profile.</p><a href="/about#author">VIEW AUTHOR PROFILE</a></article><article><p className="geo-label">EDITORIAL REVIEW</p><h3>Source and clarity check</h3><p>Content is reviewed for source links, direct language, practical applicability, and appropriate health-information boundaries before publication or substantial updates.</p></article><article><p className="geo-label">COMPARISONS</p><h3>Fit over hype</h3><p>Comparison pages use official product sources, state what another product does well, and avoid invented ratings, testimonials, or unverified superiority claims.</p></article></div></section>
        <section className="geo-citation-strip" aria-label="Standards note"><p>Questions about the product, sources, or a correction can be sent to <a href="mailto:support@dothething.tech">support@dothething.tech</a>. Read the <a href="/privacy">Privacy Policy</a> for data-handling information.</p></section>
      </main>
      <Footer />
    </div>
  );
}
