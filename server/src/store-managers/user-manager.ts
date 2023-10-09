import { PrismaClient, user } from "@prisma/client";
import { UserStore } from "../stores/user-store";
import { CreateUserPayload } from "../types";

export class UserManager {
  constructor(private userStore: UserStore) {}

  async findOne({ userId }: { userId: string }): Promise<user> {
    const user = await this.userStore.findOne({ userId });

    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  async findOneByName({ name }: { name: string }): Promise<user> {
    const user = await this.userStore.findOneByName({ name });

    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  async findMany(): Promise<user[]> {
    const users = await this.userStore.findMany();
    return users;
  }

  async createUser(user: CreateUserPayload): Promise<user> {
    try {
      const newUser = await this.userStore.createUser(user);
      return newUser;
    } catch (err) {
      throw new Error(
        "Something wrong happened when trying to create new user" + err
      );
    }
  }
}
