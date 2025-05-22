"use client";
import TaskForm from "@/app/_components/TaskForm";
import { api } from "@/trpc/react";
import type { TaskFormData } from "@/types/task";
import { useRouter } from "next/navigation";

export default function CreateTaskPage() {
  const ctx = api.useUtils();
  const router = useRouter();
  const { mutate: createTask, isPending } = api.task.createTask.useMutation({
    onSuccess: () => {
      void ctx.task.getAllTasks.invalidate();
    },
  });

  const handleSubmit = (data: TaskFormData) => {
    createTask({
      title: data.title,
      description: data.description,
      status: data.status,
      priority: data.priority,
      assignedToId: data.assignedToId,
      deadline: new Date(data.deadline).toDateString(),
      tags: Array(data.tags),
    });
    router.push("/");
  };

  return (
    <div className="mx-auto max-w-3xl px-5">
      <TaskForm
        onSubmit={handleSubmit}
        isLoading={isPending}
        headingText="Create Task"
        // onCancel={() => setIsOpen(false)}
        submitButtonText="Create Task"
      />
    </div>
  );
}
