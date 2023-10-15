import { UserStore } from "../stores/user-store";
import { notFound } from "@hapi/boom";
import { User } from "../classes/user";
import { CarStore } from "../stores/car-store";

export class UserManager {
  constructor(private userStore: UserStore, private carStore: CarStore) {}

  async findOne({
    userId,
    includeCars = false,
  }: {
    userId: string;
    includeCars?: boolean;
  }): Promise<User> {
    const user = await this.userStore.findOne({ userId });

    if (!user) {
      throw notFound("User not found");
    }

    if (includeCars) {
      const cars = await this.carStore.findMany({ ownerId: userId });
      user.addCars(cars);
    }
    return user;
  }

  async findOneByName({ name }: { name: string }): Promise<User> {
    const user = await this.userStore.findOneByName({ name });

    if (!user) {
      throw notFound(`User with name ${name} not found`);
    }
    return user;
  }

  async findMany(): Promise<User[]> {
    const users = await this.userStore.findMany();
    return users;
  }
}
