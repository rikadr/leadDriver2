import { Server } from "@hapi/hapi";
import { getCredentialsDefined } from "./credential-utils";
import { CarManager } from "../store-managers/car-manager";
import {
  AddCarPayload,
  AddCarResponse,
  DeleteCarPayload,
  EditCarPayload,
  GetCarPayload,
  GetCarResponse,
  GetCarsResponse,
} from "shared";

export const register = async (server: Server, carManager: CarManager) => {
  server.route({
    method: "GET",
    path: "/api/car",
    handler: async (request): Promise<GetCarResponse> => {
      const { userId } = getCredentialsDefined(request);
      const { carId } = request.query as GetCarPayload;
      const car = await carManager.findOne({ carId });
      return { data: { car: car.toDTO(), isYourCar: car.userIsOwner(userId) } };
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

  server.route({
    method: "PUT",
    path: "/api/car",
    options: {
      description: "Edit a car",
      auth: { mode: "required" },
      handler: async (request, h) => {
        const credentials = getCredentialsDefined(request);
        const payload = JSON.parse(
          request.payload.toString()
        ) as EditCarPayload;

        await carManager.editCar({
          userId: credentials.userId,
          payload,
        });

        return h.response();
      },
    },
  });

  server.route({
    method: "DELETE",
    path: "/api/car",
    options: {
      description: "Delete a car",
      auth: { mode: "required" },
      handler: async (request, h) => {
        const credentials = getCredentialsDefined(request);
        const { carId } = JSON.parse(
          request.payload.toString()
        ) as DeleteCarPayload;

        await carManager.deleteCar({
          userId: credentials.userId,
          carId,
        });

        return h.response();
      },
    },
  });
};
