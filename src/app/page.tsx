import { auth } from "@/server/auth";
import { HydrateClient } from "@/trpc/server";
import { redirect } from "next/navigation";
import TaskTable from "./_components/TaskTable";

export default async function Home() {
  const session = await auth();

  if (!session) {
    redirect("login");
  }

  return (
    <HydrateClient>
      {/* bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white" */}
      <main className="p-4 md:ml-20">
        <TaskTable />
      </main>
    </HydrateClient>
  );
}
