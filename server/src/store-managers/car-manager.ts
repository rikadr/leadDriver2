import { notFound } from "boom";
import { CarStore } from "../stores/car-store";
import { Car } from "../classes/car";

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
    model,
    ownerId,
  }: {
    model: string;
    ownerId: string;
  }): Promise<Car> {
    const created = await this.carStore.createCar({
      model,
      ownerId,
    });
    return created;
  }
}
