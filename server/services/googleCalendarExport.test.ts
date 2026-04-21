import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  generateCalendarEvents,
  estimateTotalCalendarTime,
  calculateOptimalStartTime,
  formatForGoogleCalendar,
} from "./googleCalendarExport";

describe("Google Calendar Export Service", () => {
  describe("generateCalendarEvents", () => {
    it("should generate events for tasks", () => {
      const tasks = [
        { title: "Task 1", estimatedTime: 30 },
        { title: "Task 2", estimatedTime: 45 },
      ];

      const events = generateCalendarEvents(tasks);

      expect(Array.isArray(events)).toBe(true);
      expect(events.length).toBeGreaterThanOrEqual(2);
      expect(events[0].title).toBe("Task 1");
      expect(events[1].title).toBe("Task 2");
    });

    it("should schedule events with proper timing", () => {
      const tasks = [{ title: "Task 1", estimatedTime: 60 }];
      const startDate = new Date("2026-04-21T09:00:00");

      const events = generateCalendarEvents(tasks, startDate);

      expect(events.length).toBeGreaterThan(0);
      expect(events[0].startTime.getHours()).toBe(9);
      expect(events[0].endTime.getHours()).toBe(10);
    });

    it("should add breaks between tasks", () => {
      const tasks = [
        { title: "Task 1", estimatedTime: 30 },
        { title: "Task 2", estimatedTime: 30 },
      ];
      const startDate = new Date("2026-04-21T09:00:00");

      const events = generateCalendarEvents(tasks, startDate);

      expect(events.length).toBeGreaterThanOrEqual(2);
      // Second task should start after first task + 15 min break
      expect(events[1].startTime.getMinutes()).toBe(45);
    });

    it("should handle tasks with descriptions", () => {
      const tasks = [
        { title: "Task 1", description: "Do something", estimatedTime: 30 },
      ];

      const events = generateCalendarEvents(tasks);

      expect(events.length).toBeGreaterThan(0);
      expect(events[0].description).toBe("Do something");
    });
  });

  describe("estimateTotalCalendarTime", () => {
    it("should calculate total time correctly", () => {
      const tasks = [
        { title: "Task 1", estimatedTime: 30 },
        { title: "Task 2", estimatedTime: 45 },
        { title: "Task 3", estimatedTime: 15 },
      ];

      const result = estimateTotalCalendarTime(tasks);

      expect(result.totalMinutes).toBe(90);
      expect(result.totalHours).toBe(1.5);
      expect(result.withBreaks).toBe(120); // 90 + 30 (2 breaks * 15 min)
    });

    it("should handle single task", () => {
      const tasks = [{ title: "Task 1", estimatedTime: 60 }];

      const result = estimateTotalCalendarTime(tasks);

      expect(result.totalMinutes).toBe(60);
      expect(result.totalHours).toBe(1);
      expect(result.withBreaks).toBe(60); // No breaks for single task
    });

    it("should handle empty task list", () => {
      const result = estimateTotalCalendarTime([]);

      expect(result.totalMinutes).toBe(0);
      expect(result.totalHours).toBe(0);
      expect(result.withBreaks).toBe(0);
    });
  });

  describe("calculateOptimalStartTime", () => {
    it("should return a valid date", () => {
      const tasks = [{ title: "Task", estimatedTime: 30 }];
      const result = calculateOptimalStartTime(tasks, 9);

      expect(result instanceof Date).toBe(true);
      expect(result.getHours()).toBe(9);
    });

    it("should use preferred hour", () => {
      const tasks = [{ title: "Task", estimatedTime: 30 }];
      const result = calculateOptimalStartTime(tasks, 14);

      expect(result.getHours()).toBe(14);
    });

    it("should handle different preferred hours", () => {
      const tasks = [{ title: "Task", estimatedTime: 30 }];
      
      const morning = calculateOptimalStartTime(tasks, 8);
      const afternoon = calculateOptimalStartTime(tasks, 14);
      
      expect(morning.getHours()).toBe(8);
      expect(afternoon.getHours()).toBe(14);
    });
  });

  describe("formatForGoogleCalendar", () => {
    it("should format events for Google Calendar API", () => {
      const events = [
        {
          title: "Task 1",
          description: "Description",
          startTime: new Date("2026-04-21T09:00:00"),
          endTime: new Date("2026-04-21T09:30:00"),
          priority: "high" as const,
        },
      ];

      const formatted = formatForGoogleCalendar(events);

      expect(formatted[0].summary).toBe("Task 1");
      expect(formatted[0].description).toBe("Description");
      expect(formatted[0].colorId).toBe("1"); // high priority
    });

    it("should assign correct color IDs based on priority", () => {
      const events = [
        {
          title: "High",
          description: "",
          startTime: new Date(),
          endTime: new Date(),
          priority: "high" as const,
        },
        {
          title: "Medium",
          description: "",
          startTime: new Date(),
          endTime: new Date(),
          priority: "medium" as const,
        },
        {
          title: "Low",
          description: "",
          startTime: new Date(),
          endTime: new Date(),
          priority: "low" as const,
        },
      ];

      const formatted = formatForGoogleCalendar(events);

      expect(formatted[0].colorId).toBe("1");
      expect(formatted[1].colorId).toBe("2");
      expect(formatted[2].colorId).toBe("3");
    });

    it("should include ISO datetime strings", () => {
      const events = [
        {
          title: "Task",
          description: "Test",
          startTime: new Date("2026-04-21T09:00:00"),
          endTime: new Date("2026-04-21T10:00:00"),
        },
      ];

      const formatted = formatForGoogleCalendar(events);

      expect(formatted[0].start.dateTime).toContain("T");
      expect(formatted[0].end.dateTime).toContain("T");
    });
  });
});
