import { PrismaClient, event } from "@prisma/client";
import { dbEventInclude } from "../types/event-types";
import { Event } from "../classes/event";

export class EventStore {
  constructor(private prismaClient: PrismaClient) {}

  async createEvent({ name }: { name: string }): Promise<event> {
    return await this.prismaClient.event.create({
      data: {
        name,
      },
    });
  }

  async getEventById(eventId: string) {
    const event: dbEventInclude | null =
      await this.prismaClient.event.findFirst({
        where: { id: eventId },
        include: {
          eventAttendce: {
            include: {
              user: true,
              car: true,
            },
          },
        },
      });
    return event ? new Event(event) : null;
  }

  async getEvents() {
    const events: dbEventInclude[] = await this.prismaClient.event.findMany({
      include: {
        eventAttendce: {
          include: {
            user: true,
            car: true,
          },
        },
      },
    });
    return events.map((event) => new Event(event));
  }

  async attendEvent({
    eventId,
    userId,
    carId,
  }: {
    eventId: string;
    userId: string;
    carId: string;
  }) {
    return await this.prismaClient.eventAttendce.create({
      data: {
        eventId,
        userId,
        carId,
      },
    });
  }
}
