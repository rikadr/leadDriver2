import { PrismaClient, user } from "@prisma/client";
import { Car } from "../classes/car";

export class CarStore {
  constructor(private prismaClient: PrismaClient) {}

  async findOne({ carId }: { carId: string }): Promise<Car | null> {
    const car = await this.prismaClient.car.findUnique({
      where: {
        id: carId,
      },
    });
    return car ? new Car(car) : null;
  }

  async findMany({ ownerId }: { ownerId: string }): Promise<Car[]> {
    const cars = await this.prismaClient.car.findMany({ where: { ownerId } });
    return cars.map((car) => new Car(car));
  }

  async createCar({
    model,
    ownerId,
  }: {
    model: string;
    ownerId: string;
  }): Promise<Car> {
    const created = await this.prismaClient.car.create({
      data: {
        model,
        ownerId,
      },
    });
    return new Car(created);
  }
}
