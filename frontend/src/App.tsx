import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Home } from "./route/home/home";
import { MyProfile } from "./route/my-profile/my-profile";
import { LayoutContainer } from "./layout/layout-container";
import { LoginPage } from "./route/login/login-page";
import { appUrl } from "./utils/app-url";
import { AddCarPage } from "./route/cars/add-car-page";
import { AddEventPage } from "./route/event/add-event-page";
import { EventsPage } from "./route/event/events-page";
import { EventPage } from "./route/event/event-page";
import { CarPage } from "./route/cars/car-page";

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
              <Route path=":id" element={<CarPage />} />
              <Route path={appUrl["add"]} element={<AddCarPage />} />
            </Route>
            <Route path={appUrl["events"]} element={<EventsPage />} />
            <Route path={appUrl["event"]}>
              <Route index element={<Navigate to={appUrl["events"]} />} />
              <Route path=":id" element={<EventPage />} />
              <Route path={appUrl["add"]} element={<AddEventPage />} />
            </Route>
            <Route path={appUrl["login"]} element={<LoginPage />} />
          </Routes>
        </LayoutContainer>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
