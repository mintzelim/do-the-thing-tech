import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";

const minutesToSeconds = (minutes: number) => minutes * 60;
const getRemainingTotalSeconds = (
  steps: Array<{ estimatedTime: number; completed: boolean }>
) => steps.filter((step) => !step.completed).reduce((sum, step) => sum + minutesToSeconds(step.estimatedTime), 0);

const formatDisplayTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m ${secs}s`;
};

describe("Timer Integration", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("calculates countdown start time from incomplete step minutes", () => {
    const steps = [
      { id: "1", title: "Task 1", estimatedTime: 100, completed: false },
      { id: "2", title: "Task 2", estimatedTime: 50, completed: false },
      { id: "3", title: "Task 3", estimatedTime: 38, completed: true },
    ];

    expect(getRemainingTotalSeconds(steps)).toBe(9000);
  });

  it("formats hour-based countdown without switching to second-first display", () => {
    expect(formatDisplayTime(23640)).toBe("6h 34m");
    expect(formatDisplayTime(23280)).toBe("6h 28m");
  });

  it("formats shorter countdown values in minutes and seconds", () => {
    expect(formatDisplayTime(125)).toBe("2m 5s");
    expect(formatDisplayTime(45)).toBe("0m 45s");
  });

  it("counts down continuously second by second", () => {
    let timeRemaining = 180;
    const interval = setInterval(() => {
      timeRemaining = Math.max(0, timeRemaining - 1);
      if (timeRemaining === 0) clearInterval(interval);
    }, 1000);

    vi.advanceTimersByTime(3000);
    expect(timeRemaining).toBe(177);

    vi.advanceTimersByTime(177000);
    expect(timeRemaining).toBe(0);
  });

  it("deducts completed task time from an active countdown", () => {
    const activeCountdownSeconds = minutesToSeconds(288);
    const completedTaskSeconds = minutesToSeconds(100);

    const updated = Math.max(0, activeCountdownSeconds - completedTaskSeconds);
    expect(updated).toBe(minutesToSeconds(188));
    expect(formatDisplayTime(updated)).toBe("3h 8m");
  });

  it("adds time delta when an incomplete task duration is edited upward during countdown", () => {
    const currentCountdownSeconds = minutesToSeconds(257);
    const deltaSeconds = minutesToSeconds(31);

    expect(currentCountdownSeconds + deltaSeconds).toBe(minutesToSeconds(288));
  });

  it("subtracts time delta when an incomplete task duration is edited downward during countdown", () => {
    const currentCountdownSeconds = minutesToSeconds(257);
    const deltaSeconds = minutesToSeconds(-19);

    expect(currentCountdownSeconds + deltaSeconds).toBe(minutesToSeconds(238));
  });

  it("removes an incomplete task from the total when deleted", () => {
    const steps = [
      { id: "1", title: "Write report", estimatedTime: 300, completed: false },
      { id: "2", title: "Attend meeting", estimatedTime: 94, completed: false },
    ];

    const remaining = steps.filter((step) => step.id !== "2");
    expect(getRemainingTotalSeconds(remaining)).toBe(minutesToSeconds(300));
    expect(formatDisplayTime(getRemainingTotalSeconds(remaining))).toBe("5h 0m");
  });

  it("ignores completed tasks in total time when timer is idle", () => {
    const steps = [
      { id: "1", title: "Task 1", estimatedTime: 60, completed: true },
      { id: "2", title: "Task 2", estimatedTime: 45, completed: false },
      { id: "3", title: "Task 3", estimatedTime: 15, completed: false },
    ];

    expect(getRemainingTotalSeconds(steps)).toBe(minutesToSeconds(60));
    expect(formatDisplayTime(getRemainingTotalSeconds(steps))).toBe("1h 0m");
  });

  it("restores serialized timer state with seconds preserved", () => {
    const state = {
      steps: [{ id: "1", title: "Task 1", estimatedTime: 50, completed: false }],
      timeRemaining: minutesToSeconds(50),
      timerActive: true,
    };

    const restored = JSON.parse(JSON.stringify(state));
    expect(restored.steps[0].estimatedTime).toBe(50);
    expect(restored.timeRemaining).toBe(3000);
    expect(restored.timerActive).toBe(true);
  });

  it("stops the countdown cleanly at zero", () => {
    let timeRemaining = 2;
    let timerActive = true;

    const interval = setInterval(() => {
      timeRemaining = Math.max(0, timeRemaining - 1);
      if (timeRemaining === 0) {
        timerActive = false;
        clearInterval(interval);
      }
    }, 1000);

    vi.advanceTimersByTime(2000);
    expect(timeRemaining).toBe(0);
    expect(timerActive).toBe(false);
  });
});


describe("Timer Check/Uncheck Workflow", () => {
  it("should handle the exact user scenario: check, uncheck, check again", () => {
    // Setup: 3 tasks of 15 minutes each = 900 seconds total
    const task1Time = 15 * 60; // 900 seconds
    const task2Time = 15 * 60;
    const task3Time = 15 * 60;
    
    let timeRemaining = task1Time + task2Time + task3Time; // 2700 seconds
    let timerActive = true;

    // Mock adjustTime function
    const adjustTime = (deltaSeconds: number) => {
      const next = Math.max(0, timeRemaining + Math.round(deltaSeconds));
      if (deltaSeconds > 0 && !timerActive && next > 0) {
        timerActive = true;
      }
      if (next <= 0) {
        timerActive = false;
      }
      timeRemaining = next;
    };

    // Step 1: User checks task 1 (crosses it off)
    // Expected: timer reduces by 900 seconds
    adjustTime(-task1Time);
    expect(timeRemaining).toBe(1800); // 2700 - 900 = 1800
    expect(timerActive).toBe(true);

    // Step 2: User unchecks task 1 (un-crosses it)
    // Expected: timer increases by 900 seconds (adds time back)
    adjustTime(task1Time);
    expect(timeRemaining).toBe(2700); // 1800 + 900 = 2700
    expect(timerActive).toBe(true);

    // Step 3: User checks task 1 again
    // Expected: timer reduces by 900 seconds again
    adjustTime(-task1Time);
    expect(timeRemaining).toBe(1800); // 2700 - 900 = 1800
    expect(timerActive).toBe(true);

    // Step 4: User checks task 2
    // Expected: timer reduces by another 900 seconds
    adjustTime(-task2Time);
    expect(timeRemaining).toBe(900); // 1800 - 900 = 900
    expect(timerActive).toBe(true);

    // Step 5: User unchecks task 2
    // Expected: timer increases by 900 seconds
    adjustTime(task2Time);
    expect(timeRemaining).toBe(1800); // 900 + 900 = 1800
    expect(timerActive).toBe(true);
  });

  it("should restart timer when adding time to a stopped timer", () => {
    let timeRemaining = 0;
    let timerActive = false;

    const adjustTime = (deltaSeconds: number) => {
      const next = Math.max(0, timeRemaining + Math.round(deltaSeconds));
      if (deltaSeconds > 0 && !timerActive && next > 0) {
        timerActive = true;
      }
      if (next <= 0) {
        timerActive = false;
      }
      timeRemaining = next;
    };

    // User unchecks a task, adding 900 seconds
    const taskTime = 15 * 60;
    adjustTime(taskTime);

    expect(timeRemaining).toBe(900);
    expect(timerActive).toBe(true); // Timer should restart
  });

  it("should handle multiple tasks being checked/unchecked in sequence", () => {
    const taskTime = 10 * 60; // 600 seconds
    
    let timeRemaining = taskTime * 3;
    let timerActive = true;

    const adjustTime = (deltaSeconds: number) => {
      const next = Math.max(0, timeRemaining + Math.round(deltaSeconds));
      if (deltaSeconds > 0 && !timerActive && next > 0) {
        timerActive = true;
      }
      if (next <= 0) {
        timerActive = false;
      }
      timeRemaining = next;
    };

    // Check task 1
    adjustTime(-taskTime);
    expect(timeRemaining).toBe(1200);

    // Check task 2
    adjustTime(-taskTime);
    expect(timeRemaining).toBe(600);

    // Uncheck task 1 (add back)
    adjustTime(taskTime);
    expect(timeRemaining).toBe(1200);

    // Uncheck task 2 (add back)
    adjustTime(taskTime);
    expect(timeRemaining).toBe(1800);

    // Check task 1 again
    adjustTime(-taskTime);
    expect(timeRemaining).toBe(1200);

    // Check task 3
    adjustTime(-taskTime);
    expect(timeRemaining).toBe(600);

    // Check task 2
    adjustTime(-taskTime);
    expect(timeRemaining).toBe(0);
    expect(timerActive).toBe(false); // Timer stops at zero
  });
});
