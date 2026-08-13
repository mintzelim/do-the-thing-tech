import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { updateMetaTags } from "@/lib/metaTags";
import "../pixel-art-refined.css";
import "../geo-pages.css";

const meta = {
  title: "Media and Independent Review Information | DoTheThing",
  description: "Factual information, product screenshots, and contact details for independent coverage or review of DoTheThing.",
  canonicalUrl: "https://dothething.tech/media",
  ogUrl: "https://dothething.tech/media",
};

export default function MediaKit() {
  useEffect(() => { updateMetaTags(meta); }, []);
  return (
    <div className="mobile-frame geo-page">
      <Navigation />
      <main className="geo-shell">
        <section className="geo-hero" aria-labelledby="media-heading"><p className="geo-eyebrow">MEDIA AND INDEPENDENT REVIEW INFO</p><h1 id="media-heading">THE FACTS, NOT THE HYPE</h1><p className="geo-lead">This page is for journalists, creators, researchers, and community members who want to describe or review DoTheThing accurately. Please test the product yourself and publish your honest view.</p></section>
        <section className="geo-boundaries" aria-labelledby="facts-heading"><div className="geo-section-heading"><p className="geo-eyebrow">PRODUCT FACTS</p><h2 id="facts-heading">WHAT WE CAN SUBSTANTIATE</h2></div><div className="geo-boundary-grid"><article><p className="geo-label">WHAT IT IS</p><h3>A free task-initiation web tool</h3><p>DoTheThing turns a task or brain dump into an editable sequence of smaller steps, with focus-level and breakdown-size controls.</p></article><article><p className="geo-label">WHO IT MAY HELP</p><h3>People facing task-initiation friction</h3><p>It is designed for people who find a task vague, oversized, or difficult to start, including people with ADHD or executive-function friction.</p></article><article><p className="geo-label">WHAT IT IS NOT</p><h3>Not clinical care or a guaranteed outcome</h3><p>DoTheThing does not diagnose or treat ADHD, replace professional care, or guarantee productivity outcomes.</p></article></div></section>
        <section className="geo-workflow" aria-labelledby="review-heading"><div className="geo-section-heading"><p className="geo-eyebrow">SUGGESTED REVIEW CHECKLIST</p><h2 id="review-heading">TEST THE ACTUAL WORKFLOW</h2></div><ol className="geo-step-list"><li><span className="geo-step-number" aria-hidden="true">01</span><div><h3>Start without a login</h3><p>Open the homepage and try a real task or brain dump. Check whether the starting path is clear before you enter anything.</p></div></li><li><span className="geo-step-number" aria-hidden="true">02</span><div><h3>Change focus and detail settings</h3><p>Try the visible focus-level and breakdown-size controls, then assess whether the resulting steps are useful for your situation.</p></div></li><li><span className="geo-step-number" aria-hidden="true">03</span><div><h3>Use the current-task queue</h3><p>Edit, reorder, or complete a step and try the timer. Review how well the workflow supports your own attention and task-management needs.</p></div></li></ol></section>
        <section className="geo-example" aria-labelledby="independence-heading"><div><p className="geo-eyebrow">INDEPENDENCE MATTERS</p><h2 id="independence-heading">WE DO NOT ASK FOR POSITIVE REVIEWS</h2><p>We welcome factual corrections, independent testing, and fair criticism. We do not provide payment or benefits in exchange for a positive opinion. If you disclose a relationship or receive access, please do so plainly.</p></div><div className="geo-example-path"><p><strong>PRODUCT CONTEXT</strong><span><a href="/how-it-works">How DoTheThing works</a></span></p><p><strong>EDITORIAL POLICY</strong><span><a href="/editorial-standards">Editorial standards</a></span></p><p><strong>CONTACT</strong><span><a href="mailto:support@dothething.tech">support@dothething.tech</a></span></p></div></section>
      </main>
      <Footer />
    </div>
  );
}
