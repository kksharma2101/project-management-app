"use client";
import TaskForm from "@/app/_components/TaskForm";
import { api } from "@/trpc/react";
import type { TaskFormData } from "@/types/task";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateTaskPage() {
  // const [isOpen, setIsOpen] = useState(false);
  const ctx = api.useUtils();
  const session = useSession();
  const router = useRouter();
  const { mutate: createTask, isPending } = api.task.createTask.useMutation({
    onSuccess: () => {
      void ctx.task.getAllTasks.invalidate();
      // setIsOpen(false);
    },
  });

  const handleSubmit = (data: any) => {
    data.assignedToId = session.data?.user.id;
    data.user = session?.data?.user.name;
    createTask({
      ...data,
      deadline: new Date(data.deadline).toDateString(),
      tags: data.tags.split(",").map((tag: string) => tag.trim()),
    });
    router.push("/");
  };

  // if (!isOpen) {
  //   return (
  //     <button
  //       onClick={() => setIsOpen(true)}
  //       className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
  //     >
  //       Create New Task
  //     </button>
  //   );
  // }
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
