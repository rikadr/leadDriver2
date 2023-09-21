import { PrismaClient, user } from "@prisma/client";
import { CreateUserPayload } from "../types";

export class UserStore {
  constructor(private prismaClient: PrismaClient) {}

  async findMany(): Promise<user[]> {
    return await this.prismaClient.user.findMany();
  }

  async createUser(user: CreateUserPayload): Promise<user> {
    return await this.prismaClient.user.create({
      data: user,
    });
  }
}
