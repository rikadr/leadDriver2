import { PrismaClient, event } from "@prisma/client";
import { dbEventInclude } from "../types/db-include-types";
import { EventClass } from "../classes/event";
import { EditEventPayload } from "shared";

export class EventStore {
  constructor(private prismaClient: PrismaClient) {}

  private eventIncludeStatement = {
    owner: true,
    eventAttendce: {
      include: {
        user: true,
        car: true,
      },
    },
  };

  async createEvent(
    userId: string,
    data: { name: string; description?: string; location?: string }
  ) {
    const created = await this.prismaClient.event.create({
      data: {
        name: data.name,
        description: data.description || null,
        location: data.location || null,
        ownerId: userId,
      },
      include: this.eventIncludeStatement,
    });
    return new EventClass(created);
  }

  async getEventById(eventId: string) {
    const event: dbEventInclude | null =
      await this.prismaClient.event.findFirst({
        where: { id: eventId },
        include: this.eventIncludeStatement,
      });
    return event ? new EventClass(event) : null;
  }

  async getEvents() {
    const events: dbEventInclude[] = await this.prismaClient.event.findMany({
      include: this.eventIncludeStatement,
    });
    return events.map((event) => new EventClass(event));
  }

  async getEventsByUserAttendee(userId: string) {
    const events: dbEventInclude[] = await this.prismaClient.event.findMany({
      where: { eventAttendce: { some: { userId } } },
      include: this.eventIncludeStatement,
    });
    return events.map((event) => new EventClass(event));
  }

  async getEventsByOwner(userId: string) {
    const events: dbEventInclude[] = await this.prismaClient.event.findMany({
      where: { ownerId: userId },
      include: this.eventIncludeStatement,
    });
    return events.map((event) => new EventClass(event));
  }

  async getEventAttendence(eventId: string, userId: string) {
    return this.prismaClient.eventAttendce.findFirst({
      where: { eventId, userId },
    });
  }

  async editEvent(payload: EditEventPayload) {
    const edited = await this.prismaClient.event.update({
      where: { id: payload.eventId },
      data: {
        name: payload.name,
        description: payload.description || null,
        location: payload.location || null,
      },
      include: this.eventIncludeStatement,
    });
    return new EventClass(edited);
  }

  async deleteEvent(eventId: string) {
    const deleted = await this.prismaClient.event.delete({
      where: { id: eventId },
      include: this.eventIncludeStatement,
    });

    return new EventClass(deleted);
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
