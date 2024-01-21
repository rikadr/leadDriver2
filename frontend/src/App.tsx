import React from "react";
import { LoginPage } from "./route/login/login-page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./route/home/home";
import { MyProfile } from "./route/my-profile/my-profile";
import { NavMenu } from "./layout/nav-menu";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <NavMenu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
