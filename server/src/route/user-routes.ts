import { Server } from "@hapi/hapi";
import { UserManager } from "../store-managers/user-manager";
import { CreateUserPayload } from "../types";
import { randomInt } from "crypto";

export const register = async (server: Server, userManager: UserManager) => {
  server.route({
    method: "GET",
    path: "/test",
    handler: async (request, h, err) => {
      return { data: { message: "Hallo from backend test :)" } };
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
      return { data: formattedUserList };
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
};
