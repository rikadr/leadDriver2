import React from "react";
import { useCheckLogin } from "../login/login-api";
import { Navigate } from "react-router-dom";
import { appUrl } from "../../utils/app-url";

export const Home: React.FC = () => {
  const checkLoginQuery = useCheckLogin();
  const isLoggedIn = checkLoginQuery.data?.data?.isLoggedIn;

  if (isLoggedIn) {
    return <Navigate to={appUrl["events"]} />;
  }

  return (
    <div>
      <h1>Home</h1>
      <p>Read all about what LeadDriver is</p>
    </div>
  );
};
