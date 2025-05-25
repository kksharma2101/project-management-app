import { type Task } from "@prisma/client";

export type TaskFormData = {
    title: string;
    description: string; // This is the problematic part
    deadline: string;
    user?: string;
    priority: "LOW" | "MEDIUM" | "HIGH";
    tags: string[];
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
    assignedTo?: UserDetails,
    user?: string;
    title?: string;
    description?: string;
    deadline?: string
    priority?: string
    tags?: string[];
    status?: string
    assignedToId?: string | null;
};

export type TaskFormValues = {
    title: string;
    description: string;
    deadline: string; // ISO string
    priority: "LOW" | "MEDIUM" | "HIGH";
    status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
    tags: string[];
    assignedToId: string; // user IDs
};
