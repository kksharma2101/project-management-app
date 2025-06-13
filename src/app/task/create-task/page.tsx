"use client";
import TaskForm from "@/app/_components/TaskForm";
import { api } from "@/trpc/react";
import type { TaskFormData } from "@/types/task";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

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
    onError: () => toast.error("Something went wrong!"),
  });

  const handleSubmit = (data: TaskFormData) => {
    createTask({
      title: data.title,
      description: data.description,
      status: data.status,
      priority: data.priority,
      assignedToId: data.assignedToId,
      deadline: new Date(data.deadline).toDateString(),
      tags: [data?.tags.toString()],
    });
    if (!error) {
      toast.success("Task create successfully");
      router.push("/");
    }
  };

  if (isPending) {
    return (
      <p className="flex h-screen items-center justify-center">Loading...</p>
    );
  }

  if (error) {
    return (
      <p className="flex h-screen items-center justify-center">
        Error creating task: {error.message}
      </p>
    );
  }

  return (
    <div className="mx-auto max-w-full px-5 md:ml-20">
      <TaskForm
        onSubmit={handleSubmit}
        isLoading={isPending}
        headingText="Create Task"
        submitButtonText="Create Task"
      />
    </div>
  );
}
