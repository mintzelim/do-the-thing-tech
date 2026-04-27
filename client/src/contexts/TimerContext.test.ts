import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock the TimerContext logic
describe('TimerContext - adjustTime logic', () => {
  let timeRemaining: number;
  let timerActive: boolean;

  beforeEach(() => {
    timeRemaining = 0;
    timerActive = false;
  });

  const adjustTime = (deltaSeconds: number) => {
    const next = Math.max(0, timeRemaining + Math.round(deltaSeconds));

    // If adding time back and timer was stopped, restart it
    if (deltaSeconds > 0 && !timerActive && next > 0) {
      timerActive = true;
    }

    // If time reaches zero, stop the timer
    if (next <= 0) {
      timerActive = false;
    }

    timeRemaining = next;
  };

  it('should subtract time when checking a task (negative delta)', () => {
    timeRemaining = 600; // 10 minutes
    timerActive = true;

    adjustTime(-300); // Remove 5 minutes

    expect(timeRemaining).toBe(300);
    expect(timerActive).toBe(true);
  });

  it('should add time back when unchecking a task (positive delta)', () => {
    timeRemaining = 300; // 5 minutes
    timerActive = true;

    adjustTime(300); // Add 5 minutes back

    expect(timeRemaining).toBe(600);
    expect(timerActive).toBe(true);
  });

  it('should restart timer when adding time to a stopped timer', () => {
    timeRemaining = 0;
    timerActive = false;

    adjustTime(300); // Add 5 minutes

    expect(timeRemaining).toBe(300);
    expect(timerActive).toBe(true); // Timer should restart
  });

  it('should not go below zero', () => {
    timeRemaining = 100;
    timerActive = true;

    adjustTime(-500); // Try to remove more than available

    expect(timeRemaining).toBe(0);
    expect(timerActive).toBe(false);
  });

  it('should stop timer when time reaches zero', () => {
    timeRemaining = 100;
    timerActive = true;

    adjustTime(-100); // Remove all time

    expect(timeRemaining).toBe(0);
    expect(timerActive).toBe(false);
  });

  it('should handle the uncheck scenario: task was checked (time reduced), then unchecked (time restored)', () => {
    // Initial state: 3 tasks × 5 minutes each = 900 seconds
    timeRemaining = 900;
    timerActive = true;

    // User checks first task (removes 300 seconds)
    adjustTime(-300);
    expect(timeRemaining).toBe(600);
    expect(timerActive).toBe(true);

    // User unchecks first task (adds 300 seconds back)
    adjustTime(300);
    expect(timeRemaining).toBe(900);
    expect(timerActive).toBe(true); // Timer should still be active
  });

  it('should restart timer if it was stopped and user unchecks a task', () => {
    timeRemaining = 300; // Some time remaining
    timerActive = false; // Timer was stopped

    adjustTime(300); // User unchecks a task, adding time

    expect(timeRemaining).toBe(600);
    expect(timerActive).toBe(true); // Timer should restart
  });
});
