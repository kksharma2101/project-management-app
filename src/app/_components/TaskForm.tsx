"use client";
import { useForm } from "react-hook-form";
import type { TaskFormData } from "@/types/task";
import { api } from "@/trpc/react";

//

type TaskFormBaseProps = {
  defaultValues?: Partial<TaskFormData>;
  onSubmit: (data: TaskFormData) => void;
  isLoading: boolean;
  onCancel?: () => void;
  submitButtonText?: string;
  headingText: string;
};

export default function TaskForm({
  defaultValues,
  onSubmit,
  isLoading,
  onCancel,
  submitButtonText = "Submit",
  headingText,
}: TaskFormBaseProps) {
  const { data: user } = api.user.getAllUser.useQuery();

  const {
    register,
    handleSubmit,
    formState: {},
  } = useForm<TaskFormData>({
    defaultValues: {
      // title: "",
      // description: "",
      ...defaultValues,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto mt-5 px-5">
      <h1 className="mb-8 border-b text-center text-2xl font-semibold">
        {headingText}
      </h1>
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
            defaultValue={
              defaultValues?.deadline
                ? new Date(defaultValues.deadline).toDateString()
                : undefined
            }
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
          <select
            {...register("assignedToId")}
            className="w-full cursor-pointer rounded-sm border p-2"
          >
            {user?.map((item) => (
              <option value={item?.id} key={item.id}>
                {item?.name ?? "N/A"}
              </option>
            ))}
          </select>
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

      <div className="flex justify-end space-x-3 pt-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="cursor-pointer rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
            disabled={isLoading}
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="cursor-pointer rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
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
