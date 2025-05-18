"use client";
import { useSession } from "next-auth/react";

export default function DashboardHeader() {
  const { data: session } = useSession();
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold">👋 Welcome, {session?.user.name}</h1>
      <p className="text-muted-foreground">
        Here's a quick snapshot of your workspace.
      </p>
    </div>
  );
}
