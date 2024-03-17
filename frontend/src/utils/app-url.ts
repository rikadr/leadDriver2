export type AppId = "home" | "feed" | "my-profile" | "cars-add" | "login";

export const appUrl: Record<AppId, string> = {
  home: "/",
  feed: "/feed",
  "my-profile": "/my-profile",
  "cars-add": "/cars/add",
  login: "/login",
};
