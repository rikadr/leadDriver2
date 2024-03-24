export type AppId =
  | "home"
  | "feed"
  | "my-profile"
  | "car-add"
  | "event-add"
  | "login";

export const appUrl: Record<AppId, string> = {
  home: "/",
  feed: "/feed",
  "my-profile": "/my-profile",
  "car-add": "/car/add",
  "event-add": "/event/add",
  login: "/login",
};
