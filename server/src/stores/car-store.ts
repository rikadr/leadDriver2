import { PrismaClient } from "@prisma/client";
import { Car } from "../classes/car";
import { dbCarInclude } from "../types/db-include-types";
import { AddCarPayload, EditCarPayload } from "shared";

export class CarStore {
  constructor(private prismaClient: PrismaClient) {}

  private carIncludeStatement = {
    owner: true,
  };

  async findOne({ carId }: { carId: string }): Promise<Car | null> {
    const car: dbCarInclude | null = await this.prismaClient.car.findUnique({
      where: {
        id: carId,
      },
      include: this.carIncludeStatement,
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
        imageUrl: data.imageUrl || null,
        ownerId,
      },
      include: this.carIncludeStatement,
    });
    return new Car(created);
  }

  async editCar({ payload }: { payload: EditCarPayload }) {
    const edited = await this.prismaClient.car.update({
      where: {
        id: payload.carId,
      },
      data: {
        model: payload.model,
        imageUrl: payload.imageUrl || null,
      },
      include: this.carIncludeStatement,
    });
    return new Car(edited);
  }

  async deleteCar({ carId }: { carId: string }) {
    const deleted = await this.prismaClient.car.delete({
      where: {
        id: carId,
      },
      include: this.carIncludeStatement,
    });
    return new Car(deleted);
  }
}
