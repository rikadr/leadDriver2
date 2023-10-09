import { Server } from "@hapi/hapi";
import { UserManager } from "../store-managers/user-manager";
import { CreateUserPayload, Credentials } from "../types";
import { randomInt } from "crypto";

export const register = async (server: Server, userManager: UserManager) => {
  server.route({
    method: "GET",
    path: "/api/users",
    handler: async (request, h, err) => {
      const users = await userManager.findMany();
      const formattedUserList = users
        .map((u) => `${u.name} (${u.email})`)
        .join(", ");
      return { data: formattedUserList };
    },
  });

  server.route({
    method: "GET",
    path: "/api/user/you",
    handler: async (request, h, err) => {
      const users = await userManager.findMany();
      const formattedUserList = users
        .map((u) => `${u.name} (${u.email})`)
        .join(", ");
      return { data: formattedUserList };
    },
  });

  server.route({
    method: "GET",
    path: "/api/users/createRandom",
    handler: async (request, h, err) => {
      const createPayload: CreateUserPayload = {
        name: "Herman" + randomInt(100),
        email: randomInt(100) + "@test.com",
      };
      await userManager.createUser(createPayload);
      return "Success!!";
    },
  });

  server.route({
    method: "GET",
    path: "/api/secret",
    handler: (request, h, err) => {
      const credentials = request.auth.credentials as unknown as Credentials;

      return `Welcome to the secret page, ${credentials.name}. Email: ${credentials.email}`;
    },
  });
};
