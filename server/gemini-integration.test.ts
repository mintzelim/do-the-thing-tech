import { describe, it, expect, beforeAll } from "vitest";
import { invokeLLM } from "./_core/llm";

describe("Gemini 2.5 Flash Lite Integration", () => {
  beforeAll(() => {
    if (!process.env.GOOGLE_GEMINI_API_KEY) {
      console.warn("GOOGLE_GEMINI_API_KEY not set, skipping Gemini tests");
    }
  });

  it("should successfully invoke Gemini 2.5 Flash Lite API", async () => {
    if (!process.env.GOOGLE_GEMINI_API_KEY) {
      console.log("Skipping test - GOOGLE_GEMINI_API_KEY not configured");
      return;
    }

    const response = await invokeLLM({
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant.",
        },
        {
          role: "user",
          content: "Say hello in one word",
        },
      ],
    });

    expect(response).toBeDefined();
    expect(response.choices).toBeDefined();
    expect(response.choices.length).toBeGreaterThan(0);
    expect(response.choices[0].message).toBeDefined();
    expect(response.choices[0].message.content).toBeDefined();
    expect(typeof response.choices[0].message.content).toBe("string");
    expect(response.model).toBe("gemini-2.5-flash-lite");
  });

  it("should break down tasks into JSON format", async () => {
    if (!process.env.GOOGLE_GEMINI_API_KEY) {
      console.log("Skipping test - GOOGLE_GEMINI_API_KEY not configured");
      return;
    }

    const response = await invokeLLM({
      messages: [
        {
          role: "system",
          content:
            "You are a task breakdown assistant. Return ONLY valid JSON array with no additional text.",
        },
        {
          role: "user",
          content: `Break down this task into steps:
"Write a blog post"

Return ONLY this JSON format (no other text):
[
  { "id": "1", "title": "Step title", "description": "Brief description" }
]`,
        },
      ],
    });

    expect(response).toBeDefined();
    const content = response.choices[0].message.content;
    expect(typeof content).toBe("string");

    // Try to extract and parse JSON from response
    const jsonMatch = (content as string).match(/\[[\s\S]*\]/);
    expect(jsonMatch).toBeDefined();

    if (jsonMatch) {
      const tasks = JSON.parse(jsonMatch[0]);
      expect(Array.isArray(tasks)).toBe(true);
      expect(tasks.length).toBeGreaterThan(0);
      expect(tasks[0]).toHaveProperty("id");
      expect(tasks[0]).toHaveProperty("title");
    }
  });

  it("should handle system and user messages correctly", async () => {
    if (!process.env.GOOGLE_GEMINI_API_KEY) {
      console.log("Skipping test - GOOGLE_GEMINI_API_KEY not configured");
      return;
    }

    const response = await invokeLLM({
      messages: [
        {
          role: "system",
          content: "You are a concise assistant. Keep responses to 1-2 sentences.",
        },
        {
          role: "user",
          content: "What is 2+2?",
        },
      ],
    });

    expect(response.choices[0].message.content).toBeDefined();
    const content = response.choices[0].message.content as string;
    expect(content.toLowerCase()).toContain("4");
  });

  it("should respect temperature and token settings", async () => {
    if (!process.env.GOOGLE_GEMINI_API_KEY) {
      console.log("Skipping test - GOOGLE_GEMINI_API_KEY not configured");
      return;
    }

    const response = await invokeLLM({
      messages: [
        {
          role: "user",
          content: "Count to 5",
        },
      ],
    });

    expect(response).toBeDefined();
    expect(response.usage).toBeDefined();
    expect(response.usage?.total_tokens).toBeGreaterThan(0);
  });
});
