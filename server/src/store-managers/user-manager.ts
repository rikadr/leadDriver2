import { user } from "@prisma/client";
import { UserStore } from "../stores/user-store";
import { notFound } from "@hapi/boom";

export class UserManager {
  constructor(private userStore: UserStore) {}

  async findOne({ userId }: { userId: string }): Promise<user> {
    const user = await this.userStore.findOne({ userId });

    if (!user) {
      throw notFound("User not found");
    }
    return user;
  }

  async findOneByName({ name }: { name: string }): Promise<user> {
    const user = await this.userStore.findOneByName({ name });

    if (!user) {
      throw notFound("User not found");
    }
    return user;
  }

  async findMany(): Promise<user[]> {
    const users = await this.userStore.findMany();
    return users;
  }
}
