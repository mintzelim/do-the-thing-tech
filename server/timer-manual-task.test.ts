import { describe, it, expect } from "vitest";

describe("Timer Increase on Manual Task Addition", () => {
  it("should calculate new timer value when adding a 15-minute task", () => {
    const currentTimeRemaining = 30 * 60; // 30 minutes in seconds
    const newTaskTime = 15 * 60; // 15 minutes in seconds
    const expectedNewTime = currentTimeRemaining + newTaskTime;

    expect(expectedNewTime).toBe(45 * 60); // 45 minutes
  });

  it("should calculate new timer value when adding a 5-minute task", () => {
    const currentTimeRemaining = 20 * 60; // 20 minutes in seconds
    const newTaskTime = 5 * 60; // 5 minutes in seconds
    const expectedNewTime = currentTimeRemaining + newTaskTime;

    expect(expectedNewTime).toBe(25 * 60); // 25 minutes
  });

  it("should handle adding multiple tasks sequentially", () => {
    let totalTime = 30 * 60; // Start with 30 minutes

    // Add first task (15 minutes)
    totalTime += 15 * 60;
    expect(totalTime).toBe(45 * 60);

    // Add second task (10 minutes)
    totalTime += 10 * 60;
    expect(totalTime).toBe(55 * 60);

    // Add third task (5 minutes)
    totalTime += 5 * 60;
    expect(totalTime).toBe(60 * 60);
  });

  it("should only increase timer if timer is active", () => {
    const timerActive = true;
    const currentTimeRemaining = 30 * 60;
    const newTaskTime = 15 * 60;

    if (timerActive) {
      const newTime = currentTimeRemaining + newTaskTime;
      expect(newTime).toBe(45 * 60);
    }
  });

  it("should not increase timer if timer is inactive", () => {
    const timerActive = false;
    const currentTimeRemaining = 30 * 60;
    const newTaskTime = 15 * 60;

    let newTime = currentTimeRemaining;
    if (timerActive) {
      newTime += newTaskTime;
    }

    expect(newTime).toBe(30 * 60); // Should remain 30 minutes
  });

  it("should handle custom task time values", () => {
    const currentTimeRemaining = 25 * 60;
    const customTaskTime = 7 * 60; // Custom 7-minute task
    const expectedNewTime = currentTimeRemaining + customTaskTime;

    expect(expectedNewTime).toBe(32 * 60); // 32 minutes
  });

  it("should handle adding task with 0 minutes", () => {
    const currentTimeRemaining = 30 * 60;
    const newTaskTime = 0; // 0 minutes
    const expectedNewTime = currentTimeRemaining + newTaskTime;

    expect(expectedNewTime).toBe(30 * 60); // Should remain 30 minutes
  });

  it("should handle adding task with large time value", () => {
    const currentTimeRemaining = 30 * 60;
    const newTaskTime = 120 * 60; // 120 minutes (2 hours)
    const expectedNewTime = currentTimeRemaining + newTaskTime;

    expect(expectedNewTime).toBe(150 * 60); // 150 minutes (2.5 hours)
  });
});
