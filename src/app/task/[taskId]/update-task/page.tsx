import TaskForm from "@/app/_components/TaskForm";
import { api } from "@/trpc/react";
import type { TaskFormData, TaskWithRelations } from "@/types/task";

type UpdateTaskFormProps = {
  task: TaskWithRelations;
  onCancel: () => void;
  onSuccess?: () => void;
};
export default function UpdateTask({
  task,
  onCancel,
  onSuccess,
}: UpdateTaskFormProps) {
  const ctx = api.useUtils();
  const { mutate: updateTask, isPending } = api.task.update.useMutation({
    onSuccess: () => {
      void ctx.task.getAllTasks.invalidate();
      onSuccess?.();
    },
  });

  const handleSubmit = (data: TaskFormData) => {
    const { ...updatedData } = data;
    const formattedData = {
      ...updatedData,
      deadline: new Date(updatedData.deadline), // Convert string to Date
      // Ensure other fields are correctly typed (e.g., tags, status, priority)
    };
    updateTask({
      id: task.id,
      data: formattedData,
    });
  };

  return (
    <div className="mx-auto my-auto h-lvh max-w-3xl">
      <h1 className="mb-4 text-2xl font-semibold">Update Task</h1>
      <TaskForm
        defaultValues={{
          title: task.title,
          description: task.description || "",
          status: task.status,
          priority: task.priority,
          deadline: new Date(task.deadline).toLocaleString(),
        }}
        onSubmit={handleSubmit}
        isLoading={isPending}
        onCancel={onCancel}
        submitButtonText="Save Changes"
      />
    </div>
  );
}
