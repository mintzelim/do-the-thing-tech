import { useState } from 'react';
import { useLocation } from 'wouter';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  seoKeywords: string[];
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'How ADHD Affects Task Management',
    excerpt: 'Understanding the neuroscience behind executive dysfunction and why traditional task management fails for ADHD brains.',
    date: 'April 15, 2024',
    readTime: '5 min read',
    category: 'ADHD Education',
    seoKeywords: ['ADHD', 'Task Management', 'Executive Function'],
    content: `ADHD (Attention-Deficit/Hyperactivity Disorder) affects how the brain manages executive functions—planning, organizing, prioritizing, and executing tasks.

People with ADHD don't struggle because they lack motivation or intelligence. Their brains work differently. The prefrontal cortex, responsible for executive function, has lower dopamine levels, making it harder to initiate and sustain focus on tasks.

Key challenges include:

1. Task Initiation: Starting a task feels overwhelming, even if it's simple
2. Time Blindness: Difficulty estimating how long tasks take
3. Working Memory Issues: Trouble holding multiple steps in mind
4. Emotional Dysregulation: Tasks feel more emotionally taxing
5. Hyperfocus vs. Hypofocus: Extreme difficulty switching between tasks

Traditional task management apps assume neurotypical brains. They often make ADHD worse by adding complexity, requiring too much planning upfront, or using vague time estimates.

DoTheThing solves this by breaking tasks into micro-steps, providing realistic time estimates with buffers, and letting users work at their own pace.`
  },
  {
    id: '2',
    title: 'Time Blindness in ADHD: Why You\'re Always Late',
    excerpt: 'Exploring time blindness, how it affects ADHD individuals, and practical strategies to manage it.',
    date: 'April 10, 2024',
    readTime: '6 min read',
    category: 'Time Management',
    seoKeywords: ['Time Blindness', 'ADHD', 'Time Management'],
    content: `Time blindness is one of the most frustrating aspects of ADHD. It's not about having a bad sense of time—it's about the brain not perceiving time the same way neurotypical brains do.

What is Time Blindness?

Time blindness means difficulty perceiving the passage of time. People with ADHD often:
- Underestimate how long tasks take (thinking 30 minutes will take 10)
- Lose track of time entirely when hyperfocused
- Struggle with time-based transitions
- Arrive late despite intending to be early

Why Does This Happen?

The ADHD brain doesn't automatically track time in the background. Time feels abstract. Without external cues (alarms, visual timers), hours can pass unnoticed.

Impact on Daily Life

Time blindness affects:
- Work deadlines and project completion
- Social commitments and relationships
- Sleep schedules and health
- Financial planning and bills

Strategies That Help

1. Use visual timers (not just alarms)
2. Add time buffers to all estimates (20-30% extra)
3. Set multiple reminders, not just one
4. Break tasks into time-boxed chunks
5. Use external accountability

DoTheThing includes a built-in countdown timer and automatically adds time buffers based on your focus level, helping you work with your brain instead of against it.`
  },
  {
    id: '3',
    title: 'Breaking Down Big Tasks: A Guide for ADHD Brains',
    excerpt: 'Learn how to break overwhelming tasks into manageable micro-steps that actually work for ADHD brains.',
    date: 'April 5, 2024',
    readTime: '7 min read',
    category: 'Productivity',
    seoKeywords: ['Task Breakdown', 'ADHD', 'Productivity'],
    content: `One of the biggest challenges for ADHD brains is task initiation. A big, vague task feels impossible to start. But breaking it into micro-steps makes it manageable.

Why Task Breakdown Works for ADHD

1. Reduces Overwhelm: A big task feels paralyzing. Small steps feel doable.
2. Provides Direction: Clear next steps remove decision paralysis.
3. Creates Momentum: Completing small tasks builds dopamine and motivation.
4. Enables Flexibility: You can adjust based on energy and focus.

How to Break Down Tasks Effectively

Step 1: Define the End Goal
Be specific. "Write report" is vague. "Write Q2 sales report with 5 sections" is clear.

Step 2: Identify Major Phases
Break the goal into 3-5 major phases. For the report: Research, Outline, Draft, Edit, Format.

Step 3: Create Micro-Steps
Break each phase into tiny, specific actions. For "Draft": Write intro, Write section 1, Write section 2, etc.

Step 4: Add Time Estimates
Estimate how long each micro-step takes. Add a 20-30% buffer for ADHD time blindness.

Step 5: Prioritize
Identify which steps must happen first. Some can happen in parallel.

Common Mistakes to Avoid

- Making steps too big: "Write report" is still too big
- Being too rigid: Allow flexibility for how you work
- Forgetting breaks: Build in rest time between steps
- Underestimating time: Always add a buffer

DoTheThing automates this process using AI, creating the perfect breakdown for your brain and focus level.`
  },
  {
    id: '4',
    title: 'Executive Dysfunction and Task Paralysis: What\'s the Difference?',
    excerpt: 'Understanding executive dysfunction, task paralysis, and how they differ—and how to overcome both.',
    date: 'March 28, 2024',
    readTime: '6 min read',
    category: 'ADHD Education',
    seoKeywords: ['Executive Dysfunction', 'Task Paralysis', 'ADHD'],
    content: `Executive dysfunction and task paralysis are often confused, but they're related but distinct challenges. Understanding the difference helps you address them effectively.

What is Executive Dysfunction?

Executive dysfunction is difficulty with executive functions—planning, organizing, prioritizing, initiating, and completing tasks. It's a neurological difference, not laziness.

Symptoms include:
- Difficulty starting tasks (task initiation)
- Trouble organizing thoughts or materials
- Poor time management
- Difficulty switching between tasks
- Working memory challenges
- Emotional dysregulation around tasks

What is Task Paralysis?

Task paralysis is a specific form of executive dysfunction where you feel completely stuck and unable to start or continue a task. It's often triggered by:
- Perfectionism (fear of doing it wrong)
- Overwhelm (task feels too big)
- Unclear expectations (not knowing what "done" looks like)
- Too many options (decision paralysis)
- Emotional weight (the task feels emotionally taxing)

The Relationship

Executive dysfunction is the underlying neurological difference. Task paralysis is one manifestation of it—when executive dysfunction becomes so intense that you freeze.

How They Interact

Someone with ADHD might have:
- Mild executive dysfunction most days (managing with strategies)
- Severe task paralysis on high-stress days (completely stuck)

Overcoming Executive Dysfunction

1. External Structure: Use tools, timers, reminders
2. Smaller Steps: Break tasks into micro-steps
3. Accountability: Work with others or use apps
4. Dopamine Support: Gamify tasks, celebrate small wins
5. Realistic Expectations: Adjust timelines and standards

Overcoming Task Paralysis

1. Identify the Trigger: What's making you stuck? Fear? Overwhelm? Unclear expectations?
2. Address the Root: If it's overwhelm, break it down. If it's perfectionism, lower the bar.
3. Start Tiny: Do just the first micro-step
4. Use External Motivation: Accountability, rewards, timers
5. Seek Support: Talk to someone, use community

DoTheThing addresses both by providing structure, breaking tasks into manageable steps, and removing decision paralysis through AI-powered suggestions.`
  },
  {
    id: '5',
    title: 'Best Tools for ADHD Task Management in 2024',
    excerpt: 'Comparing the top task management tools designed for or suitable for ADHD brains, and why DoTheThing stands out.',
    date: 'March 20, 2024',
    readTime: '8 min read',
    category: 'Tools & Reviews',
    seoKeywords: ['ADHD Tools', 'Task Management', 'Productivity Apps'],
    content: `The market has many task management tools, but most aren't designed for ADHD brains. Here's a comparison of popular options and why DoTheThing is different.

Popular Task Management Tools

1. Todoist
Pros: Clean interface, recurring tasks, integrations
Cons: Requires upfront planning, can feel overwhelming, no time estimates

2. Asana
Pros: Powerful for teams, detailed project management
Cons: Overkill for individuals, steep learning curve, too complex

3. Notion
Pros: Highly customizable, all-in-one workspace
Cons: Requires setup, can become too complex, decision paralysis

4. Microsoft To Do
Pros: Simple, integrates with Outlook
Cons: Basic features, no AI support, doesn't address ADHD-specific challenges

5. TickTick
Pros: Good recurring tasks, calendar view
Cons: Still requires planning upfront, no AI breakdown

What ADHD-Friendly Tools Need

1. Low Friction: Start immediately without setup
2. Breakdown Support: Help breaking tasks into steps
3. Time Estimates: Realistic time with buffers
4. Flexibility: Allow adjusting as you go
5. Dopamine: Celebrate progress, make it rewarding
6. Focus Support: Timer, distraction reduction

Why DoTheThing is Different

DoTheThing is built specifically for ADHD brains:

- Brain Dump Entry: No planning required, just dump your thoughts
- AI Breakdown: Automatically creates micro-steps
- Smart Estimates: Includes time-blindness buffer (20-30%)
- Focus Levels: Adjusts estimates based on your current state
- Built-in Timer: Countdown to stay on track
- Minimal Friction: Use immediately, no setup
- Checkbox Satisfaction: Celebrate completing each step

The ADHD-Friendly Difference

Most tools ask: "What do you need to do?"
DoTheThing asks: "What's overwhelming you right now?"

Most tools require planning upfront.
DoTheThing handles the planning for you.

Most tools use generic time estimates.
DoTheThing accounts for ADHD time blindness.

Conclusion

If you have ADHD and struggle with task management, you need a tool built for your brain. DoTheThing removes friction, provides structure, and celebrates your progress.

Start using DoTheThing today—no setup required.`
  }
];

