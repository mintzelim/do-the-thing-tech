import { invokeLLM } from "../_core/llm";

export type TaskStep = {
  id: string;
  title: string;
  description?: string;
};

/**
 * Breaks down a task or brain dump into actionable steps using LLM
 * Granularity: 0-33 = Tiny Steps, 34-66 = Medium Steps, 67-100 = Big Milestones
 */
export async function breakdownTasks(input: string, granularity: number): Promise<TaskStep[]> {
  const granularityLevel = getGranularityLevel(granularity);
  
  const systemPrompt = `You are an expert task breakdown assistant specializing in helping neurodivergent individuals with ADHD. Your role is to break down tasks into manageable steps.

Current granularity level: ${granularityLevel}

Guidelines:
- For "Tiny Steps": Break into very small, specific actions (5-10 steps for a typical task)
- For "Medium Steps": Break into moderate-sized actions (3-5 steps)
- For "Big Milestones": Break into major phases (2-3 large milestones)
- Each step should be clear, actionable, and achievable
- Avoid overwhelming users with too many steps
- Consider ADHD-friendly practices: clear language, specific actions, no vague instructions
- Return ONLY a valid JSON array with no additional text`;

  const userPrompt = `Please break down this task or brain dump into actionable steps:

"${input}"

Return a JSON array of objects with this structure (no other text):
[
  { "id": "1", "title": "Step title", "description": "Brief description if needed" },
  { "id": "2", "title": "Next step", "description": "Brief description if needed" }
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
      // Extract text from content array
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
    return steps;
  } catch (error) {
    console.error("Error breaking down task:", error);
    // Return mock breakdown on error for demo purposes
    return getMockBreakdown(input);
  }
}

/**
 * Detects if input is a brain dump (multiple tasks) or single task
 * and returns appropriate breakdown
 */
export function isBrainDump(input: string): boolean {
  // Simple heuristic: if input contains multiple sentences with action verbs, it's likely a brain dump
  const sentences = input.split(/[.!?]+/).filter(s => s.trim().length > 0);
  return sentences.length > 2;
}

function getGranularityLevel(granularity: number): string {
  if (granularity < 33) return "Tiny Steps";
  if (granularity < 67) return "Medium Steps";
  return "Big Milestones";
}

export function getMockBreakdown(input: string): TaskStep[] {
  // Fallback mock data for demo
  const isBrainDumpInput = isBrainDump(input);
  
  if (isBrainDumpInput) {
    return [
      { id: "1", title: "Review all items", description: "Read through all tasks to understand scope" },
      { id: "2", title: "Prioritize tasks", description: "Identify which tasks are most urgent" },
      { id: "3", title: "Schedule time blocks", description: "Allocate time for each task" },
      { id: "4", title: "Execute tasks", description: "Work through prioritized list" },
      { id: "5", title: "Review and adjust", description: "Check progress and adjust as needed" },
    ];
  }

  return [
    { id: "1", title: "Prepare and gather resources", description: "Get everything you need ready" },
    { id: "2", title: "Set up your workspace", description: "Create a focused environment" },
    { id: "3", title: "Execute the main task", description: "Do the core work" },
    { id: "4", title: "Review your work", description: "Check quality and completeness" },
    { id: "5", title: "Wrap up and document", description: "Clean up and save your work" },
  ];
}
