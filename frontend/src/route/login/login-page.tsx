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
      <form
        onSubmit={form.handleSubmit(handleLogin, (error) => console.log(error))}
      >
        <input type="email" {...form.register("email")} />
        <input type="password" {...form.register("password")} />
        <input type="submit" />
      </form>
      <button
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
        onClick={() =>
          loginMutation.mutate({
            email: "rikard4@mail.com",
            password: "admin",
          })
        }
      >
        Log in
      </button>
      <button onClick={() => logoutMutation.mutate()}>Log out</button>
      <p>{message}</p>
    </div>
  );
};
