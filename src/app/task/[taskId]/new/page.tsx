import TaskForm from "@/app/_components/TaskForm";

export default function CreateTaskPage() {
  return (
    <div className="mx-auto max-w-xl">
      <h1 className="mb-4 text-2xl font-semibold">Create New Task</h1>
      <TaskForm />
    </div>
  );
}
