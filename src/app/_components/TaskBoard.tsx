export default function TaskBoard() {
  const tasks = [
    { title: "Landing Page", status: "TODO" },
    { title: "API Integration", status: "IN_PROGRESS" },
    { title: "Unit Tests", status: "DONE" },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">📝 Task Board</h2>
      <div className="space-y-3">
        {tasks.map((task) => (
          <div key={task.title} className="p-3 border-l-4 rounded shadow-sm"
               style={{ borderColor: task.status === "DONE" ? "green" : task.status === "IN_PROGRESS" ? "orange" : "gray" }}>
            <p>{task.title}</p>
            <span className="text-xs text-muted-foreground">{task.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
