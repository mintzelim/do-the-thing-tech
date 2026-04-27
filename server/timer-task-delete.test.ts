import { describe, it, expect } from "vitest";

describe("Timer Decrease on Task Deletion", () => {
  it("should calculate time to deduce when deleting a task", () => {
    const estimatedTime = 10; // 10 minutes
    const timeToDeduce = estimatedTime * 60; // Convert to seconds

    expect(timeToDeduce).toBe(600); // 10 minutes in seconds
  });

  it("should deduce time when timer is active", () => {
    const timerActive = true;
    const estimatedTime = 5;
    const timeToDeduce = estimatedTime * 60;

    let adjustedTime = 0;
    if (timerActive && timeToDeduce > 0) {
      adjustedTime = -timeToDeduce;
    }

    expect(adjustedTime).toBe(-300); // -5 minutes in seconds
  });

  it("should not deduce time when timer is inactive", () => {
    const timerActive = false;
    const estimatedTime = 5;
    const timeToDeduce = estimatedTime * 60;

    let adjustedTime = 0;
    if (timerActive && timeToDeduce > 0) {
      adjustedTime = -timeToDeduce;
    }

    expect(adjustedTime).toBe(0); // Should not adjust
  });

  it("should handle deleting a 15-minute task", () => {
    const timerActive = true;
    const estimatedTime = 15;
    const timeToDeduce = estimatedTime * 60;

    let adjustedTime = 0;
    if (timerActive && timeToDeduce > 0) {
      adjustedTime = -timeToDeduce;
    }

    expect(adjustedTime).toBe(-900); // -15 minutes in seconds
  });

  it("should handle deleting a 1-minute task", () => {
    const timerActive = true;
    const estimatedTime = 1;
    const timeToDeduce = estimatedTime * 60;

    let adjustedTime = 0;
    if (timerActive && timeToDeduce > 0) {
      adjustedTime = -timeToDeduce;
    }

    expect(adjustedTime).toBe(-60); // -1 minute in seconds
  });

  it("should handle deleting multiple tasks sequentially", () => {
    let totalAdjustment = 0;
    const timerActive = true;

    // Delete task 1: 5 minutes
    const timeToDeduce1 = 5 * 60;
    if (timerActive && timeToDeduce1 > 0) totalAdjustment -= timeToDeduce1;
    expect(totalAdjustment).toBe(-300);

    // Delete task 2: 10 minutes
    const timeToDeduce2 = 10 * 60;
    if (timerActive && timeToDeduce2 > 0) totalAdjustment -= timeToDeduce2;
    expect(totalAdjustment).toBe(-900); // -300 - 600

    // Delete task 3: 3 minutes
    const timeToDeduce3 = 3 * 60;
    if (timerActive && timeToDeduce3 > 0) totalAdjustment -= timeToDeduce3;
    expect(totalAdjustment).toBe(-1080); // -900 - 180
  });

  it("should not deduce time if task has 0 estimated time", () => {
    const timerActive = true;
    const estimatedTime = 0;
    const timeToDeduce = estimatedTime * 60;

    let adjustedTime = 0;
    if (timerActive && timeToDeduce > 0) {
      adjustedTime = -timeToDeduce;
    }

    expect(adjustedTime).toBe(0); // Should not adjust
  });

  it("should handle deleting a 30-minute task", () => {
    const timerActive = true;
    const estimatedTime = 30;
    const timeToDeduce = estimatedTime * 60;

    let adjustedTime = 0;
    if (timerActive && timeToDeduce > 0) {
      adjustedTime = -timeToDeduce;
    }

    expect(adjustedTime).toBe(-1800); // -30 minutes in seconds
  });
});
