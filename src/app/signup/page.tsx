"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
    });
    if (res.ok) {
      router.push("/login");
    } else {
      // const data = await res.json();
      alert("Failed to sign up");
    }
  };

  return (
    <div className="flex h-lvh w-full items-center justify-center">
      <form
        onSubmit={handleSignup}
        className="m-3 flex min-w-2xs flex-col gap-4 p-3"
      >
        <h1 className="text-center font-bold">New User Register</h1>

        <div className="">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-md border p-1"
            placeholder="Name"
          />
        </div>
        <div className="">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border p-1"
            placeholder="Email"
          />
        </div>
        <div className="">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border p-1"
            type="password"
            placeholder="Password"
          />
        </div>
        <button
          type="submit"
          className="cursor-pointer rounded-md bg-blue-500 p-2 font-bold text-white hover:bg-blue-400"
        >
          Sign Up
        </button>
        <p className="mt-3 text-center text-xs text-gray-500">
          Already have an account?
          <Link href="/login" className="text-blue-500">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
