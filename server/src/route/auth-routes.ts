import { Server } from "@hapi/hapi";
import { IApiResponse, SessionCookieObject } from "../types";
import { randomUUID } from "crypto";

export const correctSessionId = "This is the correct session id";

export const createdSessionObject: SessionCookieObject = {
  userId: "test from validate function",
  name: "test from validate function",
  email: "test from validate function",
};

export const register = async (server: Server) => {
  server.route({
    method: "POST",
    path: "/api/login",
    handler: (request, h, err) => {
      const { username, password } = request.payload as {
        username: string;
        password: string;
      };

      if (username === "test" && password === "test") {
        request.cookieAuth.set(createdSessionObject);
        return "success!!";
      }
      return "failed login :(";
    },
    options: {
      auth: { mode: "try" },
    },
  });
  server.route({
    method: "POST",
    path: "/api/logout",
    handler: (request, h, err) => {
      request.cookieAuth.clear();
      return "logged out, bye";
    },
    options: {
      auth: { mode: "try" },
    },
  });
};
