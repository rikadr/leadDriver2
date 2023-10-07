import { Server } from "@hapi/hapi";
import { IApiResponse } from "../types";
import { randomUUID } from "crypto";

export const register = async (server: Server) => {
  server.route({
    method: "POST",
    path: "/login",
    handler: async (
      request,
      h,
      err
    ): Promise<IApiResponse<{ success: true; message: string }>> => {
      const { username, password } = request.payload as {
        username: string;
        password: string;
      };

      // Check if username and password are correct

      const sessionId = randomUUID();

      // set cookie
      server.state("cookieTest", {
        path: "/",
        ttl: null,
        isSecure: false,
        isHttpOnly: true,
        clearInvalid: false,
        strictHeader: true,
      });

      h.response().state("cookieTest", sessionId);

      return {
        data: {
          message: `username: ${username}, password: ${password}`,
          success: true,
        },
      };
    },
    options: {
      state: {
        parse: true,
        failAction: "error",
      },
    },
  });
  server.route({
    method: "POST",
    path: "/logout",
    handler: async (request, h, err) => {
      h.response().unstate("cookieTest");
      return { data: { message: "Logged out" } };
    },
  });
};
