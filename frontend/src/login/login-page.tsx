import React from "react";
import { useLoginMutation } from "./login-api";

export const LoginPage: React.FC = () => {
  const [message, setMessage] = React.useState<string | null>(null);
  const login = useLoginMutation();

  async function logTheIn() {
    const result = await login.mutateAsync({
      email: "rikard@mail.com",
      password: "admin",
    });
    setMessage(result.data || null);
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        logTheIn();
      }}
    >
      <label htmlFor="username">Username</label>
      <input type="text" id="username" />
      <label htmlFor="password">Password</label>
      <input type="password" id="password" />
      <button type="submit">Login</button>
      {message ? <p>{message}</p> : <p>No message eyt</p>}
    </form>
  );
};
