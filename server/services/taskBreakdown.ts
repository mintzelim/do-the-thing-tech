import { invokeLLM } from "../_core/llm";

export interface TaskStep {
  id: string;
  title: string;
  description?: string;
  estimatedTime: number;
}

export async function breakdownTask(
  task: string,
  focusLevel: "hyperfocus" | "normal" | "distracted",
  granularity: "tiny" | "balanced" | "big"
): Promise<TaskStep[]> {
  const granularityMap = {
    tiny: 5,
    balanced: 3,
    big: 2,
  };

  const focusMultiplier = {
    hyperfocus: 0.75,
    normal: 1,
    distracted: 1.5,
  };

  const numSteps = granularityMap[granularity];
  const multiplier = focusMultiplier[focusLevel];

  const prompt = `You are an expert task breakdown specialist for people with ADHD. Your job is to break down a task into manageable subtasks and estimate realistic time for each.

IMPORTANT: You MUST return ONLY a valid JSON array in a markdown code block. No other text before or after.

Task: "${task}"
Focus Level: ${focusLevel}
Number of Steps: ${numSteps}

For a person with ${focusLevel} focus level, break this task into exactly ${numSteps} concrete, actionable subtasks.

For each subtask:
1. Give it a clear, specific title (not generic like "Prepare", "Execute", "Review")
2. Provide a brief description of what to do
3. Estimate realistic time in MINUTES (already accounting for ${focusLevel} focus level - ${multiplier}x multiplier already applied)

Examples of good time estimates for ${focusLevel}:
- Simple 1-minute actions: 1-2 min
- Short focused work: 3-5 min
- Medium focused work: 8-15 min
- Longer focused work: 20-30 min

CRITICAL: Return ONLY this format, nothing else:
\`\`\`json
[
  {
    "id": "1",
    "title": "Specific action title",
    "description": "What to do",
    "estimatedTime": 5
  },
  {
    "id": "2",
    "title": "Next specific action",
    "description": "What to do",
    "estimatedTime": 10
  }
]
\`\`\``;

  try {
    const response = await invokeLLM({
      messages: [
        {
          role: "system",
          content:
            "You are a task breakdown expert. Return ONLY a JSON array in markdown code blocks.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const content = response.choices[0].message.content;
    
    // Handle content that might be an array
    let contentStr = typeof content === 'string' ? content : (Array.isArray(content) ? content.map((c: any) => typeof c === 'string' ? c : c.text || '').join('') : '');
    
    console.log("[BREAKDOWN] Full response from Gemini:", contentStr.substring(0, 500));

    // Extract markdown code block
    const codeBlockMatch = contentStr.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (!codeBlockMatch) {
      throw new Error("No JSON code block found in response");
    }

    const jsonStr = codeBlockMatch[1].trim();
    console.log("[BREAKDOWN] Extracted JSON from code block (first 500 chars):", jsonStr.substring(0, 500));

    // Parse JSON
    const arr = JSON.parse(jsonStr);
    if (!Array.isArray(arr)) {
      throw new Error("Response is not an array");
    }

    const steps: TaskStep[] = arr.map((item: any, index: number) => ({
      id: String(index + 1),
      title: item.title || `Step ${index + 1}`,
      description: item.description,
      estimatedTime: Math.max(1, Math.round(item.estimatedTime || 5)),
    }));

    console.log(`[BREAKDOWN] Successfully parsed ${steps.length} steps`);
    return steps;
  } catch (error) {
    console.error("[BREAKDOWN] Error during breakdown:", error);
    throw error;
  }
}
