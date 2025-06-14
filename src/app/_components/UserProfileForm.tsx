"use client";
import { useForm } from "react-hook-form";
import { api } from "@/trpc/react";
import { useEffect, useState } from "react";
import type { UserDetails } from "@/types/task";
import Button from "./ui_components/Button";
import InputField from "./ui_components/InputField";

const userFields = [
  { id: "name", label: "Name", type: "text" },
  { id: "phone", label: "Phone Number", type: "text" },
  { id: "about", label: "About", type: "text" },
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
    updateProfile.mutate({ name: data.name!, bio: data.bio! });
    setUpdate(false);
  };

  if (isLoading) return <p className="mt-20 text-center">Loading...</p>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto">
      <h1 className="mx-auto my-10 text-center text-2xl font-bold">
        Your Profile
      </h1>
      <div className="">
        <h2>
          <span className="pr-2 font-bold">Email: </span>
          {user?.email}
        </h2>

        <div className="grid grid-cols-2">
          {userFields.map((val) => (
            <InputField
              id={val.id}
              key={val.id}
              type={val.type}
              label={val.label}
              {...register(val.id)}
              className={`mx-auto w-full rounded-sm p-2 ${isUpdate ? "border-1 border-black" : "read-only border-none"}`}
            />
          ))}
        </div>

        {/* <div
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
        </div> */}

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
