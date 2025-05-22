import { type Task } from "@prisma/client";

export type TaskFormData = {
    title: string;
    description: string; // This is the problematic part
    deadline: string;
    user?: string | null;
    priority: "LOW" | "MEDIUM" | "HIGH";
    tags: [];
    status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
    assignedToId: string | undefined
};

export interface UserDetails {
    id?: string,
    name?: string,
    email?: string,
    password?: string,
    bio?: string | null,
    emailVerified?: Date,
    createdAt?: Date
}

export type TaskWithRelations = Task & {
    id?: string;
    assignedTo?: UserDetails | null,
    user?: string | null;
    title?: string;
    description?: string;
    deadline?: string
    priority?: string
    tags?: [];
    status?: string
    assignedToId?: string | null;
};