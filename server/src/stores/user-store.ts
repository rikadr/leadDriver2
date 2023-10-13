import { PrismaClient, user } from "@prisma/client";
import { CreateUserPayload } from "../types";

export class UserStore {
  constructor(private prismaClient: PrismaClient) {}

  async findOne({ userId }: { userId: string }): Promise<user | null> {
    return await this.prismaClient.user.findUnique({
      where: {
        id: userId,
      },
    });
  }

  async findOneByName({ name }: { name: string }): Promise<user | null> {
    return await this.prismaClient.user.findFirst({
      where: {
        name,
      },
    });
  }

  async findOneByEmail({ email }: { email: string }): Promise<user | null> {
    return await this.prismaClient.user.findFirst({
      where: {
        email,
      },
    });
  }

  async findMany(): Promise<user[]> {
    return await this.prismaClient.user.findMany();
  }

  async createUser({
    user,
    passwordHash,
  }: {
    user: CreateUserPayload;
    passwordHash: string;
  }): Promise<user> {
    return await this.prismaClient.user.create({
      data: {
        passwordHash,
        email: user.email,
        name: user.name,
      },
    });
  }
}
