"use client";

import { useForm } from "react-hook-form";
import { api } from "@/trpc/react";
import { useEffect, useState } from "react";
import type { UserDetails } from "@/types/task";
import Button from "./ui_components/Button";
import InputField from "./ui_components/InputField";
import toast from "react-hot-toast";

const userFields = [
  { id: "name", label: "Name", type: "text" },
  { id: "phone", label: "Phone Number", type: "text" },
  { id: "bio", label: "About", type: "text" },
];

export default function UserProfileForm() {
  const { register, handleSubmit, reset } = useForm();
  const { data: user, isLoading } = api.user.getProfile.useQuery();
  const updateProfile = api.user.updateProfile.useMutation();
  const [isUpdate, setUpdate] = useState(false);

  useEffect(() => {
    if (user) {
      reset({
        name: user?.name,
        phone: user?.phone,
        bio: user.bio ?? "",
      });
    }
  }, [user, reset]);

  const onSubmit = (data: UserDetails) => {
    updateProfile.mutate({
      name: data.name!,
      bio: data.bio!,
      phone: data.phone,
    });
    toast.success("Profile Updated");
    setUpdate(false);
  };

  if (isLoading)
    return (
      <p className="flex h-screen items-center justify-center">Loading...</p>
    );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto">
      <h1 className="mx-auto my-10 text-center text-2xl font-bold">
        Your Profile
      </h1>
      <div className="gap-5 sm:grid sm:grid-cols-2">
        <h2 className="mb-4">
          <span className="block text-sm font-bold text-gray-700">Email: </span>
          <span className="pl-2">{user?.email}</span>
        </h2>

        {userFields.map((val) => (
          <div
            key={val.id}
            className={`mb-4 w-full ${!isUpdate ? "flex items-baseline justify-start" : "block"}`}
          >
            <InputField
              id={val.id}
              type={val.type}
              disabled={!isUpdate}
              label={val.label}
              {...register(val.id)}
              className={`w-full rounded-sm p-2 text-justify ${isUpdate ? "border-1 border-black" : ""}`}
              maxLength={val.id == "phone" ? 10 : undefined}
            />
          </div>
        ))}
      </div>

      <div className="mt-5 flex w-full items-center justify-center">
        {!isUpdate ? (
          <Button
            children="Edit Profile"
            onClick={() => setUpdate(true)}
            className="mx-auto"
          />
        ) : (
          <div className="mx-auto flex items-center gap-5">
            <Button
              children="Cancel"
              onClick={() => setUpdate(false)}
              variant="danger"
            />

            <Button
              children="Update"
              type={!isUpdate ? "button" : "submit"}
              isLoading={isLoading}
            />
          </div>
        )}
      </div>
    </form>
  );
}
