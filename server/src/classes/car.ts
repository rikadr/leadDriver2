import { car } from "@prisma/client";
import { CarDTO } from "../types";

export class Car {
  id: string;
  model: string;
  ownerId: string;

  constructor(car: car) {
    this.id = car.id;
    this.model = car.model;
    this.ownerId = car.ownerId;
  }

  toDTO(): CarDTO {
    return {
      id: this.id,
      model: this.model,
    };
  }
}
