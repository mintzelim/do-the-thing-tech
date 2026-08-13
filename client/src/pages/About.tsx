import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLocation } from "wouter";
import { updateMetaTags, pageMetaTags } from "@/lib/metaTags";
import { assetUrl } from "@/lib/assetUrl";
import "../about-refined.css";
import "../about-rhythm.css";

const MASCOTS = {
  focus: assetUrl("/manus-storage/dothething-how-it-works-focus-transparent_c55dcc2f.png"),
  brainDump: assetUrl("/manus-storage/dothething-how-it-works-brain-dump-transparent_805dc4d4.png"),
  breakdown: assetUrl("/manus-storage/dothething-how-it-works-breakdown-transparent_3a48d1ce.png"),
  timer: assetUrl("/manus-storage/dothething-how-it-works-timer-transparent_f4de844b.png"),
};

const challenges = [
  ["Time Blindness", "Difficulty perceiving how much time has passed or will be needed"],
  ["Task Paralysis", "Feeling overwhelmed by large tasks and not knowing where to start"],
  ["Executive Dysfunction", "Difficulty initiating, planning, and completing tasks"],
  ["Time Estimation Errors", "Consistently underestimating how long things take"],
  ["Hyperfocus Variability", "Ability to focus intensely on interesting tasks but struggling with boring ones"],
];

const features = [
  ["AI Task Breakdown", "Instantly decompose tasks into actionable steps"],
  ["Smart Time Estimates", "Realistic estimates with ADHD-friendly buffers"],
  ["Focus Level Adjustment", "Estimates change based on your focus today"],
  ["Countdown Timer", "Visual timer to help with time perception"],
  ["Editable Steps", "Adjust, delete, or reorder steps as needed"],
  ["No Login Required", "Start immediately. Use as a guest."],
];

const howItWorks = [
  ["BRAIN DUMP", "Enter a single task or brain dump everything you need to do. No organization needed."],
  ["SELECT FOCUS LEVEL", "Tell us if you're hyperfocused, normal, or distracted today. This adjusts time estimates."],
  ["CHOOSE BREAKDOWN SIZE", "Pick how detailed you want the breakdown: Tiny Steps, Balanced, or Big Milestones."],
  ["GET AI BREAKDOWN", "AI instantly breaks your task into micro-steps with realistic time estimates."],
  ["EDIT & EXECUTE", "Adjust steps, check them off, and use the countdown timer to stay on track."],
];

