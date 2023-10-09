import { PrismaClient, auth, user } from "@prisma/client";
import { CreateUserPayload } from "../types";

export class AuthStore {
  constructor(private prismaClient: PrismaClient) {}

  async createOne({
    userId,
    password,
  }: {
    userId: string;
    password: string; // Todo hash password
  }): Promise<auth | null> {
    return await this.prismaClient.auth.create({
      data: {
        userId,
        hash: password,
      },
    });
  }

  async findOne({ userId }: { userId: string }): Promise<auth | null> {
    return await this.prismaClient.auth.findUnique({
      where: {
        userId,
      },
    });
  }
}
