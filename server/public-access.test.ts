import { describe, expect, it, vi } from "vitest";
import { TRPCError } from "@trpc/server";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createAnonymousContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as TrpcContext["res"],
  };
}

describe("Public access without Manus authentication", () => {
  it("allows anonymous users to break down tasks", async () => {
    const caller = appRouter.createCaller(createAnonymousContext());

    const result = await caller.tasks.breakdown({
      input: "Write a launch checklist",
      granularity: 50,
    });

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toHaveProperty("title");
  }, { timeout: 15000 });

  it("allows anonymous users to estimate tasks with focus-level adjustments in minutes", async () => {
    const caller = appRouter.createCaller(createAnonymousContext());

    const result = await caller.tasks.estimateTasks({
      tasks: [{ title: "Draft proposal", description: "Prepare the first draft" }],
      focusLevel: "normal",
    });

    expect(result).toHaveLength(1);
    expect(result[0].estimatedTime).toBeGreaterThan(0);
    expect(result[0].totalTime).toBeGreaterThan(0);
    expect(Number.isInteger(result[0].totalTime)).toBe(true);
  }, { timeout: 15000 });

  it("allows anonymous users to compile a brain dump", async () => {
    const caller = appRouter.createCaller(createAnonymousContext());

    const result = await caller.tasks.compileBrainDump({
      brainDump: "Email client. Review invoice. Schedule follow-up.",
    });

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toHaveProperty("title");
    expect(result[0]).toHaveProperty("priority");
  }, { timeout: 15000 });

  it("still blocks anonymous users from saving sessions", async () => {
    const caller = appRouter.createCaller(createAnonymousContext());

    await expect(
      caller.tasks.saveTasks({
        title: "Anonymous session",
        tasks: [{ title: "Task 1", estimatedTime: 30 }],
        focusLevel: "normal",
        granularity: 50,
      }),
    ).rejects.toMatchObject<Partial<TRPCError>>({
      code: "UNAUTHORIZED",
    });
  });
});
