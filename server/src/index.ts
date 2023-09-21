import * as Hapi from "@hapi/hapi";
import * as route from "./route";
import { PrismaClient } from "@prisma/client";
import { UserStore } from "./stores/user-store";
import { UserManager } from "./store-managers/user-manager";

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
  });

  server.route({
    method: "GET",
    path: "/",
    handler: (request, h, err) => {
      return "Hello World! :)";
    },
  });

  const prisma = new PrismaClient();
  const userStore = new UserStore(prisma);
  const userManager = new UserManager(userStore);

  await route.userRoutes.register(server, userManager);

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
