"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Menu, X, UserCircle2 } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-xl font-bold text-blue-600">
            EasySLR
          </Link>

          {/* Desktop Menu */}
          <div className="hidden items-center space-x-6 md:flex">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            <Link href="/" className="hover:text-blue-600">
              About
            </Link>
            <Link href="/" className="hover:text-blue-600">
              Contact
            </Link>

            {session?.user ? (
              <div className="group relative">
                <div className="flex cursor-pointer items-center space-x-2">
                  <span className="text-sm">
                    {session.user.name || session.user.email}
                  </span>
                  <UserCircle2 className="text-blue-600" />
                </div>
                <div className="absolute right-0 z-10 mt-0 hidden w-48 rounded border bg-white shadow-md group-hover:block">
                  <div className="px-4 py-2 text-sm text-gray-700">
                    <p>
                      <strong>Name:</strong> {session.user.name}
                    </p>
                    <p>{session.user.email}</p>
                  </div>
                  <div className="flex w-full justify-center">
                    <Link
                      href={session && "/api/auth/signout"}
                      className="w-full cursor-pointer px-4 py-2 text-center text-sm text-red-600 hover:bg-gray-100"
                    >
                      Sign Out
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                href="/api/auth/signin"
                className="text-blue-600 hover:underline"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="cursor-pointer text-blue-600"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="space-y-2 px-4 pb-4 md:hidden">
          <Link href="/" onClick={toggleMenu} className="block">
            Home
          </Link>
          <Link href="/" onClick={toggleMenu} className="block">
            About
          </Link>
          <Link href="/" onClick={toggleMenu} className="block">
            Contact
          </Link>
          {session?.user ? (
            <div className="border-t pt-2">
              <p className="text-sm">
                Signed in as <strong>{session.user.email}</strong>
              </p>
              <Link
                href={session && "/api/auth/signout"}
                className="mt-2 block cursor-pointer text-left text-red-600 hover:text-red-400"
              >
                SignOut
              </Link>
            </div>
          ) : (
            <Link
              href="/api/auth/signin"
              onClick={toggleMenu}
              className="block text-blue-600"
            >
              Sign In
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
