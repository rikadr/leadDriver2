import React, { useEffect, useState } from "react";
import {
  useCheckLogin,
  useLoginMutation,
  useLogoutMutation,
  useSignupMutation,
} from "./login-api";

export const LoginPage: React.FC = () => {
  const [message, setMessate] = useState<string>();

  const checkLoginQuery = useCheckLogin();
  const signupMutation = useSignupMutation();
  const loginMutation = useLoginMutation();
  const logoutMutation = useLogoutMutation();

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
        onClick={async () => {
          await loginMutation.mutateAsync({
            email: "rikard4@mail.com",
            password: "admin",
          });
          checkLoginQuery.refetch();
        }}
      >
        Log in
      </button>
      <button
        onClick={async () => {
          await logoutMutation.mutateAsync();
          checkLoginQuery.refetch();
        }}
      >
        Log out
      </button>
      <p>{message}</p>
    </div>
  );
};
