import { user } from "@prisma/client";
import { UserStore } from "../stores/user-store";
import { notFound } from "@hapi/boom";
import { User } from "../classes/user";

export class UserManager {
  constructor(private userStore: UserStore) {}

  async findOne({ userId }: { userId: string }): Promise<User> {
    const user = await this.userStore.findOne({ userId });

    if (!user) {
      throw notFound("User not found");
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
