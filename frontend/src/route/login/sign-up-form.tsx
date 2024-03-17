import React, { useState } from "react";
import { useSignupMutation } from "./login-api";
import { SubmitHandler, useForm } from "react-hook-form";
import { SignupPayload } from "shared";

export const SignupForm: React.FC = () => {
  const [message, setMessage] = useState<string>();

  const signUpMutation = useSignupMutation();

  const form = useForm<SignupPayload>();

  const handleLogin: SubmitHandler<SignupPayload> = async (data) => {
    const result = await signUpMutation.mutateAsync(data);
    console.log("result", result.data);
    if (result.data) {
      setMessage(result.data.message);
    } else {
      setMessage("Unsuccessful login");
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(handleLogin, (error) => console.log(error))}
      className="flex flex-col gap-4 w-96 m-auto"
    >
      <input type="name" placeholder="Name" {...form.register("name")} />
      <input type="email" placeholder="E-mail" {...form.register("email")} />
      <input
        type="password"
        placeholder="Password"
        {...form.register("password")}
      />
      {message && <p>{message}</p>}
      <div className="flex gap-2">
        <button
          className="bg-sky-500 hover:bg-sky-800 text-white py-0.5 px-4 rounded-full w-full"
          type="submit"
        >
          Sign up
        </button>
      </div>
    </form>
  );
};