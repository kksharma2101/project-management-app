"use client";

import { useState } from "react";
import {
  User,
  Phone,
  Captions,
  ListCheckIcon,
  ChartBarStacked,
  Target,
  TagsIcon,
  ReceiptText,
  UserCheckIcon,
} from "lucide-react";
import type { TaskDetails, TaskFormData } from "@/types/task";
import TaskForm from "./TaskForm";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Button from "./ui_components/Button";

interface TaskDetailsProps {
  task: TaskDetails;
}

export default function TaskDetails({ task }: TaskDetailsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const ctx = api.useUtils();

  const {
    mutate: updateTask,
    isPending,
    error,
  } = api.task.updateTask.useMutation({
    onSuccess: () => {
      ctx.task.getTask.invalidate({ id: task.id });
    },
    onError: () => toast.error("Something wrong update task"),
  });

  const { mutate: deleteTask, isPending: isDeleting } =
    api.task.deleteTask.useMutation({
      onSuccess: () => {
        void ctx.task.getAllTasks.invalidate();
      },
      onError: () => toast.error("Something  wrong delete task"),
    });

  const handleSubmit = (data: TaskFormData) => {
    updateTask({
      id: task.id,
      data: {
        title: data.title,
        description: data.description,
        deadline: new Date(data.deadline).toDateString(),
        status: data.status,
        priority: data.priority,
        tags: [data?.tags.toString()],
        assignedToId: data?.assignedToId,
      },
    });
    if (!error) {
      setIsEditing(false);
      toast.success("Task Update successfully");
    }
  };

  if (isPending) {
    return (
      <p className="flex h-screen items-center justify-center">Loading...</p>
    );
  }

  return (
    <>
      <div className={isEditing ? "block" : "hidden"}>
        <TaskForm
          defaultValues={{
            title: task?.title,
            description: task?.description ?? "",
            status: task?.status,
            priority: task?.priority,
            deadline: task?.deadline.toLocaleString(),
            tags: task?.tags,
            assignedToId: task?.assignedToId ?? undefined,
          }}
          onSubmit={handleSubmit}
          isLoading={isPending}
          submitButtonText="Save"
          headingText="Update Task"
        />
      </div>
      <div
        className={`overflow-hidden rounded-lg bg-white shadow ${!isEditing ? "block" : "hidden"}`}
      >
        <div className="flex flex-col border-b border-gray-200 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Task</h2>
            <span className="text-sm text-gray-400">
              Created on {task.createdAt.toDateString()}
            </span>
          </div>
          <span className="">{task?.status}</span>
        </div>

        <div className="grid grid-cols-1 gap-8 p-4 md:grid-cols-2">
          {/* task Details */}
          <div className="space-y-4">
            <h3 className="mb-5 w-fit border-b text-lg font-bold">
              Task Details
            </h3>
            <div className="flex items-center gap-4 text-gray-500">
              <span title="Title">
                <Captions className="h-6 w-6" />
              </span>
              <span className="text-gray-800">{task.title}</span>
            </div>

            <div className="flex items-center gap-4 text-gray-500">
              <span title="Priority">
                <ListCheckIcon className="h-6 w-6" />
              </span>
              <span className="text-gray-800">{task.priority}</span>
            </div>

            <div className="flex items-center gap-4 text-gray-500">
              <span title="Status">
                <ChartBarStacked className="h-6 w-6" />
              </span>
              <span className="text-gray-800">{task.status}</span>
            </div>

            <div className="flex items-center gap-4 text-gray-500">
              <span title="Deadline">
                <Target className="h-6 w-6" />
              </span>
              <span className="text-gray-800">
                {task.deadline.toLocaleString()}
              </span>
            </div>

            <div className="flex items-center gap-4 text-gray-500">
              <span title="Tags">
                <TagsIcon className="h-6 w-6" />
              </span>
              <span className="text-gray-800">{task.tags}</span>
            </div>

            <div className="flex items-start gap-4 text-gray-500">
              <span title="Description">
                <ReceiptText className="mt-1 h-6 w-6" />
              </span>
              <span className="text-justify text-gray-800 md:pr-4">
                {task.description}
              </span>
            </div>
          </div>

          {/* User Info */}
          <div className="space-y-8">
            <h3 className="mb-5 w-fit border-b text-lg font-bold">
              User Information
            </h3>

            <div className="space-y-4">
              <div className="flex items-center gap-4 text-gray-500">
                <span title="User">
                  <User className="h-5 w-5" />
                </span>
                <span className="text-gray-800">{task.user || "----"}</span>
              </div>

              <div className="flex items-center gap-4 text-gray-500">
                <span title="Phone">
                  <Phone className="h-5 w-5" />
                </span>
                <span className="text-gray-800">{task?.phone || "----"}</span>
              </div>

              <div className="flex items-center gap-4 text-gray-500">
                <span title="Assigned User">
                  <UserCheckIcon className="h-5 w-5" />
                </span>
                <span className="text-gray-800">
                  {task?.assignedToId || "----"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex w-full justify-center gap-5 border-t border-gray-200 bg-gray-50 px-4 py-4">
          <Button children="Edit Task" onClick={() => setIsEditing(true)} />

          <Button
            children="Delete"
            isLoading={isDeleting}
            variant="danger"
            onClick={() => {
              deleteTask(task?.id),
                router.push("/"),
                toast.success("Task Deleted");
            }}
            disabled={isDeleting}
          />
        </div>
      </div>
    </>
  );
}
