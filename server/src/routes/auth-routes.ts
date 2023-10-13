import { Server } from "@hapi/hapi";
import { Cookie, LoginPayload, SignupPayload } from "../types";
import { UserManager } from "../store-managers/user-manager";
import { AuthManager } from "../store-managers/auth-manager";

export const register = async (
  server: Server,
  authManager: AuthManager,
  userManager: UserManager
) => {
  server.route({
    method: "POST",
    path: "/api/signup",
    handler: async (request, h, err) => {
      const payload = request.payload as SignupPayload;

      console.log("signup payload", payload);

      const user = await authManager.signUp(payload);

      console.log("signup user", user);

      const cookie: Cookie = {
        userId: user.id,
      };

      request.cookieAuth.set(cookie);
      return "successful signup!! Welcome " + user;
    },
    options: {
      auth: { mode: "try" },
    },
  });

  server.route({
    method: "POST",
    path: "/api/login",
    handler: async (request, h, err) => {
      const payload = request.payload as LoginPayload;

      const user = await authManager.authenticateUserAndPassword(payload);

      const cookie: Cookie = {
        userId: user.id,
      };
      request.cookieAuth.set(cookie);

      return "Successful login as " + user.name + "!!";
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
  });
};
