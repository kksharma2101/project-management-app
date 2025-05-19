import { auth } from "@/server/auth";
import { HydrateClient } from "@/trpc/server";
import { redirect } from "next/navigation";
import TaskList from "./_components/TaskList";

export default async function Home() {
  const session: any = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-start bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <TaskList />
      </main>
    </HydrateClient>
  );
}
