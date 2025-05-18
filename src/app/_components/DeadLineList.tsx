export default function DeadlineList() {
  const upcoming = [
    { title: "Client Demo", date: "2025-05-21" },
    { title: "API Refactor", date: "2025-05-24" },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">📆 Upcoming Deadlines</h2>
      <ul className="space-y-2">
        {upcoming.map((item) => (
          <li key={item.title} className="p-3 bg-muted rounded-lg shadow">
            <p className="font-medium">{item.title}</p>
            <p className="text-xs text-muted-foreground">{new Date(item.date).toDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
