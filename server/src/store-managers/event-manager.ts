import { EventStore } from "../stores/event-store";
import { CarStore } from "../stores/car-store";
import { badData, notFound } from "@hapi/boom";

export class EventManager {
  constructor(private eventStore: EventStore, private carStore: CarStore) {}

  async createEvent({ name }: { name: string }): Promise<{ eventId: string }> {
    const created = await this.eventStore.createEvent({ name });
    return { eventId: created.id };
  }

  async getEventById(eventId: string) {
    const event = await this.eventStore.getEventById(eventId);
    if (!event) {
      throw notFound("Event not found");
    }
    return event;
  }

  async getEvents() {
    const events = await this.eventStore.getEvents();
    return events;
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
    const event = await this.getEventById(eventId);
    const userIsAlreadyAttending = event.eventAttendce.some(
      (attendee) => attendee.user.id === userId
    );
    if (userIsAlreadyAttending) {
      throw badData("User is already attending this event");
    }

    const car = await this.carStore.findOne({ carId });
    if (!car) {
      throw notFound("Car not found");
    }
    if (car.ownerId !== userId) {
      throw badData("User does not own this car");
    }

    await this.eventStore.attendEvent({ eventId, userId, carId });
  }
}
