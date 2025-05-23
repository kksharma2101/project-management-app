export default function TeamActivity() {
  const team = [
    { name: "Kamal Sharma", task: "updated Project Board" },
    { name: "Krishna", task: "commented on API module" },
    { name: "EasySLR", task: "closed Task: Bug Fix" },
  ];

  return (
    <div>
      <h2 className="mb-2 text-xl font-semibold">👥 Team Activity</h2>
      <ul className="space-y-2">
        {team.map((user) => (
          <li key={user?.name} className="bg-muted rounded-lg p-3 shadow-sm">
            <p>
              <strong>{user.name}</strong> {user.task}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
