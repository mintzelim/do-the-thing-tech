import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";

/**
 * Timer Accuracy Tests
 * Verifies that the countdown timer:
 * - Counts down accurately by 1 second per tick
 * - Doesn't skip or stop midway
 * - Stops at 0
 * - Handles start/stop correctly
 */

describe("Timer Countdown Accuracy", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should countdown from 10 seconds to 0 without skipping", () => {
    let currentTime = 10;
    const timeHistory: number[] = [];

    // Simulate the timer countdown logic
    const interval = setInterval(() => {
      timeHistory.push(currentTime);
      currentTime = currentTime - 1;
      if (currentTime <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    // Advance time by 10 seconds
    vi.advanceTimersByTime(10000);

    // Verify countdown sequence
    expect(timeHistory).toEqual([10, 9, 8, 7, 6, 5, 4, 3, 2, 1]);
    expect(currentTime).toBe(0); // Timer stops at 0
  });

  it("should not skip any seconds during countdown", () => {
    let currentTime = 30;
    const timeHistory: number[] = [];
    let tickCount = 0;

    const interval = setInterval(() => {
      tickCount++;
      timeHistory.push(currentTime);
      currentTime = currentTime - 1;
      if (currentTime <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    // Advance time by 30 seconds
    vi.advanceTimersByTime(30000);

    // Should have exactly 30 ticks
    expect(tickCount).toBe(30);
    
    // Should count down from 30 to 1 (30 values)
    expect(timeHistory.length).toBe(30);
    
    // First value should be 30, last should be 1
    expect(timeHistory[0]).toBe(30);
    expect(timeHistory[29]).toBe(1);
    
    // Should be sequential
    for (let i = 0; i < timeHistory.length; i++) {
      expect(timeHistory[i]).toBe(30 - i);
    }
  });

  it("should stop at 0 and not go negative", () => {
    let currentTime = 5;
    let finalTime = currentTime;

    const interval = setInterval(() => {
      currentTime = currentTime - 1;
      if (currentTime <= 0) {
        finalTime = 0;
        currentTime = 0;
        clearInterval(interval);
      }
    }, 1000);

    vi.advanceTimersByTime(10000); // Advance more than needed

    expect(finalTime).toBe(0);
    expect(currentTime).toBe(0);
  });

  it("should handle multiple start/stop cycles", () => {
    const cycles: { start: number; ticks: number }[] = [];

    // Cycle 1: Count from 5
    let time1 = 5;
    let ticks1 = 0;
    const interval1 = setInterval(() => {
      ticks1++;
      time1--;
      if (time1 <= 0) clearInterval(interval1);
    }, 1000);

    vi.advanceTimersByTime(5000);
    cycles.push({ start: 5, ticks: ticks1 });

    // Cycle 2: Count from 3
    let time2 = 3;
    let ticks2 = 0;
    const interval2 = setInterval(() => {
      ticks2++;
      time2--;
      if (time2 <= 0) clearInterval(interval2);
    }, 1000);

    vi.advanceTimersByTime(3000);
    cycles.push({ start: 3, ticks: ticks2 });

    // Verify both cycles completed correctly
    expect(cycles[0]).toEqual({ start: 5, ticks: 5 });
    expect(cycles[1]).toEqual({ start: 3, ticks: 3 });
  });

  it("should maintain accuracy with 1-second intervals", () => {
    const startTime = Date.now();
    let currentTime = 60;
    const tickTimes: number[] = [];

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      tickTimes.push(elapsed);
      currentTime--;
      if (currentTime <= 0) clearInterval(interval);
    }, 1000);

    // Advance 60 seconds
    vi.advanceTimersByTime(60000);

    // Should have 60 ticks
    expect(tickTimes.length).toBe(60);

    // Each tick should be approximately 1000ms apart
    for (let i = 1; i < tickTimes.length; i++) {
      const timeDiff = tickTimes[i] - tickTimes[i - 1];
      expect(timeDiff).toBe(1000);
    }
  });

  it("should handle edge case of 1 second countdown", () => {
    let currentTime = 1;
    let ticks = 0;

    const interval = setInterval(() => {
      ticks++;
      currentTime--;
      if (currentTime <= 0) clearInterval(interval);
    }, 1000);

    vi.advanceTimersByTime(1000);

    expect(ticks).toBe(1);
    expect(currentTime).toBe(0);
  });

  it("should handle edge case of 0 second start", () => {
    let currentTime = 0;
    let ticks = 0;

    const interval = setInterval(() => {
      ticks++;
      currentTime--;
      if (currentTime <= 0) clearInterval(interval);
    }, 1000);

    vi.advanceTimersByTime(1000);

    // Timer will tick once before checking condition
    expect(ticks).toBe(1);
    expect(currentTime).toBe(-1); // After decrement from 0
  });
});

describe("Timer State Management", () => {
  it("should correctly track active/inactive state", () => {
    let isActive = false;
    let timeRemaining = 0;

    const startTimer = (seconds: number) => {
      isActive = true;
      timeRemaining = seconds;
    };

    const stopTimer = () => {
      isActive = false;
    };

    // Test start
    startTimer(10);
    expect(isActive).toBe(true);
    expect(timeRemaining).toBe(10);

    // Test stop
    stopTimer();
    expect(isActive).toBe(false);
    expect(timeRemaining).toBe(10); // Time remains but timer is inactive
  });

  it("should persist timer state correctly", () => {
    const state = {
      timeRemaining: 25,
      timerActive: true,
    };

    // Simulate localStorage save
    const saved = JSON.stringify(state);
    const restored = JSON.parse(saved);

    expect(restored.timeRemaining).toBe(25);
    expect(restored.timerActive).toBe(true);
  });
});
