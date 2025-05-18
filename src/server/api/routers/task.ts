import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const taskRouter = createTRPCRouter({
  createTask: protectedProcedure
    .input(z.object({
      title: z.string(),
      description: z.string(),
      deadline: z.string(),
      priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
      tags: z.array(z.string()),
      assignedToId: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.task.create({
        data: {
          title: input.title,
          description: input.description,
          deadline: new Date(input.deadline),
          priority: input.priority,
          tags: input.tags,
          assignedToId: input.assignedToId,
        },
      });
    }),

  getAllTasks: protectedProcedure.query(({ ctx }) => {
    return ctx.db.task.findMany({
      include: { assignedTo: true },
      orderBy: { createdAt: "desc" },
    });
  }),
});
