import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./route/home/home";
import { MyProfile } from "./route/my-profile/my-profile";
import { LayoutContainer } from "./layout/layout-container";
import { LoginPage } from "./route/login/login-page";
import { appUrl } from "./utils/app-url";
import { Feed } from "./route/feed/feed";
import { AddCar } from "./route/cars/add-car";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <LayoutContainer>
          <Routes>
            <Route path={appUrl["home"]} element={<Home />} />
            <Route path={appUrl["feed"]} element={<Feed />} />
            <Route path={appUrl["my-profile"]} element={<MyProfile />} />
            <Route path={appUrl["cars-add"]} element={<AddCar />} />
            <Route path={appUrl["login"]} element={<LoginPage />} />
          </Routes>
        </LayoutContainer>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
