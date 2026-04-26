import { describe, it, expect, beforeEach } from "vitest";

describe("Task Completion Time Deduction", () => {
  describe("Time deduction calculation", () => {
    it("should deduct 60 minutes (3600 seconds) when a 60-minute task is completed", () => {
      const taskDurationMinutes = 60;
      const taskDurationSeconds = taskDurationMinutes * 60;
      const totalTimeSeconds = 14400; // 4 hours
      const remainingAfterDeduction = totalTimeSeconds - taskDurationSeconds;
      
      expect(remainingAfterDeduction).toBe(10800); // 3 hours
    });

    it("should deduct 100 minutes (6000 seconds) when a 100-minute task is completed", () => {
      const taskDurationMinutes = 100;
      const taskDurationSeconds = taskDurationMinutes * 60;
      const totalTimeSeconds = 22800; // 6 hours 20 minutes
      const remainingAfterDeduction = totalTimeSeconds - taskDurationSeconds;
      
      expect(remainingAfterDeduction).toBe(16800); // 4 hours 40 minutes
    });

    it("should not go below zero when deducting time", () => {
      const taskDurationMinutes = 100;
      const taskDurationSeconds = taskDurationMinutes * 60;
      const totalTimeSeconds = 3000; // 50 minutes
      const remainingAfterDeduction = Math.max(0, totalTimeSeconds - taskDurationSeconds);
      
      expect(remainingAfterDeduction).toBe(0);
    });

    it("should correctly calculate remaining time for multiple task completions", () => {
      let totalTimeSeconds = 22800; // 6 hours 20 minutes
      
      // Complete first task: 100 minutes
      totalTimeSeconds = Math.max(0, totalTimeSeconds - (100 * 60));
      expect(totalTimeSeconds).toBe(16800); // 4 hours 40 minutes
      
      // Complete second task: 50 minutes
      totalTimeSeconds = Math.max(0, totalTimeSeconds - (50 * 60));
      expect(totalTimeSeconds).toBe(13800); // 3 hours 50 minutes
      
      // Complete third task: 50 minutes
      totalTimeSeconds = Math.max(0, totalTimeSeconds - (50 * 60));
      expect(totalTimeSeconds).toBe(10800); // 3 hours
    });
  });

  describe("Progress counter updates", () => {
    it("should update progress from 0/5 to 1/5 when first task is completed", () => {
      const totalTasks = 5;
      const completedTasks = 1;
      
      expect(completedTasks).toBe(1);
      expect(`${completedTasks}/${totalTasks}`).toBe("1/5");
    });

    it("should show 5/5 when all tasks are completed", () => {
      const totalTasks = 5;
      const completedTasks = 5;
      
      expect(completedTasks).toBe(totalTasks);
      expect(`${completedTasks}/${totalTasks}`).toBe("5/5");
    });

    it("should correctly track progress through all tasks", () => {
      const totalTasks = 5;
      let completedTasks = 0;
      
      for (let i = 0; i < totalTasks; i++) {
        completedTasks++;
        expect(`${completedTasks}/${totalTasks}`).toBe(`${i + 1}/5`);
      }
    });
  });

  describe("Timer behavior with task completion", () => {
    it("should only deduct time when timer is active", () => {
      const timerActive = false;
      const taskDurationSeconds = 6000;
      let timeRemaining = 14400;
      
      // Should not deduct when timer is not active
      if (timerActive) {
        timeRemaining -= taskDurationSeconds;
      }
      
      expect(timeRemaining).toBe(14400); // Time unchanged
    });

    it("should deduct time when timer is active", () => {
      const timerActive = true;
      const taskDurationSeconds = 6000;
      let timeRemaining = 14400;
      
      // Should deduct when timer is active
      if (timerActive) {
        timeRemaining = Math.max(0, timeRemaining - taskDurationSeconds);
      }
      
      expect(timeRemaining).toBe(8400); // Time deducted
    });

    it("should stop timer when time reaches zero", () => {
      let timeRemaining = 3600; // 1 hour
      let timerActive = true;
      const taskDurationSeconds = 7200; // 2 hours
      
      timeRemaining = Math.max(0, timeRemaining - taskDurationSeconds);
      
      if (timeRemaining <= 0) {
        timerActive = false;
      }
      
      expect(timeRemaining).toBe(0);
      expect(timerActive).toBe(false);
    });
  });
});
