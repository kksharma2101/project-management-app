"use client";

import { useState } from "react";
import Link from "next/link";
import { Users, Tags } from "lucide-react";
import { api } from "@/trpc/react";
import UpdateTask from "./UpdateTaskForm";

export default function TaskTable() {
  const [view, setView] = useState<"table" | "card">("table");
  const { data: tasks, isLoading } = api.task.getAllTasks.useQuery();
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  if (isLoading) {
    return <p className="m-auto">Loading...</p>;
  }

  return (
    <div className="w-full">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Recent Task</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setView("table")}
            className={`rounded-md px-3 py-1 text-sm ${view === "table" ? "bg-blue-100 text-blue-700" : "bg-gray-100"}`}
          >
            Table
          </button>
          <button
            onClick={() => setView("card")}
            className={`rounded-md px-3 py-1 text-sm ${view === "card" ? "bg-blue-100 text-blue-700" : "bg-gray-100"}`}
          >
            Cards
          </button>
        </div>
      </div>

      {view === "table" ? (
        // Table
        <div className="grid grid-cols-1 overflow-x-auto rounded-lg bg-white shadow">
          <table className="divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="cursor-pointer px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                >
                  {/* <div className="flex items-center">task ID</div> */}
                  Task ID
                </th>
                <th
                  scope="col"
                  className="cursor-pointer px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                  //   onClick={() => handleSort("customerName")}
                >
                  User
                  {/* <div className="flex items-center">
                    {sortField === "customerName" &&
                      (sortDirection === "asc" ? (
                        <ChevronUp className="ml-1 h-4 w-4" />
                      ) : (
                        <ChevronDown className="ml-1 h-4 w-4" />
                      ))}
                  </div> */}
                </th>
                <th
                  scope="col"
                  className="cursor-pointer px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                  //   onClick={() => handleSort("vehicleType")}
                >
                  Title
                  {/* <div className="flex items-center">
                    Vehicle
                    {sortField === "vehicleType" &&
                      (sortDirection === "asc" ? (
                        <ChevronUp className="ml-1 h-4 w-4" />
                      ) : (
                        <ChevronDown className="ml-1 h-4 w-4" />
                      ))}
                  </div> */}
                </th>
                <th
                  scope="col"
                  className="cursor-pointer px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                  //   onClick={() => handleSort("pickupDate")}
                >
                  Deadline
                  {/* <div className="flex items-center">
                    Pickup
                    {sortField === "pickupDate" &&
                      (sortDirection === "asc" ? (
                        <ChevronUp className="ml-1 h-4 w-4" />
                      ) : (
                        <ChevronDown className="ml-1 h-4 w-4" />
                      ))}
                  </div> */}
                </th>
                <th
                  scope="col"
                  className="cursor-pointer px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                  //   onClick={() => handleSort("dropoffDate")}
                >
                  Priority
                  {/* <div className="flex items-center">
                    Drop-off
                    {sortField === "dropoffDate" &&
                      (sortDirection === "asc" ? (
                        <ChevronUp className="ml-1 h-4 w-4" />
                      ) : (
                        <ChevronDown className="ml-1 h-4 w-4" />
                      ))}
                  </div> */}
                </th>
                <th
                  scope="col"
                  className="cursor-pointer px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                  //   onClick={() => handleSort("status")}
                >
                  Status
                  {/* <div className="flex items-center">
                    {sortField === "status" &&
                      (sortDirection === "asc" ? (
                        <ChevronUp className="ml-1 h-4 w-4" />
                      ) : (
                        <ChevronDown className="ml-1 h-4 w-4" />
                      ))}
                  </div> */}
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {tasks?.map((task) => (
                <tr key={task.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900">
                    {task.id.slice(7, 12)}
                  </td>
                  <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                    {task?.user}
                  </td>
                  <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                    {task?.title}
                  </td>
                  <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                    {new Date(task.deadline).toLocaleString().split(",")[0]}
                  </td>
                  <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                    {task.priority}
                  </td>
                  <td className="px-6 py-4 text-[10px] whitespace-nowrap">
                    {task.status}
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                    <Link
                      href={`/tasks/${task.id}`}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        // Card
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tasks?.map((task) => (
            <div
              key={task?.id}
              className="flex cursor-context-menu flex-col justify-between rounded-sm border p-4 shadow"
            >
              {editingTaskId === task.id ? (
                <div className="h-full overflow-auto">
                  <UpdateTask
                    task={task}
                    onCancel={() => setEditingTaskId(null)}
                    onSuccess={() => setEditingTaskId(null)}
                  />
                </div>
              ) : (
                <div className="flex h-full flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold uppercase">
                        {task?.title}
                      </h3>
                      <p className="rounded-md bg-gray-200 px-4 py-1 text-sm">
                        {new Date().toLocaleDateString() >
                        new Date(task?.deadline).toLocaleDateString()
                          ? "Expired"
                          : "On-going"}
                        {/* {new Date(task.deadline)
                      .toLocaleDateString()
                      .replaceAll("/", "")} */}
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
                      Assigned to: {task?.assignedTo?.name ?? "N/A"}
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

                  {/* <div className="mt-2 flex items-center justify-between">
                    <button
                      onClick={() => setEditingTaskId(task.id)}
                      className="cursor-pointer rounded-md bg-blue-400 px-3 py-1 hover:bg-blue-300"
                    >
                      Update
                    </button>

                    <button
                      className="cursor-pointer rounded-md bg-red-400 px-3 py-1 hover:bg-red-300"
                      onClick={() => {
                        deleteTask(task.id);
                      }}
                    >
                      {isPending ? "...Deleting" : "Delete"}
                    </button>
                  </div> */}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
