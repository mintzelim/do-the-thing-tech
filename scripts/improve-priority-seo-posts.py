from __future__ import annotations

import re
from pathlib import Path

ROOT = Path('/home/ubuntu/do-the-thing')
BLOG = ROOT / 'blog'
UPDATED_DATE = '2026-08-13'

ASSETS = {
    'brain_dump': ('/manus-storage/dothething-how-it-works-brain-dump-transparent_805dc4d4.png', 'Purple pixel mascot considering a brain dump of tasks'),
    'focus': ('/manus-storage/dothething-how-it-works-focus-transparent_c55dcc2f.png', 'Purple pixel mascot using a focus checklist'),
    'breakdown': ('/manus-storage/dothething-how-it-works-breakdown-transparent_3a48d1ce.png', 'Purple pixel mascot beside a small generated task list'),
    'timer': ('/manus-storage/dothething-how-it-works-timer-transparent_f4de844b.png', 'Purple pixel mascot using a visible countdown timer'),
}

ADDITIONS = {
    '06-adhd-medication-and-productivity.md': {
        'asset': 'focus',
        'body': '''## A Useful Way to Evaluate Day-to-Day Change

Medication conversations are easier when you bring observations rather than a single verdict such as “it works” or “it does not.” For one or two weeks, choose a few concrete signals: whether you can start the task you planned, how often you return after an interruption, when appetite or sleep shifts, and whether the benefit lasts through the parts of the day that matter to you. That record gives a prescriber something more useful than a memory of one unusually good or difficult day.

Medication is only one part of an ADHD plan. NIMH describes treatment as potentially including medication alongside psychosocial interventions such as cognitive behavioral therapy, and the right combination differs by person. [NIMH’s ADHD overview](https://www.nimh.nih.gov/health/topics/attention-deficit-hyperactivity-disorder-adhd) is a good starting point for questions to bring to a qualified clinician.

## Common Mistakes to Avoid When Evaluating Medication

### Treating a productive day as proof that every setting is solved

One unusually focused afternoon can be encouraging, but it does not tell you how a treatment fits your sleep, appetite, mood, schedule, or longer work week. Look for a repeatable pattern instead of a perfect day.

### Changing dose or timing without your prescriber

Do not adjust a prescription on your own to chase a productivity spike or manage side effects. Medication choices, side effects, and interactions need an individual clinical review. Contact the prescriber who manages the medication if something feels off, and seek urgent care for severe or concerning symptoms.

### Expecting medication to create a system by itself

Medication may make it easier to use a system; it does not automatically decide the next action, create a calendar, or protect focus. Pair any treatment plan with a small external tool, such as a visible task list or a [task-breakdown routine](/blog/how-to-break-down-tasks-adhd), so the benefit has somewhere to go.
''',
        'replacements': {
            'Medication is one of the most effective treatments for ADHD. But how exactly does it affect productivity, and what should you expect?': 'Medication is one evidence-backed treatment option for ADHD. Its effects, side effects, and fit with daily routines vary from person to person, so productivity is only one part of the conversation.',
            'For many people, stimulants bring brain activity closer to neurotypical levels, making executive functions easier to access.': 'For some people, stimulants can reduce ADHD symptoms that affect attention, impulse control, and task follow-through. Response and tolerability vary, so treatment needs individual clinical review.',
            'Most side effects are manageable and often improve over time.': 'Side effects should be discussed with the clinician who prescribed the medication; do not assume that a new or persistent effect will resolve on its own.',
        },
    },
    '07-neuroscience-task-avoidance.md': {
        'asset': 'brain_dump',
        'body': '''## Turn Avoidance Into Information

Avoidance is easier to work with when you name the friction rather than assigning a character judgment. Ask one narrow question: is the task unclear, too large, emotionally loaded, low-reward, interrupted, or simply happening when your energy is depleted? The answer points to a different experiment. An unclear task needs a definition; an oversized task needs a smaller first action; a depleted day may need recovery and a realistic re-plan.

ADHD can affect attention, organization, and staying on task across settings, but it does not explain every delayed task. [NIMH’s ADHD overview](https://www.nimh.nih.gov/health/topics/attention-deficit-hyperactivity-disorder-adhd) also notes that other conditions can co-occur. If avoidance is persistent, distressing, or changes suddenly, it is worth discussing with a qualified professional rather than trying to self-diagnose from productivity advice.

## Common Mistakes to Avoid With Task Avoidance

### Calling every delay a dopamine problem

“Dopamine” can be a useful shorthand, but it is not a complete explanation or a diagnosis. Use the language only if it helps you notice a practical condition you can change: uncertainty, friction, time pressure, or lack of rest.

### Making the rescue step another big task

“Make a project plan” is not a next action when you are frozen. Try “open the document,” “write the project title,” or “list the first two materials.” The [task-paralysis guide](/blog/executive-dysfunction-vs-task-paralysis) and [task-breakdown guide](/blog/breaking-down-big-tasks) can help you make that distinction.

### Using shame as a deadline system

Panic can create motion, but it is not a reliable planning method. Replace one accusation with one observable adjustment: a five-minute start, a smaller scope, a body double, or a clearer finish line.
''',
        'replacements': {},
    },
    '10-adhd-relationships.md': {
        'asset': 'focus',
        'body': '''## Build a Shared External System

Relationship friction often grows when one person has to remember every plan, message, deadline, or household detail in their head. A shared external system can make the issue visible without making either person the “manager.” Pick one place for agreements—a shared calendar, a short weekly check-in note, or a written list of who owns the next action. Start small enough that both people can actually keep using it.

This is not a substitute for support when a relationship feels unsafe, controlling, or persistently distressing. ADHD can affect daily functioning and relationships, but it does not excuse harm. If you are worried about safety, seek local professional or crisis support.

## Common Mistakes to Avoid in ADHD Relationship Conversations

### Turning a missed task into a verdict about care

“You never care” and “you are too sensitive” make it harder to solve the actual logistics problem. Name the observable event, its impact, and one requested support: “The bill was missed; can we set a shared reminder before the due date?”

### Making one partner the permanent reminder system

Constant reminding can create resentment on both sides. Move recurring prompts into a shared calendar, checklist, or visible routine so neither person has to carry the entire memory load.

### Saving difficult conversations for the most overloaded moment

Try to choose a neutral time, agree on one topic, and end with one concrete next step. If rejection sensitivity is making feedback hard to hear, this [RSD guide](/blog/rejection-sensitive-dysphoria-rsd) may offer language for slowing the conversation down.
''',
        'replacements': {},
    },
    '11-adhd-workplace.md': {
        'asset': 'breakdown',
        'body': '''## Design a Workday You Can Repeat

The most useful workplace support is specific. Instead of “I need help focusing,” describe a work barrier and a practical adjustment: written follow-up after meetings, a protected focus block, a quieter workspace, or a brief planning check-in. The [Job Accommodation Network’s ADHD resource](https://askjan.org/disabilities/Attention-Deficit-Hyperactivity-Disorder-AD-HD.cfm) lists accommodation ideas and explains that needs should be considered individually.

If you are in the United States, legal rights and processes can depend on the role, employer, and situation. If you are elsewhere, local employment law may differ. This article is practical information, not legal advice; a qualified employment adviser, HR professional, union representative, or disability-rights organization can help with your own circumstances.

## Common Mistakes to Avoid at Work

### Requesting a vague accommodation

“Less distraction” is a real need but a difficult request to act on. Connect the request to a work outcome: “Written action items after meetings will help me deliver the correct next step.” Concrete requests are easier to discuss and review.

### Disclosing before you have decided what you need

Disclosure is personal. You do not have to decide in the middle of a stressful day. Write down the barrier, possible supports, and the people who need to know before you start the conversation.

### Treating planning as extra work instead of part of the job

Reserve a short weekly planning block to turn incoming work into visible next actions. For day-to-day task initiation, use the [task-breakdown guide](/blog/how-to-break-down-tasks-adhd) or the [remote-work guide](/blog/remote-work-adhd) rather than relying on memory alone.
''',
        'replacements': {
            'https://askjan.org/disabilities/Attention-Deficit-Hyperactivity-Disorder-ADHD.cfm': 'https://askjan.org/disabilities/Attention-Deficit-Hyperactivity-Disorder-AD-HD.cfm',
            'ADHD is recognized as a disability under the Americans with Disabilities Act (ADA). You have the right to reasonable accommodations that help you perform your job effectively.': 'In the United States, ADHD may qualify as a disability under the Americans with Disabilities Act (ADA) when it substantially limits a major life activity. Whether an accommodation is appropriate is an individual, job-specific question.',
        },
    },
    '12-adhd-sleep.md': {
        'asset': 'timer',
        'body': '''## Use a Seven-Day Sleep Review Before Changing Everything

Rather than trying to build a flawless routine overnight, collect a small amount of information for a week: approximate bedtime, wake time, caffeine or alcohol timing, screens late in the evening, medication timing as prescribed, and how rested you feel the next day. The goal is not to grade yourself. It is to notice one pattern you can discuss with a clinician or test safely, such as moving a wind-down cue earlier or protecting a consistent wake time.

The National Heart, Lung, and Blood Institute explains that sleep deficiency can involve too little sleep, poor-quality sleep, sleeping at the wrong time, or a sleep disorder. It can affect focus, learning, reactions, and mood. [Read NHLBI’s overview](https://www.nhlbi.nih.gov/health/sleep-deprivation). If you have severe daytime sleepiness, breathing pauses, a major mood change, or a medication concern, seek individual medical guidance.

## Common Mistakes to Avoid With ADHD and Sleep

### Treating sleep loss as only a productivity problem

Sleep affects safety and health as well as next-day output. Do not use a new app, a larger to-do list, or an earlier alarm as a substitute for assessing persistent sleep problems.

### Changing prescribed medication timing on your own

Some medications can affect sleep, but timing and dosage decisions are clinical decisions. Bring your seven-day log to the person who prescribes your medication instead of experimenting alone.

### Building a routine with too many steps

A 14-step night routine can create another place to “fail.” Choose one cue that is easy to repeat—putting a charger outside the bedroom, setting a wind-down reminder, or laying out tomorrow’s first task. If mornings are also difficult, pair this with the [ADHD morning-routine guide](/blog/adhd-morning-routine-no-motivation-1).
''',
        'replacements': {},
    },
    '14-adhd-creativity.md': {
        'asset': 'brain_dump',
        'body': '''## Make Space for Both Ideas and Completion

Creativity benefits from different conditions at different stages. Keep a low-friction place to capture ideas, then use a separate moment to choose one idea to develop. A simple two-list system can help: “capture” for anything interesting, and “current” for the one project that has permission to receive your next work block. This protects curiosity without requiring every idea to become a commitment.

For creative work, define progress in visible units: one rough sketch, a three-sentence outline, a reference folder, or a fifteen-minute edit. A smaller definition of done makes it easier to restart after interruption and lowers the urge to wait for a perfect burst of motivation.

## Common Mistakes to Avoid When Using Creativity as a Strength

### Treating novelty as a deadline system

Newness can make starting easier, but continually restarting projects can leave important work unfinished. Give the current project a modest finish line before you open the next idea.

### Keeping every idea in your head

An idea that is not captured has to compete with everything else you are remembering. Use a notes app, voice memo, or paper list, then return to the same place during a planned review.

### Mistaking perfectionism for standards

Standards can guide revision; perfectionism can prevent the first visible draft. If you keep postponing a creative project, try the [ADHD-and-perfectionism guide](/blog/adhd-perfectionism) or explore work patterns in [best jobs for ADHD](/blog/adhd-best-jobs-creativity-hyperfocus).
''',
        'replacements': {},
    },
    '16-neurodivergent-productivity-7-tactics.md': {
        'asset': 'breakdown',
        'body': '''## Choose One Tactic Like an Experiment

Seven tactics do not have to become seven new rules. Pick the friction you want to reduce this week, choose one tactic, and decide what a realistic observation looks like. For example: “For five workdays, I will write the next action before I close my laptop,” or “I will ask a friend to body-double for twenty minutes on Tuesday.” Review whether the tactic reduced friction, not whether it made you perfectly productive.

ADHD can affect organization, attention, and task persistence across settings, so a useful system is usually external, visible, and forgiving. The [NIMH ADHD overview](https://www.nimh.nih.gov/health/topics/attention-deficit-hyperactivity-disorder-adhd) is a good reference for understanding why a clinician may recommend broader support alongside everyday strategies.

## Common Mistakes to Avoid When Trying Productivity Tactics

### Implementing all seven tactics at once

Too many changes make it impossible to know what helped and can create a new administrative burden. Start with one tactic that matches today’s bottleneck.

### Measuring motivation instead of friction

Motivation rises and falls. Track a concrete outcome: Did the task get a defined first action? Did you return after an interruption? Did the reminder appear where you needed it?

### Using body doubling without a task boundary

Another person’s presence will not decide the work for you. Before the session starts, name a small finish line. If you need help setting that boundary, use the [task-breakdown guide](/blog/breaking-down-big-tasks) or the [remote-work guide](/blog/remote-work-adhd).
''',
        'replacements': {},
    },
    '17-why-simpler-adhd-friendly-apps-work-better.md': {
        'asset': 'focus',
        'body': '''## Run a Five-Minute App Audit

Before adding another productivity tool, test the tool you already have. Can you capture a task in under a minute? Can you see the next action without opening several views? Can you return after missing a day without cleaning up a backlog first? If the answer is no, reduce a setting, remove one unused list, or move the next action into a simpler place.

The goal is not the fewest possible features. It is the fewest decisions required to begin useful work. A feature that genuinely reduces friction for you is not “too much”; a feature you repeatedly avoid may be a sign that the setup is carrying more cognitive load than it returns.

## Common Mistakes to Avoid When Simplifying Your Tools

### Confusing simple with inaccessible

An app can look minimal and still hide critical actions, use low-contrast text, or require too much memory. Keep the accessibility and visibility features that help you.

### Deleting a system before moving essential information

Before you abandon an app, export or copy deadlines, recurring tasks, and reference notes. Simplification should reduce risk, not erase commitments.

### Adding a new tool for every problem

Try to give each tool one clear job. If task breakdown is the bottleneck, a focused [AI task-breakdown guide](/blog/ai-that-breaks-down-tasks-adhd) may be more useful than another full project-management workspace. For broader comparisons, see [best ADHD tools](/blog/best-adhd-tools-2026).
''',
        'replacements': {},
    },
    '18-one-task-is-enough-simple-self-acceptance.md': {
        'asset': 'timer',
        'body': '''## Build a Compassionate Minimum Plan

“One task is enough” works best when the task is concrete and proportionate to the day. On a depleted day, the task might be opening the letter, putting one appointment on the calendar, or sending one clarification message. On a higher-capacity day, it might be the first focused block on a larger project. The purpose is to create a workable floor, not to cap what you can do.

If low mood, anxiety, sleep disruption, or exhaustion are making daily life feel unmanageable, support from a qualified professional can matter more than another productivity strategy. ADHD can affect everyday functioning, and co-occurring concerns deserve attention rather than self-blame. [NIMH’s ADHD resource](https://www.nimh.nih.gov/health/topics/attention-deficit-hyperactivity-disorder-adhd) includes help and support information.

## Common Mistakes to Avoid With the One-Task Approach

### Turning the minimum into another perfection rule

Missing a day does not invalidate the approach. Restart with the next available moment; do not create a catch-up list to prove that you are “back on track.”

### Choosing a task that is secretly a project

“Sort out finances” is a project. “Open the bank statement” is a task. If the first action still feels heavy, use the [task-breakdown guide](/blog/breaking-down-big-tasks) to make it smaller.

### Using self-acceptance to avoid urgent support

Self-compassion is not resignation. If a problem involves safety, health, money, legal deadlines, or someone else’s care, ask for practical support and break the next contact step down. The [ADHD burnout guide](/blog/adhd-burnout-recovery) may also help you recognize when capacity needs protecting.
''',
        'replacements': {},
    },
}


