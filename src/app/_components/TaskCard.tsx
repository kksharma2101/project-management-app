"use client";
import { api } from "@/trpc/react";

export default function TaskCard() {
  const { data: tasks, isLoading } = api.task.getAllTasks.useQuery();

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="grid gap-4 p-4 sm:grid-cols-2">
      {tasks?.map((task) => (
        <div key={task?.id} className="flex flex-col gap-5 border p-4 shadow rounded-sm cursor-pointer">
          <h3 className="text-lg font-bold uppercase">{task?.title}</h3>
          <p className="opacity-40">{task?.description}</p>
          <p>Deadline: {new Date(task?.deadline).toLocaleString()}</p>
          <p>Priority: {task?.priority}</p>
          <p>Tags: {task?.tags.join(", ")}</p>
          <p>Assigned to: {task?.assignedTo?.name || "Unassigned"}</p>
        </div>
      ))}
    </div>
  );
}
