import { Server } from "@hapi/hapi";
import { UserManager } from "../store-managers/user-manager";
import { Credentials } from "../types";

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
      const credentials = request.auth.credentials as unknown as Credentials;

      const user = await userManager.findOne({ userId: credentials.userId });
      return { data: user };
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
