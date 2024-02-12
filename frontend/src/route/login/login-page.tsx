import React, { useState } from "react";
import {
  useLoginMutation,
  useLogoutMutation,
  useSignupMutation,
} from "./login-api";
import { SubmitHandler, useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";

export const LoginPage: React.FC = () => {
  const [message, setMessate] = useState<string>();

  const queryClient = useQueryClient();

  const signupMutation = useSignupMutation();
  const loginMutation = useLoginMutation();
  const logoutMutation = useLogoutMutation();

  const form = useForm<{ email: string; password: string }>();

  const handleLogin: SubmitHandler<{
    email: string;
    password: string;
  }> = async (data) => {
    console.log("submit");
    const result = await loginMutation.mutateAsync(data);
    if (result.data) {
      setMessate(result.data);
      queryClient.invalidateQueries({ queryKey: ["check-login"] });
    } else {
      setMessate("Unsuccessful login");
    }
  };

  return (
    <div>
      <h1>Log in</h1>

      <form
        onSubmit={form.handleSubmit(handleLogin, (error) => console.log(error))}
      >
        <input type="email" placeholder="E-mail" {...form.register("email")} />
        <input
          type="password"
          placeholder="Password"
          {...form.register("password")}
        />
        <button
          className="bg-sky-500 hover:bg-sky-800 text-white py-0.5 px-4 rounded-full"
          type="submit"
        >
          Submit
        </button>
      </form>
      <button
        className="bg-gray-500  text-white py-0.5 px-4 rounded-full"
        disabled={true}
        onClick={() =>
          signupMutation.mutate({
            name: "Rikard",
            email: "rikard4@mail.com",
            password: "admin",
          })
        }
      >
        Sign up
      </button>
      <button
        className="bg-sky-500 hover:bg-sky-800 text-white py-0.5 px-4 rounded-full"
        onClick={() => logoutMutation.mutate()}
      >
        Log out
      </button>
      <button
        className="bg-sky-500 hover:bg-sky-800 text-white py-0.5 px-4 rounded-full"
        onClick={() =>
          loginMutation.mutate({
            email: "rikard4@mail.com",
            password: "admin",
          })
        }
      >
        Log in as Rikard4
      </button>
      <p>{message}</p>
    </div>
  );
};
