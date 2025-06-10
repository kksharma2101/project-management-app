"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.ok) {
      router.push("/");
      return <p>Loading...</p>;
    } else {
      alert("Invalid credentials");
    }
    setLoading(false);
  };

  return (
    <div className="my-auto flex h-lvh w-full items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="m-3 flex min-w-2xs flex-col gap-4 p-3"
      >
        <h1 className="text-center font-bold">User Login Page</h1>
        <div className="">
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full rounded-md border p-1"
          />
        </div>
        <div className="">
          <input
            typeof="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="w-full rounded-md border p-1"
          />
        </div>
        <button
          type="submit"
          className="cursor-pointer rounded-md bg-green-600 p-2 font-bold text-white hover:bg-green-500"
        >
          {isLoading ? "Loging..." : "Login"}
        </button>
        <p className="mt-3 text-center text-xs text-gray-500">
          Don&apos;t have an account?
          <Link href="/signup" className="text-blue-500">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}
