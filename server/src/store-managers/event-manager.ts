import { notFound } from "boom";
import { Event } from "../classes/event";
import { EventStore } from "../stores/event-store";

export class EventManager {
  constructor(private eventStore: EventStore) {}

  async createEvent({ name }: { name: string }): Promise<{ eventId: string }> {
    const created = await this.eventStore.createEvent({ name });
    return { eventId: created.id };
  }

  async getEventById(eventId: string) {
    const result = await this.eventStore.getEventById(eventId);
    if (!result) {
      throw notFound("Event not found");
    }
    return new Event(result);
  }
}
