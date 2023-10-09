import * as Hapi from "@hapi/hapi";
import * as route from "./route";
import { PrismaClient } from "@prisma/client";
import { UserStore } from "./stores/user-store";
import { UserManager } from "./store-managers/user-manager";
import { SessionCookieObject } from "./types";
import { correctSessionId, createdSessionObject } from "./route/auth-routes";

const init = async () => {
  const server = Hapi.server({
    port: 3200,
    host: "localhost",
  });

  await server.register(require("@hapi/cookie"));

  // Sets up cookie auth strategy
  server.auth.strategy("login", "cookie", {
    cookie: {
      name: "session",
      password: "password-should-be-32-characters", // Todo change this
      isSecure: false, // Todo set to true in production
      // ttl: 24 * 60 * 60 * 1000, // Set session to 1 day
    },

    validate: async (
      request: Hapi.Request<Hapi.ReqRefDefaults>, // Hapi request object
      session: SessionCookieObject // Session object
    ) => {
      console.log("session", session);

      // check if user exists in database

      // if user exists, create cookie object and return it

      return { isValid: true, credentials: createdSessionObject };
    },
  });

  // Sets default auth strategy for all routes
  server.auth.default("login");

  const prisma = new PrismaClient();
  const userStore = new UserStore(prisma);
  const userManager = new UserManager(userStore);

  await route.userRoutes.register(server, userManager);
  await route.authRoutes.register(server);

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
