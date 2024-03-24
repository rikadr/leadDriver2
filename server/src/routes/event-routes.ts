import { Server } from "@hapi/hapi";
import {
  AddEventPayload,
  AddEventResponse,
  GetEventPayload,
  GetEventResponse,
} from "shared";
import { EventManager } from "../store-managers/event-manager";

export const register = async (server: Server, eventManager: EventManager) => {
  server.route({
    method: "GET",
    path: "/api/event",
    options: {
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
};
