import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const taskRouter = createTRPCRouter({

  // Create New Task
  createTask: protectedProcedure
    .input(z.object({
      title: z.string(),
      description: z.string(),
      deadline: z.string(),
      status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED"]),
      priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
      tags: z.array(z.string()).min(1),
      // z.union([
      //   z.array(z.string()),
      //   z.string().transform(str => str.split('')),
      // ]),
      assignedToId: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.task.create({
        data: {
          title: input.title,
          description: input.description,
          deadline: new Date(input.deadline),
          status: input.status,
          priority: input.priority,
          tags: input.tags,
          assignedToId: input.assignedToId,
        },
      });
    }),

  // Fetch All Task
  getAllTasks: protectedProcedure.query(({ ctx }) => {
    return ctx.db.task.findMany({
      include: { assignedTo: true },
      orderBy: { createdAt: "desc" },
    });
  }),

  // Fetch Single Task
  getTask: protectedProcedure.input(z.object({ id: z.string().cuid().or(z.string().uuid()) })).query(({ ctx, input }) => {
    return ctx.db.task.findUnique({
      where: {
        id: input.id
      }
    });
  }),

  // Update Task
  updateTask: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        data: z.object({
          title: z.string(),
          description: z.string(),
          deadline: z.string(),
          status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED"]),
          priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
          tags: z.array(z.string()),
          // z.union([
          //   z.array(z.string()),
          //   z.string().transform(str => str.split('')),
          // ]),
          assignedToId: z.string().optional(),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.task.update({
        where: { id: input.id },
        data: {
          title: input.data.title,
          description: input.data.description,
          deadline: new Date(input.data.deadline),
          status: input.data.status,
          priority: input.data.priority,
          tags: input.data.tags,
          assignedToId: input.data.assignedToId,
        },
      });
    }),

  // Delete Task
  deleteTask: protectedProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    const task = await ctx.db.task.findUnique({
      where: { id: input },
    });

    if (!task) {
      throw new TRPCError({ code: 'NOT_FOUND' });
    }

    // Perform deletion
    try {
      return await ctx.db.task.delete({ where: { id: input } });
    } catch (error) {
      console.error('Failed to delete task:', error);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to delete task'
      });
    }
  }),

});
