import React from "react";
import { LoginPage } from "./route/login/login-page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LoginStatus } from "./route/login/login-status";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./route/home/home";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              <div>
                <LoginStatus />
                <LoginPage />
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
