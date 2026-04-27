import { invokeLLM } from "../_core/llm";

export type TaskStep = {
  id: string;
  title: string;
  description?: string;
  estimatedTime: number; // in minutes, already adjusted for focus level
};

type FocusLevel = "hyperfocus" | "normal" | "distracted";

/**
 * Breaks down a task into actionable steps with time estimates
 * Gemini handles both breakdown AND time estimation in one call
 * Time estimates are already adjusted for the focus level
 * 
 * Granularity: 0-33 = Tiny Steps, 34-66 = Medium Steps, 67-100 = Big Milestones
 */
export async function breakdownTasks(
  input: string,
  granularity: number,
  focusLevel: FocusLevel = "normal"
): Promise<TaskStep[]> {
  const granularityLevel = getGranularityLevel(granularity);
  const focusContext = getFocusContext(focusLevel);

  const systemPrompt = `You are an expert task breakdown assistant specializing in helping neurodivergent individuals with ADHD. Your role is to break down tasks into manageable steps with realistic time estimates.

Current settings:
- Granularity level: ${granularityLevel}
- Focus level: ${focusLevel} (${focusContext})

Guidelines:
- For "Tiny Steps": Break into 5-10 small, specific actions
- For "Medium Steps": Break into 3-5 moderate-sized actions
- For "Big Milestones": Break into 2-3 large milestones
- Each step should be clear, actionable, and achievable
- Avoid overwhelming users with too many steps
- Consider ADHD-friendly practices: clear language, specific actions, no vague instructions

Time estimation:
- Estimate realistic time for EACH subtask (in minutes)
- Account for the person's focus level:
  - Hyperfocus: Person can concentrate deeply, so tasks may be faster (but don't underestimate setup/context switching)
  - Normal: Standard pace, realistic estimates
  - Distracted: Person struggles with focus, add buffer time for distractions
- Most individual subtasks should be 5-30 minutes
- Be generous but realistic for ADHD users

Return ONLY a valid JSON array with no additional text`;

  const userPrompt = `Please break down this task into actionable steps and estimate time for each:

"${input}"

Return a JSON array of objects with this structure (no other text):
[
  { "id": "1", "title": "Step title", "description": "Brief description", "estimatedTime": 10 },
  { "id": "2", "title": "Next step", "description": "Brief description", "estimatedTime": 15 }
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

    const steps = JSON.parse(jsonMatch[0]) as TaskStep[];
    
    // Validate and normalize time estimates
    return steps.map((step, index) => ({
      ...step,
      id: String(index + 1),
      estimatedTime: normalizeMinutes(step.estimatedTime || 10),
    }));
  } catch (error) {
    console.error("Error breaking down task:", error);
    // Don't return a fallback - let the error propagate to the user
    throw error;
  }
}

function getGranularityLevel(granularity: number): string {
  if (granularity < 33) return "Tiny Steps";
  if (granularity < 67) return "Medium Steps";
  return "Big Milestones";
}

function getFocusContext(focusLevel: FocusLevel): string {
  switch (focusLevel) {
    case "hyperfocus":
      return "Can concentrate deeply, may be faster";
    case "normal":
      return "Standard pace";
    case "distracted":
      return "Struggles with focus, needs buffer time";
    default:
      return "Unknown";
  }
}

function normalizeMinutes(value: number): number {
  const roundedToFive = Math.round(value / 5) * 5;
  return Math.max(5, roundedToFive);
}

/**
 * Detects if input is a brain dump (multiple tasks) or single task
 */
export function isBrainDump(input: string): boolean {
  const sentences = input.split(/[.!?]+/).filter(s => s.trim().length > 0);
  return sentences.length > 2;
}

export function getMockBreakdown(
  input: string,
  granularity: number,
  focusLevel: FocusLevel = "normal"
): TaskStep[] {
  // Task-aware fallback breakdown when LLM fails
  const lowerInput = input.toLowerCase().trim();
  const granularityLevel = getGranularityLevel(granularity);

  // Simple task detection with realistic breakdowns
  const simpleTaskPatterns: { [key: string]: TaskStep[] } = {
    "make coffee": [
      { id: "1", title: "Gather coffee supplies", description: "Get coffee, filter, cup", estimatedTime: 5 },
      { id: "2", title: "Prepare coffee maker", description: "Fill with water and add grounds", estimatedTime: 5 },
      { id: "3", title: "Brew coffee", description: "Start the brewing process", estimatedTime: 5 },
      { id: "4", title: "Pour and enjoy", description: "Pour into cup and add cream/sugar if desired", estimatedTime: 3 },
    ],
    "email": [
      { id: "1", title: "Open email", description: "Launch email application", estimatedTime: 2 },
      { id: "2", title: "Compose message", description: "Write your email", estimatedTime: 10 },
      { id: "3", title: "Review and send", description: "Check for errors and send", estimatedTime: 3 },
    ],
    "call": [
      { id: "1", title: "Find contact info", description: "Locate phone number", estimatedTime: 3 },
      { id: "2", title: "Make the call", description: "Dial and connect", estimatedTime: 2 },
      { id: "3", title: "Have conversation", description: "Discuss what you need", estimatedTime: 10 },
    ],
    "meeting": [
      { id: "1", title: "Prepare agenda", description: "List topics to discuss", estimatedTime: 10 },
      { id: "2", title: "Join meeting", description: "Connect at scheduled time", estimatedTime: 5 },
      { id: "3", title: "Participate", description: "Engage in discussion", estimatedTime: 30 },
      { id: "4", title: "Follow up", description: "Send notes or action items", estimatedTime: 10 },
    ],
  };

  // Check for exact matches
  for (const [pattern, steps] of Object.entries(simpleTaskPatterns)) {
    if (lowerInput.includes(pattern)) {
      return steps;
    }
  }

  // Brain dump detection
  if (isBrainDump(input)) {
    return [
      { id: "1", title: "List all tasks", description: "Write down everything you need to do", estimatedTime: 10 },
      { id: "2", title: "Prioritize", description: "Identify what's most important", estimatedTime: 10 },
      { id: "3", title: "Group by category", description: "Organize tasks by type or urgency", estimatedTime: 10 },
      { id: "4", title: "Schedule time blocks", description: "Allocate time for each task", estimatedTime: 15 },
      { id: "5", title: "Start with first task", description: "Begin working through your list", estimatedTime: 5 },
    ];
  }

  // Generic fallback for unknown tasks
  if (granularityLevel === "Tiny Steps") {
    return [
      { id: "1", title: "Understand the task", description: "Clarify what needs to be done", estimatedTime: 5 },
      { id: "2", title: "Gather resources", description: "Collect what you need", estimatedTime: 5 },
      { id: "3", title: "Prepare workspace", description: "Set up your environment", estimatedTime: 5 },
      { id: "4", title: "Do the work", description: "Complete the main task", estimatedTime: 15 },
      { id: "5", title: "Check your work", description: "Review for quality", estimatedTime: 5 },
      { id: "6", title: "Finish up", description: "Clean up and wrap up", estimatedTime: 5 },
    ];
  } else if (granularityLevel === "Medium Steps") {
    return [
      { id: "1", title: "Prepare", description: "Gather resources and set up", estimatedTime: 10 },
      { id: "2", title: "Execute", description: "Do the main work", estimatedTime: 20 },
      { id: "3", title: "Review and finish", description: "Check and wrap up", estimatedTime: 10 },
    ];
  } else {
    return [
      { id: "1", title: "Plan and prepare", description: "Understand scope and gather resources", estimatedTime: 15 },
      { id: "2", title: "Execute", description: "Complete the main work", estimatedTime: 30 },
      { id: "3", title: "Review and deliver", description: "Quality check and finalize", estimatedTime: 15 },
    ];
  }
}
