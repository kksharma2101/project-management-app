"use client";
import { useForm } from "react-hook-form";
import { api } from "@/trpc/react";
import { useSession } from "next-auth/react";

export default function TaskForm() {
  const { register, handleSubmit }: any = useForm();
  const createTask = api.task.createTask.useMutation();

  const session = useSession();

  const onSubmit = async (data: any) => {
    data.assignedToId = session.data?.user.id;
    data.user = session?.data?.user.name;
    const res = await createTask.mutate({
      ...data,
      deadline: new Date(data.deadline).toISOString(),
      tags: data.tags.split(",").map((tag: string) => tag.trim()),
    });
    register == "";
    return res;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto">
      <h1 className="mb-8 border-b text-center font-bold">Add New Task</h1>
      <div className="mx-auto flex flex-col items-start justify-center gap-8 sm:grid sm:grid-cols-2">
        <div>
          <input
            {...register("title")}
            placeholder="Title"
            className="rounded-sm border p-2"
          />
        </div>

        <div>
          <input
            {...register("tags")}
            placeholder="Tags (comma-separated)"
            className="rounded-sm border p-2"
          />
        </div>
        <div>
          <input
            {...register("assignedToId")}
            placeholder="Assignee User ID (optional)"
            className="rounded-sm border p-2 hover:border-red-600"
            disabled
          />
        </div>

        <div className="w-full">
          <select
            {...register("priority")}
            className="w-full cursor-pointer rounded-sm border p-2"
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </div>

        <div className="flex flex-col items-start">
          <span className="px-1 opacity-40">Deadline</span>
          <input
            type="datetime-local"
            {...register("deadline")}
            className="cursor-pointer rounded-sm border p-2"
          />
        </div>

        <div>
          <textarea
            {...register("description")}
            placeholder="Description"
            className="rounded-sm border p-2"
          />
        </div>
      </div>
      <button
        type="submit"
        className="mt-5 w-full cursor-pointer rounded-sm bg-blue-500 px-2 py-1 text-white hover:bg-blue-400"
      >
        Create Task
      </button>
    </form>
  );
}
