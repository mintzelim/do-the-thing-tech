export type FaqLink = {
  href: string;
  label: string;
};

export type FaqItem = {
  question: string;
  answer: string;
  links?: FaqLink[];
};

export type FaqGroup = {
  id: "start" | "use" | "trust";
  number: string;
  label: string;
  title: string;
  intro: string;
  items: FaqItem[];
};

/**
 * The single source of truth for the visible /faq page and its FAQPage JSON-LD.
 * Do not add questions unless their answer is already supportable by the product,
 * public policy, support, or editorial-standards content.
 */
export const FAQ_GROUPS: readonly FaqGroup[] = [
  {
    id: "start",
    number: "01",
    label: "FIRST THINGS FIRST",
    title: "Getting started",
    intro: "Short answers for the moment you are deciding whether to try the tool.",
    items: [
      {
        question: "What is DoTheThing?",
        answer: "DoTheThing is a free web-based task-breakdown tool that helps people with ADHD and executive-function friction turn overwhelming tasks into small, actionable steps.",
      },
      {
        question: "Is DoTheThing free?",
        answer: "Yes. You can open the tool, enter a task, and get a breakdown without creating an account or installing anything.",
      },
      {
        question: "Can I use it for a brain dump?",
        answer: "Yes. You can type everything on your plate without sorting it first. The tool is designed to help identify what needs breaking down.",
      },
      {
        question: "What kinds of tasks can I use it for?",
        answer: "You can use it for work tasks, household jobs, personal admin, study, creative projects, and other situations where the gap between intention and action feels hard to cross.",
      },
    ],
  },
  {
    id: "use",
    number: "02",
    label: "MAKE IT FIT TODAY",
    title: "Using the tool",
    intro: "The controls exist to make the next action more realistic for the state you are in right now.",
    items: [
      {
        question: "What does the focus-level setting do?",
        answer: "You can choose Hyperfocused, Normal, or Distracted. The breakdown’s time estimates are then adjusted to better fit your current focus level.",
      },
      {
        question: "What is the difference between Tiny Steps, Balanced, and Big Milestones?",
        answer: "Tiny Steps offers the smallest possible first action. Balanced is the everyday middle ground. Big Milestones shows the major project stages without granular detail.",
      },
      {
        question: "Can I edit a task breakdown?",
        answer: "Yes. You can adjust, delete, or reorder steps as needed, so the plan can match your situation instead of becoming another rigid system to maintain.",
      },
      {
        question: "How does DoTheThing help with task initiation?",
        answer: "It is designed to reduce ambiguity by turning a vague or overwhelming task into concrete next steps, with focus-aware time estimates and a visible task timer.",
      },
    ],
  },
  {
    id: "trust",
    number: "03",
    label: "TRUST & SUPPORT",
    title: "Boundaries, privacy, and help",
    intro: "Clear information about what the product is, what it is not, and where to get more detail.",
    items: [
      {
        question: "Is DoTheThing medical advice or an ADHD diagnosis tool?",
        answer: "No. DoTheThing is a productivity tool and educational resource; it does not diagnose or treat ADHD. If you have medical, medication, sleep, or mental-health concerns, seek qualified individual guidance.",
      },
      {
        question: "Where are my tasks stored?",
        answer: "The current Privacy Policy states that tasks you create are stored locally in your browser. Read the Privacy Policy for the current policy and its full terms.",
        links: [{ href: "/privacy", label: "Read the Privacy Policy" }],
      },
      {
        question: "Where can I read the editorial standards?",
        answer: "The Editorial Standards page explains how educational content is created, reviewed, updated, and corrected.",
        links: [{ href: "/editorial-standards", label: "Read the Editorial Standards" }],
      },
      {
        question: "How can I contact DoTheThing?",
        answer: "You can use the Contact page or email support@dothething.tech with a support question.",
        links: [{ href: "/contact", label: "Open the Contact page" }, { href: "mailto:support@dothething.tech", label: "Email support" }],
      },
    ],
  },
] as const;

export const FAQ_ITEMS = FAQ_GROUPS.flatMap((group) => group.items);

export const FAQ_PAGE_META = {
  title: "DoTheThing FAQ | ADHD Task Breakdown Help",
  description: "Clear answers about using DoTheThing for task breakdowns, brain dumps, focus-aware estimates, privacy, support, and product boundaries.",
  canonicalUrl: "https://dothething.tech/faq",
  keywords: "DoTheThing FAQ, ADHD task breakdown help, task paralysis help, executive function productivity tool",
} as const;
