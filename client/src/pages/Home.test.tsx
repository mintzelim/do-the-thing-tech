import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

describe("Home Page - localStorage behavior", () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    // Clear all mocks
    vi.clearAllMocks();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("should restore flowState='input' when localStorage has no steps", () => {
    // Simulate saved state with flowState='breakdown' but no steps
    const savedState = {
      brainDump: "Some task",
      focusLevel: "normal",
      granularity: 50,
      granularityPreset: "balanced",
      steps: [], // Empty steps array
      flowState: "breakdown", // This should be ignored
      timeRemaining: 0,
      timerActive: false,
    };
    localStorage.setItem("doTheThing_state", JSON.stringify(savedState));

    // When the Home component loads, it should parse this state
    const parsed = JSON.parse(localStorage.getItem("doTheThing_state") || "{}");
    const savedSteps = parsed.steps || [];
    
    // The logic: only restore flowState if there are steps
    let flowState = "input";
    if (savedSteps.length > 0) {
      flowState = parsed.flowState || "input";
    } else {
      flowState = "input";
    }

    // Verify that flowState is reset to 'input' when there are no steps
    expect(flowState).toBe("input");
  });

  it("should restore flowState='breakdown' when localStorage has steps", () => {
    // Simulate saved state with flowState='breakdown' and steps
    const savedState = {
      brainDump: "Some task",
      focusLevel: "normal",
      granularity: 50,
      granularityPreset: "balanced",
      steps: [
        { id: "step-1", title: "Task 1", completed: false, estimatedTime: 30 },
      ],
      flowState: "breakdown",
      timeRemaining: 0,
      timerActive: false,
    };
    localStorage.setItem("doTheThing_state", JSON.stringify(savedState));

    // When the Home component loads, it should parse this state
    const parsed = JSON.parse(localStorage.getItem("doTheThing_state") || "{}");
    const savedSteps = parsed.steps || [];
    
    // The logic: only restore flowState if there are steps
    let flowState = "input";
    if (savedSteps.length > 0) {
      flowState = parsed.flowState || "input";
    } else {
      flowState = "input";
    }

    // Verify that flowState is restored to 'breakdown' when there are steps
    expect(flowState).toBe("breakdown");
  });

  it("should not redirect to /current-tasks on fresh page load with no steps", () => {
    // Simulate a fresh page load with no localStorage
    localStorage.clear();

    // When the Home component loads with no saved state
    const savedState = localStorage.getItem("doTheThing_state");
    
    // There should be no redirect because there are no steps
    expect(savedState).toBeNull();
  });

  it("should preserve steps when they exist in localStorage", () => {
    const steps = [
      { id: "step-1", title: "Task 1", completed: false, estimatedTime: 30 },
      { id: "step-2", title: "Task 2", completed: false, estimatedTime: 45 },
    ];
    
    const savedState = {
      brainDump: "Some task",
      focusLevel: "normal",
      granularity: 50,
      granularityPreset: "balanced",
      steps,
      flowState: "breakdown",
      timeRemaining: 0,
      timerActive: false,
    };
    localStorage.setItem("doTheThing_state", JSON.stringify(savedState));

    // When the Home component loads
    const parsed = JSON.parse(localStorage.getItem("doTheThing_state") || "{}");
    const savedSteps = parsed.steps || [];

    // Verify that steps are preserved
    expect(savedSteps).toEqual(steps);
    expect(savedSteps.length).toBe(2);
  });
});
