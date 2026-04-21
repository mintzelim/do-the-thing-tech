import { useLocation } from "wouter";
import { useState } from "react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  slug: string;
  content: string;
  seoKeywords: string[];
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "How ADHD Affects Task Management: A Complete Guide",
    excerpt: "Discover why traditional task management fails for ADHD brains and what actually works.",
    date: "2024-04-15",
    readTime: "8 min read",
    category: "ADHD Education",
    slug: "adhd-task-management-guide",
    seoKeywords: ["ADHD task management", "executive dysfunction", "ADHD productivity"],
    content: `
## How ADHD Affects Task Management: A Complete Guide

### Understanding ADHD and Executive Function

Attention-Deficit/Hyperactivity Disorder (ADHD) is a neurodevelopmental condition that affects how the brain processes information, manages attention, and executes tasks. One of the most challenging aspects of ADHD is executive dysfunction—difficulty with planning, organizing, initiating, and completing tasks.

### The ADHD Task Management Challenge

People with ADHD often struggle with:

**1. Task Initiation**
Starting tasks is often the hardest part. Even simple tasks can feel insurmountable, leading to procrastination and anxiety.

**2. Time Blindness**
ADHD brains don't perceive time the same way. Minutes feel like seconds, and hours feel like minutes. This makes time estimation nearly impossible.

**3. Working Memory Issues**
Difficulty holding information in mind while working, making multi-step tasks especially challenging.

**4. Hyperfocus and Hyperfocus Crashes**
While hyperfocus can be a superpower, the crash afterward can be exhausting and disruptive.

**5. Emotional Regulation**
ADHD often comes with emotional dysregulation, making frustration and overwhelm more intense.

### Why Traditional Task Management Fails

Most task management apps assume:
- You can plan everything upfront
- You have accurate time perception
- You can break tasks down logically
- You're motivated by productivity metrics

None of these assumptions work for ADHD brains.

### What Actually Works

Effective ADHD task management requires:
- **Flexibility**: Plans need to adapt to energy and focus levels
- **Micro-steps**: Tasks need to be broken into very small, manageable pieces
- **Time buffers**: Estimates need to account for time blindness
- **Minimal friction**: Getting started should be as easy as possible
- **Visual feedback**: Progress and time awareness are crucial

This is why DoTheThing was built specifically for ADHD brains.
    `,
  },
  {
    id: "2",
    title: "Time Blindness in ADHD: Why You're Always Late",
    excerpt: "Understanding time blindness and practical strategies to manage it in daily life.",
    date: "2024-04-10",
    readTime: "6 min read",
    category: "ADHD Symptoms",
    slug: "time-blindness-adhd",
    seoKeywords: ["time blindness ADHD", "ADHD time management", "why ADHD people are late"],
    content: `
## Time Blindness in ADHD: Why You're Always Late

### What Is Time Blindness?

Time blindness is a symptom of ADHD where the brain doesn't accurately perceive the passage of time. It's not about not caring about time—it's about literally not feeling it.

### How Time Blindness Manifests

**The "5-Minute" Trap**
You think you'll just do something for 5 minutes, and suddenly 2 hours have passed.

**Underestimating Duration**
You consistently underestimate how long tasks take, leading to rushing and stress.

**No Sense of Urgency**
Without external pressure, tasks feel equally urgent (or not urgent), making prioritization difficult.

**Losing Track of Time**
You might not notice hunger, thirst, or the need for bathroom breaks when hyperfocused.

### The Impact on Daily Life

Time blindness affects:
- Being on time for appointments
- Meeting deadlines
- Estimating project duration
- Scheduling breaks
- Planning ahead

### Strategies for Managing Time Blindness

**1. Use External Time Markers**
Timers, alarms, and visual clocks help create external time awareness.

**2. Build in Buffers**
Add 20-30% extra time to all estimates to account for time blindness.

**3. Time-Box Activities**
Use Pomodoro or similar techniques to create artificial time boundaries.

**4. Use Countdown Timers**
Seeing time count down is more effective than clock time for ADHD brains.

**5. Create Accountability**
Share deadlines with others to create external motivation.

### DoTheThing's Approach

DoTheThing automatically adds time buffers based on your focus level, helping you create realistic estimates that account for time blindness.
    `,
  },
  {
    id: "3",
    title: "Breaking Down Big Tasks: A Guide for ADHD Brains",
    excerpt: "Learn how to break overwhelming tasks into manageable micro-steps that actually work.",
    date: "2024-04-05",
    readTime: "7 min read",
    category: "Productivity",
    slug: "breaking-down-tasks-adhd",
    seoKeywords: ["breaking down tasks", "task decomposition", "ADHD productivity tips"],
    content: `
## Breaking Down Big Tasks: A Guide for ADHD Brains

### The Problem with Big Tasks

Large tasks trigger task paralysis in ADHD brains. When you see "Write Project Proposal," your brain doesn't know where to start, so it freezes.

### Why Micro-Steps Matter

ADHD brains need:
- **Clarity**: Exactly what to do next
- **Momentum**: Quick wins to build confidence
- **Flexibility**: Ability to adjust as you go
- **Progress**: Visible evidence of forward movement

### How to Break Down Tasks Effectively

**Step 1: Identify the End Goal**
What does "done" look like?

**Step 2: List All Sub-Tasks**
Brain dump everything that needs to happen.

**Step 3: Break Sub-Tasks into Micro-Steps**
Each step should take 5-15 minutes maximum.

**Step 4: Order Logically**
What needs to happen first?

**Step 5: Add Warm-Up Steps**
Include an easy first step to build momentum.

### Example: "Write Project Proposal"

Instead of one big task, break it into:
1. Open template (2 min)
2. Add title (3 min)
3. Write executive summary (15 min)
4. List key objectives (10 min)
5. Add timeline (10 min)
6. Review and edit (15 min)

Each step is clear, manageable, and provides progress feedback.

### The ADHD Advantage

Breaking tasks into micro-steps isn't just for ADHD—it's a best practice. But ADHD brains need it more than most.

### DoTheThing's Solution

DoTheThing uses AI to automatically break tasks into micro-steps, with adjustable granularity based on your needs.
    `,
  },
  {
    id: "4",
    title: "Executive Dysfunction vs Task Paralysis: What's the Difference?",
    excerpt: "Understanding the distinction between executive dysfunction and task paralysis, and how to address each.",
    date: "2024-03-30",
    readTime: "7 min read",
    category: "ADHD Education",
    slug: "executive-dysfunction-vs-task-paralysis",
    seoKeywords: ["executive dysfunction", "task paralysis", "ADHD executive function"],
    content: `
## Executive Dysfunction vs Task Paralysis: What's the Difference?

### Defining Executive Function

Executive function refers to the brain's ability to:
- Plan and organize
- Initiate tasks
- Manage time
- Regulate emotions
- Maintain focus
- Switch between tasks

### Executive Dysfunction

Executive dysfunction is when these abilities are impaired. It's not laziness—it's a neurological difference.

**Signs of Executive Dysfunction:**
- Difficulty starting tasks
- Trouble organizing thoughts or materials
- Poor time management
- Difficulty prioritizing
- Trouble with working memory
- Emotional dysregulation

### Task Paralysis

Task paralysis is a specific manifestation of executive dysfunction where you literally cannot start or continue a task, even though you want to.

**What Task Paralysis Feels Like:**
- Feeling frozen when facing a task
- Knowing what to do but unable to do it
- Physical or mental resistance to starting
- Anxiety or dread about the task
- Procrastination despite consequences

### The Key Difference

**Executive Dysfunction** = Difficulty with the cognitive processes needed for task management

**Task Paralysis** = Complete inability to initiate or continue a task despite wanting to

Task paralysis is often a result of executive dysfunction combined with anxiety, perfectionism, or overwhelm.

### Addressing Executive Dysfunction

**1. External Structure**
Create systems and routines that reduce the need for executive function.

**2. Break Tasks Down**
Smaller tasks require less executive function to initiate.

**3. Remove Friction**
Make starting as easy as possible.

**4. Use Timers**
External time awareness reduces cognitive load.

**5. Build in Breaks**
Executive function is a limited resource.

### Addressing Task Paralysis

**1. Identify the Root**
Is it overwhelm? Perfectionism? Unclear expectations?

**2. Reduce the Task**
Make the first step so small it's impossible to refuse.

**3. Change Your Environment**
Sometimes a new location helps break the paralysis.

**4. Use Accountability**
External pressure can override internal paralysis.

**5. Seek Support**
Professional help can address underlying anxiety or perfectionism.

### DoTheThing's Approach

By breaking tasks into micro-steps and providing clear, manageable next actions, DoTheThing helps overcome both executive dysfunction and task paralysis.
    `,
  },
  {
    id: "5",
    title: "Best Tools for ADHD Task Management in 2024",
    excerpt: "Comprehensive review of task management tools designed for or suitable for ADHD brains.",
    date: "2024-03-25",
    readTime: "10 min read",
    category: "Tools & Reviews",
    slug: "best-adhd-task-management-tools-2024",
    seoKeywords: ["ADHD task management tools", "best productivity apps ADHD", "ADHD tools 2024"],
    content: `
## Best Tools for ADHD Task Management in 2024

### What Makes a Tool ADHD-Friendly?

Effective ADHD task management tools should:
- **Minimize friction**: Getting started should be easy
- **Provide structure**: Without being rigid
- **Include time awareness**: Timers, estimates, visual feedback
- **Support micro-steps**: Breaking tasks into manageable pieces
- **Reduce cognitive load**: Don't require complex setup
- **Offer flexibility**: Adapt to changing energy and focus levels

### Key Features to Look For

**1. Brain Dump Capability**
Can you quickly capture thoughts without organizing them first?

**2. Task Breakdown**
Does it help you break tasks into smaller steps?

**3. Time Estimation**
Does it help you estimate realistically?

**4. Visual Feedback**
Can you see progress clearly?

**5. Minimal Setup**
Can you start using it immediately?

**6. Flexibility**
Can you adjust tasks and estimates as you go?

### The ADHD Task Management Landscape

**Traditional Tools (Todoist, Asana)**
- Pros: Powerful, customizable
- Cons: High friction, require planning upfront

**Habit Trackers (Habitica, Streaks)**
- Pros: Gamification, visual progress
- Cons: Not ideal for one-off tasks

**Time Management (Toggl, Clockify)**
- Pros: Time awareness, tracking
- Cons: Require manual tracking

**ADHD-Specific Tools (DoTheThing, Goblin Tools)**
- Pros: Designed for ADHD brains, low friction
- Cons: More specialized, fewer features

### DoTheThing: Designed for ADHD

DoTheThing stands out because it's specifically designed for ADHD task management:

**Brain Dump Entry**
Write everything without organizing first.

**AI-Powered Breakdown**
Automatically breaks tasks into micro-steps.

**Time Blindness Buffers**
Adds 20-30% buffer based on focus level.

**Granularity Control**
Choose how detailed your breakdown is.

**Countdown Timer**
Visual time awareness during work.

**Minimal Setup**
Start using immediately—no complex configuration.

### Choosing the Right Tool

Consider:
- Your specific challenges (initiation, time blindness, overwhelm, etc.)
- Your workflow (daily tasks, projects, habits)
- Your preferences (simple vs feature-rich, visual vs text-based)
- Your budget (free vs paid)

For ADHD-specific task management, DoTheThing is purpose-built to address the unique challenges of ADHD brains.

### The Bottom Line

The best tool is the one you'll actually use. For ADHD brains struggling with task initiation, time blindness, and overwhelm, DoTheThing offers a streamlined, purpose-built solution.
    `,
  },
];

