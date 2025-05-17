// apps/web/src/server/api/routers/task.ts
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";

export const taskRouter = createTRPCRouter({
    create: protectedProcedure
        .input(
            z.object({
                title: z.string().min(1),
                description: z.string().optional(),
                projectId: z.string(),
                status: z.enum(["TODO", "IN_PROGRESS", "DONE", "BLOCKED"]).optional(),
                priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]).optional(),
                dueDate: z.date().optional(),
                assigneeIds: z.array(z.string()).optional(),
                tagIds: z.array(z.string()).optional(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const task = await ctx.db.task.create({
                data: {
                    title: input.title,
                    description: input.description,
                    status: input.status ?? "TODO",
                    priority: input.priority ?? "MEDIUM",
                    dueDate: input.dueDate,
                    projectId: input.projectId,
                    creatorId: ctx.session.user.id,
                    assignees: {
                        connect: input.assigneeIds?.map((id) => ({ id })),
                    },
                    tags: {
                        connect: input.tagIds?.map((id) => ({ id })),
                    },
                },
                include: {
                    assignees: true,
                    tags: true,
                    project: true,
                },
            });
            return task;
        }),

    getAll: protectedProcedure
        .input(
            z.object({
                projectId: z.string().optional(),
                status: z.string().optional(),
                priority: z.string().optional(),
            })
        )
        .query(({ ctx, input }) => {
            return ctx.db.task.findMany({
                where: {
                    OR: [
                        { creatorId: ctx.session.user.id },
                        { assignees: { some: { id: ctx.session.user.id } } },
                    ],
                    projectId: input.projectId,
                    status: input.status,
                    priority: input.priority,
                },
                include: {
                    assignees: true,
                    tags: true,
                    project: {
                        include: {
                            team: true,
                        },
                    },
                },
                orderBy: {
                    dueDate: "asc",
                },
            });
        }),

    update: protectedProcedure
        .input(
            z.object({
                id: z.string(),
                data: z.object({
                    title: z.string().min(1).optional(),
                    description: z.string().optional(),
                    status: z
                        .enum(["TODO", "IN_PROGRESS", "DONE", "BLOCKED"])
                        .optional(),
                    priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]).optional(),
                    dueDate: z.date().optional(),
                    assigneeIds: z.array(z.string()).optional(),
                    tagIds: z.array(z.string()).optional(),
                }),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const { id, data } = input;
            return ctx.db.task.update({
                where: { id },
                data: {
                    title: data.title,
                    description: data.description,
                    status: data.status,
                    priority: data.priority,
                    dueDate: data.dueDate,
                    assignees: data.assigneeIds
                        ? { set: data.assigneeIds.map((id) => ({ id })) }
                        : undefined,
                    tags: data.tagIds
                        ? { set: data.tagIds.map((id) => ({ id })) }
                        : undefined,
                },
                include: {
                    assignees: true,
                    tags: true,
                },
            });
        }),

    delete: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ ctx, input }) => {
            return ctx.db.task.delete({
                where: { id: input.id },
            });
        }),
});