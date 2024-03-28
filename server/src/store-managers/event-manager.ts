import { EventStore } from "../stores/event-store";
import { CarStore } from "../stores/car-store";
import { badData, notFound } from "@hapi/boom";
import { EditEventPayload } from "shared";

export class EventManager {
  constructor(private eventStore: EventStore, private carStore: CarStore) {}

  async createEvent(
    userId: string,
    data: { name: string; description?: string; location?: string }
  ): Promise<{ eventId: string }> {
    const created = await this.eventStore.createEvent(userId, data);
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

  async getEventsByUserAttendee(userId: string) {
    const events = await this.eventStore.getEventsByUserAttendee(userId);
    return events;
  }

  async getEventsByOwner(userId: string) {
    const events = await this.eventStore.getEventsByOwner(userId);
    return events;
  }

  async editEvent({
    userId,
    payload,
  }: {
    userId: string;
    payload: EditEventPayload;
  }) {
    const event = await this.getEventById(payload.eventId);
    if (event.owner.id !== userId) {
      throw badData(
        "Unable to edit event. User is not the owner of this event"
      );
    }

    await this.eventStore.editEvent(payload);
  }

  async deleteEvent({ userId, eventId }: { userId: string; eventId: string }) {
    const event = await this.getEventById(eventId);
    if (event.owner.id !== userId) {
      throw badData(
        "Unable to delete event. User is not the owner of this event"
      );
    }

    await this.eventStore.deleteEvent(eventId);
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

  async revokeAttendence({
    userId,
    eventId,
  }: {
    userId: string;
    eventId: string;
  }) {
    const attendence = await this.eventStore.getEventAttendence(
      eventId,
      userId
    );
    if (!attendence) {
      throw badData("User is not attending this event");
    }

    await this.eventStore.revokeAttendence({
      eventAttendenceId: attendence.id,
    });
  }
}
