import { EventDTO } from "shared";
import { dbEventInclude } from "../types/db-include-types";
import { User } from "./user";
import { Car } from "./car";

export class EventClass {
  id: string;
  name: string;
  location: string | undefined;
  description: string | undefined;
  owner: User;

  eventAttendce: { id: string; user: User; car: Car }[];

  constructor(event: dbEventInclude) {
    this.id = event.id;
    this.name = event.name;
    this.location = event.location ?? undefined;
    this.description = event.description ?? undefined;
    this.owner = new User(event.owner);
    this.eventAttendce = [];
    event.eventAttendce.forEach((attendence) => {
      this.eventAttendce.push({
        id: attendence.id,
        user: new User(attendence.user),
        car: new Car(attendence.car),
      });
    });
  }

  userIsOwner(userId: string): boolean {
    return this.owner.id === userId;
  }

  userIsAttending(userId: string): boolean {
    return !!this.eventAttendce.some((attendee) => attendee.user.id === userId);
  }

  toDTO(): EventDTO {
    return {
      id: this.id,
      name: this.name,
      location: this.location,
      description: this.description,
      owner: { id: this.owner.id, name: this.owner.name },
      attendence: this.eventAttendce.map((attendee) => ({
        id: attendee.id,
        user: { id: attendee.user.id, name: attendee.user.name },
        car: {
          id: attendee.car.id,
          model: attendee.car.model,
          imageUrl: attendee.car.imageUrl,
        },
      })),
    };
  }
}
