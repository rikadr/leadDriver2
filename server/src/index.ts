import * as Hapi from "@hapi/hapi";
import * as route from "./routes";
import { PrismaClient } from "@prisma/client";
import { UserStore } from "./stores/user-store";
import { UserManager } from "./store-managers/user-manager";
import { AuthManager } from "./store-managers/auth-manager";
import { CarStore } from "./stores/car-store";
import { CarManager } from "./store-managers/car-manager";
import { Cookie, Credentials } from "shared/types/auth-types";

const init = async () => {
  const server = Hapi.server({
    port: 3200,
    host: "localhost",
    routes: {
      cors: true, // TODO configure cors
    },
  });

  const prisma = new PrismaClient();

  // Stores
  const userStore = new UserStore(prisma);
  const carStore = new CarStore(prisma);

  // Managers
  const authManager = new AuthManager(userStore);
  const userManager = new UserManager(userStore, carStore);
  const carManager = new CarManager(carStore);

  // Auth
  await server.register(require("@hapi/cookie"));

  server.auth.strategy("login", "cookie", {
    cookie: {
      name: "lead-drive-session",
      password: "7d3f77b4-7873-4bc3-887f-470269fd",
      isSecure: false, // Todo set to true in production
      // ttl: 24 * 60 * 60 * 1000, // Set session to 1 day
    },

    validate: async (request, session: Cookie) => {
      const user = await userManager.findOne({ userId: session.userId });

      if (!user) {
        return { isValid: false };
      }

      const credentials: Credentials = {
        userId: user.id,
        name: user.name,
        email: user.email,
      };

      return { isValid: true, credentials };
    },
  });

  server.auth.default("login");

  // Routes
  await route.authRoutes.register(server, authManager);
  await route.userRoutes.register(server, userManager);
  await route.carRoutes.register(server, carManager);
  await route.feedRoutes.register(server);

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
