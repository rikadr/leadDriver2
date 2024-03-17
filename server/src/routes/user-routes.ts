import { Server } from "@hapi/hapi";
import { UserManager } from "../store-managers/user-manager";
import { getCredentials, getCredentialsDefined } from "./credential-utils";
import { YouResponse, YouInitialsResponse } from "shared";

export const register = async (server: Server, userManager: UserManager) => {
  server.route({
    method: "GET",
    path: "/api/user/you",
    handler: async (request): Promise<YouResponse> => {
      const credentials = getCredentialsDefined(request);

      const user = await userManager.findOne({
        userId: credentials.userId,
        includeCars: true,
      });

      return {
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          cars: user.cars.map((car) => ({
            id: car.id,
            model: car.model,
          })),
        },
      };
    },
  });

  server.route({
    method: "GET",
    path: "/api/user/you/initials",
    options: {
      auth: {
        mode: "optional",
      },
    },
    handler: async (request, h): Promise<YouInitialsResponse> => {
      let initials: string | undefined;
      try {
        const credentials = getCredentialsDefined(request);
        const user = await userManager.findOne({
          userId: credentials.userId,
          includeCars: true,
        });
        initials = user.name[0] ?? "#";
      } catch (e) {}

      return { data: { initials } };
    },
  });
};
