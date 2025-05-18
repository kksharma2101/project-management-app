// apps/web/src/app/dashboard/page.tsx
import { TaskCard } from "./TaskCard";
import { api } from "@/trpc/server";
// import { CreateTaskForm } from "@/components/CreateTaskForm";

export default async function Dashboard() {
  const tasks = await api.task.getAll.query({});

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-8 text-3xl font-bold">Task Dashboard</h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="mb-4 text-2xl font-semibold">Your Tasks</h2>
          {tasks.length === 0 ? (
            <p className="text-muted-foreground">
              No tasks found. Create one to get started!
            </p>
          ) : (
            <div className="space-y-4">
              {tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          )}
        </div>

        <div>
          <h2 className="mb-4 text-2xl font-semibold">Create New Task</h2>
          {/* <CreateTaskForm /> */} uploading
        </div>
      </div>
    </div>
  );
}
