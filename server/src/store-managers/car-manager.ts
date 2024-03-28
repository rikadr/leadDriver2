import { CarStore } from "../stores/car-store";
import { Car } from "../classes/car";
import { notFound } from "@hapi/boom";
import { AddCarPayload, EditCarPayload } from "shared";

export class CarManager {
  constructor(private carStore: CarStore) {}

  async findOne({ carId }: { carId: string }): Promise<Car> {
    const car = await this.carStore.findOne({ carId });

    if (!car) {
      throw notFound("Car not found");
    }

    return car;
  }

  async findMany({ ownerId }: { ownerId: string }): Promise<Car[]> {
    const cars = await this.carStore.findMany({ ownerId });
    return cars;
  }

  async createCar({
    data,
    ownerId,
  }: {
    data: AddCarPayload;
    ownerId: string;
  }): Promise<Car> {
    const created = await this.carStore.createCar({
      data,
      ownerId,
    });
    return created;
  }

  async editCar({
    userId,
    payload,
  }: {
    userId: string;
    payload: EditCarPayload;
  }) {
    const car = await this.findOne({ carId: payload.carId });

    if (!car.userIsOwner(userId)) {
      throw notFound("Unable to edit car. You can only edit your own cars");
    }

    await this.carStore.editCar({ payload });
  }

  async deleteCar({ userId, carId }: { userId: string; carId: string }) {
    const car = await this.findOne({ carId });

    if (!car.userIsOwner(userId)) {
      throw notFound("Unable to delete car. You can only delete your own cars");
    }

    await this.carStore.deleteCar({ carId });
  }
}
