import { Server } from "@hapi/hapi";
import { UserManager } from "../store-managers/user-manager";
import { getCredentials } from "./credential-utils";

export const register = async (server: Server, userManager: UserManager) => {
  server.route({
    method: "GET",
    path: "/api/user/you",
    handler: async (request, h, err) => {
      const credentials = getCredentials(request);

      const user = await userManager.findOne({
        userId: credentials.userId,
        includeCars: true,
      });

      return { data: user };
    },
  });
};
