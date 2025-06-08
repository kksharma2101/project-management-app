"use client";
import TaskForm from "@/app/_components/TaskForm";
import { api } from "@/trpc/react";
import type { TaskFormData } from "@/types/task";
import { useRouter } from "next/navigation";

export default function CreateTaskPage() {
  const ctx = api.useUtils();
  const router = useRouter();
  const {
    mutate: createTask,
    isPending,
    error,
  } = api.task.createTask.useMutation({
    onSuccess: () => {
      void ctx.task.getAllTasks.invalidate();
    },
  });

  const handleSubmit = (data: TaskFormData) => {
    const res = createTask({
      title: data.title,
      description: data.description,
      status: data.status,
      priority: data.priority,
      assignedToId: data.assignedToId,
      deadline: new Date(data.deadline).toDateString(),
      tags: data.tags,
    });
    console.log(error);
    // if (res) router.push("/");
  };

  return (
    <div className="mx-auto max-w-full px-5 md:ml-20">
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
