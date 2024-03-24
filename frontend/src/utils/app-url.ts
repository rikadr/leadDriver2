export type AppId =
  | "home"
  | "my-profile"
  | "car-add"
  | "events"
  | "event"
  | "event-add"
  | "login";

export const appUrl: Record<AppId, string> = {
  home: "/",
  "my-profile": "/my-profile",
  "car-add": "/car/add",
  events: "/events",
  event: "/event",
  "event-add": "/event/add",
  login: "/login",
};
