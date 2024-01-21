import { Server } from "@hapi/hapi";
import { Cookie, Credentials, LoginPayload, SignupPayload } from "../types";
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
    handler: async (request) => {
      const payload = JSON.parse(request.payload.toString()) as SignupPayload;

      const time = new Promise((res) => {
        setTimeout(res, 1000);
      });

      const user = await authManager.signUp(payload);

      await time;

      const cookie: Cookie = {
        userId: user.id,
      };

      request.cookieAuth.set(cookie);
      return { data: "successful signup!! Welcome " + user.name };
    },
    options: {
      auth: { mode: "try" },
    },
  });

  server.route({
    method: "POST",
    path: "/api/login",
    handler: async (request) => {
      const payload = JSON.parse(request.payload.toString()) as LoginPayload;
      const user = await authManager.authenticateUserAndPassword(payload);

      const cookie: Cookie = {
        userId: user.id,
      };
      request.cookieAuth.set(cookie);

      return { data: "Successful login as " + user.name + "!!" };
    },
    options: {
      auth: { mode: "try" },
    },
  });

  server.route({
    method: "POST",
    path: "/api/logout",
    handler: (request) => {
      request.cookieAuth.clear();
      return { data: "logged out, bye" };
    },
  });

  server.route({
    method: "GET",
    path: "/api/check-login",
    handler: (request): { data: string } => {
      const credentials = request.auth.credentials as Credentials;

      if (!credentials) {
        return { data: "No, you are not logged in" };
      }

      return { data: `Yes you are logged in as ${credentials.name}` };
    },
    options: {
      auth: { mode: "optional" },
    },
  });
};
