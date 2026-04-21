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
    content: `ADHD affects how the brain manages executive functions—planning, organizing, prioritizing, and executing tasks.

People with ADHD don't struggle because they lack motivation or intelligence. Their brains work differently. The prefrontal cortex, responsible for executive function, has lower dopamine levels, making it harder to initiate and sustain focus on tasks.

Key challenges include task initiation (starting feels overwhelming), time blindness (difficulty estimating time), working memory issues (trouble holding multiple steps), emotional dysregulation (tasks feel more taxing), and hyperfocus vs hypofocus (extreme difficulty switching).

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

What is Time Blindness? Time blindness means your brain doesn't automatically track time passing. You might start a task at 2 PM and suddenly realize it's 6 PM. You weren't focused on time—you were focused on the task. Your brain doesn't send regular "time check" signals like neurotypical brains do.

Why ADHD Brains Have Time Blindness: The brain's time perception is controlled by the prefrontal cortex, which has lower dopamine in ADHD brains. Without dopamine, the brain can't maintain a sense of time passing. You're either hyperfocused (time disappears) or hypofocused (time feels frozen).

How Time Blindness Affects Life: You're consistently late to appointments. You underestimate how long tasks take. You miss deadlines because they feel abstract. You rush at the last minute. You feel like you're always behind.

Strategies for Managing Time Blindness: Use external time markers (alarms, timers, reminders). Set multiple reminders before appointments. Use visual timers so you can see time passing. Break tasks into timed chunks. Use calendar blocking. Build in buffer time. Use apps like DoTheThing that provide realistic time estimates.

The key is creating external systems because your internal time sense isn't reliable. That's not a failure—it's just how your brain works.`
  },
  {
    id: '3',
    title: 'Breaking Down Big Tasks: A Guide for ADHD Brains',
    excerpt: 'How to decompose overwhelming projects into manageable micro-steps that actually get done.',
    date: 'April 5, 2024',
    readTime: '7 min read',
    category: 'Productivity',
    seoKeywords: ['Task Breakdown', 'ADHD', 'Productivity'],
    content: `One of the biggest challenges for ADHD brains is task initiation. A big project feels so overwhelming that you don't know where to start. So you don't start at all.

The solution: Break tasks into micro-steps.

Why Big Tasks Feel Impossible: Your brain perceives big tasks as emotionally overwhelming. "Write a report" feels like climbing Mount Everest. Your brain doesn't see the path forward. It just sees a massive, undefined mountain of work. So it avoids the task entirely.

The Power of Micro-Steps: When you break a task into tiny, specific steps, something magical happens. Each step feels doable. Your brain can see what to do next. You can start immediately. You build momentum.

Example: "Write a report" becomes:
1. Open blank document (2 min)
2. Write outline (5 min)
3. Write introduction (10 min)
4. Write section 1 (15 min)
5. Write section 2 (15 min)
6. Write conclusion (10 min)
7. Proofread (10 min)

Suddenly, instead of one impossible task, you have seven doable tasks.

How to Break Down Tasks: Start with the end goal. What does "done" look like? Then work backward. What's the last step? What comes before that? Keep breaking until each step takes 5-15 minutes.

Use DoTheThing to automate this. Enter your task, and AI breaks it into perfect micro-steps. Adjust the granularity based on how much detail you need.

The Result: You start tasks faster. You feel less overwhelmed. You actually complete projects. Your confidence grows.`
  },
  {
    id: '4',
    title: 'Executive Dysfunction and Task Paralysis: What\'s the Difference?',
    excerpt: 'Understanding the distinction between executive dysfunction and task paralysis, and how to address each.',
    date: 'March 28, 2024',
    readTime: '6 min read',
    category: 'ADHD Education',
    seoKeywords: ['Executive Dysfunction', 'Task Paralysis', 'ADHD'],
    content: `Executive dysfunction and task paralysis are related but different challenges. Understanding the difference helps you address them effectively.

Executive Dysfunction: This is a neurological issue. Your brain struggles with planning, organizing, prioritizing, and executing. It's like your brain's management system is offline. You can't access the functions you need to manage tasks.

Symptoms include: Difficulty starting tasks, trouble organizing thoughts, trouble prioritizing, trouble switching between tasks, trouble managing time, trouble with working memory.

Task Paralysis: This is an emotional issue. You can do the task, but you feel so overwhelmed or anxious that you can't start. It's like your emotions are blocking your ability to act.

Symptoms include: Feeling overwhelmed, anxiety about the task, perfectionism, fear of failure, emotional avoidance, procrastination.

The Key Difference: Executive dysfunction is "I don't know how to start." Task paralysis is "I'm too anxious to start."

How to Address Executive Dysfunction: Break tasks into micro-steps. Create external structure. Use timers and reminders. Use apps like DoTheThing. Build routines. Reduce decision-making.

How to Address Task Paralysis: Address the emotion first. Acknowledge the anxiety. Practice self-compassion. Start with the easiest step. Use body doubling (work with someone else). Celebrate small wins. Consider therapy for anxiety.

Many people experience both. You might have executive dysfunction making the task feel unclear, AND task paralysis making you anxious about starting. Address both: break the task into steps AND address the emotion.`
  },
  {
    id: '5',
    title: 'Best Tools for ADHD Task Management in 2024',
    excerpt: 'A comprehensive review of the top tools designed to help ADHD individuals manage tasks and stay organized.',
    date: 'March 20, 2024',
    readTime: '8 min read',
    category: 'Tools & Reviews',
    seoKeywords: ['ADHD Tools', 'Task Management', 'Productivity Apps'],
    content: `There are many tools available for ADHD task management. Here's a guide to help you find what works for your brain.

DoTheThing (Free): Brain dump input, AI task breakdown, time estimates with ADHD buffers, countdown timer. Perfect for initial task planning and breakdown. This is where you start.

Todoist (Free tier): Simple task management, recurring tasks, project organization. Perfect for ongoing task management after DoTheThing breaks things down.

Microsoft To Do (Free): Simple, clean interface, shared lists, integration with Outlook. Perfect for basic task lists.

Forest (Free tier): Gamified focus timer, visual tree-growing mechanic, distraction blocking. Perfect for focus sessions while working on tasks.

Be Focused (Free tier): Pomodoro timer, task tracking, break reminders. Perfect for structured work sessions.

Google Calendar (Free): Schedule management, reminders, shared calendars. Perfect for time blocking and scheduling tasks.

Notion (Free): Highly customizable, database features, templates. Perfect for building custom task systems.

Habitica (Free): Gamified task management, RPG-style interface, habit tracking. Perfect for building new habits.

Focusmate (Free tier): Virtual coworking, 25-minute sessions, accountability partner. Perfect for staying accountable.

Building Your Tech Stack: Don't use too many tools. Choose 3-5 that match your brain. Recommended: DoTheThing for breakdown, Todoist for management, Google Calendar for scheduling, Forest for focus, Focusmate for accountability.

The key is consistency. Use your tools regularly. Adjust as needed. Remember: tools support your system, but you're the engine.`
  },
  {
    id: '6',
    title: 'ADHD Medication and Productivity: How to Work With Your Brain Chemistry',
    excerpt: 'Understanding how ADHD medication affects productivity and how to maximize its benefits with proper task management.',
    date: 'March 15, 2026',
    readTime: '7 min read',
    category: 'ADHD Management',
    seoKeywords: ['ADHD medication', 'productivity', 'dopamine', 'executive function'],
    content: `Many people with ADHD take medication to manage their symptoms. But medication alone isn't a complete solution—you still need strategies to manage tasks effectively.

Understanding Medication and Executive Function: ADHD medication works by increasing dopamine and norepinephrine in the brain. Dopamine is crucial for task initiation, motivation, focus, and emotional regulation. When medication is working well, you might notice easier task initiation, better focus for 2-4 hours, improved working memory, and reduced emotional overwhelm.

But here's the key: medication gives you a window of opportunity. It doesn't automatically make tasks happen. You still need a clear plan.

The Medication Plus Strategy Approach: Medication is most effective when combined with task breakdown (smaller steps are easier to start), time management tools (timers, reminders), external structure (schedules, accountability), and environmental support (quiet space, minimal distractions).

Think of medication as turning up the volume on your executive function. But you still need a clear plan for what to do with that improved focus.

Timing Your Medication for Maximum Productivity: Most ADHD medications have a peak effect time. Immediate-release peaks 1-2 hours after taking. Extended-release peaks 2-4 hours after taking. Strategy: Schedule your most important tasks during peak medication time.

Working With Medication Crashes: Many people experience a crash when medication wears off. Plan easier tasks for after the crash. Use DoTheThing to break down tasks into smaller chunks so you can make progress even during low-focus periods.

Key Takeaway: Medication is a tool. Combined with good task management strategies, it can dramatically improve your productivity.`
  },
  {
    id: '7',
    title: 'The Neuroscience Behind Task Avoidance: Why You Procrastinate and How to Stop',
    excerpt: 'Exploring the brain science of procrastination and evidence-based strategies to overcome task avoidance.',
    date: 'March 8, 2026',
    readTime: '8 min read',
    category: 'ADHD Science',
    seoKeywords: ['procrastination', 'task avoidance', 'ADHD brain', 'neuroscience'],
    content: `Procrastination isn't laziness. It's an emotion regulation problem.

The Real Reason You Avoid Tasks: When you have ADHD, your brain struggles with task initiation because tasks feel emotionally aversive. Your brain perceives the task as unpleasant. The emotional weight is disproportionate to the actual difficulty. You avoid the negative emotion, not the task itself.

Additionally, unclear expectations create anxiety. "Write a report" is vague and overwhelming. Your brain doesn't know where to start. Anxiety leads to avoidance.

Delayed gratification is harder with ADHD. ADHD brains are wired for immediate rewards. Tasks with delayed payoff feel impossible. Your brain seeks immediate dopamine instead.

Time blindness makes deadlines feel abstract. "Due Friday" doesn't create urgency. You don't feel the pressure until the last minute. Then you hyperfocus and rush.

The Neuroscience: The prefrontal cortex (executive function center) has lower dopamine in ADHD brains. This affects task initiation (harder to start), emotional regulation (tasks feel more emotionally taxing), working memory (harder to hold multiple steps), and time perception (deadlines feel abstract).

Procrastination is your brain's attempt to regulate emotion by avoiding the unpleasant task.

How to Break the Procrastination Cycle: Make tasks emotionally less aversive by breaking into micro-steps. Smaller equals less overwhelming. Start with the easiest step. Celebrate small wins.

Create clarity by writing specific, actionable steps. Define what "done" looks like. Remove ambiguity.

Add immediate rewards by using a timer, celebrating task completion, and gamifying your task list.

Create external accountability by telling someone your plan, using body doubling, and sharing progress.

Use environmental design by removing distractions, setting up your workspace, and using visual reminders.

Key Takeaway: Procrastination is emotion regulation, not laziness. Address the emotion, not the willpower.`
  },
  {
    id: '8',
    title: 'Remote Work and ADHD: Strategies for Staying Focused at Home',
    excerpt: 'Practical strategies for maintaining focus and productivity when working from home with ADHD.',
    date: 'February 28, 2026',
    readTime: '7 min read',
    category: 'Work & Productivity',
    seoKeywords: ['remote work ADHD', 'working from home', 'focus strategies'],
    content: `Remote work is a double-edged sword for ADHD. Freedom from commute and office distractions is great. But lack of structure can be devastating.

Why Remote Work Is Harder for ADHD Brains: No external structure exists. Office provides natural boundaries (start time, end time, breaks). At home, everything blurs together. Your brain doesn't know when to "switch on."

Too many distractions surround you. Home is full of comfortable distractions. Bed, snacks, entertainment are steps away. Willpower alone doesn't work.

Difficulty with transitions is real. No commute to "prepare" for work. Hard to shift from home mode to work mode. Blurred work-life boundaries.

Isolation is challenging. No coworkers for accountability. Easier to get stuck on tasks. Less social motivation.

Strategies for Remote Work Success: Create a dedicated workspace. Separate room or corner if possible. Only use for work. Make it visually distinct from rest of home. Keep it organized and clutter-free.

Establish a morning routine. Wake up at consistent time. Get dressed (not in pajamas). Have breakfast. "Commute" (walk around block, sit outside). Then start work.

Use time blocking. Schedule specific work blocks (e.g., 9-12, 1-3). Schedule breaks between blocks. Stick to the schedule. Use a timer.

Minimize distractions. Close unnecessary browser tabs. Put phone in another room. Use website blockers. Use noise-canceling headphones. Play background music or white noise.

Take real breaks. Don't work through lunch. Step away from desk every 90 minutes. Move your body. Get outside if possible.

Use accountability. Video coworking (body doubling). Tell coworkers your daily goals. Share progress updates. Use accountability apps.

End your workday. Set a specific end time. Close laptop and put away. Do a transition activity. Separate work from personal time.

Key Takeaway: Remote work requires MORE structure for ADHD brains, not less. Create external boundaries to replace office structure.`
  },
  {
    id: '9',
    title: 'ADHD and Perfectionism: Why You Can\'t Finish Tasks',
    excerpt: 'Understanding the connection between ADHD and perfectionism, and how to overcome it to complete more tasks.',
    date: 'February 15, 2026',
    readTime: '6 min read',
    category: 'ADHD Psychology',
    seoKeywords: ['ADHD perfectionism', 'perfectionism task completion', 'all-or-nothing thinking'],
    content: `Many people with ADHD are perfectionists. This seems contradictory—how can someone with executive dysfunction also be a perfectionist?

The ADHD Perfectionism Paradox: ADHD perfectionism isn't about wanting everything to be perfect. It's about all-or-nothing thinking, fear of doing something wrong, emotional dysregulation around mistakes, and hyperfocus on details while missing the big picture.

The Result: Tasks never feel "done" because they're never "perfect."

Why ADHD and Perfectionism Co-Occur: Emotional sensitivity makes mistakes feel like personal failures. Criticism feels devastating. Fear of judgment is intense. Perfectionism is a defense mechanism.

Hyperfocus tendency means you get stuck on details. Can't stop until it's "perfect." Lose sight of the goal. Task becomes endless.

Low self-esteem from years of being told you're "lazy" or "not trying" makes perfectionism proof you care. If you can't do it perfectly, why try?

Working memory issues make you forget the original goal while focusing on details. Get lost in micro-corrections. Task scope expands infinitely.

The Perfectionism-Procrastination Loop: Task feels important. Fear of not doing it perfectly. Anxiety about starting. Procrastinate to avoid anxiety. Deadline pressure forces you to rush. Result is imperfect. Shame and regret. Next task feels even more important. Loop repeats.

How to Break Free: Redefine "done." Done is not perfect. Done is good enough. Done is better than perfect. Write down what "done" looks like BEFORE starting.

Set a time limit. Give yourself a fixed time to work. When time is up, you're done. Prevents endless perfectionism.

Use the "good enough" standard. B+ work completed is better than A+ work never finished. Good enough today beats perfect someday. Progress over perfection.

Break perfectionism into smaller pieces. Perfectionism on one big task is overwhelming. Perfectionism on micro-steps is manageable. Complete imperfect steps, then move on.

Separate drafting from editing. First draft: Get it done, don't worry about quality. Second pass: Edit and improve. Final pass: Polish. This prevents perfectionism from blocking progress.

Practice self-compassion. You're not lazy or broken. Your brain works differently. Mistakes are learning opportunities. Progress is success.

Key Takeaway: Perfectionism is a symptom of emotional dysregulation, not a character trait. Lower your standards, increase your completion rate.`
  },
  {
    id: '10',
    title: 'ADHD and Relationships: How Task Management Affects Your Connections',
    excerpt: 'Exploring how ADHD task struggles impact relationships and strategies for maintaining healthy connections.',
    date: 'February 1, 2026',
    readTime: '7 min read',
    category: 'Life & Relationships',
    seoKeywords: ['ADHD relationships', 'ADHD communication', 'task management relationships'],
    content: `ADHD doesn't just affect your productivity—it affects your relationships. Poor task management can strain partnerships, friendships, and family connections.

How ADHD Task Struggles Affect Relationships: Broken promises happen. You commit to tasks but forget. Partner feels let down. Trust erodes over time. Resentment builds.

Unfinished household tasks accumulate. Dishes pile up. Laundry doesn't get done. Partner feels like they're carrying the load. Conflict increases.

Communication breakdowns occur. You forget to respond to messages. Partner feels ignored. Misunderstandings accumulate. Distance grows.

Financial stress develops. Missed bills and deadlines. Late fees and penalties. Partner worries about stability. Anxiety increases.

Emotional dysregulation surfaces. Task overwhelm leads to emotional outbursts. Partner feels like they're walking on eggshells. Connection weakens. Intimacy suffers.

Why This Happens: ADHD executive dysfunction means you genuinely forget commitments (not intentionally). Tasks feel overwhelming (not laziness). You struggle with time management (not irresponsibility). Emotional dysregulation is real (not drama).

But your partner may not understand this. They see broken promises, unfinished tasks, missed deadlines, and emotional reactions.

Strategies for ADHD-Friendly Relationships: Be transparent about your ADHD. Explain how your brain works. Share specific challenges. Help partner understand it's not personal.

Use external systems. Shared calendar. Task management app. Reminders and alarms. Written lists instead of verbal commitments.

Communicate clearly. Write things down. Confirm commitments in writing. Set realistic expectations. Be honest about capacity.

Divide tasks based on strengths. You might be great at creative projects but struggle with routine tasks. Partner might excel at organization but struggle with flexibility. Play to strengths, not weaknesses.

Build in accountability. Regular check-ins about tasks. Celebrate completed tasks together. Problem-solve obstacles together. Support each other's systems.

Practice self-compassion and partner compassion. You're not broken, just wired differently. Your partner's frustration is valid too. Work together, not against each other. Seek couples therapy if needed.

Use task management tools together. Share task lists. See each other's progress. Celebrate wins together. Reduce miscommunication.

Key Takeaway: ADHD task struggles aren't personal failures. With communication and systems, relationships can thrive. Your partner isn't your manager—they're your teammate.`
  },
  {
    id: '11',
    title: 'ADHD in the Workplace: How to Succeed in Your Career',
    excerpt: 'Strategies and accommodations for building a successful career while managing ADHD in professional settings.',
    date: 'January 20, 2026',
    readTime: '8 min read',
    category: 'Career & Work',
    seoKeywords: ['ADHD at work', 'ADHD career', 'succeeding with ADHD job'],
    content: `Having ADHD in the workplace is challenging. But with the right strategies and accommodations, you can not just survive—you can thrive.

ADHD Strengths in the Workplace: Hyperfocus allows you to deep-dive into interesting projects. Creativity helps you make novel connections others miss. Energy brings enthusiasm and passion. Adaptability helps you handle change better than most. Problem-solving helps you think outside the box. Resilience comes from overcoming obstacles your whole life.

The Key: Find work that matches your brain.

ADHD Challenges at Work: Time management makes deadlines feel abstract. You underestimate how long tasks take. You rush at the last minute. Quality suffers.

Organization is difficult. Your desk is chaotic. You lose important documents. Email inbox is overwhelming. Systems break down.

Attention and focus are hard. Meetings feel impossible. You miss details. You get distracted easily. You struggle with routine tasks.

Communication is challenging. You interrupt others. You forget to follow up. You miss subtle social cues. Relationships with coworkers suffer.

Executive function is taxing. Starting tasks is hard. Prioritization is difficult. You get stuck on details. Finishing feels impossible.

Workplace Accommodations (Legal Rights): In many countries, ADHD qualifies for workplace accommodations. USA: Americans with Disabilities Act (ADA) protects ADHD employees. Common accommodations: flexible schedule, quiet workspace, written instructions, deadline extensions.

UK: Equality Act 2010 protects disabled employees. Common accommodations: flexible working, adjusted deadlines, quiet space.

Canada: Canadian Human Rights Act protects employees with disabilities. Common accommodations: flexible schedule, modified duties, assistive technology.

Australia: Disability Discrimination Act protects employees. Common accommodations: flexible hours, task modifications, support services.

Talk to HR about accommodations you need.

Strategies for ADHD Success at Work: Use external systems. Calendar with reminders. Task management app. Written checklists. Time-blocking schedule.

Communicate proactively. Tell manager about your ADHD. Explain how you work best. Ask for written instructions. Clarify expectations.

Break projects into steps. Don't work on big projects. Break into micro-tasks. Set intermediate deadlines. Track progress.

Manage your energy. Work during peak focus times. Take breaks between tasks. Avoid back-to-back meetings. Protect deep work time.

Minimize distractions. Use noise-canceling headphones. Close unnecessary tabs. Silence notifications. Use website blockers.

Find your role fit. Look for roles that match your strengths. Hyperfocus roles: Project-based work, creative roles, crisis management. Avoid: Routine administrative work, detail-oriented roles, long meetings.

Build support. Find an ADHD-friendly manager. Connect with other ADHD colleagues. Use employee assistance programs. Consider coaching or therapy.

Advocate for yourself. You deserve accommodations. Your productivity matters. Your wellbeing matters. Don't suffer in silence.

Key Takeaway: ADHD is not a career limitation. With the right environment, accommodations, and strategies, you can build a successful, fulfilling career.`
  },
  {
    id: '12',
    title: 'ADHD and Sleep: How Poor Sleep Makes Executive Dysfunction Worse',
    excerpt: 'Understanding the critical connection between sleep quality and ADHD symptoms, and strategies for better sleep.',
    date: 'January 10, 2026',
    readTime: '6 min read',
    category: 'Health & Wellness',
    seoKeywords: ['ADHD sleep', 'sleep deprivation ADHD', 'executive dysfunction sleep'],
    content: `Sleep is crucial for executive function. For people with ADHD, poor sleep can make symptoms dramatically worse.

The Sleep-Executive Function Connection: Executive function depends on prefrontal cortex activity (planning, decision-making), dopamine regulation (motivation, focus), and emotional regulation (impulse control).

Sleep deprivation impairs all three.

When you're sleep-deprived, task initiation becomes nearly impossible. Time blindness gets worse. Emotional dysregulation increases. Hyperfocus becomes harder to achieve. Procrastination intensifies.

For people with ADHD, this is catastrophic. Your executive function is already compromised. Sleep deprivation makes it worse.

Why ADHD and Sleep Problems Co-Occur: Racing thoughts keep your brain from shutting off. You think about tasks, worries, ideas. Hard to fall asleep.

Hyperfocus at night happens. You get focused on something interesting. Lose track of time. Suddenly it's 3 AM. You're not tired.

Medication timing affects sleep. Some ADHD medications can cause insomnia. Taking medication too late in the day affects sleep quality.

Anxiety and stress are real. ADHD brains are more anxious. Anxiety keeps you awake. Poor sleep increases anxiety. Cycle continues.

Irregular sleep schedule is common. ADHD makes routines hard. Sleep schedule is inconsistent. Your body never adjusts. Sleep quality suffers.

The Impact on Task Management: One night of poor sleep causes 30% reduction in task initiation ability, 40% increase in procrastination, 50% worse time estimation, and 60% more emotional dysregulation.

Over time, chronic sleep deprivation worsens ADHD symptoms, increases depression and anxiety, damages relationships, reduces work performance, and impacts physical health.

Sleep Hygiene for ADHD Brains: Set a consistent sleep schedule. Same bedtime every night. Same wake time every morning. Even on weekends. Helps regulate your body clock.

Create a wind-down routine. Start 1 hour before bed. Dim lights. No screens (blue light suppresses melatonin). Relaxing activities: reading, stretching, meditation.

Optimize your sleep environment. Dark room (blackout curtains). Cool temperature (65-68°F / 18-20°C). Quiet (earplugs if needed). Comfortable bed.

Manage medication timing. Take ADHD meds early in the day. Avoid caffeine after 2 PM. Discuss timing with doctor.

Manage racing thoughts. Keep a notebook by bed. Write down thoughts so you can release them. Try meditation or breathing exercises. Progressive muscle relaxation.

Exercise regularly. 30 minutes of exercise daily. Improves sleep quality. Reduces anxiety. Boosts dopamine.

Limit naps. Naps can interfere with nighttime sleep. If you nap, keep it under 20 minutes. Nap before 3 PM.

Avoid alcohol and drugs. Alcohol disrupts sleep quality. Weed can worsen anxiety. Stimulants keep you awake.

The Connection to Task Management: Better sleep equals better executive function equals better task management.

If you're struggling with tasks, check your sleep first. Often, improving sleep makes a bigger difference than any task management app.

Key Takeaway: Sleep is not a luxury—it's essential for executive function. Prioritize sleep like you prioritize medication. Your ADHD symptoms depend on it.`
  },
  {
    id: '13',
    title: 'ADHD and Financial Management: Why You Struggle With Money',
    excerpt: 'Exploring why financial management is difficult for ADHD individuals and practical strategies for financial success.',
    date: 'December 28, 2025',
    readTime: '7 min read',
    category: 'Finance & Money',
    seoKeywords: ['ADHD money management', 'ADHD finances', 'financial management ADHD'],
    content: `Financial management is one of the hardest challenges for people with ADHD. It combines everything ADHD brains struggle with: planning, organization, delayed gratification, and routine tasks.

Why ADHD and Money Don't Mix: Time blindness makes bills feel abstract until they're overdue. Deadlines don't feel real. Late fees accumulate. Interest compounds.

Delayed gratification is impossible. Saving for future feels impossible. Spending for immediate pleasure feels necessary. You struggle to connect today's spending to future consequences. Debt grows.

Executive dysfunction makes budgeting feel overwhelming. Tracking expenses is tedious. Organizing finances is chaotic. You avoid dealing with it.

Hyperfocus on wrong things happens. You hyperfocus on one purchase. You don't notice the bigger financial picture. You make impulsive decisions. You regret them later.

Emotional dysregulation around money is real. Money stress triggers anxiety. You avoid looking at your account. You don't open bills. Avoidance makes it worse.

Common ADHD Money Problems: Missed bill payments and late fees. Overdraft fees from forgetting to check balance. Impulse purchases and debt. No emergency fund. Difficulty saving. Disorganized financial records. Difficulty with taxes and paperwork. Relationship conflict over money.

Financial Strategies for ADHD Brains: Automate everything. Set up automatic bill payments. Automatic transfers to savings. Automatic investment contributions. Remove the need for executive function.

Simplify your finances. One checking account, one savings account. Fewer credit cards (ideally one). Fewer subscriptions. Fewer financial decisions.

Use visual systems. Physical budget on wall. Color-coded accounts. Visual progress toward goals. See progress, not just numbers.

Break financial tasks into steps. Don't "organize finances." Instead: "Review last month's statements" (15 min). Then: "Categorize expenses" (15 min). Then: "Update budget" (15 min).

Set external accountability. Share finances with partner. Monthly money check-in meetings. Financial advisor or coach. Accountability app.

Use technology. Budgeting apps (YNAB, Mint). Bill reminder apps. Automatic payment systems. Spending trackers.

Create a financial routine. Same day each week for money tasks. Same time each month for bills. Calendar reminders. Make it a habit.

Address emotional barriers. Money shame is real. You're not bad with money, your brain works differently. Therapy can help with money anxiety. Financial coaches understand ADHD.

Key Takeaway: ADHD financial struggles aren't character flaws. Your brain needs external systems. Automate, simplify, and use technology. You can build financial stability.`
  },
  {
    id: '14',
    title: 'ADHD and Creativity: How to Channel Hyperfocus Into Your Passion',
    excerpt: 'Strategies for leveraging ADHD hyperfocus and creative strengths to build a fulfilling creative career or hobby.',
    date: 'December 15, 2025',
    readTime: '7 min read',
    category: 'Creativity & Passion',
    seoKeywords: ['ADHD creativity', 'ADHD hyperfocus', 'creative careers ADHD'],
    content: `ADHD brains are wired for creativity. Hyperfocus, divergent thinking, and novel connections are ADHD superpowers. The challenge is channeling them productively.

ADHD and Creativity: ADHD traits that enhance creativity include divergent thinking (you make unusual connections), hyperfocus (you can deep-dive into interesting projects), novelty-seeking (you love new ideas and approaches), risk-taking (you try things others won't), emotional intensity (your work has passion and authenticity), and pattern recognition (you see connections others miss).

Many famous creative people have ADHD: artists, musicians, writers, entrepreneurs, designers.

The Challenge: Consistency: ADHD creativity is brilliant but inconsistent. You hyperfocus on projects you love. You abandon projects that lose novelty. You have 100 ideas but finish 1. You struggle with the "boring" parts (editing, marketing, admin). You burn out from inconsistency.

How to Channel ADHD Creativity: Embrace hyperfocus. Work on projects that interest you. Don't force yourself to work on boring projects. Use hyperfocus as your superpower. Protect your deep work time.

Separate creation from execution. Creation phase: Hyperfocus, generate ideas, make it. Execution phase: Marketing, admin, routine tasks. Hire help for execution if possible. Or use systems to make execution easier.

Build accountability. Deadlines help ADHD creativity. Share work with others. Join creative communities. Commit to regular output.

Use constraints. Constraints actually enhance creativity. Set a time limit for projects. Set a scope limit. Constraints force you to finish.

Batch similar tasks. All creative work in one block. All admin work in another block. All marketing in another block. Reduces context switching.

Create a creative routine. Same time each day for creative work. Same space. Same ritual. Consistency builds momentum.

Celebrate progress. Finish projects, even if imperfect. Share your work. Get feedback. Celebrate small wins.

Manage perfectionism. Done is better than perfect. Ship your work. Iterate based on feedback. Progress over perfection.

Finding Your Creative Career: ADHD-friendly creative careers include entrepreneurship (novelty, autonomy), freelance work (flexibility, variety), creative agencies (fast-paced, project-based), content creation (hyperfocus, autonomy), art and design (visual thinking), music and performance (passion, expression), writing (hyperfocus, creativity), and game design (problem-solving, creativity).

Avoid routine creative work (boring), corporate creative roles (too many meetings), roles requiring consistent output (hard for ADHD), and roles requiring detail-oriented editing (frustrating).

Key Takeaway: ADHD creativity is a gift. Channel hyperfocus into your passion. Build systems for the boring parts. Your unique perspective is valuable.`
  },
  {
    id: '15',
    title: 'Free Tools for ADHD Task Management in 2026: Beyond DoTheThing',
    excerpt: 'A comprehensive guide to free ADHD tools and how to build your perfect productivity tech stack.',
    date: 'December 1, 2025',
    readTime: '8 min read',
    category: 'Tools & Resources',
    seoKeywords: ['free ADHD tools', 'task management apps', 'ADHD productivity tools'],
    content: `DoTheThing is a great free tool for breaking down tasks and managing time. But it's not the only tool you might need. Here's a comprehensive guide to free ADHD tools in 2026.

Task Management & Breakdown: DoTheThing (Free) offers brain dump input, AI task breakdown, time estimates with ADHD buffers, and countdown timer. Perfect for initial task planning and breakdown.

Todoist (Free tier) offers simple task management, recurring tasks, and project organization. Perfect for ongoing task management after DoTheThing breaks things down.

Microsoft To Do (Free) offers simple, clean interface, shared lists, and integration with Outlook. Perfect for basic task lists.

Notion (Free) offers highly customizable features, database features, and templates. Perfect for building custom systems.

Time Management & Focus: Forest (Free tier) offers gamified focus timer, visual tree-growing mechanic, and distraction blocking. Perfect for focus sessions.

Be Focused (Free tier) offers Pomodoro timer, task tracking, and break reminders. Perfect for structured work sessions.

Focus@Will (Free tier) offers music for focus, scientifically designed, and distraction reduction. Perfect for background music during work.

Habitica (Free) offers gamified task management, RPG-style interface, and habit tracking. Perfect for building new habits.

Organization & Planning: Google Calendar (Free) offers schedule management, reminders, and shared calendars. Perfect for time blocking and scheduling.

Trello (Free tier) offers visual task boards, Kanban workflow, and collaboration. Perfect for project organization.

TickTick (Free tier) offers calendar integration, recurring tasks, and subtasks. Perfect for comprehensive task management.

Note-Taking & Brain Dumps: Obsidian (Free) offers local note-taking, linking between notes, and markdown-based. Perfect for brain dumps and knowledge management.

Notion (Free) offers database notes, templates, and sharing. Perfect for organized note-taking.

Google Keep (Free) offers quick notes, voice notes, and sharing. Perfect for quick brain dumps.

Accountability & Body Doubling: Focusmate (Free tier) offers virtual coworking, 25-minute sessions, and accountability partner. Perfect for staying accountable.

Complice (Free tier) offers daily goal setting, progress tracking, and community support. Perfect for intention setting.

Pomodone Timer (Free) offers Pomodoro timer, to-do list integration, and visual progress. Perfect for structured focus.

Communication & Reminders: Google Tasks (Free) offers simple task lists, integration with Gmail and Calendar, and subtasks. Perfect for quick tasks and reminders.

Slack (Free tier) offers team communication, reminders and bots, and integration with other tools. Perfect for workplace accountability.

Telegram (Free) offers reminders and bots, self-messaging, and notifications. Perfect for personal reminders.

Building Your ADHD Tech Stack: Recommended free combination: DoTheThing for task breakdown, Todoist or Microsoft To Do for ongoing management, Google Calendar for time blocking, Forest or Be Focused for focus sessions, Google Keep or Notion for brain dumps, and Focusmate for accountability.

This combination covers initial task planning, ongoing management, time organization, focus support, brain dump capture, and accountability.

Tips for Using Multiple Tools: Don't use too many. More than 5 tools becomes overwhelming. Stick with essential tools. Integrate when possible.

Automate connections. Use Zapier to connect tools. Reduce manual data entry. Keep systems in sync.

Create a workflow. Brain dump in Keep. Process in DoTheThing. Schedule in Calendar. Execute with Forest. Track in Todoist.

Review regularly. Weekly: Check if tools are working. Monthly: Adjust as needed. Quarterly: Evaluate and update. Don't be afraid to change tools.

Remember: Tools aren't the solution. Tools support your system. Systems support your goals. You're the engine. Tools just make it easier.

The Bottom Line: Free ADHD tools in 2026 are powerful. You can build a comprehensive system without spending money. The key is choosing tools that match your brain, not using too many, integrating them into a workflow, using consistently, and adjusting as needed.

DoTheThing is a great starting point. Layer on other tools to build your complete system.

Key Takeaway: You don't need expensive tools to manage ADHD. Free tools are powerful. Build a system that works for your brain, not someone else's.`
  }
];

