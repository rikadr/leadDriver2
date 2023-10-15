import { user } from "@prisma/client";
import { UserDTO } from "../types";
import { Car } from "./car";

export class User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  cars: Car[];

  constructor(user: user) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.passwordHash = user.passwordHash;
    this.cars = [];
  }

  toDTO(): UserDTO {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      cars: this.cars.map((car) => car.toDTO()),
    };
  }
  addCars(cars: Car[]) {
    this.cars.push(...cars);
  }
}
