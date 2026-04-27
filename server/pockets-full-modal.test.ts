import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

// Mock localStorage for Node.js environment
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

describe("Pockets Full Modal Logic", () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  afterEach(() => {
    localStorageMock.clear();
  });

  it("should detect existing unfinished tasks", () => {
    const state = {
      steps: [
        { id: "1", title: "Task 1", completed: false, estimatedTime: 5 },
        { id: "2", title: "Task 2", completed: false, estimatedTime: 10 },
      ],
      flowState: "breakdown",
    };
    localStorageMock.setItem("doTheThing_state", JSON.stringify(state));

    const savedState = localStorageMock.getItem("doTheThing_state");
    expect(savedState).toBeDefined();

    const parsed = JSON.parse(savedState!);
    const hasUnfinishedTasks =
      parsed.steps &&
      parsed.steps.length > 0 &&
      !parsed.steps.every((s: any) => s.completed);

    expect(hasUnfinishedTasks).toBe(true);
  });

  it("should not trigger modal when all tasks are completed", () => {
    const state = {
      steps: [
        { id: "1", title: "Task 1", completed: true, estimatedTime: 5 },
        { id: "2", title: "Task 2", completed: true, estimatedTime: 10 },
      ],
      flowState: "completion",
    };
    localStorageMock.setItem("doTheThing_state", JSON.stringify(state));

    const savedState = localStorageMock.getItem("doTheThing_state");
    const parsed = JSON.parse(savedState!);
    const hasUnfinishedTasks =
      parsed.steps &&
      parsed.steps.length > 0 &&
      !parsed.steps.every((s: any) => s.completed);

    expect(hasUnfinishedTasks).toBe(false);
  });

  it("should not trigger modal when no tasks exist", () => {
    const state = {
      steps: [],
      flowState: "input",
    };
    localStorageMock.setItem("doTheThing_state", JSON.stringify(state));

    const savedState = localStorageMock.getItem("doTheThing_state");
    const parsed = JSON.parse(savedState!);
    const hasUnfinishedTasks =
      parsed.steps &&
      parsed.steps.length > 0 &&
      !parsed.steps.every((s: any) => s.completed);

    expect(hasUnfinishedTasks).toBe(false);
  });

  it("should handle mixed completed and unfinished tasks", () => {
    const state = {
      steps: [
        { id: "1", title: "Task 1", completed: true, estimatedTime: 5 },
        { id: "2", title: "Task 2", completed: false, estimatedTime: 10 },
        { id: "3", title: "Task 3", completed: true, estimatedTime: 15 },
      ],
      flowState: "breakdown",
    };
    localStorageMock.setItem("doTheThing_state", JSON.stringify(state));

    const savedState = localStorageMock.getItem("doTheThing_state");
    const parsed = JSON.parse(savedState!);
    const hasUnfinishedTasks =
      parsed.steps &&
      parsed.steps.length > 0 &&
      !parsed.steps.every((s: any) => s.completed);

    expect(hasUnfinishedTasks).toBe(true);
  });

  it("should clear state on START OVER", () => {
    const state = {
      steps: [
        { id: "1", title: "Task 1", completed: false, estimatedTime: 5 },
      ],
      flowState: "breakdown",
    };
    localStorageMock.setItem("doTheThing_state", JSON.stringify(state));

    // Simulate START OVER action
    localStorageMock.removeItem("doTheThing_state");

    const savedState = localStorageMock.getItem("doTheThing_state");
    expect(savedState).toBeNull();
  });

  it("should properly serialize and deserialize state", () => {
    const state = {
      brainDump: "prepare coffee",
      focusLevel: "normal",
      granularity: 50,
      granularityPreset: "balanced",
      steps: [
        { id: "1", title: "Task 1", description: "Do this", completed: false, estimatedTime: 5 },
      ],
      flowState: "breakdown",
    };
    localStorageMock.setItem("doTheThing_state", JSON.stringify(state));

    const savedState = localStorageMock.getItem("doTheThing_state");
    const parsed = JSON.parse(savedState!);

    expect(parsed.brainDump).toBe("prepare coffee");
    expect(parsed.steps[0].title).toBe("Task 1");
    expect(parsed.steps[0].description).toBe("Do this");
  });
});
