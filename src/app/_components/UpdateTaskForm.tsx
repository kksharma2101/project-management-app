"use client";

import TaskForm from "@/app/_components/TaskForm";
import { api } from "@/trpc/react";
import type { TaskFormData, TaskWithRelations } from "@/types/task";

type UpdateTaskFormProps = {
  task: TaskWithRelations;
  onCancel: () => void;
  onSuccess?: () => void;
};

export default function UpdateTask({
  task,
  onCancel,
  onSuccess,
}: UpdateTaskFormProps) {
  const { mutate: updateTask, isPending } = api.task.updateTask.useMutation({
    onSuccess: () => {
      void api.useUtils().task.getAllTasks.invalidate();
      onSuccess?.();
    },
  });

  const handleSubmit = (data: TaskFormData) => {
    updateTask({
      id: task.id,
      data: {
        title: data.title,
        description: data.description,
        deadline: data.deadline, // Ensure this matches your schema
        status: data.status,
        priority: data.priority,
        tags: data?.tags,
        assignedToId: data.assignedToId,
      },
    });
  };

  return (
    <div className="mx-auto my-auto h-lvh max-w-3xl">
      <TaskForm
        defaultValues={{
          title: task?.title,
          description: task?.description ?? "",
          status: task?.status,
          priority: task?.priority,
          deadline: new Date(task?.deadline).toLocaleString(),
          tags: task?.tags ?? [],
          assignedToId: task?.assignedToId ?? undefined,
        }}
        headingText="Update Task"
        onSubmit={handleSubmit}
        isLoading={isPending}
        onCancel={onCancel}
        submitButtonText="Save Changes"
      />
    </div>
  );
}
