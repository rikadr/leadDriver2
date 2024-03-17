import { Server } from "@hapi/hapi";
import { getCredentialsDefined } from "./credential-utils";
import { CarManager } from "../store-managers/car-manager";
import { AddCarPayload, AddCarResponse } from "shared";

export const register = async (server: Server, carManager: CarManager) => {
  server.route({
    method: "POST",
    path: "/api/car",
    handler: async (request): Promise<AddCarResponse> => {
      const credentials = getCredentialsDefined(request);
      const payload = JSON.parse(request.payload.toString()) as AddCarPayload;

      const car = await carManager.createCar({
        model: payload.model,
        ownerId: credentials.userId,
      });

      return { data: car.toDTO() };
    },
  });
};
