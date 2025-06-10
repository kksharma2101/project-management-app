"use client";

import React from "react";
import { api } from "@/trpc/react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import TaskDetails from "@/app/_components/TaskDetails";

function page() {
  const param = useParams();
  const taskId = typeof param.id === "string" ? param.id : undefined;
  const {
    data: task,
    isLoading,
    error,
  } = api.task.getTask.useQuery({
    id: taskId as string,
  });

  if (isLoading || !taskId) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading task...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        Error loading task: {error.message}
      </div>
    );
  }

  if (!task) {
    return (
      <div className="flex h-screen items-center justify-center">
        Task with ID "{taskId}" not found.
      </div>
    );
  }

  return (
    <div className="mt-16 p-4 md:mt-0 md:ml-20">
      <Link
        href="/"
        className="mb-4 flex items-center text-sm text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="mr-1 h-4 w-4" />
        Back to Dashboard
      </Link>
      <TaskDetails task={task} />
    </div>
  );
}

export default page;
