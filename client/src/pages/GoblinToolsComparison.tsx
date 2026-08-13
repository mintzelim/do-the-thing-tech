import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { updateMetaTags } from "@/lib/metaTags";
import { assetUrl } from "@/lib/assetUrl";
import "../pixel-art-refined.css";
import "../geo-pages.css";

const meta = {
  title: "DoTheThing vs. Goblin.tools Magic ToDo | Task Workflow Comparison",
  description: "A fair comparison of DoTheThing and Goblin.tools Magic ToDo for task breakdown, execution flow, interface choices, and practical fit.",
  canonicalUrl: "https://dothething.tech/compare/goblin-tools",
  ogUrl: "https://dothething.tech/compare/goblin-tools",
};

const dothethingScreenshot = assetUrl("/manus-storage/dothething-workflow-home_6bd7e560.png");
const goblinScreenshot = assetUrl("/manus-storage/goblin-tools-magic-todo-2026-08-13_a38f7bda.webp");
const comparisonMascot = assetUrl("/manus-storage/dothething-how-it-works-focus-transparent_c55dcc2f.png");

export default function GoblinToolsComparison() {
  useEffect(() => { updateMetaTags(meta); }, []);
  return (
    <div className="mobile-frame geo-page comparison-page">
      <Navigation />
      <main className="geo-shell">
        <section className="geo-hero comparison-hero" aria-labelledby="comparison-heading">
          <p className="geo-eyebrow">HONEST TOOL SELECTION</p>
          <div className="comparison-hero-grid"><div><h1 id="comparison-heading">DOTHETHING VS. GOBLIN.TOOLS MAGIC TODO</h1>
          <p className="geo-lead">Both tools can help make a task feel less impossible. They take different routes: Goblin.tools offers a wider collection of small tools, while DoTheThing concentrates task initiation, planning, and visible follow-through in one intentionally calm flow.</p>
          </div><div className="comparison-hero-art" aria-hidden="true"><img src={comparisonMascot} alt="" /></div></div>
        </section>

        <section className="comparison-context-strip" aria-label="Comparison standard"><p className="comparison-context-label">COMPARISON STANDARD</p><p><strong>How to read this page:</strong> it compares observable workflows and stated features, not clinical outcomes or a universal “best” tool. Interfaces change, so use the linked primary sources when choosing.</p></section>

        <section className="comparison-canvas-field" aria-labelledby="screens-heading">
          <div className="geo-section-heading"><p className="geo-eyebrow">SIDE-BY-SIDE WORKFLOW VIEW</p><h2 id="screens-heading">TWO WAYS TO GET TO A NEXT STEP</h2></div>
          <div className="comparison-screenshot-grid">
            <figure><img src={dothethingScreenshot} alt="DoTheThing homepage showing a large task input, visible focus-level controls, and the beginning of its task workflow." /><figcaption><strong>DoTheThing</strong><span>A large-text, single-flow starting surface: task input, focus setting, breakdown size, and a clear path into a current-task queue.</span></figcaption></figure>
            <figure><img src={goblinScreenshot} alt="Goblin.tools Magic ToDo public interface showing its header, task input, spice-level control, tabs, and list workspace." /><figcaption><strong>Goblin.tools Magic ToDo</strong><span>A compact, flexible task-breakdown workspace within the wider Goblin.tools collection.</span></figcaption></figure>
          </div>
          <p className="comparison-source-note">Screenshots show the public interfaces viewed on 13 August 2026. The Goblin.tools screen is shown for factual comparison and links to its official product page below.</p>
        </section>

        <section className="comparison-ledger" aria-labelledby="ledger-heading">
          <div className="geo-section-heading"><p className="geo-eyebrow">QUIET LEDGER</p><h2 id="ledger-heading">WHERE THE WORKFLOWS DIFFER</h2></div>
          <div className="comparison-table-wrap"><table><thead><tr><th scope="col">Decision point</th><th scope="col">DoTheThing</th><th scope="col">Goblin.tools Magic ToDo</th></tr></thead><tbody>
            <tr><th scope="row">Primary path</th><td>One task-initiation flow: describe the work, choose focus and breakdown size, then work through a current-task queue.</td><td>Magic ToDo breaks down todo items inside a broader collection of small tools.</td></tr>
            <tr><th scope="row">Interface intention</th><td>Large display text, limited up-front choices, and one next action are designed to reduce scanning and decision load at the start.</td><td>A compact workspace with task input, spice-level control, tabs, templates, sharing, and other utilities around the list.</td></tr>
            <tr><th scope="row">Execution support</th><td>A visible timer is part of the current-task workflow, with progress changing as tasks are checked off.</td><td>Goblin.tools also offers dedicated tools such as Taskmaster and Estimator alongside Magic ToDo.</td></tr>
            <tr><th scope="row">Broader toolset</th><td>Focused on task breakdown, realistic timing, and immediate follow-through.</td><td>Offers additional tools including Formalizer, Judge, Professor, Consultant, Compiler, Chef, and account-based history, sync, and sharing.</td></tr>
            <tr><th scope="row">Starting access</th><td>Starts without a login; current task state is local to the browser.</td><td>Official accounts can keep history, sync lists across devices, and share them with others.</td></tr>
          </tbody></table></div>
        </section>

        <section className="comparison-canvas-field comparison-fit-field" aria-labelledby="fit-heading">
          <div className="geo-section-heading"><p className="geo-eyebrow">PICK THE FIT, NOT THE HYPE</p><h2 id="fit-heading">WHEN EACH MAY BE THE BETTER CHOICE</h2></div>
          <div className="comparison-fit-grid"><article><p className="geo-label">TRY DOTHETHING IF…</p><h3>You want a calmer first screen and one integrated execution path</h3><p>It may fit when you benefit from large, high-contrast task text; want to choose a focus level and task size before the plan is made; and want a visible timer and completion queue in the same workflow.</p><a href="/">START A TASK <span aria-hidden="true">→</span></a></article>
          <article><p className="geo-label">TRY GOBLIN.TOOLS IF…</p><h3>You want a wider toolbox, shared lists, or communication support</h3><p>It may fit when you want its collection of focused utilities, account-based history and sharing, or tools such as Formalizer, Judge, Compiler, and its dedicated Estimator and Taskmaster.</p><a href="https://goblin.tools/ToDo" target="_blank" rel="noopener noreferrer">VISIT MAGIC TODO <span aria-hidden="true">↗</span></a></article></div>
        </section>

        <section className="comparison-citation-strip" aria-label="Comparison sources"><p className="comparison-context-label">PRIMARY SOURCES</p><p>Primary sources: <a href="https://goblin.tools/" target="_blank" rel="noopener noreferrer">Goblin.tools home</a> and <a href="https://goblin.tools/ToDo" target="_blank" rel="noopener noreferrer">Magic ToDo</a>. DoTheThing descriptions reflect the live product workflow and <a href="/how-it-works">documented product boundaries</a>.</p></section>
      </main>
      <Footer />
    </div>
  );
}
