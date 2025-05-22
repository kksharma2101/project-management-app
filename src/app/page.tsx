import { auth } from "@/server/auth";
import { HydrateClient } from "@/trpc/server";
import { redirect } from "next/navigation";
import TaskList from "./_components/TaskList";
import Link from "next/link";

export default async function Home() {
  const session = await auth();

  if (!session) {
    redirect("login");
  }

  return (
    <HydrateClient>
      {/* bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white" */}
      <main className="flex min-h-screen flex-col items-center justify-start">
        <Link
          href="/task/create-task"
          className="my-5 rounded-md border px-2 py-1 font-bold hover:bg-blue-300"
        >
          Create Task
        </Link>
        <TaskList />
      </main>
    </HydrateClient>
  );
}
