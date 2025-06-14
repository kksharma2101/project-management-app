// SidebarWrapper.tsx
"use client";

import { useSession } from "next-auth/react";
import Sidebar from "./Sidebar";

export default function SidebarWrapper() {
  const { data: session, status } = useSession();

  if (status === "loading") return null;

  return session ? <Sidebar /> : null;
}
