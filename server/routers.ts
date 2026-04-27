import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { getDb } from "./db";
import { taskSessions } from "../drizzle/schema";
import { eq, desc } from "drizzle-orm";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  tasks: router({
    breakdown: publicProcedure
      .input(
        z.object({
          input: z.string().min(1, "Task input is required"),
          granularity: z.number().min(0).max(100).default(50),
        })
      )
      .mutation(async ({ input }) => {
        const { breakdownTasks } = await import("../server/services/taskBreakdown");
        return breakdownTasks(input.input, input.granularity);
      }),

    estimateTasks: publicProcedure
      .input(
        z.object({
          tasks: z.array(
            z.object({
              title: z.string(),
              description: z.string().optional(),
            })
          ),
          focusLevel: z.enum(["hyperfocus", "normal", "distracted"]).default("normal"),
        })
      )
      .mutation(async ({ input }) => {
        const { estimateTasksWithBuffer } = await import("../server/services/taskEstimator");
        return estimateTasksWithBuffer(input.tasks, input.focusLevel);
      }),

    saveTasks: protectedProcedure
      .input(
        z.object({
          title: z.string().min(1, "Task list title is required"),
          tasks: z.array(
            z.object({
              title: z.string(),
              description: z.string().optional(),
              estimatedTime: z.number().optional(),
              completed: z.boolean().default(false),
            })
          ),
          focusLevel: z.enum(["hyperfocus", "normal", "distracted"]),
          granularity: z.number(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

        await db.insert(taskSessions).values({
          userId: ctx.user.id,
          title: input.title,
          tasks: JSON.stringify(input.tasks),
          focusLevel: input.focusLevel,
          granularity: input.granularity,
          createdAt: new Date(),
        });

        return { ...input };
      }),

    getSessions: protectedProcedure.query(async ({ ctx }) => {
      const db = await getDb();
      if (!db) return [];

      const sessions = await db
        .select()
        .from(taskSessions)
        .where(eq(taskSessions.userId, ctx.user.id))
        .orderBy(desc(taskSessions.createdAt))
        .limit(50);

      return sessions.map((s) => ({
        ...s,
        tasks: JSON.parse(s.tasks || "[]"),
      }));
    }),

    exportToCalendar: protectedProcedure
      .input(
        z.object({
          tasks: z.array(
            z.object({
              title: z.string(),
              description: z.string().optional(),
              estimatedTime: z.number(),
              priority: z.enum(["high", "medium", "low"]).optional(),
            })
          ),
          startDate: z.date().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const { generateCalendarEvents, estimateTotalCalendarTime, formatForGoogleCalendar } = await import(
          "../server/services/googleCalendarExport"
        );

        const events = generateCalendarEvents(input.tasks, input.startDate);
        const timeEstimate = estimateTotalCalendarTime(input.tasks);
        const formattedEvents = formatForGoogleCalendar(events);

        return {
          events: formattedEvents,
          timeEstimate,
          totalEvents: events.length,
        };
      }),

    compileBrainDump: publicProcedure
      .input(
        z.object({
          brainDump: z.string().min(1, "Brain dump text is required"),
        })
      )
      .mutation(async ({ input }) => {
        const { compileBrainDump } = await import("../server/services/brainDumpCompiler");
        return compileBrainDump(input.brainDump);
      }),
  }),

  contact: router({
    submit: publicProcedure
      .input(
        z.object({
          name: z.string().min(1, "Name is required"),
          email: z.string().email("Invalid email"),
          type: z.enum(["question", "partnership", "bug"]),
          message: z.string().min(1, "Message is required"),
        })
      )
        // Contact form submissions are sent to the project owner via notifyOwner.
        // The owner can respond to the user's email (support@dothething.my) directly.
      .mutation(async ({ input }) => {
        const { notifyOwner } = await import("../server/_core/notification");

        const typeLabel = {
          question: "Question",
          partnership: "Partnership Inquiry",
          bug: "Bug Report",
        }[input.type];

        const title = `${typeLabel} from ${input.name}`;
        const content = `Email: ${input.email}\n\nMessage:\n${input.message}`;

        try {
          await notifyOwner({ title, content });
          return { success: true, message: "Message sent successfully" };
        } catch (error) {
          console.error("Failed to send contact notification:", error);
          return { success: false, message: "Failed to send message" };
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
