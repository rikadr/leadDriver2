import { Server } from "@hapi/hapi";
import { getCredentials } from "./credential-utils";
import { CarManager } from "../store-managers/car-manager";

export const register = async (server: Server, carManager: CarManager) => {
  server.route({
    method: "POST",
    path: "/api/car",
    handler: async (request, h, err) => {
      const credentials = getCredentials(request);
      const payload = request.payload as { model: string };

      const car = await carManager.createCar({
        model: payload.model,
        ownerId: credentials.userId,
      });

      return { data: `Added car ${car.model} to ${credentials.name}` };
    },
  });
};
