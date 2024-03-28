import { Server } from "@hapi/hapi";
import {
  AddEventPayload,
  AddEventResponse,
  AttendEventPayload,
  GetEventPayload,
  GetEventResponse,
  GetEventsPayload,
  GetEventsResponse,
  RevokeAttendenceEventPayload,
} from "shared";
import { EventManager } from "../store-managers/event-manager";
import { getCredentialsDefined } from "./credential-utils";
import { EventClass } from "../classes/event";

export const register = async (server: Server, eventManager: EventManager) => {
  server.route({
    method: "GET",
    path: "/api/event",
    options: {
      description: "Get an event",
      auth: { mode: "required" },
      handler: async (request): Promise<GetEventResponse> => {
        const { userId } = getCredentialsDefined(request);
        const { eventId } = request.query as GetEventPayload;
        const event = await eventManager.getEventById(eventId);
        return {
          data: {
            event: event.toDTO(),
            youAreAttending: event.userIsAttending(userId),
          },
        };
      },
    },
  });

  server.route({
    method: "GET",
    path: "/api/events",
    options: {
      description: "Get all events",
      auth: { mode: "required" },
      handler: async (request): Promise<GetEventsResponse> => {
        const { userId } = getCredentialsDefined(request);
        const { type } = request.query as GetEventsPayload;
        let events: EventClass[] = [];

        switch (type) {
          case "ALL":
            events = await eventManager.getEvents();
            break;
          case "ATTENDING":
            events = await eventManager.getEventsByUserAttendee(userId);
            break;
          case "OWNED":
            events = await eventManager.getEventsByOwner(userId);
            break;
          default:
            const exhaustiveCheck: never = type;
        }
        return {
          data: events.map((e) => ({
            event: e.toDTO(),
            yourEvent: e.userIsOwner(userId),
            youAreAttending: e.userIsAttending(userId),
          })),
        };
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
        const { userId } = getCredentialsDefined(request);

        const payload = JSON.parse(
          request.payload.toString()
        ) as AddEventPayload;

        const { eventId: createdEventId } = await eventManager.createEvent(
          userId,
          {
            name: payload.name,
            description: payload.description,
            location: payload.location,
          }
        );

        return { data: { eventId: createdEventId } };
      },
    },
  });

  server.route({
    method: "POST",
    path: "/api/event/attend",
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

  server.route({
    method: "DELETE",
    path: "/api/event/attend",
    options: {
      description: "Revoke attendence to an event",
      auth: { mode: "required" },
      handler: async (request, h) => {
        const credentials = getCredentialsDefined(request);
        const payload = JSON.parse(
          request.payload.toString()
        ) as RevokeAttendenceEventPayload;

        await eventManager.revokeAttendence({
          userId: credentials.userId,
          eventId: payload.eventId,
        });

        return h.response();
      },
    },
  });
};
