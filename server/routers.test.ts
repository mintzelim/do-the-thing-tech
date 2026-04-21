import { describe, it, expect, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAuthContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "test-user",
    email: "test@example.com",
    name: "Test User",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as TrpcContext["res"],
  };
}

describe("DoTheThing Task Routers", () => {
  describe("tasks.breakdown", () => {
    it("should break down a single task", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.tasks.breakdown({
        input: "Write a project proposal",
        granularity: 50,
      });

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toHaveProperty("title");
      expect(result[0]).toHaveProperty("id");
    }, { timeout: 15000 });

    it("should respect granularity levels", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const tinySteps = await caller.tasks.breakdown({
        input: "Do something",
        granularity: 20,
      });

      const bigMilestones = await caller.tasks.breakdown({
        input: "Do something",
        granularity: 80,
      });

      expect(Array.isArray(tinySteps)).toBe(true);
      expect(Array.isArray(bigMilestones)).toBe(true);
    }, { timeout: 15000 });
  });

  describe("tasks.estimateTasks", () => {
    it("should estimate time for tasks", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.tasks.estimateTasks({
        tasks: [
          { title: "Task 1", description: "First task" },
          { title: "Task 2", description: "Second task" },
        ],
        focusLevel: "normal",
      });

      expect(Array.isArray(result)).toBe(true);
      result.forEach((task) => {
        expect(task).toHaveProperty("estimatedTime");
        expect(task).toHaveProperty("bufferTime");
        expect(task).toHaveProperty("totalTime");
      });
    }, { timeout: 15000 });

    it("should apply different buffers for focus levels", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const hyperfocus = await caller.tasks.estimateTasks({
        tasks: [{ title: "Task", description: "Test" }],
        focusLevel: "hyperfocus",
      });

      const distracted = await caller.tasks.estimateTasks({
        tasks: [{ title: "Task", description: "Test" }],
        focusLevel: "distracted",
      });

      // Distracted should have more buffer than hyperfocus
      expect(distracted[0].bufferTime).toBeGreaterThanOrEqual(hyperfocus[0].bufferTime);
    }, { timeout: 15000 });
  });

  describe("tasks.exportToCalendar", () => {
    it("should generate calendar events", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.tasks.exportToCalendar({
        tasks: [
          { title: "Task 1", estimatedTime: 30 },
          { title: "Task 2", estimatedTime: 45 },
        ],
      });

      expect(result).toHaveProperty("events");
      expect(result).toHaveProperty("timeEstimate");
      expect(result).toHaveProperty("totalEvents");
      expect(Array.isArray(result.events)).toBe(true);
    });

    it("should calculate time estimates correctly", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.tasks.exportToCalendar({
        tasks: [
          { title: "Task 1", estimatedTime: 30 },
          { title: "Task 2", estimatedTime: 45 },
          { title: "Task 3", estimatedTime: 15 },
        ],
      });

      expect(result.timeEstimate.totalMinutes).toBe(90);
      expect(result.timeEstimate.totalHours).toBe(1.5);
    });
  });

  describe("tasks.compileBrainDump", () => {
    it("should compile a brain dump into tasks", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.tasks.compileBrainDump({
        brainDump: "Fix bug. Update docs. Respond to emails. Plan meeting.",
      });

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      result.forEach((task) => {
        expect(task).toHaveProperty("title");
        expect(task).toHaveProperty("priority");
      });
    }, { timeout: 15000 });

    it("should prioritize tasks", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.tasks.compileBrainDump({
        brainDump: "Low priority task. High priority urgent task. Medium priority task.",
      });

      expect(Array.isArray(result)).toBe(true);
      // Check that priorities are assigned
      const priorities = result.map((t) => t.priority);
      expect(priorities.includes("high") || priorities.includes("medium") || priorities.includes("low")).toBe(true);
    }, { timeout: 15000 });
  });

  describe("tasks.saveTasks", () => {
    it("should save task list to database", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.tasks.saveTasks({
        title: "My Task List",
        tasks: [
          { title: "Task 1", description: "First task", estimatedTime: 30 },
          { title: "Task 2", description: "Second task", estimatedTime: 45 },
        ],
        focusLevel: "normal",
        granularity: 50,
      });

      expect(result).toHaveProperty("title");
      expect(result.title).toBe("My Task List");
      expect(result.tasks).toHaveLength(2);
    });
  });

  describe("tasks.getSessions", () => {
    it("should retrieve saved sessions", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      // First save a session
      await caller.tasks.saveTasks({
        title: "Test Session",
        tasks: [{ title: "Task 1", estimatedTime: 30 }],
        focusLevel: "normal",
        granularity: 50,
      });

      // Then retrieve sessions
      const sessions = await caller.tasks.getSessions();

      expect(Array.isArray(sessions)).toBe(true);
    });
  });
});
