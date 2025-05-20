import { type Task } from "@prisma/client";

export type TaskFormData = {
    title: string;
    description: string; // This is the problematic part
    deadline: string;
    priority: "LOW" | "MEDIUM" | "HIGH";
    tags: string[];
    status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
    assignedToId?: string | undefined
};

export type TaskWithRelations = Task & {
    user: {
        id: string;
        name: string | null;
    };
    assignedTo?: {
        id: string;
        name: string | null;
    } | null;
};