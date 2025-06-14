import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const userRouter = createTRPCRouter({
    getProfile: protectedProcedure.query(async ({ ctx }) => {
        return ctx.db.user.findUnique({
            where: { id: ctx.session.user.id },
        });
    }),

    updateProfile: protectedProcedure
        .input(
            z.object({
                name: z.string().min(1),
                bio: z.string().optional(),
                phone: z.string().optional(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            return ctx.db.user.update({
                where: { id: ctx.session.user.id },
                data: {
                    name: input.name,
                    bio: input.bio,
                    phone: input.phone
                },
            });
        }),

    getAllUser: protectedProcedure.query(async ({ ctx }) => {
        return ctx.db.user.findMany({
            // include: { assignedTo: true },
            orderBy: { createdAt: "desc" },
        });
    })
});
