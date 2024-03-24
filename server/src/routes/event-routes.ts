import { Server } from "@hapi/hapi";
import {
  AddEventPayload,
  AddEventResponse,
  AttendEventPayload,
  GetEventPayload,
  GetEventResponse,
} from "shared";
import { EventManager } from "../store-managers/event-manager";
import { getCredentialsDefined } from "./credential-utils";

export const register = async (server: Server, eventManager: EventManager) => {
  server.route({
    method: "GET",
    path: "/api/event",
    options: {
      description: "Get an event",
      auth: { mode: "required" },
      handler: async (request): Promise<GetEventResponse> => {
        //   const credentials = getCredentialsDefined(request);
        const payload = JSON.parse(
          request.payload.toString()
        ) as GetEventPayload;

        const event = await eventManager.getEventById(payload.eventId);

        return { data: event.toDTO() };
      },
    },
  });

  server.route({
    method: "POST",
    path: "/api/event",
    options: {
      description: "Create a new event",
      auth: { mode: "required" },
      handler: async (request): Promise<AddEventResponse> => {
        //   const credentials = getCredentialsDefined(request);
        const payload = JSON.parse(
          request.payload.toString()
        ) as AddEventPayload;

        const { eventId: createdEventId } = await eventManager.createEvent({
          name: payload.name,
        });

        return { data: { eventId: createdEventId } };
      },
    },
  });

  server.route({
    method: "POST",
    path: "/api/event",
    options: {
      description: "Attend an event",
      auth: { mode: "required" },
      handler: async (request, h) => {
        const credentials = getCredentialsDefined(request);
        const payload = JSON.parse(
          request.payload.toString()
        ) as AttendEventPayload;

        await eventManager.attendEvent({
          userId: credentials.userId,
          eventId: payload.eventId,
          carId: payload.carId,
        });

        return h.response();
      },
    },
  });
};
