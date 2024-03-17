import React, { useState } from "react";
import { useLoginMutation, useLogoutMutation } from "./login-api";
import { SubmitHandler, useForm } from "react-hook-form";

export const LoginForm: React.FC = () => {
  const [message, setMessage] = useState<string>();

  const loginMutation = useLoginMutation();
  const logoutMutation = useLogoutMutation();

  const form = useForm<{ email: string; password: string }>();

  const handleLogin: SubmitHandler<{
    email: string;
    password: string;
  }> = async (data) => {
    const result = await loginMutation.mutateAsync(data);
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
      <input type="email" placeholder="E-mail" {...form.register("email")} />
      <input
        type="password"
        placeholder="Password"
        {...form.register("password")}
      />
      {message && <p>{message}</p>}
      <div className="flex gap-2">
        <button
          className="bg-sky-500 hover:bg-sky-800 text-white py-0.5 px-4 rounded-full w-1/2"
          type="submit"
        >
          Log in
        </button>
        <button
          className="bg-sky-500 hover:bg-sky-800 text-white py-0.5 px-4 rounded-full w-1/2"
          type="button"
          onClick={() =>
            loginMutation.mutate({
              email: "rikard4@mail.com",
              password: "admin",
            })
          }
        >
          Log in as Rikard4
        </button>
      </div>
      <button
        className="bg-sky-500 hover:bg-sky-800 text-white py-0.5 px-4 rounded-full"
        type="button"
        onClick={async () => logoutMutation.mutate()}
      >
        Log out
      </button>
    </form>
  );
};
