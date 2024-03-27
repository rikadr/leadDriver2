import { Server } from "@hapi/hapi";
import { getCredentialsDefined } from "./credential-utils";
import { CarManager } from "../store-managers/car-manager";
import {
  AddCarPayload,
  AddCarResponse,
  GetCarPayload,
  GetCarResponse,
  GetCarsResponse,
} from "shared";

export const register = async (server: Server, carManager: CarManager) => {
  server.route({
    method: "GET",
    path: "/api/car",
    handler: async (request): Promise<GetCarResponse> => {
      const { carId } = request.query as GetCarPayload;
      const car = await carManager.findOne({ carId });
      return { data: car.toDTO() };
    },
  });

  server.route({
    method: "GET",
    path: "/api/cars/your",
    handler: async (request): Promise<GetCarsResponse> => {
      const { userId } = getCredentialsDefined(request);
      const cars = await carManager.findMany({ ownerId: userId });
      return { data: cars.map((car) => car.toDTO()) };
    },
  });

  server.route({
    method: "POST",
    path: "/api/car",
    handler: async (request): Promise<AddCarResponse> => {
      const credentials = getCredentialsDefined(request);
      const payload = JSON.parse(request.payload.toString()) as AddCarPayload;

      const car = await carManager.createCar({
        data: payload,
        ownerId: credentials.userId,
      });

      return { data: car.toDTO() };
    },
  });
};
