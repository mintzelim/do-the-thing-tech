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

Breakdown Philosophy:
- Break tasks into ACTIONABLE, SEQUENTIAL steps that build toward completion
- Each step should be a concrete action, not a category or phase
- Avoid generic steps like "Prepare", "Gather", "Setup" unless truly necessary
- Focus on the ACTUAL WORK being done

Granularity Guidelines:
- For "Tiny Steps" (5-10 steps): Break into very specific, focused actions
  Example: "Read 10 pages" → "Skim table of contents (2m)", "Read pages 1-3 actively (8m)", "Read pages 4-7 actively (8m)", "Read pages 8-10 and highlight key points (8m)", "Review notes and summarize (5m)"
- For "Medium Steps" (3-5 steps): Break into moderate-sized chunks
  Example: "Read 10 pages" → "Preview and set reading goals (3m)", "Read pages 1-5 actively (12m)", "Read pages 6-10 and take notes (12m)", "Summarize key takeaways (5m)"
- For "Big Milestones" (2-3 steps): Break into large phases
  Example: "Read 10 pages" → "Read and understand the material (30m)", "Synthesize and summarize key points (10m)"

Task-Specific Breakdown Patterns:
- Reading: Preview → Read in sections → Summarize/Review
- Writing: Outline → Draft → Edit → Finalize
- Coding: Plan → Setup → Implement → Test → Debug
- Learning: Understand concepts → Practice → Apply → Review
- Creative: Brainstorm → Rough draft → Refine → Polish

