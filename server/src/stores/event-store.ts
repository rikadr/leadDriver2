import { PrismaClient, event } from "@prisma/client";
import { dbEventInclude } from "../types/db-include-types";
import { EventClass } from "../classes/event";

export class EventStore {
  constructor(private prismaClient: PrismaClient) {}

  async createEvent(
    userId: string,
    data: { name: string; description?: string; location?: string }
  ): Promise<event> {
    return await this.prismaClient.event.create({
      data: {
        name: data.name,
        description: data.description ?? null,
        location: data.location ?? null,
        ownerId: userId,
      },
    });
  }

  async getEventById(eventId: string) {
    const event: dbEventInclude | null =
      await this.prismaClient.event.findFirst({
        where: { id: eventId },
        include: {
          owner: true,
          eventAttendce: {
            include: {
              user: true,
              car: true,
            },
          },
        },
      });
    return event ? new EventClass(event) : null;
  }

  async getEvents() {
    const events: dbEventInclude[] = await this.prismaClient.event.findMany({
      include: {
        owner: true,
        eventAttendce: {
          include: {
            user: true,
            car: true,
          },
        },
      },
    });
    return events.map((event) => new EventClass(event));
  }

  async getEventsByUserAttendee(userId: string) {
    const events: dbEventInclude[] = await this.prismaClient.event.findMany({
      where: { eventAttendce: { some: { userId } } },
      include: {
        owner: true,
        eventAttendce: {
          include: {
            user: true,
            car: true,
          },
        },
      },
    });
    return events.map((event) => new EventClass(event));
  }

  async getEventsByOwner(userId: string) {
    const events: dbEventInclude[] = await this.prismaClient.event.findMany({
      where: { ownerId: userId },
      include: {
        owner: true,
        eventAttendce: {
          include: {
            user: true,
            car: true,
          },
        },
      },
    });
    return events.map((event) => new EventClass(event));
  }

  async getEventAttendence(eventId: string, userId: string) {
    return this.prismaClient.eventAttendce.findFirst({
      where: { eventId, userId },
    });
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
  async revokeAttendence({ eventAttendenceId }: { eventAttendenceId: string }) {
    return await this.prismaClient.eventAttendce.deleteMany({
      where: { id: eventAttendenceId },
    });
  }
}
