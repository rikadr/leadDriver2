import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./route/home/home";
import { MyProfile } from "./route/my-profile/my-profile";
import { LayoutContainer } from "./layout/layout-container";
import { LoginPage } from "./route/login/login-page";
import { appUrl } from "./utils/app-url";
import { AddCar } from "./route/cars/add-car";
import { AddEvent } from "./route/event/add-event";
import { Events } from "./route/event/events";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <LayoutContainer>
          <Routes>
            <Route path={appUrl["home"]} element={<Home />} />
            <Route path={appUrl["my-profile"]} element={<MyProfile />} />
            <Route path={appUrl["car-add"]} element={<AddCar />} />
            <Route path={appUrl["events"]} element={<Events />} />
            <Route path={appUrl["event-add"]} element={<AddEvent />} />
            <Route path={appUrl["login"]} element={<LoginPage />} />
          </Routes>
        </LayoutContainer>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
