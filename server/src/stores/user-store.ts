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
    const user = await this.prismaClient.user.findFirst({
      where: {
        name,
      },
    });

    if (!user) {
      return null;
    } else {
      return user;
    }
  }

  async findMany(): Promise<user[]> {
    return await this.prismaClient.user.findMany();
  }

  async createUser(user: CreateUserPayload): Promise<user> {
    return await this.prismaClient.user.create({
      data: user,
    });
  }
}
