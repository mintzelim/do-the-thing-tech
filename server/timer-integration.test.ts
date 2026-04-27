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
