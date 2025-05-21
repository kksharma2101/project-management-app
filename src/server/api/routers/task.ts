import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const taskRouter = createTRPCRouter({
  createTask: protectedProcedure
    .input(z.object({
      title: z.string(),
      description: z.string(),
      deadline: z.string(),
      status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED"]),
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
          status: input.status,
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
  //     data: z.object({
  //       title: z.string().min(1).optional(),
  //       description: z.string().optional(),
  //       status: z
  //         .enum(["PENDING", "IN_PROGRESS", "COMPLETED"])
  //         .optional(),
  //       priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
  //       deadline: z.date().optional(),
  //       tags: z.array(z.string()),
  // assignedToId: z.string().optional(),
  //     }),
  //   })
  // )
  // .mutation(async ({ ctx, input }) => {
  //   const { id, data } = input;
  //   return ctx.db.task.update({
  //     where: { id },
  //     data: {
  //       title: data.title,
  //       description: data.description,
  //       deadline: data.deadline,
  //       status: data.status,
  //       priority: data.priority,
  //       tags: data.tags,
  //       assignedToId: data.assignedToId,
  //     },

  //   });
  // }),

  deleteTask: protectedProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    return ctx.db.task.delete({ where: { id: input } });
  }),

});
