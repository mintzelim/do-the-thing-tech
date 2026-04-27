import { invokeLLM } from "../_core/llm";

export type TaskWithEstimate = {
  title: string;
  description?: string;
  estimatedTime: number; // final user-facing estimate in minutes
  bufferTime: number; // difference from base estimate in minutes
  totalTime: number; // final total in minutes
};

type BaseEstimate = {
  title: string;
  description?: string;
  estimatedTime: number; // base estimate in minutes before focus adjustment
};

export const FOCUS_MULTIPLIERS = {
  hyperfocus: 0.75,
  normal: 1,
  distracted: 1.5,
} as const;

type FocusLevel = "hyperfocus" | "normal" | "distracted";

/**
 * Estimates time for tasks with focus level adjustments
 * Focus levels affect the time multiplier:
 * - hyperfocus: 0.75x multiplier (25% reduction - can focus deeply)
 * - normal: 1.0x multiplier (no change - baseline)
 * - distracted: 1.5x multiplier (50% increase - struggles with focus)
 */
export async function estimateTasksWithBuffer(
  tasks: Array<{ title: string; description?: string }>,
  focusLevel: FocusLevel
): Promise<TaskWithEstimate[]> {
  const estimates = await getTimeEstimates(tasks);

  return estimates.map((est) => {
    const adjustedTime = applyFocusLevelToMinutes(est.estimatedTime, focusLevel);
    const bufferTime = adjustedTime - normalizeMinutes(est.estimatedTime);

    return {
      ...est,
      estimatedTime: adjustedTime,
      bufferTime,
      totalTime: adjustedTime,
    };
  });
}

/**
 * Gets base time estimates from LLM for a list of tasks
 */
async function getTimeEstimates(
  tasks: Array<{ title: string; description?: string }>
): Promise<BaseEstimate[]> {
  const systemPrompt = `You are an expert time estimation assistant for task management. You help estimate realistic time for tasks.

Guidelines:
- Estimate time for SUBTASKS, not entire projects
- For simple subtasks like "gather resources", "set up", "execute", estimate 5-15 minutes
- For medium subtasks like "review", "check", "verify", estimate 10-20 minutes
- For complex subtasks like "write", "design", "analyze", estimate 20-45 minutes
- Be realistic: most individual steps are quick (under 30 minutes)
- For ADHD users, include small buffers but don't inflate estimates
- Return ONLY a valid JSON array with no additional text
- Time should be in minutes`;

  const taskList = tasks
    .map((t, i) => `${i + 1}. ${t.title}${t.description ? ` (${t.description})` : ""}`)
    .join("\n");

  const userPrompt = `Please estimate the time needed for these subtasks:

${taskList}

Return a JSON array with this structure (no other text):
[
  { "title": "Task 1", "description": "description if provided", "estimatedTime": 10 },
  { "title": "Task 2", "description": "description if provided", "estimatedTime": 15 }
]`;

  try {
    const response = await invokeLLM({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    });

    const messageContent = response.choices[0]?.message.content;
    if (!messageContent) throw new Error("No response from LLM");

    // Handle both string and array content types
    let content: string;
    if (typeof messageContent === "string") {
      content = messageContent;
    } else if (Array.isArray(messageContent)) {
      content = messageContent
        .filter((c) => "text" in c)
        .map((c) => ("text" in c ? c.text : ""))
        .join("");
    } else {
      throw new Error("Unexpected response format");
    }

    // Extract JSON from the response
    const jsonMatch = content.match(/\[[\s\S]*\]/);
    if (!jsonMatch) throw new Error("Could not extract JSON from response");

    const estimates = JSON.parse(jsonMatch[0]);
    
    // Validate and cap estimates to reasonable values for subtasks
    return estimates.map((est: any) => ({
      title: est.title,
      description: est.description,
      estimatedTime: Math.min(Math.max(est.estimatedTime || 10, 5), 60), // Clamp to 5-60 minutes
    }));
  } catch (error) {
    console.error("Error estimating tasks:", error);
    // Return mock estimates on error
    return tasks.map((task) => ({
      title: task.title,
      description: task.description,
      estimatedTime: getMockEstimate(task.title, task.description),
    }));
  }
}

function getFocusMultiplier(focusLevel: FocusLevel): number {
  return FOCUS_MULTIPLIERS[focusLevel] ?? FOCUS_MULTIPLIERS.normal;
}

export function normalizeMinutes(value: number): number {
  const roundedToFive = Math.round(value / 5) * 5;
  return Math.max(5, roundedToFive);
}

export function applyFocusLevelToMinutes(baseMinutes: number, focusLevel: FocusLevel): number {
  return normalizeMinutes(baseMinutes * getFocusMultiplier(focusLevel));
}

export function getMockEstimate(taskTitle: string, description?: string): number {
  const text = `${taskTitle} ${description ?? ""}`.toLowerCase();

  // For subtasks, use smaller time estimates
  const keywordRules = [
    // Quick prep tasks (5 minutes)
    { minutes: 5, keywords: ["gather", "collect", "find", "locate", "prepare"] },
    // Setup tasks (5-10 minutes)
    { minutes: 10, keywords: ["set up", "setup", "open", "arrange", "organize"] },
    // Quick communication (10 minutes)
    { minutes: 10, keywords: ["email", "reply", "message", "call", "confirm", "schedule", "book"] },
    // Review/check tasks (10-15 minutes)
    { minutes: 15, keywords: ["review", "proofread", "test", "check", "verify", "update", "edit", "refine"] },
    // Execution tasks (15-20 minutes)
    { minutes: 20, keywords: ["execute", "do", "perform", "complete", "finish"] },
    // Writing/documentation (20-30 minutes)
    { minutes: 25, keywords: ["write", "draft", "outline", "research", "plan", "document", "summarize"] },
    // Complex tasks (30-45 minutes)
    { minutes: 35, keywords: ["build", "implement", "design", "analyze", "debug", "fix", "code"] },
    // Meetings/presentations (45-60 minutes)
    { minutes: 45, keywords: ["meeting", "presentation", "report", "migration", "deploy", "integration"] },
  ] as const;

  const matchedMinutes = keywordRules
    .filter((rule) => rule.keywords.some((keyword) => text.includes(keyword)))
    .map((rule) => rule.minutes);

  if (matchedMinutes.length > 0) {
    return normalizeMinutes(Math.max(...matchedMinutes));
  }

  // Default heuristic for subtasks: shorter estimates
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const heuristicMinutes = 5 + wordCount * 2; // Reduced from 4x to 2x multiplier
  return normalizeMinutes(Math.min(45, heuristicMinutes)); // Cap at 45 minutes for subtasks
}

/**
 * Calculates total time including buffer for a list of estimated tasks
 */
export function calculateTotalTime(tasks: TaskWithEstimate[]): {
  baseTime: number;
  bufferTime: number;
  totalTime: number;
} {
  const baseTime = tasks.reduce((sum, t) => sum + t.estimatedTime, 0);
  const bufferTime = tasks.reduce((sum, t) => sum + t.bufferTime, 0);
  const totalTime = baseTime + bufferTime;

  return { baseTime, bufferTime, totalTime };
}

/**
 * Formats time in minutes to a human-readable string
 */
export function formatTime(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}
