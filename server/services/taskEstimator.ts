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
  const focusMultiplier = getFocusMultiplier(focusLevel);
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
- Consider realistic time including setup, execution, and cleanup
- For ADHD users, be slightly generous with estimates
- Return ONLY a valid JSON array with no additional text
- Time should be in minutes`;

  const taskList = tasks
    .map((t, i) => `${i + 1}. ${t.title}${t.description ? ` (${t.description})` : ""}`)
    .join("\n");

  const userPrompt = `Please estimate the time needed for these tasks:

${taskList}

Return a JSON array with this structure (no other text):
[
  { "title": "Task 1", "description": "description if provided", "estimatedTime": 30 },
  { "title": "Task 2", "description": "description if provided", "estimatedTime": 45 }
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
    return estimates;
  } catch (error) {
    console.error("Error estimating tasks:", error);
    // Return mock estimates on error
    return tasks.map((task) => ({
      title: task.title,
      description: task.description,
      estimatedTime: getMockEstimate(task.title),
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

function getMockEstimate(taskTitle: string): number {
  // Simple heuristic for demo: longer titles = longer tasks
  const baseTime = Math.max(15, Math.min(120, taskTitle.length * 2));
  return Math.round(baseTime / 5) * 5; // Round to nearest 5
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
