export type AppId =
  | "home"
  | "feed"
  | "my-profile"
  | "car-add"
  | "events"
  | "event"
  | "event-add"
  | "login";

export const appUrl: Record<AppId, string> = {
  home: "/",
  feed: "/feed",
  "my-profile": "/my-profile",
  "car-add": "/car/add",
  events: "/events",
  event: "/event",
  "event-add": "/event/add",
  login: "/login",
};
