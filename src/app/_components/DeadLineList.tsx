import { api } from "@/trpc/react";

export default function DeadlineList() {
  const { data: tasks } = api.task.getAllTasks.useQuery();

  const preDate = new Date().toDateString();

  return (
    <div>
      <h2 className="mb-2 text-xl font-semibold">📆 Upcoming Deadlines</h2>
      <ul className="space-y-2">
        {tasks?.map((item) => (
          <li key={item.id} className="bg-muted rounded-lg p-3 shadow">
            <p className="font-medium">{item.title}</p>
            <p className="text-muted-foreground text-xs">
              {preDate === item.deadline.toDateString()
                ? `Today ${item?.deadline.toLocaleTimeString()}`
                : item.deadline.toDateString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
