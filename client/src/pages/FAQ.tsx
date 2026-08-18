import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { assetUrl } from "@/lib/assetUrl";
import { FAQ_GROUPS, FAQ_PAGE_META } from "@/lib/faqContent";
import { updateMetaTags } from "@/lib/metaTags";
import "../pixel-art-refined.css";
import "../landing-system-reconciliation.css";
import "../faq-page.css";
import "../faq-hero-stage.css";

export default function FAQ() {
  useEffect(() => {
    updateMetaTags(FAQ_PAGE_META);
  }, []);

  return (
    <div className="mobile-frame faq-public-page">
      <Navigation />
      <main className="mobile-content">
        <section className="reference-hero-layout" aria-labelledby="faq-page-title">
          <div className="reference-hero-copy">
            <p className="reference-eyebrow"><span aria-hidden="true">✦</span> SUPPORT &amp; CLARITY</p>
            <h1 className="reference-hero-title" id="faq-page-title">Questions, answered simply.</h1>
            <p className="reference-hero-description">Clear information about starting a task, using the controls, privacy, and the limits of this productivity tool.</p>
            <div className="reference-hero-actions">
              <a className="reference-primary-action" href="#faq">EXPLORE ANSWERS <span aria-hidden="true">↓</span></a>
              <a className="reference-secondary-action" href="/contact">CONTACT SUPPORT <span aria-hidden="true">→</span></a>
            </div>
          </div>
          <div className="reference-hero-visual" aria-label="The DoTheThing mascot beside a small next-step flag">
            <p className="hero-mascot-proof-bubble faq-hero-bubble">ASK AWAY.</p>
            <img src={assetUrl("/manus-storage/dothething-abstract-hero-final_f2a98e80.png")} alt="Lavender pixel mascot standing on a grassy step beside a flag" />
          </div>
        </section>

        <div className="home-content-sections">
          <section className="content-section faq-page-content" id="faq" aria-labelledby="faq-heading">
            <p className="reference-eyebrow faq-page-kicker"><span aria-hidden="true">✦</span> ONE CLEAR PLACE</p>
            <h2 className="section-heading" id="faq-heading">The details that make the next step easier.</h2>
            <p className="section-subtitle">Start with the question closest to the friction you are feeling. Every answer is short, specific, and linked to more detail where it matters.</p>

            <nav aria-label="FAQ sections">
              <ul className="faq-page-jump-nav">
                {FAQ_GROUPS.map((group) => <li key={group.id}><a href={`#${group.id}`}>{group.title}</a></li>)}
              </ul>
            </nav>

            <div className="faq-page-groups">
              {FAQ_GROUPS.map((group) => (
                <section className="faq-page-group" id={group.id} key={group.id} aria-labelledby={`${group.id}-heading`}>
                  <p className="faq-page-group-label">{group.number} · {group.label}</p>
                  <h3 id={`${group.id}-heading`}>{group.title}</h3>
                  <p className="faq-page-group-intro">{group.intro}</p>
                  <div className="faq-page-list">
                    {group.items.map((item, itemIndex) => (
                      <details className="faq-page-item" key={item.question} open={group.id === "start" && itemIndex === 0}>
                        <summary>{item.question}</summary>
                        <div className="faq-page-answer">
                          <p>{item.answer}</p>
                          {item.links && <p className="faq-page-links">{item.links.map((link, linkIndex) => <a href={link.href} key={link.href}>{linkIndex > 0 ? " · " : ""}{link.label}</a>)}</p>}
                        </div>
                      </details>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <section className="faq-page-support" aria-labelledby="faq-support-heading">
              <div>
                <h3 id="faq-support-heading">Still have a question?</h3>
                <p>Use the tool when you are ready, or reach out through the support route for a question the FAQ does not cover.</p>
              </div>
              <div className="faq-page-support-actions">
                <a className="reference-primary-action" href="/#widget">START A TASK <span aria-hidden="true">→</span></a>
                <a className="reference-secondary-action" href="/contact">CONTACT SUPPORT</a>
              </div>
            </section>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
