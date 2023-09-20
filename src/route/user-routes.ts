import { Server } from "@hapi/hapi";
import { UserManager } from "../store-managers/user-manager";
import { CreateUserPayload } from "../types";
import { randomInt } from "crypto";

export const register = async (server: Server, userManager: UserManager) => {
  server.route({
    method: "GET",
    path: "/test",
    handler: async (request, h, err) => {
      return "test";
    },
  });

  server.route({
    method: "GET",
    path: "/users",
    handler: async (request, h, err) => {
      const users = await userManager.findMany();
      const formattedUserList = users
        .map((u) => `${u.name} (${u.email})`)
        .join(", ");
      return formattedUserList;
    },
  });

  server.route({
    method: "GET",
    path: "/users/createRandom",
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
    method: "POST",
    path: "/users",
    handler: async (request, h, err) => {
      const createPayload = request.payload as CreateUserPayload;
      // create using manager
      return "Success!!";
    },
  });
};
