import React, { useState } from "react";
import { useLoginMutation, useLogoutMutation } from "./login-api";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../../components/button";

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
      <div className="w-full flex gap-2">
        <Button className="w-full" type="submit">
          Log in
        </Button>
        <Button
          className="w-full"
          onClick={async () => logoutMutation.mutate()}
        >
          Log out
        </Button>
      </div>
      <Button
        variant="secondary"
        onClick={() =>
          loginMutation.mutate({
            email: "rikard4@mail.com",
            password: "admin",
          })
        }
      >
        Log in as Rikard
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          loginMutation.mutate({
            email: "peder@peder.peder",
            password: "peder",
          })
        }
      >
        Log in as Peder
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          loginMutation.mutate({
            email: "fredrik@fredrik.fredrik",
            password: "fredrik",
          })
        }
      >
        Log in as Fredrik
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          loginMutation.mutate({
            email: "marius@marius.marius",
            password: "marius",
          })
        }
      >
        Log in as Marius
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          loginMutation.mutate({
            email: "siri@siri.siri",
            password: "siri",
          })
        }
      >
        Log in as Siri
      </Button>
    </form>
  );
};
