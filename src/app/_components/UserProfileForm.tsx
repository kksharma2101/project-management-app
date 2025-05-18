"use client";
import { useForm } from "react-hook-form";
import { api } from "@/trpc/react";
import { useEffect } from "react";

export default function UserProfileForm() {
  const { register, handleSubmit, reset } = useForm();
  const { data: user } = api.user.getProfile.useQuery();
  const updateProfile = api.user.updateProfile.useMutation();

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        bio: user.bio || "",
      });
    }
  }, [user, reset]);

  const onSubmit = (data: any) => {
    updateProfile.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto">
      <h1 className="mx-auto mb-8 min-w-2xs border-b text-center font-bold">
        Update Your Profile
      </h1>
      <div className="mx-auto flex flex-col items-center justify-center gap-8">
        <div>
          <input
            {...register("name")}
            placeholder="Your Name"
            className="rounded-sm border p-2"
          />
        </div>
        <div>
          <textarea
            {...register("bio")}
            placeholder="Bio"
            className="rounded-sm border p-2"
          />
        </div>

        <button
          type="submit"
          className="mt-5 w-full cursor-pointer rounded-sm bg-blue-500 px-2 py-1 text-white hover:bg-blue-400"
        >
          Update Profile
        </button>
      </div>
    </form>
  );
}
