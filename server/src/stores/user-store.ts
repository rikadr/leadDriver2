import { PrismaClient, user } from "@prisma/client";
import { CreateUserPayload } from "../types";
import { User } from "../classes/user";
import { log } from "console";

export class UserStore {
  constructor(private prismaClient: PrismaClient) {}

  async findOne({ userId }: { userId: string }): Promise<User | null> {
    const user = await this.prismaClient.user.findUnique({
      where: {
        id: userId,
      },
    });
    return user ? new User(user) : null;
  }

  async findOneByName({ name }: { name: string }): Promise<User | null> {
    const user = await this.prismaClient.user.findFirst({
      where: {
        name,
      },
    });
    return user ? new User(user) : null;
  }

  async findOneByEmail({ email }: { email: string }): Promise<User | null> {
    const user = await this.prismaClient.user.findFirst({
      where: {
        email,
      },
    });
    return user ? new User(user) : null;
  }

  async findMany(): Promise<User[]> {
    const users = await this.prismaClient.user.findMany();
    return users.map((user) => new User(user));
  }

  async createUser({
    user,
    passwordHash,
  }: {
    user: CreateUserPayload;
    passwordHash: string;
  }): Promise<User> {
    const created = await this.prismaClient.user.create({
      data: {
        passwordHash,
        email: user.email,
        name: user.name,
      },
    });
    return new User(created);
  }
}
