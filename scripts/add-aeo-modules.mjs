import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogDir = path.join(__dirname, '../blog');

// AEO module data for each post
const aeoModules = {
  '1': {
    directAnswer: 'ADHD disrupts executive function through lower dopamine and norepinephrine levels, making task initiation, time estimation, working memory, and emotional regulation significantly harder than traditional task management systems assume.',
    keyTakeaways: [
      'ADHD is a dopamine and norepinephrine regulation disorder, not a discipline problem',
      'Traditional task management fails ADHD brains because it assumes consistent dopamine signals',
      'Time blindness is a biological wiring difference, not poor time management',
      'Working memory in ADHD is a leaky bucket—steps disappear due to architecture, not effort',
      'External structure (micro-steps, time buffers, tools) replaces willpower entirely'
    ]
  },
  '2': {
    directAnswer: 'Time blindness in ADHD is the brain\'s impaired ability to sense time passing and estimate task duration accurately, causing hours to feel like minutes and making deadlines consistently sneak up.',
    keyTakeaways: [
      'Time blindness is a neurological difference in time-processing ability, not carelessness',
      'ADHD brains underestimate task duration by 20-40% on average',
      'External timers, alarms, and time-blocking make time concrete and visible',
      'Deadline anxiety often masks time blindness—you feel the pressure but can\'t sense the time',
      'Adding 20-30% time buffers to estimates compensates for time blindness'
    ]
  },
  '3': {
    directAnswer: 'Breaking tasks into micro-steps removes the initiation barrier by making the first action so small (under 90 seconds) that your brain\'s threat-detection system doesn\'t activate.',
    keyTakeaways: [
      'Micro-steps must be under 90 seconds to bypass executive dysfunction',
      'Each step should have a single, concrete action and a time estimate',
      'ADHD-buffered time estimates add 20-30% to neurotypical estimates',
      'Breaking tasks down is the foundation—all other strategies build on this',
      'Tools like DoTheThing automate the breakdown so you don\'t have to'
    ]
  },
  '4': {
    directAnswer: 'Executive dysfunction is a neurological impairment in planning and initiation (prefrontal cortex issue), while task paralysis is an emotional freeze response triggered by overwhelm, anxiety, or perfectionism—they require different strategies.',
    keyTakeaways: [
      'Executive dysfunction = "I don\'t know how to start" (structural problem)',
      'Task paralysis = "I feel too overwhelmed to start" (emotional problem)',
      'Most ADHD brains experience both simultaneously',
      'Address emotion first (lower the bar, do one tiny thing), then structure (use micro-steps)',
      'Neither is a reflection of ability, intelligence, or effort'
    ]
  },
  '5': {
    directAnswer: 'The best free ADHD tools in 2026 are DoTheThing (AI task breakdown), Todoist (recurring tasks), Forest (gamified focus), Focusmate (body doubling), and Google Calendar (time-blocking)—each addresses a different failure point.',
    keyTakeaways: [
      'DoTheThing solves the hardest ADHD problem: getting started',
      'Most productivity apps are organizers, not problem-solvers',
      'Start with one tool and use it consistently for two weeks before adding another',
      'The best tool is the one you actually use—simplicity beats features',
      'Combine tools strategically: DoTheThing for breakdown, Todoist for maintenance, Forest for focus'
    ]
  },
  '6': {
    directAnswer: 'ADHD medication increases dopamine and norepinephrine availability, supporting executive function—but it doesn\'t generate plans or structure. Medication works best combined with task management strategies.',
    keyTakeaways: [
      'Stimulants improve the brain\'s capacity to initiate and focus, not motivation itself',
      'Short-acting stimulants create a 3-6 hour window of improved executive function',
      'Medication doesn\'t structure your day—you still need to break tasks into micro-steps',
      'Combining medication with task management produces better outcomes than either alone',
      'Plan during the medication window, don\'t waste it deciding what to do'
    ]
  },
  '7': {
    directAnswer: 'Task avoidance in ADHD stems from the brain\'s threat-detection system activating when facing tasks with unclear steps, delayed rewards, or high emotional weight—the avoidance is neurological, not character-based.',
    keyTakeaways: [
      'Procrastination in ADHD is emotion regulation, not time management',
      'Unclear tasks trigger more avoidance than hard tasks',
      'Delayed rewards don\'t activate dopamine—immediate consequences do',
      'Shame and guilt after avoidance create a cycle that makes next attempts harder',
      'Breaking tasks into micro-steps and using external accountability interrupt the cycle'
    ]
  },
  '8': {
    directAnswer: 'Remote work amplifies ADHD challenges (no external structure, isolation, constant distractions) but also creates opportunities (flexible breaks, control over environment, reduced commute stress)—success requires intentional structure.',
    keyTakeaways: [
      'Remote work removes external structure that many ADHD brains rely on',
      'Home environment distractions (notifications, household tasks) are harder to manage',
      'Time-blocking and body doubling become more critical when working from home',
      'Create a dedicated workspace and consistent work rituals to replace office structure',
      'Use tools like Focusmate and DoTheThing to maintain accountability'
    ]
  },
  '9': {
    directAnswer: 'Perfectionism in ADHD is often a fear-based response to past failures and shame, causing tasks to feel all-or-nothing—lowering the bar and accepting "good enough" unblocks completion.',
    keyTakeaways: [
      'ADHD perfectionism is shame-driven, not excellence-driven',
      'All-or-nothing thinking makes tasks feel impossible if they can\'t be perfect',
      'Lowering the bar (aiming for 70% instead of 100%) increases completion rates',
      'Shame after incomplete tasks reinforces perfectionism and avoidance',
      'Self-compassion and micro-steps break the perfectionism-paralysis cycle'
    ]
  },
  '10': {
    directAnswer: 'ADHD affects relationships through emotional dysregulation, time blindness (forgotten plans), task-sharing friction, and communication challenges—awareness and explicit systems help both partners.',
    keyTakeaways: [
      'ADHD emotional intensity can feel personal to partners but is neurological',
      'Time blindness causes forgotten plans and deadlines, not indifference',
      'Task-sharing requires explicit systems (shared calendars, written lists) not just verbal agreements',
      'Rejection sensitive dysphoria makes ADHD brains interpret criticism as rejection',
      'Explicit communication and shared tools (DoTheThing, Todoist) reduce relationship friction'
    ]
  },
  '11': {
    directAnswer: 'ADHD in the workplace creates challenges (task initiation, time management, organization) but also strengths (hyperfocus, creativity, pattern recognition)—success requires role fit and workplace accommodations.',
    keyTakeaways: [
      'ADHD strengths (hyperfocus, creativity, rapid problem-solving) are underutilized in traditional roles',
      'Task initiation and time management are the biggest workplace challenges',
      'Accommodations like flexible schedules, task breakdown support, and reduced open-office distractions help significantly',
      'Finding roles that match ADHD strengths (crisis management, creative work) improves performance',
      'Disclosure and self-advocacy are critical for workplace success'
    ]
  },
  '12': {
    directAnswer: 'ADHD and sleep have a bidirectional relationship: ADHD makes sleep initiation and quality harder, while poor sleep worsens executive function, emotional regulation, and all ADHD symptoms.',
    keyTakeaways: [
      'ADHD brains have trouble with sleep initiation, maintenance, and quality',
      'Poor sleep makes ADHD symptoms worse—executive function, impulse control, time blindness all decline',
      'Consistent sleep schedule and wind-down routine are foundational',
      'External cues (timers, alarms) help ADHD brains recognize bedtime',
      'Sleep is the foundation—when you sleep well, everything else gets easier'
    ]
  },
  '13': {
    directAnswer: 'Financial management with ADHD is hard because it requires sustained attention, time estimation, and emotional regulation—but systems like automatic payments, visual tracking, and task breakdown make it manageable.',
    keyTakeaways: [
      'ADHD financial struggles stem from executive dysfunction, not poor money sense',
      'Time blindness causes bills to be forgotten; emotional dysregulation causes avoidance',
      'Automate payments and use visual tracking (apps, spreadsheets) to reduce cognitive load',
      'Break financial tasks into micro-steps (check balance, pay one bill, etc.)',
      'Shame about money mistakes often prevents seeking help—get support early'
    ]
  },
  '14': {
    directAnswer: 'Hyperfocus in ADHD is a strength when channeled into passion projects, but it can also cause neglect of other responsibilities—the key is intentional scheduling and boundaries.',
    keyTakeaways: [
      'Hyperfocus is a genuine ADHD strength, not a character flaw',
      'Hyperfocus happens on tasks that are interesting, urgent, or high-reward',
      'Hyperfocus can cause neglect of sleep, food, and other responsibilities',
      'Intentional scheduling (time-blocking hyperfocus sessions) protects other areas',
      'Creativity and pattern recognition are ADHD superpowers when given the right environment'
    ]
  },
  '15': {
    directAnswer: 'Beyond DoTheThing, the best free ADHD tools are Todoist (recurring tasks), Forest (focus gamification), Focusmate (body doubling), and Google Calendar (time-blocking)—each solves a different ADHD problem.',
    keyTakeaways: [
      'DoTheThing handles task breakdown; Todoist handles task maintenance',
      'Forest gamifies focus by making phone-checking have immediate consequences',
      'Focusmate provides body doubling (virtual co-working) for emotional support',
      'Google Calendar makes time concrete through time-blocking',
      'The best tool combination depends on your specific ADHD challenges'
    ]
  },
  '16': {
    directAnswer: 'Neurodivergent productivity requires strategies that work with ADHD brain architecture (shrinking tasks, matching energy levels, addressing guilt, using external structure) rather than forcing neurotypical approaches.',
    keyTakeaways: [
      'The freeze is real and neurological, not laziness or lack of motivation',
      'Shrink tasks until they\'re almost insulting—under 90 seconds is ideal',
      'Match task difficulty to current energy, not importance',
      'Address guilt and shame before attempting the task again',
      'Start with one or two strategies and rotate when they stop working'
    ]
  },
  '17': {
    directAnswer: 'ADHD-friendly apps work because they reduce cognitive load (fewer features), provide immediate feedback (gamification), and support external structure (reminders, time-blocking) rather than relying on willpower.',
    keyTakeaways: [
      'Simpler apps work better for ADHD brains than feature-rich ones',
      'ADHD-friendly design means fewer decisions, clearer actions, and immediate feedback',
      'Gamification (points, streaks, visual progress) activates dopamine better than abstract goals',
      'External structure (reminders, time-blocking, body doubling) replaces internal willpower',
      'The best app is one you\'ll actually use consistently'
    ]
  },
  '18': {
    directAnswer: 'Self-acceptance in ADHD means recognizing that one completed task is enough—lowering expectations and celebrating small wins breaks the perfectionism-shame cycle.',
    keyTakeaways: [
      'One task is enough—completion is the win, not perfection',
      'ADHD brains need external celebration and acknowledgment of progress',
      'Shame after incomplete tasks is the biggest barrier to next attempts',
      'Lowering the bar (aiming for 70%) increases completion and reduces shame',
      'Self-compassion is a productivity strategy, not self-indulgence'
    ]
  },
  '19': {
    directAnswer: 'ADHD morning routines without motivation require external structure (alarms, timers, visual checklists) and low-energy first steps—motivation follows action, not the other way around.',
    keyTakeaways: [
      'Motivation doesn\'t come first in ADHD—action does, then motivation follows',
      'External structure (alarms, timers, visual checklists) replaces willpower',
      'First step must be under 2 minutes and require zero decisions',
      'Consistent routine trains the brain to reduce decision fatigue',
      'Celebrate small morning wins (got out of bed, took a shower) to build momentum'
    ]
  },
  '20': {
    directAnswer: 'DoTheThing breaks tasks by identifying the actual first micro-step, estimating time with ADHD buffers, and creating a numbered list you can execute without further planning.',
    keyTakeaways: [
      'Task breakdown removes the initiation barrier—the hardest part of ADHD',
      'Micro-steps must be concrete and under 90 seconds',
      'ADHD time estimates need 20-30% buffers for accuracy',
      'A numbered list removes decision-making during execution',
      'Real examples show how breakdown works for different task types'
    ]
  },
  '21': {
    directAnswer: 'ADHD symptoms persist across the lifespan but change significantly at each life stage—childhood hyperactivity often becomes adult inattention, and executive function challenges evolve with age and life demands.',
    keyTakeaways: [
      'ADHD doesn\'t go away with age—it changes form',
      'Childhood hyperactivity often becomes adult inattention and executive dysfunction',
      'Life stage changes (school, work, relationships, parenting) change how ADHD shows up',
      'Strategies that worked in one life stage may need adjustment in the next',
      'Understanding ADHD across the lifespan helps you adapt strategies proactively'
    ]
  }
};

function addAEOModules() {
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
    
    // Check if already has directAnswer
    if (content.includes('## Direct Answer') || content.includes('directAnswer:')) {
      return;
    }
    
    const { directAnswer, keyTakeaways } = aeoModules[id];
    
    // Find the first ## heading and insert before it
    const firstHeadingMatch = content.match(/\n(## )/);
    if (!firstHeadingMatch) return;
    
    const insertPos = content.indexOf(firstHeadingMatch[0]);
    
    const directAnswerSection = `## Direct Answer\n\n${directAnswer}\n\n`;
    const keyTakeawaysSection = `## Key Takeaways\n\n${keyTakeaways.map(k => `- ${k}`).join('\n')}\n\n`;
    
    content = content.slice(0, insertPos) + '\n' + directAnswerSection + keyTakeawaysSection + content.slice(insertPos);
    
    fs.writeFileSync(filePath, content);
    updated++;
  });
  
  console.log(`✓ Added Direct Answer and Key Takeaways to ${updated} posts`);
}

addAEOModules();
