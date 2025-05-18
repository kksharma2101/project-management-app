interface Props {
  label: string;
  value: number;
}

export default function AnalyticsCard({ label, value }: Props) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow dark:bg-gray-900">
      <p className="text-muted-foreground text-sm">{label}</p>
      <h2 className="text-2xl font-semibold">{value}</h2>
    </div>
  );
}
