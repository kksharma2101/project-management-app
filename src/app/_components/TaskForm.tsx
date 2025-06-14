"use client";
import { useForm } from "react-hook-form";
import type { TaskFormData } from "@/types/task";
import { api } from "@/trpc/react";
import InputField from "./ui_components/InputField";
import Button from "./ui_components/Button";

type TaskFormBaseProps = {
  defaultValues?: Partial<TaskFormData>;
  onSubmit: (data: TaskFormData) => void;
  isLoading: boolean;
  submitButtonText?: string;
  headingText: string;
};

const fields = [
  { id: "title", label: "Title", type: "text" },
  { id: "tags", label: "Tags", type: "text" },
  { id: "deadline", label: "Deadline", type: "datetime-local" },
];

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
    formState: { errors },
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
        {/* Use InputFiels Components */}
        {fields.map(({ id, label, type }) => (
          <InputField
            key={id}
            id={id}
            label={label}
            type={type}
            error={errors[id as keyof typeof errors]?.message}
            {...register(id as keyof TaskFormData)}
          />
        ))}

        <div className="w-full">
          <label htmlFor="assignedToId">Select User:</label>
          <select
            {...register("assignedToId")}
            className="w-full rounded-lg border px-4 py-2 shadow-sm transition duration-150 ease-in-out focus:border-transparent focus:ring-2 focus:ring-blue-500"
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
            className="w-full rounded-lg border px-4 py-2 shadow-sm transition duration-150 ease-in-out focus:border-transparent focus:ring-2 focus:ring-blue-500"
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
            className="w-full rounded-lg border px-4 py-2 shadow-sm transition duration-150 ease-in-out focus:border-transparent focus:ring-2 focus:ring-blue-500"
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
            className="w-full rounded-lg border px-4 py-2 shadow-sm transition duration-150 ease-in-out focus:border-transparent focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Button Actions */}
      <div className="flex justify-end space-x-3 pt-4">
        <Button
          type="submit"
          isLoading={isLoading}
          children={submitButtonText}
        />
      </div>
    </form>
  );
}
