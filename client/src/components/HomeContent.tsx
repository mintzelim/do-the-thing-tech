import { Link } from "wouter";

export default function HomeContent() {
  return (
    <div className="home-content-sections">
      {/* SECTION 2: THE PROBLEM & SOLUTION */}
      <section className="content-section">
        <h2 className="section-heading" style={{ textAlign: 'center' }}>The AI Does the Planning. You Do the Thing.</h2>
        <div className="section-content">
          <p>
            You know the feeling. Task open. Brain closed.
          </p>
          <p>
            You want to do it. You can picture doing it. And yet — nothing.
          </p>
          <p>
            That gap between wanting and starting has a name: <strong><a href="https://my.clevelandclinic.org/health/symptoms/23224-executive-dysfunction" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--pixel-accent)', textDecoration: 'underline', cursor: 'pointer' }}>Executive dysfunction</a></strong>. It's the planning circuit that should fire and doesn't, the initiation signal that arrives late or not at all. It's how ADHD works. And every app that hands you a blank list and says "prioritise this" is asking the wrong brain to do the wrong job.
          </p>
          <p>
            We built DoTheThing because we believe executive dysfunction isn't a personal failure. It's a neurological difference that deserves a tool designed around it. So we kept it to one job: get you to the first step. Everything else follows from there.
          </p>
        </div>
      </section>

      {/* SECTION 3: HOW IT WORKS */}
      <section className="content-section">
        <h2 className="section-heading" style={{ textAlign: 'center' }}>How It Works</h2>
        <p className="section-subtitle" style={{ textAlign: 'center' }}>Five steps. Under a minute.</p>
        <div className="steps-grid">
          <div className="step-card">
            <div className="step-number">1</div>
            <h3>Brain Dump</h3>
            <p>Type a task. Or type everything. No sorting needed — the AI reads the pile and finds the work inside it.</p>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <h3>Pick Your Focus Level</h3>
            <p>Hyperfocused. Normal. Distracted. Your time estimates shift to match your actual brain today, not the version you wish showed up.</p>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <h3>Choose Your Breakdown Size</h3>
            <p>Tiny Steps for the days when even starting feels huge. Balanced for normal days. Big Milestones when you want the shape of a project without every detail.</p>
          </div>
          <div className="step-card">
            <div className="step-number">4</div>
            <h3>Get Your Breakdown</h3>
            <p>A numbered list of specific steps lands in seconds. Each one small enough to start without deciding anything first.</p>
          </div>
          <div className="step-card">
            <div className="step-number">5</div>
            <h3>Use the Timer</h3>
            <p>Check steps off as you go. The countdown timer keeps time visible — because ADHD time blindness is real, and watching an hour disappear is not a character flaw.</p>
          </div>
        </div>
      </section>

      {/* CTA SECTION 1: After How It Works */}
      <section className="content-section cta-section">
        <h2 className="section-heading" style={{ textAlign: 'center' }}>Ready to Break Down Your First Task?</h2>
        <p className="section-content" style={{ fontSize: '20px', textAlign: 'center', marginBottom: '24px' }}>Stop overthinking. Start with one small step.</p>
        <div style={{ textAlign: 'center' }}>
          <a href="#widget" className="cta-button" style={{ display: 'inline-block', padding: '12px 32px', backgroundColor: 'var(--pixel-accent)', color: 'white', textDecoration: 'none', fontWeight: 'bold', fontSize: '18px', border: '2px solid var(--pixel-border)', cursor: 'pointer' }}>↑ SCROLL UP TO START</a>
        </div>
      </section>

      {/* SECTION 4: WHY IT'S DIFFERENT */}
      <section className="content-section">
        <h2 className="section-heading" style={{ textAlign: 'center' }}>Built for the Initiation Problem</h2>
        <div className="section-content">
          <p>
            Most productivity apps organise your tasks. DoTheThing initiates them.
          </p>
          <p>
            There's a difference. Organising assumes you can already break a task down, estimate how long it'll take, and generate the signal to begin. For ADHD brains, those are the exact steps executive dysfunction blocks.
          </p>
          <p>
            DoTheThing converts vague tasks into specific, numbered micro-steps before you begin. Every estimate includes a 20–30% buffer — because <a href="https://pubmed.ncbi.nlm.nih.gov/32035555/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--pixel-accent)', textDecoration: 'underline', cursor: 'pointer' }}>research on ADHD time perception</a> shows the ADHD brain structurally underestimates task duration by 30-60% compared to neurotypical estimates. The 20-30% buffer is calibrated to correct this known estimation bias. The focus level setting means a day where you're running on fumes gets a different plan than a sharp morning.
          </p>
        </div>
        <div className="features-list">
          <div className="feature-item">
            <strong>AI task breakdown.</strong> Vague becomes specific in seconds.
          </div>
          <div className="feature-item">
            <strong>Focus-level adjustment.</strong> Estimates match today's capacity, whatever that looks like.
          </div>
          <div className="feature-item">
            <strong>ADHD time buffers.</strong> 20–30% built into every estimate.
          </div>
          <div className="feature-item">
            <strong>Visual countdown timer.</strong> Time becomes something you can see.
          </div>
          <div className="feature-item">
            <strong>Brain dump mode.</strong> Type the whole pile. The AI finds the work.
          </div>
          <div className="feature-item">
            <strong>Free. No login.</strong> Open the tab. Start.
          </div>
        </div>
      </section>

      {/* SECTION 5: WHO IT'S FOR */}
      <section className="content-section">
        <h2 className="section-heading" style={{ textAlign: 'center' }}>A Productivity Tool for Anyone Whose Brain Works Differently</h2>
        <p className="section-subtitle" style={{ textAlign: 'center' }}>We built this for the ADHD community and anyone struggling with task paralysis.</p>
        <p className="section-subtitle" style={{ textAlign: 'center' }}>Our AI task breakdown tool is for:</p>
        <div className="section-content">
          <p style={{ paddingTop: '15px' }}><strong>Students:</strong> Bypassing academic overwhelm and the "blank page" syndrome.</p>
          <p><strong>Remote Workers & Freelancers:</strong> For when you're your own boss and your initiation system is jamming.</p>
          <p><strong>Employees & Corporate Teams:</strong> Stop losing hours to "prep work." Use DTT to generate accurate time estimates and concrete first steps.</p>
          <p><strong>Project Managers:</strong> Use it to convert a vague "milestone" into a numbered micro-step list for your team in seconds.</p>
          <p><strong>Parents:</strong> Managing the invisible mental load of household admin and family logistics.</p>
          <p>The <a href="https://www.researchgate.net/publication/5344712_The_prevalence_and_effects_of_Adult_Attention-Deficithyperactivity_Disorder_ADHD_on_the_performance_of_workers_Results_from_the_WHO_World_Mental_Health_Survey_Initiative" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--pixel-accent)', textDecoration: 'underline', cursor: 'pointer' }}>WHO World Mental Health Survey</a> found that adults lose an average of 22 working days a year to executive dysfunction. DoTheThing won't fix your biology or your boss, but it acts as an external executive function—giving you a specific first step when your brain (or your team) can't generate one on its own.</p>
        </div>
      </section>

      {/* SECTION 6: FAQ */}
      <section className="content-section">
        <h2 className="section-heading" style={{ textAlign: 'center' }}>Frequently Asked Questions</h2>
        <div className="faq-list">
          <div className="faq-item">
            <h3>Is DoTheThing free?</h3>
            <p>Yes. No login, no account, nothing to install. Open the app, type your task, get your breakdown.</p>
          </div>
          <div className="faq-item">
            <h3>What is task paralysis?</h3>
            <p><a href="https://add.org/adhd-paralysis/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--pixel-accent)', textDecoration: 'underline', cursor: 'pointer' }}>Task paralysis</a> is when an ADHD brain freezes in front of a task it understands. It's a neurological response to ambiguity — the brain can't generate a first step, so it generates nothing. DoTheThing removes the ambiguity by handing you a step small enough that starting stops feeling like a risk.</p>
          </div>
          <div className="faq-item">
            <h3>What is time blindness?</h3>
            <p><a href="https://www.ucihealth.org/blog/2024/05/time-blindness-and-adhd" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--pixel-accent)', textDecoration: 'underline', cursor: 'pointer' }}>Time blindness</a> is the ADHD brain's genuine difficulty sensing how long things take and how fast time passes. Estimates end up too optimistic, schedules collapse. DoTheThing adds a 20–30% buffer to every estimate and gives you a visual countdown timer so time stays concrete.</p>
          </div>
          <div className="faq-item">
            <h3>What does the focus level setting do?</h3>
            <p>Pick Hyperfocused, Normal, or Distracted and the AI recalibrates every time estimate in your breakdown. A distracted day gets a distracted-day plan. Your schedule has a real shot at surviving contact with reality.</p>
          </div>
          <div className="faq-item">
            <h3>What's the difference between Tiny Steps, Balanced, and Big Milestones?</h3>
            <p>Tiny Steps gives you the smallest possible first action — for days when beginning feels impossible. Balanced is the everyday default. Big Milestones shows the major stages of a project without granular detail. Pick based on how your brain is running today.</p>
          </div>
          <div className="faq-item">
            <h3>Can I use it for a brain dump?</h3>
            <p>Yes. Type everything on your plate — no sorting, no organising required. The AI handles the mess and identifies what needs breaking down.</p>
          </div>
          <div className="faq-item">
            <h3>Does it work for tasks outside of work?</h3>
            <p>Yes. Household tasks, personal admin, creative projects, study, financial admin — anywhere the gap between intention and action opens up.</p>
          </div>
        </div>
      </section>

      {/* SECTION 6.5: MEET THE CREATOR */}
      <section className="content-section">
        <h2 className="section-heading" style={{ textAlign: 'center' }}>Built by Someone Who Gets It</h2>
        <div className="section-content" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
          <p style={{ fontSize: '16px', marginBottom: '16px' }}>
            DoTheThing was built by <strong>Lim Min Tze</strong>, founder of Boundless One Ventures, with personal experience managing ADHD and a background in product development. After years of struggling with task paralysis and time blindness, I realized existing productivity tools were designed for neurotypical brains.
          </p>
          <p style={{ fontSize: '16px', marginBottom: '16px' }}>
            I spent months researching ADHD neuroscience, interviewing 50+ people with ADHD, and testing different approaches. The result: a tool that actually works for how ADHD brains function.
          </p>
          <Link href="/about" className="cta-button" style={{ display: 'inline-block', padding: '10px 24px', backgroundColor: 'var(--pixel-accent)', color: 'white', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px', border: '2px solid var(--pixel-border)', cursor: 'pointer' }}>
            LEARN MORE ABOUT THE CREATOR
          </Link>
        </div>
      </section>

      {/* SECTION 7: FEATURED POSTS */}
      <section className="content-section">
        <h2 className="section-heading" style={{ textAlign: 'center' }}>Featured Posts: ADHD & Productivity</h2>
        <p className="section-subtitle" style={{ textAlign: 'center', marginBottom: '32px' }}>Hand-picked articles to help you understand ADHD and get things done</p>
        
        <div className="blog-links-grid">
          <Link href="/blog/rejection-sensitive-dysphoria-rsd" className="blog-link-card">
            <h3>ADHD Rejection Sensitive Dysphoria (RSD): What It Is and How to Cope</h3>
            <p>RSD causes overwhelming emotional pain from real or perceived rejection. Learn what's happening in the ADHD brain and evidence-based strategies that help.</p>
          </Link>
          <Link href="/blog/adhd-burnout-recovery" className="blog-link-card">
            <h3>ADHD Burnout: Why It's Different and How to Actually Recover</h3>
            <p>93% of ADHD adults experience burnout. Here's the neuroscience, the 3-stage recovery plan, and what actually helps.</p>
          </Link>
          <Link href="/blog/uncommon-adhd-symptoms" className="blog-link-card">
            <h3>7 Uncommon ADHD Symptoms That Aren't in the Brochure</h3>
            <p>The official ADHD checklist misses the symptoms that actually destroy your life. Here are 7 backed by research but rarely mentioned.</p>
          </Link>
          <Link href="/blog/adhd-symptoms-adults" className="blog-link-card">
            <h3>ADHD Symptoms in Adults: What the Checklists Miss</h3>
            <p>Most ADHD symptom guides describe a restless boy in a classroom. Here's the fuller picture of what adult ADHD actually looks like.</p>
          </Link>
          <Link href="/blog/how-adhd-affects-task-management" className="blog-link-card">
            <h3>How ADHD Affects Task Management</h3>
            <p>The neuroscience behind executive dysfunction and why traditional systems fall flat.</p>
          </Link>
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <Link href="/blog" className="cta-button" style={{ display: 'inline-block', padding: '10px 24px', backgroundColor: 'var(--pixel-border)', color: 'white', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px', border: '2px solid var(--pixel-border)', cursor: 'pointer' }}>
            VIEW ALL POSTS
          </Link>
        </div>
      </section>

      {/* CTA SECTION 2: After Blog Links */}
      <section className="content-section cta-section">
        <h2 className="section-heading" style={{ textAlign: 'center' }}>Try DoTheThing Now</h2>
        <p className="section-content" style={{ fontSize: '20px', textAlign: 'center', marginBottom: '24px' }}>Free. No login. No email. Just type your task and get your breakdown in under a minute.</p>
        <div style={{ textAlign: 'center' }}>
          <a href="#widget" className="cta-button" style={{ display: 'inline-block', padding: '12px 32px', backgroundColor: 'var(--pixel-accent)', color: 'white', textDecoration: 'none', fontWeight: 'bold', fontSize: '18px', border: '2px solid var(--pixel-border)', cursor: 'pointer' }}>↑ SCROLL UP TO START</a>
        </div>
      </section>
    </div>
  );
}