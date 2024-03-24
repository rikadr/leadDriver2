import { PrismaClient, event } from "@prisma/client";
import { dbEventInclude } from "../types/event-types";

export class EventStore {
  constructor(private prismaClient: PrismaClient) {}

  async createEvent({ name }: { name: string }): Promise<event> {
    return await this.prismaClient.event.create({
      data: {
        name,
      },
    });
  }

  async getEventById(eventId: string): Promise<dbEventInclude | null> {
    return await this.prismaClient.event.findFirst({
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
  }
}
