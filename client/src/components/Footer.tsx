import "../footer.css";
import { SITE_IDENTITY } from "@/lib/siteIdentity";

const footerGroups = [
  {
    title: "PRODUCT",
    links: [
      ["Start a task", "/"],
      ["How it works", "/how-it-works"],
    ],
  },
  {
    title: "LEARN",
    links: [
      ["Blog", "/blog"],
      ["ADHD quiz", "/quiz"],
    ],
  },
  {
    title: "TRUST",
    links: [
      ["About", "/about"],
      ["Editorial standards", "/editorial-standards"],
      ["Privacy", "/privacy"],
      ["Terms", "/terms"],
    ],
  },
  {
    title: "EXPLORE",
    links: [
      ["Compare with Goblin.tools", "/compare/goblin-tools"],
      ["Media information", "/media"],
      ["Contact", "/contact"],
    ],
  },
] as const;

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__directory">
        <div className="site-footer__intro">
          <p className="site-footer__eyebrow">DOTHETHING</p>
          <p className="site-footer__promise">Make the next thing doable.</p>
          <p className="site-footer__description">Task management for ADHD brains. One smaller next step, when you are ready.</p>
          <p className="site-footer__entity">{SITE_IDENTITY.ownershipStatement}</p>
          <address className="site-footer__contact">
            {SITE_IDENTITY.addressLine}<br />
            <a href={SITE_IDENTITY.telephoneHref}>{SITE_IDENTITY.telephone}</a> · <a href={`mailto:${SITE_IDENTITY.supportEmail}`}>{SITE_IDENTITY.supportEmail}</a>
          </address>
          <p className="site-footer__reviewed">{SITE_IDENTITY.productReviewedLabel}</p>
        </div>
        <nav className="site-footer__groups" aria-label="Footer navigation">
          {footerGroups.map((group) => (
            <section className="site-footer__group" key={group.title}>
              <h2>{group.title}</h2>
              <ul>
                {group.links.map(([label, href]) => (
                  <li key={href}><a href={href}>{label}</a></li>
                ))}
              </ul>
            </section>
          ))}
        </nav>
      </div>
      <div className="site-footer__base">
        <p>© {new Date().getFullYear()} DoTheThing. Task management for ADHD brains.</p>
        <div className="site-footer__social" aria-label="Social links">
          <a href="https://www.instagram.com/dothething.tech?igsh=MWxhM2xqMzM0ZHE1OQ==" target="_blank" rel="noopener noreferrer">Instagram <span aria-hidden="true">↗</span></a>
          <a href="https://www.tiktok.com/@dothething.tech?_r=1&_t=ZS-967yRO88m9c" target="_blank" rel="noopener noreferrer">TikTok <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </footer>
  );
}
