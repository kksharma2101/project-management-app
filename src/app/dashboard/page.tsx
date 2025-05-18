"use client";

import { useSession } from "next-auth/react";
import AnalyticsCard from "../_components/AnalyticsCard";
import DashboardHeader from "../_components/DashboardHeader";
import DeadlineList from "../_components/DeadLineList";
import ProjectSummary from "../_components/ProjectSummary";
import TaskBoard from "../_components/TaskBoard";
import TeamActivity from "../_components/TeamActivity";

export default function DashboardPage() {
  const { data: session } = useSession();
  return (
    <div className="mx-auto max-w-7xl space-y-6 p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">👋 Welcome, {session?.user.name}</h1>
        <p className="text-muted-foreground">
          Here's a quick snapshot of your workspace.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <AnalyticsCard label="Total Tasks" value="58" />
        <AnalyticsCard label="In Progress" value="12" />
        <AnalyticsCard label="Overdue" value="3" />
        <AnalyticsCard label="Completed" value="43" />
      </div>

      <ProjectSummary />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <TaskBoard />
        <DeadlineList />
      </div>

      <TeamActivity />
    </div>
  );
}
