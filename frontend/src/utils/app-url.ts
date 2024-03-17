export type AppId = "home" | "feed" | "my-profile" | "login";

export const appUrl: Record<AppId, string> = {
  home: "/",
  feed: "/feed",
  "my-profile": "/my-profile",
  login: "/login",
};