export default function Blog() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b-2 border-border bg-card p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate('/')}
            className="mb-4 px-4 py-2 border-2 border-border bg-background hover:bg-accent text-foreground font-vt323"
          >
            BACK TO HOME
          </button>
          <h1 className="text-4xl md:text-5xl font-bold font-pressstart mb-2" style={{ fontFamily: 'Press Start 2P, monospace' }}>BLOG</h1>
          <p className="text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>Resources and insights for ADHD task management</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-4 md:p-6">
        {selectedPost ? (
          // Single Post View
          <div className="space-y-6">
            <div className="border-2 border-border p-6 bg-card mb-6">
              <h1 className="text-4xl font-bold font-pressstart mb-4" style={{ fontFamily: 'Press Start 2P, monospace' }}>{selectedPost.title}</h1>
              <div className="flex gap-4 text-sm mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
                <span>{selectedPost.date}</span>
                <span>•</span>
                <span>{selectedPost.readTime}</span>
                <span>•</span>
                <span className="text-primary">{selectedPost.category}</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedPost.seoKeywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="px-3 py-1 bg-primary text-primary-foreground text-sm border border-primary-foreground font-vt323"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>

            <div className="border-2 border-border p-6 bg-card space-y-4 text-lg" style={{ fontFamily: 'Inter, sans-serif', whiteSpace: 'pre-wrap', lineHeight: '1.8' }}>
              {selectedPost.content}
            </div>

            <button
              onClick={() => setSelectedPost(null)}
              className="mt-6 px-6 py-3 border-2 border-border bg-background hover:bg-accent text-foreground font-vt323 font-bold"
            >
              BACK TO ALL POSTS
            </button>
          </div>
        ) : (
          // Blog List View
          <div className="space-y-6">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="border-2 border-border p-6 bg-card hover:bg-accent cursor-pointer transition-colors"
                onClick={() => setSelectedPost(post)}
              >
                <div className="flex justify-between items-start mb-3">
                  <h2 className="text-2xl font-bold font-pressstart flex-1 mr-4" style={{ fontFamily: 'Press Start 2P, monospace' }}>{post.title}</h2>
                  <span className="text-sm text-primary whitespace-nowrap" style={{ fontFamily: 'Inter, sans-serif' }}>{post.readTime}</span>
                </div>

                <p className="text-lg mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>{post.excerpt}</p>

                <div className="flex gap-4 text-sm mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
                  <span>{post.date}</span>
                  <span>•</span>
                  <span className="text-primary">{post.category}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {post.seoKeywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="px-2 py-1 text-sm border border-border bg-background text-foreground font-vt323"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-border bg-card p-4 md:p-6 mt-12">
        <div className="max-w-4xl mx-auto text-center">
          <p style={{ fontFamily: 'Inter, sans-serif' }}>© 2024 DoTheThing. Built for ADHD brains.</p>
        </div>
      </footer>
    </div>
  );
}
