import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Home } from "./route/home/home";
import { MyProfile } from "./route/my-profile/my-profile";
import { LayoutContainer } from "./layout/layout-container";
import { LoginPage } from "./route/login/login-page";
import { appUrl } from "./utils/app-url";
import { AddCar } from "./route/cars/add-car";
import { AddEvent } from "./route/event/add-event";
import { Events } from "./route/event/events";
import { Event } from "./route/event/event";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <LayoutContainer>
          <Routes>
            <Route path={appUrl["home"]} element={<Home />} />
            <Route path={appUrl["my-profile"]} element={<MyProfile />} />
            <Route path={appUrl["car"]}>
              <Route index element={<Navigate to={appUrl["my-profile"]} />} />
              <Route path={appUrl["add"]} element={<AddCar />} />
            </Route>
            <Route path={appUrl["events"]} element={<Events />} />
            <Route path={appUrl["event"]}>
              <Route index element={<Navigate to={appUrl["events"]} />} />
              <Route path=":id" element={<Event />} />
              <Route path={appUrl["add"]} element={<AddEvent />} />
            </Route>
            <Route path={appUrl["login"]} element={<LoginPage />} />
          </Routes>
        </LayoutContainer>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
