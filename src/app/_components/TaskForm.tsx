"use client";
import { useForm } from "react-hook-form";
import { api } from "@/trpc/react";
import { type Task } from "@prisma/client";
import type { TaskFormData } from "@/types/task";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";

//

type TaskFormBaseProps = {
  defaultValues?: Partial<TaskFormData>;
  onSubmit: (data: TaskFormData) => void;
  isLoading: boolean;
  onCancel?: () => void;
  submitButtonText?: string;
};

export default function TaskForm({
  defaultValues,
  onSubmit,
  isLoading,
  onCancel,
  submitButtonText = "Submit",
}: TaskFormBaseProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormData>({
    defaultValues,
  });

  //   const { register, handleSubmit }: any = useForm();
  //   const createTask = api.task.createTask.useMutation();

  //   const session = useSession();
  //   const router = useRouter();

  //   const onSubmit = (data: any) => {
  //     data.assignedToId = session.data?.user.id;
  //     data.user = session?.data?.user.name;
  //     createTask.mutate({
  //       ...data,
  //       deadline: new Date(data.deadline).toISOString(),
  //       tags: data.tags.split(",").map((tag: string) => tag.trim()),
  //     });
  //     router.push("/");
  //   };

  // import { type TaskFormData } from "~/types/task";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto mt-5">
      <h1 className="mb-8 border-b text-center font-bold">Add New Task</h1>
      <div className="mx-auto flex flex-col items-start justify-center gap-8 sm:grid sm:grid-cols-2">
        <div className="w-full">
          <input
            {...register("title")}
            placeholder="Task Title"
            className="w-full rounded-sm border p-2"
          />
        </div>

        <div className="flex w-full items-center">
          <input
            type="datetime-local"
            {...register("deadline")}
            className="w-full cursor-pointer rounded-sm border p-2"
          />
          <span className="px-1 opacity-40">Deadline</span>
        </div>

        <div className="w-full">
          <input
            {...register("tags")}
            placeholder="Tags (comma-separated)"
            className="w-full rounded-sm border p-2"
          />
        </div>

        <div className="w-full">
          <input
            {...register("assignedToId")}
            placeholder="Assignee User ID (optional)"
            className="w-full rounded-sm border p-2 hover:border-red-600"
            disabled
          />
        </div>

        <div className="w-full">
          <select
            {...register("status")}
            className="w-full cursor-pointer rounded-sm border p-2"
          >
            <option value="PENDING">Pending</option>
            <option value="IN_PROGRESS">IN_Progress</option>
            <option value="COMPLETED">Completed</option>
          </select>
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

        <div className="w-full">
          <textarea
            {...register("description")}
            placeholder="Description"
            className="w-full rounded-sm border p-2"
          />
        </div>
      </div>
      {/* <button
        type="submit"
        className="mt-5 w-full cursor-pointer rounded-sm bg-blue-500 px-2 py-1 text-white hover:bg-blue-400"
      >
        Create Task
      </button> */}
      <div className="flex justify-end space-x-3 pt-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
            disabled={isLoading}
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center">
              <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
                {/* Loading spinner SVG */}
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </span>
          ) : (
            submitButtonText
          )}
        </button>
      </div>
    </form>
  );
}
