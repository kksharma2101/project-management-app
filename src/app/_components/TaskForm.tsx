"use client";
import { useForm } from "react-hook-form";
import type { TaskFormData } from "@/types/task";
import { api } from "@/trpc/react";

//

type TaskFormBaseProps = {
  defaultValues?: Partial<TaskFormData>;
  onSubmit: (data: TaskFormData) => void;
  isLoading: boolean;
  // onCancel?: () => void;
  submitButtonText?: string;
  headingText: string;
};

export default function TaskForm({
  defaultValues,
  onSubmit,
  isLoading,
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
      ...defaultValues,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto p-4">
      <h1 className="mb-16 text-center text-2xl font-semibold">
        {headingText}
      </h1>
      <div className="mx-auto flex flex-col items-start justify-center gap-12 sm:grid sm:grid-cols-2 lg:grid-cols-3">
        <div className="w-full">
          <label htmlFor="title">Task Title:</label>
          <input
            {...register("title")}
            className="mt-1 w-full rounded-sm border-1 border-black p-2"
          />
        </div>

        <div className="w-full">
          <label htmlFor="deadline">Deadline:</label>
          <input
            type="datetime-local"
            {...register("deadline")}
            defaultValue={
              defaultValues?.deadline
                ? new Date(defaultValues.deadline).toDateString()
                : undefined
            }
            className="mt-1 w-full cursor-pointer rounded-sm border-1 border-black p-2"
          />
        </div>

        <div className="w-full">
          <label htmlFor="tags">Tags, comma-separated: </label>
          <input
            {...register("tags")}
            className="mt-1 w-full rounded-sm border-1 border-black p-2"
          />
        </div>

        <div className="w-full">
          <label htmlFor="assignedToId">Select User:</label>
          <select
            {...register("assignedToId")}
            className="mt-1 w-full cursor-pointer rounded-sm border-1 border-black p-2"
          >
            {user?.map((item) => (
              <option value={item?.id} key={item.id}>
                {item?.name ?? "N/A"}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full">
          <label htmlFor="status">Status:</label>
          <select
            {...register("status")}
            className="mt-1 w-full cursor-pointer rounded-sm border-1 border-black p-2"
          >
            <option value="PENDING">Pending</option>
            <option value="IN_PROGRESS">IN_Progress</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>

        <div className="w-full">
          <label htmlFor="priority">Priority:</label>
          <select
            {...register("priority")}
            className="mt-1 w-full cursor-pointer rounded-sm border-1 border-black p-2"
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </div>

        <div className="w-full">
          <label htmlFor="description">Description:</label>
          <textarea
            {...register("description")}
            className="mt-1 w-full rounded-sm border-1 border-black p-2"
          />
        </div>
      </div>

      {/* Button Actions */}
      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="submit"
          className="cursor-pointer rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : submitButtonText}
        </button>
      </div>
    </form>
  );
}
