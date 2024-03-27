import { car, event, eventAttendce, user } from "@prisma/client";

export type dbEventInclude = event & {
  owner: user;
  eventAttendce: (eventAttendce & {
    user: user;
    car: car;
  })[];
};

export type dbCarInclude = car & { owner: user };
