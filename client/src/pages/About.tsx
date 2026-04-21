import { useLocation } from "wouter";

export default function About() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b-2 border-border p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate("/")}
            className="mb-4 px-4 py-2 border-2 border-border bg-background hover:bg-accent text-foreground font-vt323"
          >
            BACK TO HOME
          </button>
          <h1 className="text-4xl md:text-5xl font-bold font-pressstart mb-2" style={{ fontFamily: 'Press Start 2P, monospace' }}>ABOUT DO THE THING</h1>
          <p className="text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>Understanding ADHD, Task Management, and Why We Built This App</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-4 md:p-6">
        {/* Mission Section */}
        <section className="border-2 border-border p-6 bg-card mb-6">
          <h2 className="text-2xl font-bold font-pressstart mb-4" style={{ fontFamily: 'Press Start 2P, monospace' }}>Our Mission</h2>
          <p className="text-lg mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
            DoTheThing exists to help neurodivergent individuals—especially those with ADHD—break down overwhelming tasks into manageable steps, estimate realistic time, and actually get things done.
          </p>
          <p className="text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>
            We believe that executive dysfunction isn't a personal failure. It's a neurological difference that deserves tools designed specifically for how ADHD brains work.
          </p>
        </section>

        {/* ADHD & Task Management */}
        <section className="border-2 border-border p-6 bg-card mb-6">
          <h2 className="text-2xl font-bold font-pressstart mb-4" style={{ fontFamily: 'Press Start 2P, monospace' }}>ADHD and Task Management</h2>
          <div className="space-y-4 text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>
            <p>
              People with ADHD often struggle with executive function—the brain's ability to plan, organize, and execute tasks. This isn't laziness or lack of motivation. It's how their neurology works.
            </p>
            <p>
              Common challenges include:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Time Blindness:</strong> Difficulty perceiving how much time has passed or will be needed</li>
              <li><strong>Task Paralysis:</strong> Feeling overwhelmed by large tasks and not knowing where to start</li>
              <li><strong>Executive Dysfunction:</strong> Difficulty initiating, planning, and completing tasks</li>
              <li><strong>Time Estimation Errors:</strong> Consistently underestimating how long things take</li>
              <li><strong>Hyperfocus Variability:</strong> Ability to focus intensely on interesting tasks but struggling with boring ones</li>
            </ul>
          </div>
        </section>

        {/* Why DoTheThing */}
        <section className="border-2 border-border p-6 bg-card mb-6">
          <h2 className="text-2xl font-bold font-pressstart mb-4" style={{ fontFamily: 'Press Start 2P, monospace' }}>Why We Built DoTheThing</h2>
          <div className="space-y-4 text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>
            <p>
              Existing task management apps weren't designed for ADHD brains. They often make things worse by:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Requiring too much upfront planning and organization</li>
              <li>Not accounting for time blindness in estimates</li>
              <li>Breaking tasks into steps that are still too big</li>
              <li>Ignoring focus levels and distraction patterns</li>
              <li>Adding visual clutter and distractions</li>
            </ul>
            <p className="mt-4">
              DoTheThing solves this by:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Accepting brain dumps—no need for perfect planning</li>
              <li>Using AI to intelligently break down tasks into micro-steps</li>
              <li>Automatically adding time buffers for time blindness (20-30%)</li>
              <li>Adjusting estimates based on focus level (Hyperfocus, Normal, Distracted)</li>
              <li>Providing a clean, pixel-art interface that's engaging without being distracting</li>
              <li>Including a countdown timer to help with time awareness</li>
            </ul>
          </div>
        </section>

        {/* How It Works */}
        <section className="border-2 border-border p-6 bg-card mb-6">
          <h2 className="text-2xl font-bold font-pressstart mb-4" style={{ fontFamily: 'Press Start 2P, monospace' }}>How DoTheThing Works</h2>
          <div className="space-y-4 text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>
            <p>
              DoTheThing uses a simple 4-step process designed for ADHD brains:
            </p>
            <div className="space-y-3 ml-4">
              <div>
                <strong className="text-primary">1. Brain Dump</strong>
                <p>Write everything you need to do—no organization needed. Single task or complete brain dump.</p>
              </div>
              <div>
                <strong className="text-primary">2. Select Focus Level</strong>
                <p>Tell us how focused you are today: Hyperfocus, Normal, or Distracted. We adjust time estimates accordingly.</p>
              </div>
              <div>
                <strong className="text-primary">3. Choose Breakdown Size</strong>
                <p>Pick how detailed you want: Tiny Steps (maximum detail), Balanced, or Big Milestones (high-level overview).</p>
              </div>
              <div>
                <strong className="text-primary">4. AI Breakdown & Estimates</strong>
                <p>Our AI breaks down your tasks into manageable steps with realistic time estimates that account for ADHD time blindness.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="border-2 border-border p-6 bg-card mb-6">
          <h2 className="text-2xl font-bold font-pressstart mb-4" style={{ fontFamily: 'Press Start 2P, monospace' }}>Key Features</h2>
          <div className="grid md:grid-cols-2 gap-4" style={{ fontFamily: 'Inter, sans-serif' }}>
            <div className="border border-border p-4">
              <h3 className="font-bold text-lg mb-2">Smart Breakdown</h3>
              <p>AI-powered task decomposition that creates micro-steps perfect for ADHD brains</p>
            </div>
            <div className="border border-border p-4">
              <h3 className="font-bold text-lg mb-2">Time Blindness Buffer</h3>
              <p>Automatic 20-30% time buffer based on focus level to account for ADHD time perception</p>
            </div>
            <div className="border border-border p-4">
              <h3 className="font-bold text-lg mb-2">Countdown Timer</h3>
              <p>Visual timer to help with time awareness and keep you on track</p>
            </div>
            <div className="border border-border p-4">
              <h3 className="font-bold text-lg mb-2">Editable Steps</h3>
              <p>Customize tasks, adjust time estimates, and mark progress with checkboxes</p>
            </div>
            <div className="border border-border p-4">
              <h3 className="font-bold text-lg mb-2">Granularity Control</h3>
              <p>Choose how detailed your breakdown is: from tiny steps to big milestones</p>
            </div>
            <div className="border border-border p-4">
              <h3 className="font-bold text-lg mb-2">Focus Level Adjustment</h3>
              <p>Tell us your focus level and we adjust estimates to match your reality</p>
            </div>
          </div>
        </section>

        {/* Who This Is For */}
        <section className="border-2 border-border p-6 bg-card mb-6">
          <h2 className="text-2xl font-bold font-pressstart mb-4" style={{ fontFamily: 'Press Start 2P, monospace' }}>Who This Is For</h2>
          <p className="text-lg mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
            DoTheThing is designed for anyone who struggles with task management, but especially:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>
            <li>People with ADHD (diagnosed or undiagnosed)</li>
            <li>Those with executive dysfunction</li>
            <li>Anyone who experiences time blindness</li>
            <li>People who get overwhelmed by large tasks</li>
            <li>Those who struggle with task initiation</li>
            <li>Anyone who consistently underestimates how long things take</li>
          </ul>
        </section>

        {/* Get Started */}
        <section className="border-2 border-border p-6 bg-primary text-primary-foreground text-center">
          <h2 className="text-2xl font-bold font-pressstart mb-4" style={{ fontFamily: 'Press Start 2P, monospace' }}>Ready to Do The Thing?</h2>
          <p className="text-lg mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
            Stop feeling overwhelmed. Start breaking things down.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-8 py-4 bg-background text-foreground border-2 border-foreground font-bold font-pressstart text-lg hover:bg-accent"
          >
            START NOW
          </button>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-border p-4 md:p-6 mt-12 bg-card">
        <div className="max-w-4xl mx-auto text-center" style={{ fontFamily: 'Inter, sans-serif' }}>
          <p className="mb-2">DoTheThing - Task Management for ADHD Brains</p>
          <p className="text-sm text-muted-foreground">
            Built with care for neurodivergent individuals
          </p>
        </div>
      </footer>
    </div>
  );
}
