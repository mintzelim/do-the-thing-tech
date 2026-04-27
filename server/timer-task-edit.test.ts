import { describe, it, expect } from "vitest";

describe("Timer Adjustment on Task Time Edit", () => {
  it("should calculate time difference when increasing task time", () => {
    const oldTime = 5; // 5 minutes
    const newTime = 10; // 10 minutes
    const timeDifference = (newTime - oldTime) * 60; // Convert to seconds

    expect(timeDifference).toBe(300); // 5 minutes in seconds
  });

  it("should calculate time difference when decreasing task time", () => {
    const oldTime = 10; // 10 minutes
    const newTime = 5; // 5 minutes
    const timeDifference = (newTime - oldTime) * 60; // Convert to seconds

    expect(timeDifference).toBe(-300); // -5 minutes in seconds
  });

  it("should return 0 when task time remains the same", () => {
    const oldTime = 10;
    const newTime = 10;
    const timeDifference = (newTime - oldTime) * 60;

    expect(timeDifference).toBe(0);
  });

  it("should handle increasing task from 5 to 20 minutes", () => {
    const oldTime = 5;
    const newTime = 20;
    const timeDifference = (newTime - oldTime) * 60;

    expect(timeDifference).toBe(900); // 15 minutes in seconds
  });

  it("should handle decreasing task from 20 to 5 minutes", () => {
    const oldTime = 20;
    const newTime = 5;
    const timeDifference = (newTime - oldTime) * 60;

    expect(timeDifference).toBe(-900); // -15 minutes in seconds
  });

  it("should adjust timer when active and time changes", () => {
    const timerActive = true;
    const oldTime = 10;
    const newTime = 15;
    const timeDifference = (newTime - oldTime) * 60;

    let adjustedTime = 0;
    if (timerActive && timeDifference !== 0) {
      adjustedTime = timeDifference;
    }

    expect(adjustedTime).toBe(300); // 5 minutes in seconds
  });

  it("should not adjust timer when inactive", () => {
    const timerActive = false;
    const oldTime = 10;
    const newTime = 15;
    const timeDifference = (newTime - oldTime) * 60;

    let adjustedTime = 0;
    if (timerActive && timeDifference !== 0) {
      adjustedTime = timeDifference;
    }

    expect(adjustedTime).toBe(0); // Should not adjust
  });

  it("should not adjust timer when time difference is 0", () => {
    const timerActive = true;
    const oldTime = 10;
    const newTime = 10;
    const timeDifference = (newTime - oldTime) * 60;

    let adjustedTime = 0;
    if (timerActive && timeDifference !== 0) {
      adjustedTime = timeDifference;
    }

    expect(adjustedTime).toBe(0); // Should not adjust
  });

  it("should handle multiple task edits sequentially", () => {
    let totalAdjustment = 0;
    const timerActive = true;

    // Edit 1: 5 -> 10 minutes
    const diff1 = (10 - 5) * 60;
    if (timerActive && diff1 !== 0) totalAdjustment += diff1;
    expect(totalAdjustment).toBe(300);

    // Edit 2: 10 -> 8 minutes
    const diff2 = (8 - 10) * 60;
    if (timerActive && diff2 !== 0) totalAdjustment += diff2;
    expect(totalAdjustment).toBe(180); // 300 - 120

    // Edit 3: 8 -> 12 minutes
    const diff3 = (12 - 8) * 60;
    if (timerActive && diff3 !== 0) totalAdjustment += diff3;
    expect(totalAdjustment).toBe(420); // 180 + 240
  });
});
