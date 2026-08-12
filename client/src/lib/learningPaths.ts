export type LearningPath = {
  title: string;
  description: string;
  posts: Array<{
    href: string;
    label: string;
  }>;
};

export const LEARNING_PATHS: LearningPath[] = [
  {
    title: "STARTING FEELS IMPOSSIBLE",
    description: "Learn why task paralysis happens, then try a smaller first step.",
    posts: [
      { href: "/blog/executive-dysfunction-vs-task-paralysis", label: "Executive Dysfunction vs. Task Paralysis" },
      { href: "/blog/breaking-down-big-tasks", label: "How to Break Down Big Tasks" },
    ],
  },
  {
    title: "TIME KEEPS GETTING AWAY",
    description: "Build a plan that includes realistic estimates, buffers, and visible time.",
    posts: [
      { href: "/blog/time-blindness-in-adhd", label: "Time Blindness in ADHD" },
      { href: "/blog/adhd-morning-routine-no-motivation-1", label: "An ADHD Morning Routine When Motivation Is Low" },
    ],
  },
  {
    title: "WORK WITHOUT THE OVERWHELM",
    description: "Find practical systems for a workload, a remote job, or a creative project.",
    posts: [
      { href: "/blog/remote-work-adhd", label: "Remote Work With ADHD" },
      { href: "/blog/best-tools-for-adhd-task-management", label: "Best Tools for ADHD Task Management" },
    ],
  },
];
