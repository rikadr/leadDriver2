import { car } from "@prisma/client";
import { CarDTO } from "shared";
import { dbCarInclude } from "../types/db-include-types";

export class Car {
  id: string;
  model: string;
  imageUrl: string | undefined;
  ownerId: string;
  ownerName: string | undefined;

  constructor(car: car | dbCarInclude) {
    this.id = car.id;
    this.model = car.model;
    if (car.imageUrl) {
      this.imageUrl = car.imageUrl;
    }
    this.ownerId = car.ownerId;
    if ("owner" in car && car.owner !== null) {
      this.ownerName = car.owner.name;
    }
  }

  userIsOwner(userId: string): boolean {
    return this.ownerId === userId;
  }

  toDTO(): CarDTO {
    return {
      id: this.id,
      model: this.model,
      imageUrl: this.imageUrl,
      ownerName: this.ownerName,
    };
  }
}
