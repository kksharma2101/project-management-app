import { type Task } from "@prisma/client";

export type TaskFormData = {
    title: string;
    description: string; // This is the problematic part
    deadline: string;
    priority: "LOW" | "MEDIUM" | "HIGH";
    tags: string[];
    status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
    assignedToId: string | undefined
};

export type TaskWithRelations = Task & {
    id?: string;
    assignedTo?: {
        name: string | null;
        id: string;
        email: string | null;
        password: string | null; // Consider if password should be here for a 'relation' type
        bio: string | null;
        emailVerified: Date | null;
        createdAt: Date;
    } | null; // Ensure assignedTo also correctly reflects its nullable nature
    user?: string | null; // <--- CHANGE THIS LINE: Now explicitly allows null
    title?: string;
    description?: string;
    deadline?: string | any;
    priority?: "LOW" | "MEDIUM" | "HIGH";
    tags?: string[];
    status?: "PENDING" | "IN_PROGRESS" | "COMPLETED";
    assignedToId?: string | null;
};