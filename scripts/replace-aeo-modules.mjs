import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogDir = path.join(__dirname, '../blog');

// Post-specific AEO modules
const aeoModules = {
  '1': {
    title: '## Why ADHD Makes Task Management Hard',
    content: [
      'ADHD disrupts dopamine regulation, affecting task initiation and motivation',
      'Traditional task management assumes consistent willpower—ADHD brains need external structure',
      'Executive function issues make planning and time estimation significantly harder',
      'Working memory limitations mean steps disappear mid-task without external tracking',
      'Emotional dysregulation makes task avoidance a biological response, not laziness'
    ]
  },
  '2': {
    title: '## Time Blindness Symptoms & Solutions',
    content: [
      'Hours feel like minutes; you lose track of time during hyperfocus',
      'Deadlines sneak up because your brain doesn\'t sense time passing',
      'Time estimates are consistently wrong (usually 50% too optimistic)',
      'External timers and alarms make time concrete and visible',
      'Time-blocking and calendar blocking create artificial time awareness'
    ]
  },
  '3': {
    title: '## How to Break Down Any Task',
    content: [
      'Identify the actual first step (not the project overview)',
      'Make each step small enough to complete in under 90 seconds',
      'Write each step as a specific action, not a vague goal',
      'Add realistic time estimates with 20-30% ADHD buffer',
      'Number the steps so execution requires zero decision-making'
    ]
  },
  '4': {
    title: '## Executive Dysfunction vs Task Paralysis',
    content: [
      'Executive dysfunction = structural brain issue (can\'t plan or start)',
      'Task paralysis = emotional freeze response (too overwhelmed to try)',
      'Most ADHD brains experience both simultaneously',
      'Executive dysfunction needs structure; task paralysis needs emotional support',
      'Neither is a character flaw or sign of laziness'
    ]
  },
  '5': {
    title: '## Best Free ADHD Tools 2026',
    content: [
      'DoTheThing: AI-powered task breakdown (solves the hardest ADHD problem)',
      'Todoist: Task maintenance and recurring task management',
      'Forest: Gamified focus timer with phone-blocking consequences',
      'Focusmate: Body doubling through virtual co-working sessions',
      'Google Calendar: Time-blocking to make time concrete and visible'
    ]
  },
  '6': {
    title: '## How ADHD Medication Works',
    content: [
      'Stimulants increase dopamine and norepinephrine availability in the brain',
      'Medication improves executive function capacity, not motivation itself',
      'Short-acting stimulants create a 3-6 hour window of improved focus',
      'Medication doesn\'t create structure—you still need task breakdown strategies',
      'Combining medication with tools like DoTheThing produces the best outcomes'
    ]
  },
  '7': {
    title: '## Why You Procrastinate (It\'s Not Laziness)',
    content: [
      'Task avoidance is emotion regulation, not time management',
      'Unclear tasks trigger more avoidance than hard tasks',
      'Delayed rewards don\'t activate dopamine in ADHD brains',
      'Shame after avoidance creates a cycle that makes next attempts harder',
      'Breaking tasks into micro-steps interrupts the avoidance-shame cycle'
    ]
  },
  '8': {
    title: '## Remote Work Challenges for ADHD',
    content: [
      'No external structure means you must create your own',
      'Home distractions (notifications, household tasks) are harder to manage',
      'Isolation removes accountability and body doubling benefits',
      'Time-blocking and Focusmate become critical for maintaining focus',
      'Dedicated workspace and consistent rituals replace office structure'
    ]
  },
  '9': {
    title: '## Breaking the Perfectionism Cycle',
    content: [
      'ADHD perfectionism is shame-driven, not excellence-driven',
      'All-or-nothing thinking makes tasks feel impossible if they can\'t be perfect',
      'Lowering the bar to 70% increases completion rates dramatically',
      'Shame after incomplete tasks reinforces perfectionism and avoidance',
      'Self-compassion is a productivity strategy, not self-indulgence'
    ]
  },
  '10': {
    title: '## ADHD Impact on Relationships',
    content: [
      'Emotional intensity can feel personal but is neurological dysregulation',
      'Time blindness causes forgotten plans and deadlines, not indifference',
      'Task-sharing requires explicit systems, not just verbal agreements',
      'Rejection sensitivity makes ADHD brains interpret criticism as rejection',
      'Explicit communication and shared tools reduce relationship friction'
    ]
  },
  '11': {
    title: '## ADHD Strengths in the Workplace',
    content: [
      'Hyperfocus enables deep work on interesting projects',
      'Creativity and pattern recognition solve novel problems quickly',
      'High energy and enthusiasm drive innovation and rapid iteration',
      'Crisis management and rapid problem-solving are ADHD superpowers',
      'Role fit matters more than accommodations for workplace success'
    ]
  },
  '12': {
    title: '## ADHD & Sleep Connection',
    content: [
      'ADHD brains struggle with sleep initiation (racing thoughts, hyperfocus)',
      'Poor sleep worsens executive function, impulse control, and time blindness',
      'Consistent sleep schedule trains the brain to recognize bedtime',
      'External cues (timers, alarms) help ADHD brains recognize sleep time',
      'Sleep is foundational—when you sleep well, everything else gets easier'
    ]
  },
  '13': {
    title: '## Financial Management Strategies',
    content: [
      'Automate everything: bill pay, savings transfers, recurring expenses',
      'Use visual tracking (apps, spreadsheets) to make money concrete',
      'Break financial tasks into micro-steps (check balance, pay one bill)',
      'Simplify finances: fewer accounts, fewer credit cards, less to track',
      'Find accountability partners for monthly financial check-ins'
    ]
  },
  '14': {
    title: '## Channeling Hyperfocus Into Creativity',
    content: [
      'Identify what triggers your hyperfocus (specific projects, conditions, people)',
      'Create those conditions intentionally and protect hyperfocus time',
      'Schedule hyperfocus sessions strategically for important creative work',
      'Break projects into hyperfocus-friendly chunks with clear milestones',
      'Use systems (templates, checklists) for the boring parts you avoid'
    ]
  },
  '15': {
    title: '## Tool Combinations That Work',
    content: [
      'DoTheThing + Todoist: Breakdown + task maintenance',
      'Forest + Focusmate: Focus timer + body doubling accountability',
      'Google Calendar + DoTheThing: Time-blocking + task breakdown',
      'Todoist + Forest: Task management + gamified focus',
      'Start with 2-3 tools max; add more only after mastering the first'
    ]
  },
  '16': {
    title: '## Neurodivergent Productivity Tactics',
    content: [
      'Shrink tasks until they\'re almost insulting (under 90 seconds)',
      'Match task difficulty to current energy, not importance',
      'Address guilt and shame before attempting the task again',
      'Use body doubling, timers, and external accountability',
      'Rotate strategies when they stop working to prevent adaptation'
    ]
  },
  '17': {
    title: '## What Makes Apps ADHD-Friendly',
    content: [
      'Fewer features and simpler interfaces reduce cognitive load',
      'Immediate feedback (gamification, progress bars) activates dopamine',
      'Clear, single actions per screen eliminate decision paralysis',
      'Reminders and notifications provide external structure',
      'Visual progress tracking makes abstract goals concrete'
    ]
  },
  '18': {
    title: '## Self-Acceptance & Productivity',
    content: [
      'One completed task is enough—completion is the win, not perfection',
      'ADHD brains need external celebration and acknowledgment of progress',
      'Lowering the bar to 70% increases completion and reduces shame',
      'Shame after incomplete tasks is the biggest barrier to next attempts',
      'Self-compassion is a productivity strategy, not self-indulgence'
    ]
  },
  '19': {
    title: '## Morning Routine Without Motivation',
    content: [
      'Motivation doesn\'t come first—action does, then motivation follows',
      'External structure (alarms, timers, checklists) replaces willpower',
      'First step must be under 2 minutes and require zero decisions',
      'Put dopamine on-ramps within arm\'s reach (music, coffee, podcast)',
      'Celebrate small morning wins to build momentum for the day'
    ]
  },
  '20': {
    title: '## How DoTheThing Works',
    content: [
      'Identifies the actual first micro-step (not the project overview)',
      'Estimates time with ADHD buffers (20-30% more than neurotypical)',
      'Creates a numbered list for execution without further planning',
      'Removes the executive function burden of task breakdown',
      'Lets you start immediately without decision paralysis'
    ]
  },
  '21': {
    title: '## ADHD Across the Lifespan',
    content: [
      'Childhood: Hyperactivity and impulsivity are most visible',
      'Adolescence: Executive dysfunction and emotional dysregulation emerge',
      'Young adulthood: Task management and relationship challenges peak',
      'Middle age: Strategies that worked stop working; adaptation is key',
      'Older age: Some symptoms improve; others persist or shift'
    ]
  }
};

function replaceAEOModules() {
  const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md') && f !== 'TEMPLATE.md').sort();
  
  let updated = 0;
  
  files.forEach(file => {
    const filePath = path.join(blogDir, file);
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Extract ID from file
    const idMatch = content.match(/^id:\s*['"]?(\d+)['"]?/m);
    if (!idMatch) return;
    
    const id = idMatch[1];
    if (!aeoModules[id]) return;
    
    const { title, content: points } = aeoModules[id];
    
    // Find and replace the Key Takeaways section
    const keyTakeawaysRegex = /## Key Takeaways\n\n- [^\n]*(?:\n- [^\n]*)*\n\n/;
    
    if (!keyTakeawaysRegex.test(content)) {
      console.log(`⚠️ Post ${id}: Key Takeaways section not found`);
      return;
    }
    
    const newModule = `${title}\n\n${points.map(p => `- ${p}`).join('\n')}\n\n`;
    content = content.replace(keyTakeawaysRegex, newModule);
    
    fs.writeFileSync(filePath, content);
    updated++;
  });
  
  console.log(`✓ Replaced Key Takeaways with post-specific AEO modules in ${updated} posts`);
}

replaceAEOModules();
