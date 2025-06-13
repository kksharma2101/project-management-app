import React from "react";
import AuthForm from "../_components/AuthForm";

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <AuthForm type="login" />
    </div>
  );
}
