import { Server } from "@hapi/hapi";
import { PrismaClient } from "@prisma/client";

export const register = async (server: Server, prisma: PrismaClient) => {
  server.route({
    method: "GET",
    path: "/users",
    handler: async (request, h, err) => {
      await prisma.user.create({
        data: { name: "Herman", email: "her@man.drg" },
      });
      const users = await prisma.user.findMany();
      const strings = users
        .map((user) => `${user.name} (${user.email})`)
        .join(", ");
      return "Hallo " + strings;
    },
  });
};
