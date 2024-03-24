export type AppId =
  | "home"
  | "my-profile"
  | "add"
  | "car"
  | "event"
  | "events"
  | "login";

export const appUrl: Record<AppId, string> = {
  home: "/",
  "my-profile": "/my-profile",
  add: "add",
  car: "/car",
  event: "/event",
  events: "/events",
  login: "/login",
};

export function getAppUrl(id: AppId | AppId[], variable?: string): string {
  let output: string;
  if (Array.isArray(id)) {
    output = id.map((i) => appUrl[i]).join("/");
  } else {
    output = appUrl[id];
  }
  if (variable) {
    output += `/${variable}`;
  }
  return output;
}
