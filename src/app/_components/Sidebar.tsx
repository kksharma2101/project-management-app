"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarClock,
  Car,
  Users,
  Settings,
  Menu,
  X,
  LogOut,
  LogInIcon,
} from "lucide-react";
import { useSession } from "next-auth/react";

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  const toggleMobileSidebar = () => {
    setMobileOpen(!mobileOpen);
  };

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Bookings", href: "/", icon: CalendarClock },
    { name: "Vehicles", href: "/", icon: Car },
    { name: "Customers", href: "/", icon: Users },
    { name: "Settings", href: "/settings/profile", icon: Settings },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <button
        className={`${!mobileOpen && "fixed top-4 left-4 z-50 cursor-pointer rounded-md bg-white p-2 shadow-md md:hidden"}`}
        onClick={toggleMobileSidebar}
      >
        {mobileOpen ? "" : <Menu size={20} />}
      </button>

      {/* Sidebar for mobile */}
      <div
        className={`fixed inset-0 z-40 h-full transform ${mobileOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out md:hidden`}
      >
        <div className="relative flex h-full w-full max-w-xs flex-col bg-gray-800 text-white shadow-xl">
          <div className="flex h-16 items-center justify-between border-b border-gray-700 px-6">
            <h2 className="text-xl font-bold">Task-Manage</h2>
            <button onClick={toggleMobileSidebar}>
              <X size={20} className="cursor-pointer" />
            </button>
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center rounded-md px-4 py-3 text-sm ${
                  pathname === item.href
                    ? "bg-gray-900 text-white"
                    : "text-gray-300 hover:bg-gray-700"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="border-t border-gray-700 p-4">
            {session?.user ? (
              <Link
                href={session?.user && "/api/auth/signout"}
                className={`flex items-center justify-between rounded-md px-4 py-2 text-sm text-gray-300 hover:bg-gray-700`}
              >
                <span>Sign-out</span>
                <LogOut className="mr-3 h-5 w-5" />
              </Link>
            ) : (
              <Link
                href="/login"
                className={`flex items-center justify-between rounded-md px-4 py-2 text-sm text-gray-300 hover:bg-gray-700`}
              >
                <span>Log-in</span>
                <LogInIcon className="mr-3 h-5 w-5" />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Sidebar for desktop */}
      <div
        className={`absolute left-0 z-50 hidden flex-col md:flex ${expanded ? "w-64" : "w-20"} h-full bg-gray-800 text-white transition-all duration-300`}
      >
        <div className="flex h-16 items-center justify-between border-b border-gray-700 px-6">
          {expanded ? (
            <h2 className="text-xl font-bold">Task-Manage</h2>
          ) : (
            <h2 className="mx-auto text-xl font-bold">TM</h2>
          )}
          <button
            onClick={toggleSidebar}
            className="text-gray-400 hover:text-white"
          >
            <Menu size={20} className="cursor-pointer" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-4">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center rounded-md px-4 py-3 text-sm ${
                pathname === item.href
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700"
              }`}
            >
              <item.icon
                className={`h-5 w-5 ${expanded ? "mr-3" : "mx-auto"}`}
              />
              {expanded && item.name}
            </Link>
          ))}
        </nav>

        <div className="border-t border-gray-700 p-4">
          {session?.user ? (
            <Link
              href={session && "/api/auth/signout"}
              className={`flex items-center justify-between ${expanded ? "w-full" : "justify-center"} rounded-md px-4 py-2 text-sm text-gray-300 hover:bg-gray-700`}
            >
              {expanded && "Sign out"}
              <LogOut className={`h-5 w-5 ${expanded ? "mr-3" : ""}`} />
            </Link>
          ) : (
            <Link
              href="/login"
              className={`flex items-center justify-between ${expanded ? "w-full" : "justify-center"} rounded-md px-4 py-2 text-sm text-gray-300 hover:bg-gray-700`}
            >
              {expanded && "Log-in"}
              <LogInIcon className={`h-5 w-5 ${expanded ? "mr-3" : ""}`} />
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
