import { car, eventAttendce, user } from "@prisma/client";

export type dbEventInclude = {
  id: string;
  name: string;
  eventAttendce: (eventAttendce & {
    user: user;
    car: car;
  })[];
};