Time Estimation Rules:
- Estimate realistic time for EACH subtask (in minutes)
- Account for the person's focus level:
  - Hyperfocus: Person can concentrate deeply, so tasks may be faster (but don't underestimate setup/context switching)
  - Normal: Standard pace, realistic estimates
  - Distracted: Person struggles with focus, add buffer time for distractions
- Most individual subtasks should be 5-30 minutes
- Be generous but realistic for ADHD users
- If a subtask seems too long (>30 min), consider breaking it further

Return ONLY a valid JSON array wrapped in markdown code blocks with no additional text.`;

  const userPrompt = `Please break down this task into actionable steps and estimate time for each:

"${input}"

Return a JSON array of objects with this structure, wrapped in markdown code blocks:
\`\`\`json
[
  { "id": "1", "title": "Step title", "description": "Brief description", "estimatedTime": 10 },
  { "id": "2", "title": "Next step", "description": "Brief description", "estimatedTime": 15 }
]
\`\`\``;

  try {
    const response = await invokeLLM({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "task_breakdown",
          strict: true,
          schema: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: { type: "string" },
                title: { type: "string" },
                description: { type: "string" },
                estimatedTime: { type: "number" },
              },
              required: ["id", "title", "estimatedTime"],
              additionalProperties: false,
            },
          },
        },
      },
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

    console.log("[BREAKDOWN] Full response from Gemini:", content.substring(0, 500));

    // Extract JSON from markdown code blocks or raw JSON
    let jsonStr = "";
    
    // First try to extract from markdown code blocks
    const markdownMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (markdownMatch) {
      jsonStr = markdownMatch[1].trim();
      console.log("[BREAKDOWN] Extracted from markdown code block");
    } else {
      // Fall back to extracting raw JSON using brace/bracket counting
      let braceCount = 0;
      let bracketCount = 0;
      let inString = false;
      let escaped = false;
      let foundStart = false;

      for (let i = 0; i < content.length; i++) {
        const char = content[i];
        
        // Handle string escaping
        if (char === '\\' && !escaped) {
          escaped = true;
          if (foundStart) jsonStr += char;
          continue;
        }
        
        if (char === '"' && !escaped) {
          inString = !inString;
          if (foundStart) jsonStr += char;
          escaped = false;
          continue;
        }
        
        escaped = false;
        
        if (!inString) {
          if (char === '{') {
            foundStart = true;
            braceCount++;
            jsonStr += char;
          } else if (char === '}') {
            braceCount--;
            jsonStr += char;
            // Only break if we're not in an array (bracketCount > 0 means we're in an array)
            if (foundStart && braceCount === 0 && bracketCount === 0) {
              break;
            }
            // If we're in an array (bracketCount > 0), don't break - keep collecting more objects
          } else if (char === '[') {
            foundStart = true;
            bracketCount++;
            jsonStr += char;
          } else if (char === ']') {
            bracketCount--;
            jsonStr += char;
            // Break when we close the array
            if (foundStart && bracketCount === 0) {
              break;
            }
          } else if (foundStart) {
            jsonStr += char;
          }
        } else {
          if (foundStart) jsonStr += char;
        }
      }
      console.log("[BREAKDOWN] Extracted raw JSON using brace counting");
    }

    if (!jsonStr) {
      console.error("[BREAKDOWN] Failed to extract JSON. Response content:", content.substring(0, 500));
      throw new Error("Could not extract JSON from response. Response may not be valid JSON.");
    }

    console.log("[BREAKDOWN] Extracted JSON (first 600 chars):", jsonStr.substring(0, 600));
    console.log("[BREAKDOWN] Full extracted JSON:", jsonStr);

    // Manual parsing to handle malformed JSON from Gemini
    const steps: TaskStep[] = [];
    
    // Try standard JSON parsing first
    try {
      const parsed = JSON.parse(jsonStr);
      const arr = Array.isArray(parsed) ? parsed : [parsed];
      steps.push(...arr);
      console.log("[BREAKDOWN] Successfully parsed JSON using standard parser, found", arr.length, "steps");
    } catch (parseError) {
      console.error("[BREAKDOWN] Standard JSON parse failed, attempting manual extraction");
      
      // Manual field extraction using regex - more flexible pattern
      // Match individual objects with optional fields, handling multiline JSON
      const objectPattern = /\{\s*"id"\s*:\s*"([^"]*)"\s*,\s*"title"\s*:\s*"([^"]*?)"\s*(?:[\s\S]*?"description"\s*:\s*"([^"]*?)"\s*)?(?:[\s\S]*?"estimatedTime"\s*:\s*(\d+)\s*)?\s*\}/g;
      
      console.log("[BREAKDOWN] Testing object regex pattern...");
      console.log("[BREAKDOWN] JSON string length:", jsonStr.length);
      console.log("[BREAKDOWN] JSON string (first 1000 chars):", jsonStr.substring(0, 1000));
      let match;
      let index = 0;
      while ((match = objectPattern.exec(jsonStr)) !== null) {
        console.log(`[BREAKDOWN] Matched step ${index + 1}: title="${match[2]}", time=${match[4]}`);
        steps.push({
          id: String(index + 1),
          title: match[2] || "Step",
          description: match[3],
          estimatedTime: match[4] ? parseInt(match[4]) : 10,
        });
        index++;
      }
      console.log(`[BREAKDOWN] Object regex found ${index} steps`);
      
      if (steps.length === 0) {
        // Last resort: try to extract at least titles
        console.log("[BREAKDOWN] No objects matched, trying title-only extraction");
        const titlePattern = /"title"\s*:\s*"([^"]*)"/g;
        let titleMatch;
        let titleIndex = 0;
        while ((titleMatch = titlePattern.exec(jsonStr)) !== null) {
          console.log(`[BREAKDOWN] Extracted title ${titleIndex + 1}: "${titleMatch[1]}"`);
          steps.push({
            id: String(titleIndex + 1),
            title: titleMatch[1],
            estimatedTime: 10,
          });
          titleIndex++;
        }
        console.log(`[BREAKDOWN] Title-only extraction found ${titleIndex} steps`);
      }
      
      if (steps.length === 0) {
        console.error("[BREAKDOWN] Manual extraction failed. Raw JSON:", jsonStr.substring(0, 300));
        throw new Error("Could not extract task steps from response");
      }
      
      console.log("[BREAKDOWN] Successfully extracted", steps.length, "steps using manual parsing");
    }
    
    // Validate and normalize time estimates
    return steps.map((step, index) => ({
      ...step,
      id: String(index + 1),
      estimatedTime: normalizeMinutes(step.estimatedTime || 10),
    }));
  } catch (error) {
    console.error("[BREAKDOWN] Error breaking down task:", error);
    throw error;
  }
}

function getGranularityLevel(granularity: number): string {
  if (granularity < 34) return "Tiny Steps (5-10 small, specific actions)";
  if (granularity < 67) return "Balanced Steps (3-5 moderate-sized actions)";
  return "Big Milestones (2-3 large milestones)";
}

function getFocusContext(focusLevel: FocusLevel): string {
  switch (focusLevel) {
    case "hyperfocus":
      return "Can concentrate deeply, may be faster but don't underestimate setup time";
    case "distracted":
      return "Struggles with focus, needs buffer time for distractions";
    default:
      return "Standard pace, realistic estimates";
  }
}

function normalizeMinutes(minutes: number): number {
  // Ensure time estimates are reasonable (5-120 minutes)
  return Math.max(5, Math.min(120, Math.round(minutes)));
}
