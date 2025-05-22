"use client";
import { useForm } from "react-hook-form";
import { api } from "@/trpc/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import type { UserDetails } from "@/types/task";

export default function UserProfileForm() {
  const { register, handleSubmit, reset } = useForm();
  const { data: user, isLoading } = api.user.getProfile.useQuery();
  const updateProfile = api.user.updateProfile.useMutation();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      reset({
        name: user?.name,
        bio: user.bio ?? "",
      });
    }
  }, [user, reset]);

  const onSubmit = (data: UserDetails) => {
    updateProfile.mutate({ name: data.name!, bio: data.bio! });
    router.push("/");
  };

  if (isLoading) return <p className="my-auto text-center">Loading...</p>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto">
      <h1 className="mx-auto mb-8 h-full border-b text-center font-bold">
        Update Your Profile
      </h1>
      <div className="mx-auto flex max-w-2xl flex-col items-center justify-center gap-8">
        <div className="w-full">
          <input
            {...register("name")}
            placeholder="Your Name"
            className="w-full rounded-sm border p-2"
          />
        </div>
        <div className="w-full">
          <textarea
            {...register("bio")}
            placeholder="Bio"
            className="w-full rounded-sm border p-2"
          />
        </div>

        <button
          type="submit"
          className="mt-5 w-fit cursor-pointer rounded-sm bg-blue-500 px-4 py-1 text-white hover:bg-blue-400"
        >
          Update Profile
        </button>
      </div>
    </form>
  );
}
