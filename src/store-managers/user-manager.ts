import { PrismaClient, user } from "@prisma/client";
import { UserStore } from "../stores/user-store";
import { CreateUserPayload } from "../types";

export class UserManager {
  constructor(private userStore: UserStore) {}

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
