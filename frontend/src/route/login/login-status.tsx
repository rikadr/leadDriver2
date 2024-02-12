import React from "react";
import { useCheckLogin } from "./login-api";

export const LoginStatus: React.FC = () => {
  const checkLoginQuery = useCheckLogin();

  return <div className="bg-blue-500">{checkLoginQuery.data?.data}</div>;
};
