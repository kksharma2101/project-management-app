"use client";
import { useForm } from "react-hook-form";
import { api } from "@/trpc/react";
import { useEffect, useState } from "react";
import type { UserDetails } from "@/types/task";

export default function UserProfileForm() {
  const { register, handleSubmit, reset } = useForm();
  const { data: user, isLoading } = api.user.getProfile.useQuery();
  const updateProfile = api.user.updateProfile.useMutation();
  const [isUpdate, setUpdate] = useState(false);

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
    setUpdate(false);
  };

  if (isLoading) return <p className="mt-20 text-center">Loading...</p>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto">
      <h1 className="mx-auto my-10 text-center text-2xl font-bold">
        Your Profile
      </h1>
      <div className="flex flex-col items-start justify-center gap-4">
        <h2>
          <span className="pr-2 font-bold">Email: </span>
          {user?.email}
        </h2>
        <div
          className={`w-full ${!isUpdate ? "flex items-baseline" : "block"}`}
        >
          <label htmlFor="name" className="font-bold">
            Name:
          </label>
          <input
            {...register("name")}
            placeholder="Your Name"
            className={`w-full rounded-sm p-2 ${isUpdate ? "border-1 border-black" : ""}`}
          />
        </div>
        <div
          className={`w-full ${!isUpdate ? "flex items-baseline" : "block"}`}
        >
          <label htmlFor="bio" className="font-bold">
            About:
          </label>
          <textarea
            {...register("bio")}
            placeholder="Bio"
            className={`w-full rounded-sm p-2 ${isUpdate ? "border-1 border-black" : ""}`}
          />
        </div>

        {!isUpdate ? (
          <span
            className="mx-auto mt-5 w-fit cursor-pointer rounded-sm bg-blue-500 px-4 py-1 font-bold text-white hover:bg-blue-400"
            onClick={() => setUpdate(true)}
          >
            Update
          </span>
        ) : (
          <div className="mx-auto flex items-center gap-5">
            <span
              className="mx-auto mt-5 w-fit cursor-pointer rounded-sm bg-red-500 px-4 py-1 font-bold text-white hover:bg-red-400"
              onClick={() => setUpdate(false)}
            >
              Cancel
            </span>
            <button
              type={!isUpdate ? "button" : "submit"}
              className="mt-5 w-fit cursor-pointer rounded-sm bg-blue-500 px-4 py-1 font-bold text-white hover:bg-blue-400"
            >
              {!isUpdate ? (isLoading ? "Updating..." : "") : "Update"}
            </button>
          </div>
        )}
      </div>
    </form>
  );
}
