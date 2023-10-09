import * as Hapi from "@hapi/hapi";
import * as route from "./route";
import { PrismaClient } from "@prisma/client";
import { UserStore } from "./stores/user-store";
import { UserManager } from "./store-managers/user-manager";
import { Cookie, Credentials } from "./types";
import { AuthManager } from "./store-managers/auth-manager";
import { AuthStore } from "./stores/auth-store";

const init = async () => {
  const server = Hapi.server({
    port: 3200,
    host: "localhost",
  });

  const prisma = new PrismaClient();

  // Stores
  const authStore = new AuthStore(prisma);
  const userStore = new UserStore(prisma);

  // Managers
  const authMAnager = new AuthManager(authStore, userStore);
  const userManager = new UserManager(userStore);

  // Auth
  await server.register(require("@hapi/cookie"));

  server.auth.strategy("login", "cookie", {
    cookie: {
      name: "lead-drive-session",
      password: "7d3f77b4-7873-4bc3-887f-470269fd",
      isSecure: false, // Todo set to true in production
      // ttl: 24 * 60 * 60 * 1000, // Set session to 1 day
    },

    validate: async (
      request: Hapi.Request<Hapi.ReqRefDefaults>,
      session: Cookie // Session object
    ) => {
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
  await route.userRoutes.register(server, userManager);
  await route.authRoutes.register(server, authMAnager, userManager);

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
