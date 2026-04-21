import { describe, it, expect, vi } from "vitest";
import { calculateTotalTime, formatTime } from "./taskEstimator";

describe("Task Estimator Service", () => {
  describe("calculateTotalTime", () => {
    it("should sum all times correctly", () => {
      const tasks = [
        { title: "Task 1", estimatedTime: 30, bufferTime: 6, totalTime: 36 },
        { title: "Task 2", estimatedTime: 45, bufferTime: 9, totalTime: 54 },
        { title: "Task 3", estimatedTime: 20, bufferTime: 4, totalTime: 24 },
      ];
      
      const result = calculateTotalTime(tasks as any);
      
      expect(result.baseTime).toBe(95);
      expect(result.bufferTime).toBe(19);
      expect(result.totalTime).toBe(114);
    });

    it("should handle empty task list", () => {
      const result = calculateTotalTime([]);
      
      expect(result.baseTime).toBe(0);
      expect(result.bufferTime).toBe(0);
      expect(result.totalTime).toBe(0);
    });

    it("should handle single task", () => {
      const tasks = [
        { title: "Task 1", estimatedTime: 60, bufferTime: 12, totalTime: 72 },
      ];
      
      const result = calculateTotalTime(tasks as any);
      
      expect(result.baseTime).toBe(60);
      expect(result.bufferTime).toBe(12);
      expect(result.totalTime).toBe(72);
    });

    it("should correctly calculate totals for multiple tasks", () => {
      const tasks = [
        { title: "Task 1", estimatedTime: 15, bufferTime: 3, totalTime: 18 },
        { title: "Task 2", estimatedTime: 25, bufferTime: 5, totalTime: 30 },
      ];
      
      const result = calculateTotalTime(tasks as any);
      
      expect(result.baseTime).toBe(40);
      expect(result.bufferTime).toBe(8);
      expect(result.totalTime).toBe(48);
    });
  });

  describe("formatTime", () => {
    it("should format minutes only", () => {
      expect(formatTime(30)).toBe("30 min");
      expect(formatTime(45)).toBe("45 min");
    });

    it("should format hours and minutes", () => {
      expect(formatTime(90)).toBe("1h 30m");
      expect(formatTime(125)).toBe("2h 5m");
    });

    it("should format whole hours", () => {
      expect(formatTime(60)).toBe("1h");
      expect(formatTime(120)).toBe("2h");
    });

    it("should handle edge cases", () => {
      expect(formatTime(0)).toBe("0 min");
      expect(formatTime(1)).toBe("1 min");
    });

    it("should handle large times", () => {
      expect(formatTime(480)).toBe("8h");
      expect(formatTime(495)).toBe("8h 15m");
    });
  });
});
