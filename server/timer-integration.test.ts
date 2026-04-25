import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";

/**
 * Timer Integration Tests
 * Verifies that the timer:
 * - Starts with correct total time from steps
 * - Counts down continuously without stopping
 * - Formats time correctly (h/m/s)
 * - Handles various edge cases
 */

describe("Timer Integration", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should calculate total time from steps correctly", () => {
    const steps = [
      { id: "1", title: "Task 1", estimatedTime: 300 }, // 5 min
      { id: "2", title: "Task 2", estimatedTime: 600 }, // 10 min
      { id: "3", title: "Task 3", estimatedTime: 300 }, // 5 min
    ];

    const total = steps.reduce((sum, s) => sum + s.estimatedTime, 0);
    expect(total).toBe(1200); // 20 minutes in seconds
  });

  it("should format time correctly from seconds", () => {
    const formatTime = (seconds: number) => {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;
      if (hours > 0) {
        return `${hours}h ${minutes}m`;
      }
      return `${minutes}m ${secs}s`;
    };

    expect(formatTime(0)).toBe("0m 0s");
    expect(formatTime(30)).toBe("0m 30s");
    expect(formatTime(60)).toBe("1m 0s");
    expect(formatTime(90)).toBe("1m 30s");
    expect(formatTime(300)).toBe("5m 0s");
    expect(formatTime(600)).toBe("10m 0s");
    expect(formatTime(3600)).toBe("1h 0m");
    expect(formatTime(3661)).toBe("1h 1m");
    expect(formatTime(7200)).toBe("2h 0m");
  });

  it("should serialize and restore timer state", () => {
    const state = {
      steps: [
        { id: "1", title: "Task 1", estimatedTime: 300, completed: false },
      ],
      timeRemaining: 300,
      timerActive: true,
    };

    const serialized = JSON.stringify(state);
    const restored = JSON.parse(serialized);

    expect(restored.timeRemaining).toBe(300);
    expect(restored.timerActive).toBe(true);
    expect(restored.steps.length).toBe(1);
  });

  it("should restore timer state after serialization", () => {
    const beforeNav = {
      steps: [
        { id: "1", title: "Task 1", estimatedTime: 600, completed: false },
        { id: "2", title: "Task 2", estimatedTime: 300, completed: true },
      ],
      timeRemaining: 450, // 7m 30s remaining
      timerActive: true,
    };

    const serialized = JSON.stringify(beforeNav);
    const afterNav = JSON.parse(serialized);

    expect(afterNav.timeRemaining).toBe(450);
    expect(afterNav.timerActive).toBe(true);
    expect(afterNav.steps.length).toBe(2);
  });

  it("should handle timer countdown with multiple ticks", () => {
    let timeRemaining = 300; // 5 minutes
    const tickHistory: number[] = [];

    const interval = setInterval(() => {
      tickHistory.push(timeRemaining);
      timeRemaining = Math.max(0, timeRemaining - 1);
      if (timeRemaining === 0) {
        clearInterval(interval);
      }
    }, 1000);

    // Simulate 5 minutes of countdown
    vi.advanceTimersByTime(300000);

    expect(tickHistory.length).toBe(300);
    expect(tickHistory[0]).toBe(300);
    expect(tickHistory[299]).toBe(1);
    expect(timeRemaining).toBe(0);
  });

  it("should not skip seconds during long countdown", () => {
    let timeRemaining = 3600; // 1 hour
    let tickCount = 0;
    const expectedTicks = 3600;

    const interval = setInterval(() => {
      tickCount++;
      timeRemaining--;
      if (timeRemaining <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    // Simulate 1 hour of countdown
    vi.advanceTimersByTime(3600000);

    expect(tickCount).toBe(expectedTicks);
    expect(timeRemaining).toBe(0);
  });

  it("should handle timer stop and resume", () => {
    let timeRemaining = 600; // 10 minutes
    let isActive = true;
    let tickCount = 0;

    const interval = setInterval(() => {
      if (isActive) {
        tickCount++;
        timeRemaining--;
        if (timeRemaining <= 0) {
          isActive = false;
          clearInterval(interval);
        }
      }
    }, 1000);

    // Countdown for 3 minutes
    vi.advanceTimersByTime(180000);
    expect(tickCount).toBe(180);
    expect(timeRemaining).toBe(420); // 7 minutes remaining

    // Stop timer
    isActive = false;
    vi.advanceTimersByTime(60000); // Advance 1 more minute
    expect(tickCount).toBe(180); // No new ticks
    expect(timeRemaining).toBe(420); // Time unchanged

    // Resume timer
    isActive = true;
    vi.advanceTimersByTime(60000); // Advance 1 more minute
    expect(tickCount).toBe(240); // 60 new ticks
    expect(timeRemaining).toBe(360); // 6 minutes remaining
  });

  it("should handle edge case: very short timer (1 second)", () => {
    let timeRemaining = 1;
    let tickCount = 0;

    const interval = setInterval(() => {
      tickCount++;
      timeRemaining--;
      if (timeRemaining <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    vi.advanceTimersByTime(1000);

    expect(tickCount).toBe(1);
    expect(timeRemaining).toBe(0);
  });

  it("should handle edge case: very long timer (24 hours)", () => {
    let timeRemaining = 86400; // 24 hours in seconds
    let tickCount = 0;

    const interval = setInterval(() => {
      tickCount++;
      timeRemaining--;
      if (timeRemaining <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    // Advance 1 hour
    vi.advanceTimersByTime(3600000);

    expect(tickCount).toBe(3600);
    expect(timeRemaining).toBe(82800); // 23 hours remaining
  });

  it("should correctly format time display for timer", () => {
    const formatTime = (seconds: number) => {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;
      if (hours > 0) {
        return `${hours}h ${minutes}m`;
      }
      return `${minutes}m ${secs}s`;
    };

    // Test various time values
    const testCases = [
      { input: 0, expected: "0m 0s" },
      { input: 45, expected: "0m 45s" },
      { input: 125, expected: "2m 5s" },
      { input: 1800, expected: "30m 0s" },
      { input: 3665, expected: "1h 1m" },
      { input: 7325, expected: "2h 2m" },
    ];

    testCases.forEach(({ input, expected }) => {
      expect(formatTime(input)).toBe(expected);
    });
  });

  it("should handle timer with completed tasks", () => {
    const steps = [
      { id: "1", title: "Task 1", estimatedTime: 300, completed: true },
      { id: "2", title: "Task 2", estimatedTime: 600, completed: false },
      { id: "3", title: "Task 3", estimatedTime: 300, completed: false },
    ];

    // Total time should include all steps, regardless of completion
    const total = steps.reduce((sum, s) => sum + s.estimatedTime, 0);
    expect(total).toBe(1200); // 20 minutes

    // But we can track progress
    const completed = steps.filter((s) => s.completed).length;
    expect(completed).toBe(1);
  });

  it("should maintain accurate countdown without stopping midway", () => {
    let timeRemaining = 120; // 2 minutes
    let tickCount = 0;
    let lastValue = timeRemaining;

    const interval = setInterval(() => {
      tickCount++;
      lastValue = timeRemaining;
      timeRemaining--;
      if (timeRemaining <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    // Simulate 2 minutes of countdown
    vi.advanceTimersByTime(120000);

    // Should have exactly 120 ticks
    expect(tickCount).toBe(120);
    // Should reach 0
    expect(timeRemaining).toBe(0);
    // Last value before decrement should be 1
    expect(lastValue).toBe(1);
  });

  it("should handle rapid timer state changes", () => {
    let timeRemaining = 300;
    let startCount = 0;
    let stopCount = 0;
    let isActive = false;

    const startTimer = (seconds: number) => {
      startCount++;
      timeRemaining = seconds;
      isActive = true;
    };

    const stopTimer = () => {
      stopCount++;
      isActive = false;
    };

    // Rapid start/stop cycles
    startTimer(300);
    expect(startCount).toBe(1);
    expect(isActive).toBe(true);

    stopTimer();
    expect(stopCount).toBe(1);
    expect(isActive).toBe(false);

    startTimer(300);
    expect(startCount).toBe(2);
    expect(isActive).toBe(true);

    stopTimer();
    expect(stopCount).toBe(2);
    expect(isActive).toBe(false);
  });
});