export default function Blog() {
  const [, setLocation] = useLocation();
  const [selectedPost, setSelectedPost] = useState<string | null>(null);

  if (selectedPost) {
    const post = blogPosts.find(p => p.id === selectedPost);
    if (!post) return null;

    return (
      <div className="min-h-screen bg-white p-4 font-inter">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => setSelectedPost(null)}
            className="font-pressstart text-sm mb-6 text-blue-600 hover:text-blue-800 border-2 border-blue-600 px-3 py-2"
          >
            BACK TO ALL POSTS
          </button>

          <h1 className="font-pressstart text-2xl md:text-3xl mb-4 text-black border-2 border-black p-4">
            {post.title}
          </h1>

          <div className="text-sm text-gray-600 mb-6 space-y-1">
            <p>{post.date}</p>
            <p>{post.readTime}</p>
            <p className="text-blue-600">{post.category}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {post.seoKeywords.map((keyword, idx) => (
                <span key={idx} className="text-xs bg-gray-200 px-2 py-1">
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          <div className="prose prose-sm max-w-none border-2 border-black p-4 mb-8">
            {post.content.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="text-gray-700 mb-4 leading-relaxed text-base">
                {paragraph}
              </p>
            ))}
          </div>

          <button
            onClick={() => setSelectedPost(null)}
            className="font-pressstart text-sm mb-6 text-blue-600 hover:text-blue-800 border-2 border-blue-600 px-3 py-2"
          >
            BACK TO ALL POSTS
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-4 font-inter">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => setLocation('/')}
          className="font-pressstart text-sm mb-6 text-blue-600 hover:text-blue-800 border-2 border-blue-600 px-3 py-2"
        >
          BACK TO HOME
        </button>

        <h1 className="font-pressstart text-3xl md:text-4xl mb-2 text-black border-2 border-black p-4">
          BLOG
        </h1>

        <p className="text-gray-600 mb-8 text-base">
          Resources and insights for ADHD task management
        </p>

        <div className="space-y-4">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post.id)}
              className="border-2 border-black p-4 cursor-pointer hover:bg-blue-50 transition"
            >
              <h2 className="font-pressstart text-lg mb-2 text-black">
                {post.title}
              </h2>
              <p className="text-gray-700 mb-3 text-sm">
                {post.excerpt}
              </p>
              <div className="flex justify-between items-center text-xs text-gray-600">
                <span>{post.date}</span>
                <span>{post.readTime}</span>
                <span className="text-blue-600">{post.category}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t-2 border-black">
          <button
            onClick={() => setLocation('/')}
            className="font-pressstart text-sm text-blue-600 hover:text-blue-800 border-2 border-blue-600 px-3 py-2"
          >
            BACK TO HOME
          </button>
        </div>
      </div>
    </div>
  );
}
