import { car } from "@prisma/client";
import { CarDTO } from "shared";
import { dbCarInclude } from "../types/event-types";

export class Car {
  id: string;
  model: string;
  ownerId: string;
  ownerName: string | undefined;

  constructor(car: car | dbCarInclude) {
    this.id = car.id;
    this.model = car.model;
    this.ownerId = car.ownerId;
    if ("owner" in car && car.owner !== null) {
      this.ownerName = car.owner.name;
    }
  }

  toDTO(): CarDTO {
    return {
      id: this.id,
      model: this.model,
      ownerName: this.ownerName,
    };
  }
}