export default function Blog() {
  const [, navigate] = useLocation();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b-2 border-border p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => {
              if (selectedPost) {
                setSelectedPost(null);
              } else {
                navigate("/");
              }
            }}
            className="mb-4 px-4 py-2 border-2 border-border bg-background hover:bg-accent text-foreground font-vt323"
          >
            {selectedPost ? "BACK TO BLOG" : "BACK TO HOME"}
          </button>
          <h1 className="text-4xl md:text-5xl font-bold font-pressstart mb-2">BLOG</h1>
          <p className="text-lg font-vt323">Resources and insights for ADHD task management</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-4 md:p-6">
        {selectedPost ? (
          // Single Post View
          <article className="prose prose-invert max-w-none">
            <div className="border-2 border-border p-6 bg-card mb-6">
              <h1 className="text-4xl font-bold font-pressstart mb-4">{selectedPost.title}</h1>
              <div className="flex gap-4 font-vt323 text-sm mb-6">
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

            <div className="border-2 border-border p-6 bg-card space-y-4 font-vt323 text-lg whitespace-pre-wrap">
              {selectedPost.content}
            </div>

            <button
              onClick={() => setSelectedPost(null)}
              className="mt-6 px-6 py-3 border-2 border-border bg-background hover:bg-accent text-foreground font-vt323 font-bold"
            >
              BACK TO ALL POSTS
            </button>
          </article>
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
                  <h2 className="text-2xl font-bold font-pressstart flex-1 mr-4">{post.title}</h2>
                  <span className="text-sm font-vt323 text-primary whitespace-nowrap">{post.readTime}</span>
                </div>

                <p className="font-vt323 text-lg mb-4">{post.excerpt}</p>

                <div className="flex gap-4 font-vt323 text-sm mb-4">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span className="text-primary">{post.category}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {post.seoKeywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="px-2 py-1 bg-primary bg-opacity-20 text-primary text-xs border border-primary font-vt323"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>

                <div className="mt-4 text-primary font-vt323 font-bold">READ MORE →</div>
              </article>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-border p-4 md:p-6 mt-12 bg-card">
        <div className="max-w-4xl mx-auto text-center font-vt323">
          <p className="mb-2">DoTheThing Blog - ADHD Task Management Resources</p>
          <p className="text-sm text-muted-foreground">
            Insights and strategies for neurodivergent productivity
          </p>
        </div>
      </footer>
    </div>
  );
}
