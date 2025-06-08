"use client";

import { useSession } from "next-auth/react";
import AnalyticsCard from "../_components/AnalyticsCard";
import DeadlineList from "../_components/DeadLineList";
import ProjectSummary from "../_components/ProjectSummary";
import TeamActivity from "../_components/TeamActivity";
import { api } from "@/trpc/react";

export default function DashboardPage() {
  const { data: session } = useSession();
  const { data: tasks, isLoading } = api.task.getAllTasks.useQuery();

  if (isLoading) return <p className="my-auto text-center">Loading...</p>;

  return (
    <div className="mx-auto mt-16 max-w-7xl space-y-6 p-4 md:mt-0 md:ml-20">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">👋 Welcome, {session?.user.name}</h1>
        <p className="text-muted-foreground">
          Here&apos;s a quick snapshot of your workspace.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <AnalyticsCard label="Total Tasks" value={tasks?.length!} />
        <AnalyticsCard label="In Progress" value={12} />
        <AnalyticsCard label="Overdue" value={3} />
        <AnalyticsCard label="Completed" value={43} />
      </div>

      <ProjectSummary />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <DeadlineList />
      </div>

      <TeamActivity />
    </div>
  );
}
