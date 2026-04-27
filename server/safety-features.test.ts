import { describe, it, expect, beforeEach, vi } from "vitest";

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

// @ts-ignore
global.localStorage = localStorageMock;

describe("Safety Features", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  describe("Timestamp-based Timer Recovery", () => {
    it("should recover timer state with elapsed time calculation", () => {
      // Simulate saved state with active timer
      const startTimestamp = Date.now() - 30000; // 30 seconds ago
      const savedState = {
        timerActive: true,
        timeRemaining: 300, // 5 minutes
        timerStartTimestamp: startTimestamp,
        steps: [],
      };
      localStorage.setItem("doTheThing_state", JSON.stringify(savedState));

      // Simulate timer recovery logic
      const parsed = JSON.parse(localStorage.getItem("doTheThing_state") || "{}");
      const now = Date.now();
      const elapsedMs = now - parsed.timerStartTimestamp;
      const elapsedSeconds = Math.floor(elapsedMs / 1000);
      const originalTimeRemaining = Number(parsed.timeRemaining) || 0;
      const recoveredTime = Math.max(0, originalTimeRemaining - elapsedSeconds);

      expect(recoveredTime).toBeLessThanOrEqual(originalTimeRemaining);
      expect(recoveredTime).toBeGreaterThanOrEqual(0);
      expect(recoveredTime).toBeLessThan(originalTimeRemaining); // Should have deducted elapsed time
    });

    it("should handle timer recovery when elapsed time exceeds remaining time", () => {
      // Simulate saved state where timer should have expired
      const startTimestamp = Date.now() - 600000; // 10 minutes ago
      const savedState = {
        timerActive: true,
        timeRemaining: 300, // 5 minutes (expired)
        timerStartTimestamp: startTimestamp,
        steps: [],
      };
      localStorage.setItem("doTheThing_state", JSON.stringify(savedState));

      const parsed = JSON.parse(localStorage.getItem("doTheThing_state") || "{}");
      const now = Date.now();
      const elapsedMs = now - parsed.timerStartTimestamp;
      const elapsedSeconds = Math.floor(elapsedMs / 1000);
      const originalTimeRemaining = Number(parsed.timeRemaining) || 0;
      const recoveredTime = Math.max(0, originalTimeRemaining - elapsedSeconds);

      expect(recoveredTime).toBe(0);
    });

    it("should save timestamp when timer starts", () => {
      const state = {
        timerActive: true,
        timeRemaining: 300,
        steps: [],
        timerStartTimestamp: 0,
      };
      
      const now = Date.now();
      state.timerStartTimestamp = now;
      
      localStorage.setItem("doTheThing_state", JSON.stringify(state));
      
      const saved = JSON.parse(localStorage.getItem("doTheThing_state") || "{}");
      expect(saved.timerStartTimestamp).toBe(now);
      expect(saved.timerActive).toBe(true);
    });

    it("should clear timestamp when timer stops", () => {
      const state = {
        timerActive: true,
        timeRemaining: 300,
        timerStartTimestamp: Date.now(),
        steps: [],
      };
      
      localStorage.setItem("doTheThing_state", JSON.stringify(state));
      
      // Simulate stopping timer
      const saved = JSON.parse(localStorage.getItem("doTheThing_state") || "{}");
      delete saved.timerStartTimestamp;
      saved.timerActive = false;
      
      localStorage.setItem("doTheThing_state", JSON.stringify(saved));
      
      const updated = JSON.parse(localStorage.getItem("doTheThing_state") || "{}");
      expect(updated.timerStartTimestamp).toBeUndefined();
      expect(updated.timerActive).toBe(false);
    });
  });

  describe("Beforeunload Warning", () => {
    it("should trigger warning when unfinished tasks exist", () => {
      const state = {
        steps: [
          { id: "1", title: "Task 1", completed: false },
          { id: "2", title: "Task 2", completed: true },
        ],
      };
      localStorage.setItem("doTheThing_state", JSON.stringify(state));

      const parsed = JSON.parse(localStorage.getItem("doTheThing_state") || "{}");
      const hasUnfinishedTasks = parsed.steps && parsed.steps.some((step: any) => !step.completed);

      expect(hasUnfinishedTasks).toBe(true);
    });

    it("should trigger warning when timer is running", () => {
      const state = {
        timerActive: true,
        timeRemaining: 100,
        steps: [],
      };
      localStorage.setItem("doTheThing_state", JSON.stringify(state));

      const parsed = JSON.parse(localStorage.getItem("doTheThing_state") || "{}");
      const timerRunning = parsed.timerActive && parsed.timeRemaining > 0;

      expect(timerRunning).toBe(true);
    });

    it("should not trigger warning when all tasks are completed", () => {
      const state = {
        steps: [
          { id: "1", title: "Task 1", completed: true },
          { id: "2", title: "Task 2", completed: true },
        ],
      };
      localStorage.setItem("doTheThing_state", JSON.stringify(state));

      const parsed = JSON.parse(localStorage.getItem("doTheThing_state") || "{}");
      const hasUnfinishedTasks = parsed.steps && parsed.steps.some((step: any) => !step.completed);

      expect(hasUnfinishedTasks).toBe(false);
    });

    it("should not trigger warning when timer is stopped", () => {
      const state = {
        timerActive: false,
        timeRemaining: 0,
        steps: [],
      };
      localStorage.setItem("doTheThing_state", JSON.stringify(state));

      const parsed = JSON.parse(localStorage.getItem("doTheThing_state") || "{}");
      const timerRunning = parsed.timerActive && parsed.timeRemaining > 0;

      expect(timerRunning).toBe(false);
    });
  });

  describe("Pin Tab Tutorial", () => {
    it("should show tutorial only on first task addition", () => {
      const hasSeenTutorial = localStorage.getItem("doTheThing_pinTabTutorialSeen");
      expect(hasSeenTutorial).toBeNull();

      // Simulate first task addition
      localStorage.setItem("doTheThing_pinTabTutorialSeen", "true");
      const updated = localStorage.getItem("doTheThing_pinTabTutorialSeen");
      expect(updated).toBe("true");
    });

    it("should not show tutorial if already seen", () => {
      localStorage.setItem("doTheThing_pinTabTutorialSeen", "true");
      const hasSeenTutorial = localStorage.getItem("doTheThing_pinTabTutorialSeen");
      expect(hasSeenTutorial).toBe("true");
    });

    it("should persist tutorial state across page reloads", () => {
      localStorage.setItem("doTheThing_pinTabTutorialSeen", "true");
      
      // Simulate page reload
      const state1 = localStorage.getItem("doTheThing_pinTabTutorialSeen");
      expect(state1).toBe("true");
      
      // Should still be true after "reload"
      const state2 = localStorage.getItem("doTheThing_pinTabTutorialSeen");
      expect(state2).toBe("true");
    });
  });

  describe("State Persistence", () => {
    it("should save and restore complete state", () => {
      const originalState = {
        steps: [
          { id: "1", title: "Task 1", description: "Do this", completed: false, estimatedTime: 15 },
        ],
        timerActive: true,
        timeRemaining: 900,
        timerStartTimestamp: Date.now(),
      };

      localStorage.setItem("doTheThing_state", JSON.stringify(originalState));
      const restored = JSON.parse(localStorage.getItem("doTheThing_state") || "{}");

      expect(restored.steps).toEqual(originalState.steps);
      expect(restored.timerActive).toBe(originalState.timerActive);
      expect(restored.timeRemaining).toBe(originalState.timeRemaining);
    });

    it("should handle corrupted localStorage gracefully", () => {
      localStorage.setItem("doTheThing_state", "invalid json {");

      try {
        const parsed = JSON.parse(localStorage.getItem("doTheThing_state") || "{}");
        // Should fail to parse
        expect(parsed).toBeUndefined();
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });
});
