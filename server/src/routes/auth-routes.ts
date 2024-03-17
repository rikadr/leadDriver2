import { Server } from "@hapi/hapi";
import { AuthManager } from "../store-managers/auth-manager";
import {
  CheckLoginResponse,
  Cookie,
  LoginPayload,
  LoginResponse,
  SignupPayload,
  SignupResponse,
} from "shared";
import { getCredentials } from "./credential-utils";

export const register = async (server: Server, authManager: AuthManager) => {
  server.route({
    method: "POST",
    path: "/api/signup",
    handler: async (request): Promise<SignupResponse> => {
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
      return { data: { message: "successful signup!! Welcome " + user.name } };
    },
    options: {
      auth: { mode: "try" },
    },
  });

  server.route({
    method: "POST",
    path: "/api/login",
    handler: async (request): Promise<LoginResponse> => {
      const payload = JSON.parse(request.payload.toString()) as LoginPayload;
      const user = await authManager.authenticateUserAndPassword(payload);

      const cookie: Cookie = {
        userId: user.id,
      };
      request.cookieAuth.set(cookie);

      return { data: { message: "Successful login as " + user.name + "!!" } };
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
    options: {
      auth: { mode: "optional" },
    },
    handler: async (request): Promise<CheckLoginResponse> => {
      let isLoggedIn = false;
      const credentials = getCredentials(request);
      if (!!credentials) {
        isLoggedIn = true;
      }

      return { data: { isLoggedIn } };
    },
  });
};
