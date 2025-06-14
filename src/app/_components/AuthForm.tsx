"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import InputField from "./ui_components/InputField";

type AuthFormProps = {
  type: "signup" | "login";
};

const inputFields = ["name", "email", "phone"];

export default function AuthForm({ type }: AuthFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      if (type == "signup") {
        const res = await fetch("/api/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
          }),
        });

        if (res.ok) {
          toast.success("Signup Seccessfully");
          router.push("/login");
        } else {
          toast.error("Failed to sign up, try again");
        }
        // login
      } else {
        const res = await signIn("credentials", {
          redirect: false,
          ...formData,
        });

        if (res?.ok) {
          toast.success("Login Successfull");
          router.push("/");
        } else {
          toast.error("Invalid credentials");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = () => {
    // Handle Google Sign Up logic
    alert("Signupg up with Google...");
  };

  return (
    <div className="m-auto w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-6 sm:max-w-md sm:p-8 sm:shadow-xl md:p-10 lg:max-w-lg">
      <h1 className="mb-6 text-center text-3xl font-bold text-gray-800 sm:text-4xl">
        {type == "signup" ? "Sign up" : "Log in"}
      </h1>

      <form onSubmit={handleAuth} className="space-y-4">
        {/* Use Input Component */}
        {inputFields.map((val) => {
          return type == "signup" ? (
            <div key={val}>
              <InputField
                type={val}
                id={val}
                label={val}
                value={formData[val] || ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    [val]: e.target.value,
                  }))
                }
                required
                aria-label="Enter your email"
              />
            </div>
          ) : (
            val == "email" && (
              <div key={val}>
                <InputField
                  type={val}
                  id={val}
                  label={val.toUpperCase()}
                  value={formData[val] || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      [val]: e.target.value,
                    }))
                  }
                  required
                  aria-label="Enter your email"
                />
              </div>
            )
          );
        })}

        {/* Password Input */}
        <div>
          <label
            htmlFor="password"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 pr-10 shadow-sm transition duration-150 ease-in-out focus:border-transparent focus:ring-2 focus:ring-blue-500" // Removed text-center
              value={formData["password"] || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
              required
              aria-label="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Auth Button */}
        <button
          type="submit"
          className="w-full cursor-pointer rounded-lg bg-blue-600 py-2.5 text-lg font-semibold text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
        >
          {isLoading ? "Proccessing" : type == "signup" ? "Sign Up" : "Log In"}
        </button>
      </form>

      {/* Navigation Link */}
      <p className="mt-5 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link
          href={type == "signup" ? "/login" : "/signup"}
          className="font-medium text-blue-600 hover:text-blue-500"
        >
          {type == "signup" ? "Log In" : "Sign Up"}
        </Link>
      </p>

      {type == "signup" && (
        <>
          {/* Separator */}
          <div className="relative my-6 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative bg-white px-4 text-sm text-gray-500">
              — or —
            </div>
          </div>

          {/* Sign up with Google Button */}
          <button
            type="button"
            disabled
            onClick={handleGoogleSignUp}
            className="flex w-full items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-base font-semibold text-gray-700 shadow-sm transition duration-150 ease-in-out hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
          >
            {/* Google Icon SVG */}
            <svg
              className="mr-3 h-5 w-5"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M12.24 10.27L12 10.36L12.24 10.27C12.06 10.72 11.97 11.23 11.97 11.75C11.97 13.06 12.63 14.28 13.72 15.01L10.32 17.51C8.2 16.08 7 13.52 7 10.75C7 8.08 8.16 5.62 10.15 4.09L13.51 6.6C12.44 7.33 11.79 8.39 11.79 9.53C11.79 9.87 11.83 10.2 11.89 10.51L12.24 10.27ZM23.47 11.75C23.47 11.28 23.43 10.82 23.36 10.37H12.24V14.1H18.77C18.49 14.93 18.06 15.66 17.47 16.2L20.83 18.71C22.25 17.15 23.07 14.61 23.47 11.75Z"
                fill="#EA4335"
              />
              <path
                d="M11.97 11.75C11.97 13.06 12.63 14.28 13.72 15.01L10.32 17.51C8.2 16.08 7 13.52 7 10.75C7 8.08 8.16 5.62 10.15 4.09L13.51 6.6C12.44 7.33 11.79 8.39 11.79 9.53C11.79 9.87 11.83 10.2 11.89 10.51L12.24 10.27Z"
                fill="#4285F4"
              />
              <path
                d="M4.15 13.62C3.89 12.8 3.75 11.93 3.75 11.02C3.75 10.12 3.89 9.25 4.15 8.43L0.8 5.92C0.3 7.15 0 8.44 0 9.77C0 11.1 0.3 12.39 0.8 13.62L4.15 13.62Z"
                fill="#FBBC04"
              />
              <path
                d="M23.47 11.75C23.47 11.28 23.43 10.82 23.36 10.37H12.24V14.1H18.77C18.49 14.93 18.06 15.66 17.47 16.2L20.83 18.71C22.25 17.15 23.07 14.61 23.47 11.75Z"
                fill="#34A853"
              />
            </svg>
            Sign up with Google
          </button>
        </>
      )}
    </div>
  );
}
