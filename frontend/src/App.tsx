import React from "react";
import { LoginPage } from "./login/login-page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LoginStatus } from "./login/login-status";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LoginStatus />
      <LoginPage />
    </QueryClientProvider>
  );
}

export default App;
