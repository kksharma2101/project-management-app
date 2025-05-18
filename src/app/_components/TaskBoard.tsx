import { api } from "@/trpc/react";

export default function TaskBoard() {
  const { data: tasks } = api.task.getAllTasks.useQuery();

  const task = [
    { title: "Landing Page", status: "TODO" },
    { title: "API Integration", status: "IN_PROGRESS" },
    { title: "Unit Tests", status: "DONE" },
  ];

  return (
    <div>
      <h2 className="mb-2 text-xl font-semibold">📝 Task Board</h2>
      <div className="space-y-3">
        {tasks?.map((task) => (
          <div
            key={task.id}
            className="rounded border-l-4 p-3 shadow-sm"
            style={{
              borderColor:
                task.status === "TODO"
                  ? "green"
                  : task.status === "IN_PROGRESS"
                    ? "orange"
                    : "gray",
            }}
          >
            <p>{task.title}</p>
            <span className="text-muted-foreground text-xs">{task.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
