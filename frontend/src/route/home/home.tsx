import React from "react";
import { LoginStatus } from "../login/login-status";

export const Home: React.FC = () => {
  return (
    <div>
      <h1>Home</h1>
      Hallo from home
      <LoginStatus />
    </div>
  );
};
