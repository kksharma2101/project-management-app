import { api } from "@/trpc/react";

export default function ProjectSummary() {
  const { data: tasks } = api.task.getAllTasks.useQuery();


  return (
    <div>
      <h2 className="mb-2 text-xl font-semibold">📁 Projects</h2>
      <div className="space-y-2">
        {tasks?.map((proj) => (
          <div key={proj?.id} className="bg-muted rounded-lg p-4 shadow-sm">
            <div className="flex justify-between">
              <p>{proj?.title}</p>
              <span className="text-xs font-medium">{proj?.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
