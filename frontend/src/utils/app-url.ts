export type AppId = "home" | "my-profile" | "login";

export const appUrl: Record<AppId, string> = {
  home: "/",
  "my-profile": "/my-profile",
  login: "/login",
};
