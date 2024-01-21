import React, { useEffect, useState } from "react";
import {
  useCheckLogin,
  useLoginMutation,
  useSignupMutation,
} from "./login-api";

export const LoginPage: React.FC = () => {
  const [message, setMessate] = useState<string>();

  const checkLoginQuery = useCheckLogin();
  const signupMutation = useSignupMutation();
  const loginMutation = useLoginMutation();

  useEffect(() => {
    if (checkLoginQuery.data?.data) {
      setMessate(checkLoginQuery.data?.data);
    }
  }, [checkLoginQuery.data?.data]);

  return (
    <div>
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
      <p>{message}</p>
    </div>
  );
};
