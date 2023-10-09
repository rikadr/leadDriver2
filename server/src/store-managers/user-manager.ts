import { PrismaClient, user } from "@prisma/client";
import { UserStore } from "../stores/user-store";
import { CreateUserPayload } from "../types";

export class UserManager {
  constructor(private userStore: UserStore) {}

  async findOne({ userId }: { userId: string }): Promise<user | null> {
    return this.userStore.findOne({ userId });
  }

  async findOneByName({ name }: { name: string }): Promise<user | null> {
    return this.userStore.findOneByName({ name });
  }

  async findMany(): Promise<user[]> {
    const users = this.userStore.findMany();
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
