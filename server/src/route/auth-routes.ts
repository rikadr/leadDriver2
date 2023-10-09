import { Server } from "@hapi/hapi";
import { Cookie } from "../types";
import { UserManager } from "../store-managers/user-manager";

export const register = async (server: Server, userManager: UserManager) => {
  server.route({
    method: "POST",
    path: "/api/login",
    handler: async (request, h, err) => {
      const { username, password } = request.payload as {
        username: string;
        password: string;
      };

      const user = await userManager.findOneByName({ name: username });

      if (!user) {
        return "Name not found, failed login :(";
      }

      const cookie: Cookie = {
        userId: user.id,
      };

      request.cookieAuth.set(cookie);
      return "successful login as " + username + "!!";
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
