import { describe, it, expect, vi } from "vitest";
import { breakdownTasks, isBrainDump, getMockBreakdown } from "./taskBreakdown";

describe("Task Breakdown Service", () => {
  describe("isBrainDump", () => {
    it("should identify brain dumps with multiple tasks", () => {
      const brainDump = "Fix bug. Update docs. Respond to emails. Plan meeting.";
      expect(isBrainDump(brainDump)).toBe(true);
    });

    it("should identify single tasks", () => {
      const singleTask = "Write project proposal";
      expect(isBrainDump(singleTask)).toBe(false);
    });

    it("should handle two tasks as not brain dump", () => {
      const twoTasks = "Task one. Task two";
      expect(isBrainDump(twoTasks)).toBe(false);
    });
  });

  describe("getMockBreakdown", () => {
    it("should return brain dump breakdown for multiple tasks", () => {
      const brainDump = "Fix bug. Update docs. Respond to emails.";
      const breakdown = getMockBreakdown(brainDump);
      
      expect(breakdown.length).toBeGreaterThan(0);
      expect(breakdown[0].title).toBe("Review all items");
      expect(breakdown[1].title).toBe("Prioritize tasks");
    });

    it("should return single task breakdown", () => {
      const singleTask = "Write proposal";
      const breakdown = getMockBreakdown(singleTask);
      
      expect(breakdown.length).toBeGreaterThan(0);
      expect(breakdown[0].title).toBe("Prepare and gather resources");
      expect(breakdown[2].title).toBe("Execute the main task");
    });

    it("should include descriptions for all steps", () => {
      const task = "Do something";
      const breakdown = getMockBreakdown(task);
      
      breakdown.forEach((step) => {
        expect(step.description).toBeDefined();
        expect(step.description).toBeTruthy();
      });
    });

    it("should have unique IDs for all steps", () => {
      const task = "Do something";
      const breakdown = getMockBreakdown(task);
      const ids = breakdown.map((s) => s.id);
      
      expect(new Set(ids).size).toBe(ids.length);
    });

    it("should have title and id for all steps", () => {
      const task = "Do something";
      const breakdown = getMockBreakdown(task);
      
      breakdown.forEach((step) => {
        expect(step.id).toBeDefined();
        expect(step.title).toBeDefined();
      });
    });
  });

  describe("breakdownTasks", () => {
    it("should return valid breakdown result", async () => {
      const result = await breakdownTasks("Simple task", 50);
      
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toHaveProperty("id");
      expect(result[0]).toHaveProperty("title");
    }, { timeout: 15000 });

    it("should handle different granularity levels", async () => {
      const tinySteps = await breakdownTasks("Test task", 20);
      const bigMilestones = await breakdownTasks("Test task", 80);
      
      expect(Array.isArray(tinySteps)).toBe(true);
      expect(Array.isArray(bigMilestones)).toBe(true);
      expect(tinySteps.length).toBeGreaterThan(0);
      expect(bigMilestones.length).toBeGreaterThan(0);
    }, { timeout: 15000 });
  });
});
