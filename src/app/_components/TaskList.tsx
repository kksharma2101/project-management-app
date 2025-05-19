"use client";
import { api } from "@/trpc/react";
import { Tags, Users } from "lucide-react";

export default function TaskList() {
  const { data: tasks, isLoading } = api.task.getAllTasks.useQuery();

  if (isLoading) return <p className="my-auto text-center">Loading...</p>;

  return (
    <div className="grid w-full gap-4 p-4 md:grid-cols-2">
      {tasks?.map((task) => (
        <div
          key={task?.id}
          className="flex cursor-context-menu flex-col justify-between rounded-sm border p-4 shadow"
        >
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold uppercase">{task?.title}</h3>
              <p className="rounded-md bg-gray-200 px-4 py-1 text-sm">
                {new Date().toLocaleString() >
                new Date(task?.deadline).toLocaleString()
                  ? "Expired"
                  : "On-going"}
              </p>
            </div>
            <p className="mb-4 text-sm opacity-60">
              Deadline: {new Date(task?.deadline).toLocaleString()}
            </p>

            <p className="opacity-40">{task?.description}</p>

            <div className="my-2 flex items-center gap-1 text-sm text-gray-600">
              <Tags className="h-4 w-4" />
              Tags: {task?.tags.join(", ")}
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Users className="h-4 w-4" />
              Assigned to: {task?.assignedTo?.name || "N/A"}
            </div>
            <p className="my-2 text-sm text-gray-600">
              Priority: {task?.priority}
            </p>
            <button
              className={
                task?.status === "COMPLETED"
                  ? "bg-green-200"
                  : task?.status == "IN_PROGRESS"
                    ? "bg-blue-200"
                    : "bg-yellow-200"
              }
              style={{
                padding: "2px 10px",
                width: "fit-content",
                borderRadius: "10px",
                fontSize: "11px",
                textTransform: "lowercase",
              }}
            >
              {task?.status}
            </button>
          </div>

          <div className="mt-2 flex items-center justify-between">
            <button className="cursor-pointer rounded-md bg-blue-400 px-3 py-1 hover:bg-blue-300">
              Update
            </button>
            <button className="cursor-pointer rounded-md bg-red-400 px-3 py-1 hover:bg-red-300">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
