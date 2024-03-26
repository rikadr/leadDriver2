import { PrismaClient } from "@prisma/client";
import { Car } from "../classes/car";
import { dbCarInclude } from "../types/event-types";
import { AddCarPayload } from "shared";

export class CarStore {
  constructor(private prismaClient: PrismaClient) {}

  async findOne({ carId }: { carId: string }): Promise<Car | null> {
    const car: dbCarInclude | null = await this.prismaClient.car.findUnique({
      where: {
        id: carId,
      },
      include: {
        owner: true,
      },
    });
    return car ? new Car(car) : null;
  }

  async findMany({ ownerId }: { ownerId: string }): Promise<Car[]> {
    const cars: dbCarInclude[] = await this.prismaClient.car.findMany({
      where: { ownerId },
      include: {
        owner: true,
      },
    });
    return cars.map((car) => new Car(car));
  }

  async createCar({
    data,
    ownerId,
  }: {
    data: AddCarPayload;
    ownerId: string;
  }): Promise<Car> {
    const created: dbCarInclude = await this.prismaClient.car.create({
      data: {
        model: data.model,
        imageUrl: data.imageUrl ?? null,
        ownerId,
      },
      include: {
        owner: true,
      },
    });
    return new Car(created);
  }
}
