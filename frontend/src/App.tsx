import React from "react";
import { LoginPage } from "./route/login/login-page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./route/home/home";
import { MyProfile } from "./route/my-profile/my-profile";
import { LayoutContainer } from "./layout/layout-container";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <LayoutContainer>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/my-profile" element={<MyProfile />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </LayoutContainer>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
