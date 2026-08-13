import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { updateMetaTags } from "@/lib/metaTags";
import "../pixel-art-refined.css";
import "../geo-pages.css";

const meta = {
  title: "How DoTheThing Works | ADHD Task Initiation Support",
  description: "See how DoTheThing turns an overwhelming task or brain dump into a small next step, focus-aware estimates, and a visible task timer.",
  canonicalUrl: "https://dothething.tech/how-it-works",
  ogUrl: "https://dothething.tech/how-it-works",
};

export default function ProductProof() {
  useEffect(() => { updateMetaTags(meta); }, []);
  return (
    <div className="mobile-frame geo-page">
      <Navigation />
      <main className="geo-shell">
        <section className="geo-hero" aria-labelledby="proof-heading">
          <p className="geo-eyebrow">THE STARTING-LINE WORKFLOW</p>
          <h1 id="proof-heading">WHEN STARTING IS THE HARD PART</h1>
          <p className="geo-lead">DoTheThing is built for the moment a task feels too large to begin. It helps you name the work, choose the level of detail that fits today, and move into one visible next action.</p>
          <a className="geo-primary-action" href="/">TRY A TASK BREAKDOWN <span aria-hidden="true">→</span></a>
        </section>

        <section className="geo-workflow" aria-labelledby="workflow-heading">
          <div className="geo-section-heading"><p className="geo-eyebrow">WHAT HAPPENS NEXT</p><h2 id="workflow-heading">A CALMER PATH INTO THE WORK</h2></div>
          <ol className="geo-step-list">
            <li><span className="geo-step-number" aria-hidden="true">01</span><div><h3>Brain dump the task</h3><p>Start with the version you have. It can be specific, messy, or incomplete. The goal is to get the work out of your head, not to phrase it perfectly.</p></div></li>
            <li><span className="geo-step-number" aria-hidden="true">02</span><div><h3>Set today’s focus and task size</h3><p>Choose Hyperfocused, Normal, or Distracted, then select Tiny Steps, Balanced, or Big Milestones. The controls are visible before a breakdown so the plan can fit the day you are having.</p></div></li>
            <li><span className="geo-step-number" aria-hidden="true">03</span><div><h3>Enter one focus queue</h3><p>Your breakdown becomes a calm linear list of current tasks. The interface keeps the next actionable item clear instead of asking you to manage a large project board.</p></div></li>
            <li><span className="geo-step-number" aria-hidden="true">04</span><div><h3>Work with a visible timer</h3><p>Use the built-in timer while you work through the queue. Completing tasks updates your progress so the plan remains connected to the work you are actually doing.</p></div></li>
          </ol>
        </section>

        <section className="geo-example" aria-labelledby="example-heading">
          <div><p className="geo-eyebrow">FACTUAL WORKED EXAMPLE</p><h2 id="example-heading">FROM “WRITE THE PROPOSAL” TO A STARTABLE FIRST MOVE</h2><p>This example illustrates the kind of change the workflow is designed to support. It is not a promise about a particular outcome or a substitute for professional guidance.</p></div>
          <div className="geo-example-path" aria-label="Illustrative task breakdown sequence"><p><strong>Overwhelming input</strong><span>Write the grant proposal</span></p><span aria-hidden="true">↓</span><p><strong>Smaller next action</strong><span>Open the brief and highlight the one required outcome</span></p><span aria-hidden="true">↓</span><p><strong>Visible finish line</strong><span>Mark that step complete and continue with the next one</span></p></div>
        </section>

        <section className="geo-boundaries" aria-labelledby="boundaries-heading">
          <div className="geo-section-heading"><p className="geo-eyebrow">CLEAR BOUNDARIES</p><h2 id="boundaries-heading">WHAT DOTHETHING DOES—AND DOES NOT—TRY TO BE</h2></div>
          <div className="geo-boundary-grid">
            <article><p className="geo-label">DESIGNED FOR</p><h3>Task initiation and practical follow-through</h3><p>Use it when a task feels vague, oversized, or difficult to start; when you need a smaller next move and a concrete sense of time.</p></article>
            <article><p className="geo-label">NOT A REPLACEMENT FOR</p><h3>Clinical care, diagnosis, or a full project-management system</h3><p>DoTheThing does not diagnose or treat ADHD. It also is not intended to replace specialist medical advice, crisis support, or complex team planning software.</p></article>
            <article><p className="geo-label">PRIVACY BASICS</p><h3>Task state is stored in your browser</h3><p>Current task state is saved locally so you can return to an in-progress queue. Read the <a href="/privacy">Privacy Policy</a> for the site’s full data-handling details.</p></article>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
