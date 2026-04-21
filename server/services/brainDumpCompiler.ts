import { invokeLLM } from "../_core/llm";

export type CompiledTask = {
  id: string;
  title: string;
  priority: "high" | "medium" | "low";
  category?: string;
  estimatedTime?: number;
  description?: string;
};

/**
 * Compiles and organizes a brain dump into a prioritized task list
 * Uses LLM to understand context, extract tasks, prioritize, and categorize
 */
export async function compileBrainDump(brainDump: string): Promise<CompiledTask[]> {
  const systemPrompt = `You are an expert task organizer specializing in ADHD-friendly task management. Your role is to take unstructured brain dumps and organize them into clear, prioritized tasks.

Guidelines:
- Extract all distinct tasks from the brain dump
- Assign realistic priorities (high/medium/low) based on urgency and impact
- Group related tasks into categories when helpful
- Provide brief, clear descriptions
- Return ONLY a valid JSON array with no additional text
- Prioritize tasks that are time-sensitive or have dependencies`;

  const userPrompt = `Please organize and prioritize this brain dump into a structured task list:

"${brainDump}"

Return a JSON array with this structure (no other text):
[
  { "id": "1", "title": "Task title", "priority": "high", "category": "Work", "description": "Brief description", "estimatedTime": 30 },
  { "id": "2", "title": "Task title", "priority": "medium", "category": "Personal", "description": "Brief description", "estimatedTime": 20 }
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

    const tasks = JSON.parse(jsonMatch[0]) as CompiledTask[];
    return tasks;
  } catch (error) {
    console.error("Error compiling brain dump:", error);
    // Return mock compilation on error
    return getMockCompiledTasks(brainDump);
  }
}

/**
 * Sorts tasks by priority for display
 */
export function sortByPriority(tasks: CompiledTask[]): CompiledTask[] {
  const priorityOrder = { high: 0, medium: 1, low: 2 };
  return [...tasks].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
}

/**
 * Groups tasks by category
 */
export function groupByCategory(tasks: CompiledTask[]): Record<string, CompiledTask[]> {
  const grouped: Record<string, CompiledTask[]> = {};
  
  tasks.forEach((task) => {
    const category = task.category || "Uncategorized";
    if (!grouped[category]) {
      grouped[category] = [];
    }
    grouped[category].push(task);
  });
  
  return grouped;
}

function getMockCompiledTasks(brainDump: string): CompiledTask[] {
  // Simple mock: split by common delimiters and create tasks
  const taskStrings = brainDump
    .split(/[,;.\n]/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  return taskStrings.slice(0, 5).map((task, idx) => ({
    id: String(idx + 1),
    title: task,
    priority: idx === 0 ? "high" : idx < 3 ? "medium" : "low",
    category: "Tasks",
    estimatedTime: 20 + idx * 5,
    description: `Task: ${task}`,
  }));
}