export default function About() {
  const [, navigate] = useLocation();

  useEffect(() => {
    updateMetaTags(pageMetaTags.about);
  }, []);

  return (
    <div className="mobile-frame about-page">
      <Navigation />
      <main className="about-shell">
        <section className="about-hero" aria-labelledby="about-page-title">
          <div className="about-hero-copy">
            <p className="about-eyebrow"><span aria-hidden="true">✦</span> ABOUT DOTHETHING</p>
            <h1 id="about-page-title">ABOUT DO THE THING</h1>
            <p className="about-hero-description">Understanding ADHD, Task Management, and Why We Built This App</p>
            <button type="button" className="about-secondary-action" onClick={() => navigate("/")}>BACK TO HOME</button>
          </div>
          <div className="about-hero-art" aria-hidden="true">
            <img src={MASCOTS.focus} alt="" />
          </div>
        </section>

        <section className="about-panel about-creator-panel" aria-labelledby="creator-heading">
          <div className="about-section-copy">
            <p className="about-panel-label">BEHIND THE TOOL</p>
            <h2 id="creator-heading">MEET THE CREATOR</h2>
            <p className="about-lead"><strong>Lim Min Tze — founder, product developer, and the person behind DoTheThing.</strong></p>
            <p>This site combines lived experience with clearly sourced educational material. It is a practical productivity resource, not a substitute for diagnosis or medical care.</p>
            <p>DoTheThing was built by <strong>Lim Min Tze</strong>, a product developer with personal experience managing ADHD. After years of struggling with task paralysis, time blindness, and executive dysfunction, I realized that existing productivity tools were designed for neurotypical brains—not ADHD brains.</p>
            <p>I spent months researching ADHD neuroscience, interviewing others with ADHD, and testing different approaches to task breakdown and time estimation. The result is DoTheThing: a tool built specifically for how ADHD brains actually work.</p>
            <p><strong>About Lim Min Tze:</strong></p>
            <ul className="about-check-list">
              <li>Founder of <strong>Boundless One Ventures</strong>, a neurodivergent-focused software company</li>
              <li>10+ years in product development and software engineering</li>
              <li>Personal experience with late-diagnosis ADHD and time-blindness management</li>
              <li>Research into ADHD neuroscience, executive function, and time perception (Barkley, 2022; Ayano et al., 2023)</li>
              <li>Interviewed 50+ people with ADHD about their productivity struggles</li>
              <li>Building accessible tools that treat executive dysfunction as a design constraint, not a user failure</li>
            </ul>
            <p>This tool exists because I needed it. And if you're reading this, you probably need it too.</p>
            <nav className="about-profile-links" aria-label="Creator professional profiles">
              <span>Professional Profiles:</span>
              <a href="https://www.linkedin.com/in/min-tze-lim" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="https://github.com/mintzelim" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href="mailto:support@dothething.tech">Email</a>
            </nav>
          </div>
          <div className="about-side-art about-creator-art" aria-hidden="true">
            <img src={MASCOTS.brainDump} alt="" />
          </div>
        </section>

        <section className="about-panel about-mission-panel about-tone-lavender" aria-labelledby="mission-heading">
          <div className="about-side-art" aria-hidden="true"><img src={MASCOTS.breakdown} alt="" /></div>
          <div className="about-section-copy">
            <p className="about-panel-label">OUR PURPOSE</p>
            <h2 id="mission-heading">OUR MISSION</h2>
            <p>DoTheThing exists to help neurodivergent individuals—especially those with ADHD—break down overwhelming tasks into manageable steps, estimate realistic time, and actually get things done.</p>
            <p>We believe that executive dysfunction isn't a personal failure. It's a neurological difference that deserves tools designed specifically for how ADHD brains work.</p>
          </div>
        </section>

        <section className="about-panel about-centered-panel about-challenges-section" aria-labelledby="challenges-heading">
          <p className="about-eyebrow"><span aria-hidden="true">✦</span> WHAT THIS TOOL SUPPORTS</p>
          <h2 id="challenges-heading">ADHD AND TASK MANAGEMENT</h2>
          <p className="about-centered-lede">People with ADHD often struggle with executive function—the brain's ability to plan, organize, and execute tasks. This isn't laziness or lack of motivation. It's how their neurology works.</p>
          <p className="about-grid-intro"><strong>Common challenges include:</strong></p>
          <div className="about-card-grid about-challenge-grid">
            {challenges.map(([title, description]) => (
              <article className="about-mini-card" key={title}><h3>{title}</h3><p>{description}</p></article>
            ))}
          </div>
        </section>

        <section className="about-panel about-product-panel about-accent-band" aria-labelledby="why-heading">
          <div className="about-section-copy">
            <p className="about-panel-label">DESIGNED FOR REAL FRICTION</p>
            <h2 id="why-heading">WHY DO THE THING EXISTS</h2>
            <p>Traditional task management apps were built for neurotypical brains. They assume you can estimate time accurately, break down tasks logically, and maintain focus on boring work. For ADHD brains, these apps often make things worse.</p>
            <p>DoTheThing is different. We built it specifically for how ADHD brains work:</p>
          </div>
          <div className="about-side-art" aria-hidden="true"><img src={MASCOTS.timer} alt="" /></div>
          <div className="about-card-grid about-feature-grid">
            {features.map(([title, description]) => (
              <article className="about-mini-card" key={title}><h3>{title}</h3><p>{description}</p></article>
            ))}
          </div>
        </section>

        <section className="about-panel about-centered-panel about-workflow-section" aria-labelledby="how-heading">
          <p className="about-panel-label">THE WORKFLOW</p>
          <h2 id="how-heading">HOW IT WORKS</h2>
          <div className="about-card-grid about-steps-grid">
            {howItWorks.map(([title, description], index) => (
              <article className="about-step-card" key={title}>
                <span className="about-step-number">{index + 1}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="about-panel about-for-whom-panel about-tone-lavender" aria-labelledby="for-whom-heading">
          <div className="about-side-art" aria-hidden="true"><img src={MASCOTS.focus} alt="" /></div>
          <div className="about-section-copy">
            <p className="about-panel-label">BUILT WITH YOU IN MIND</p>
            <h2 id="for-whom-heading">FOR WHOM</h2>
            <p>DoTheThing is built for:</p>
            <ul className="about-check-list">
              <li>People with ADHD who struggle with task initiation and time management</li>
              <li>Anyone with executive dysfunction or time blindness</li>
              <li>Neurodivergent individuals who need tools designed for their brain</li>
              <li>People who feel overwhelmed by large projects</li>
              <li>Anyone who consistently underestimates how long things take</li>
            </ul>
          </div>
        </section>

        <section className="about-cta about-cta-ink" aria-labelledby="about-cta-heading">
          <div className="about-cta-art" aria-hidden="true"><img src={MASCOTS.timer} alt="" /></div>
          <div>
            <p className="about-eyebrow">READY WHEN YOU ARE</p>
            <h2 id="about-cta-heading">READY TO DO THE THING?</h2>
            <p>Start breaking down your tasks right now. No signup required. No credit card. Just enter your task and let AI do the work.</p>
            <button type="button" className="about-primary-action" onClick={() => navigate("/")}>START NOW</button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