def add_frontmatter_fields(raw: str, image_path: str, alt: str) -> str:
    if not raw.startswith('---\n'):
        raise ValueError('Expected YAML frontmatter')
    end = raw.find('\n---\n', 4)
    if end == -1:
        raise ValueError('Could not find frontmatter boundary')
    frontmatter = raw[4:end]
    body = raw[end + 5:]
    frontmatter = re.sub(r'^updatedDate:.*\n?', '', frontmatter, flags=re.M)
    frontmatter = re.sub(r'^featuredImage:.*\n?', '', frontmatter, flags=re.M)
    frontmatter = re.sub(r'^featuredImageAlt:.*\n?', '', frontmatter, flags=re.M)
    insertion = f'updatedDate: "{UPDATED_DATE}"\nfeaturedImage: "{image_path}"\nfeaturedImageAlt: "{alt}"\n'
    if re.search(r'^date:.*$', frontmatter, flags=re.M):
        frontmatter = re.sub(r'^(date:.*\n)', r'\1' + insertion, frontmatter, count=1, flags=re.M)
    else:
        frontmatter = insertion + frontmatter
    return f'---\n{frontmatter}\n---\n{body}'


for filename, config in ADDITIONS.items():
    path = BLOG / filename
    raw = path.read_text(encoding='utf-8')
    if '## Common Mistakes to Avoid' in raw:
        continue
    for before, after in config['replacements'].items():
        if before not in raw:
            raise ValueError(f'Expected source text not found in {filename}: {before[:70]}')
        raw = raw.replace(before, after)
    image_path, alt = ASSETS[config['asset']]
    raw = add_frontmatter_fields(raw, image_path, alt)
    marker = '\n## Key Takeaways\n'
    if marker in raw:
        raw = raw.replace(marker, '\n' + config['body'].rstrip() + '\n\n## Key Takeaways\n', 1)
    else:
        raw = raw.rstrip() + '\n\n' + config['body'].rstrip() + '\n'
    path.write_text(raw, encoding='utf-8')

print(f'Updated {len(ADDITIONS)} priority articles.')
