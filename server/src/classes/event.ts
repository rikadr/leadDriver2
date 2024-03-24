import { EventDTO } from "shared";
import { dbEventInclude } from "../types/event-types";
import { User } from "./user";
import { Car } from "./car";

export class Event {
  id: string;
  name: string;
  eventAttendce: { id: string; user: User; car: Car }[];

  constructor(event: dbEventInclude) {
    this.id = event.id;
    this.name = event.name;
    this.eventAttendce = [];
    event.eventAttendce.forEach((attendence) => {
      this.eventAttendce.push({
        id: attendence.id,
        user: new User(attendence.user),
        car: new Car(attendence.car),
      });
    });
  }

  toDTO(): EventDTO {
    return {
      id: this.id,
      name: this.name,
      attendence: this.eventAttendce.map((attendee) => ({
        id: attendee.id,
        user: { id: attendee.user.id, name: attendee.user.name },
        car: { id: attendee.car.id, model: attendee.car.model },
      })),
    };
  }
}
