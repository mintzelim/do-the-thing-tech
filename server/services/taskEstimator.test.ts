import { describe, it, expect } from "vitest";
import { calculateTotalTime, formatTime, FOCUS_MULTIPLIERS, applyFocusLevelToMinutes, normalizeMinutes } from "./taskEstimator";

describe("Task Estimator Service", () => {
  describe("focus multipliers", () => {
    it("uses hyperfocus as a time reduction", () => {
      expect(FOCUS_MULTIPLIERS.hyperfocus).toBe(0.75);
    });

    it("uses normal as the baseline", () => {
      expect(FOCUS_MULTIPLIERS.normal).toBe(1);
    });

    it("uses distracted as a time increase", () => {
      expect(FOCUS_MULTIPLIERS.distracted).toBe(1.5);
    });

    it("keeps minute estimates ordered by focus level", () => {
      const baseMinutes = 40;
      const hyperfocus = applyFocusLevelToMinutes(baseMinutes, "hyperfocus");
      const normal = applyFocusLevelToMinutes(baseMinutes, "normal");
      const distracted = applyFocusLevelToMinutes(baseMinutes, "distracted");

      expect(hyperfocus).toBe(30);
      expect(normal).toBe(40);
      expect(distracted).toBe(60);
      expect(hyperfocus).toBeLessThan(normal);
      expect(normal).toBeLessThan(distracted);
    });

    it("normalizes estimates to realistic five-minute buckets with a five-minute floor", () => {
      expect(normalizeMinutes(2)).toBe(5);
      expect(normalizeMinutes(12)).toBe(10);
      expect(normalizeMinutes(13)).toBe(15);
    });
  });

  describe("calculateTotalTime", () => {
    it("sums minute-based estimated, adjustment, and total time correctly", () => {
      const tasks = [
        { title: "Task 1", estimatedTime: 25, bufferTime: -10, totalTime: 25 },
        { title: "Task 2", estimatedTime: 45, bufferTime: 0, totalTime: 45 },
        { title: "Task 3", estimatedTime: 75, bufferTime: 25, totalTime: 75 },
      ];

      const result = calculateTotalTime(tasks as any);

      expect(result.baseTime).toBe(145);
      expect(result.bufferTime).toBe(15);
      expect(result.totalTime).toBe(160);
    });

    it("handles an empty task list", () => {
      expect(calculateTotalTime([])).toEqual({ baseTime: 0, bufferTime: 0, totalTime: 0 });
    });

    it("handles a single task", () => {
      const result = calculateTotalTime([
        { title: "Task 1", estimatedTime: 60, bufferTime: 0, totalTime: 60 },
      ] as any);

      expect(result).toEqual({ baseTime: 60, bufferTime: 0, totalTime: 60 });
    });
  });

  describe("formatTime", () => {
    it("formats minute-only values", () => {
      expect(formatTime(30)).toBe("30 min");
      expect(formatTime(45)).toBe("45 min");
    });

    it("formats hour and minute values", () => {
      expect(formatTime(90)).toBe("1h 30m");
      expect(formatTime(125)).toBe("2h 5m");
    });

    it("formats whole hours", () => {
      expect(formatTime(60)).toBe("1h");
      expect(formatTime(120)).toBe("2h");
    });

    it("handles edge cases", () => {
      expect(formatTime(0)).toBe("0 min");
      expect(formatTime(1)).toBe("1 min");
      expect(formatTime(480)).toBe("8h");
    });
  });
});
