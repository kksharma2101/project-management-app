export default function ProjectSummary() {
  // You can fetch and map project summaries here
  const projects = [
    { name: "Marketing Website", status: "In Progress" },
    { name: "AI Dashboard", status: "Done" },
    { name: "Mobile App", status: "Pending" },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">📁 Projects</h2>
      <div className="space-y-2">
        {projects.map((proj) => (
          <div key={proj.name} className="p-4 bg-muted rounded-lg shadow-sm">
            <div className="flex justify-between">
              <p>{proj.name}</p>
              <span className="text-xs font-medium">{proj.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
