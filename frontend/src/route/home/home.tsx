import React from "react";
import { useCheckLogin } from "../login/login-api";
import { Navigate } from "react-router-dom";
import { getAppUrl } from "../../utils/app-url";

export const Home: React.FC = () => {
  const checkLoginQuery = useCheckLogin();
  const isLoggedIn = checkLoginQuery.data?.data?.isLoggedIn;

  if (isLoggedIn) {
    return <Navigate to={getAppUrl("events")} />;
  }

  return (
    <div>
      <h1>About</h1>
      <p>Her you can create events, register your cars, and attend events</p>
    </div>
  );
};
