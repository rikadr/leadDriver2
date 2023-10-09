import * as Hapi from "@hapi/hapi";
import * as route from "./route";
import { PrismaClient } from "@prisma/client";
import { UserStore } from "./stores/user-store";
import { UserManager } from "./store-managers/user-manager";
import { SessionCookieObject } from "./types";

const correctSessionId = "This is the correct session id";
const createdSessionObject: SessionCookieObject = {
  id: correctSessionId,
  userId: "test from validate function",
  username: "test from validate function",
  email: "test from validate function",
};

const init = async () => {
  const server = Hapi.server({
    port: 3200,
    host: "localhost",
  });

  await server.register(require("@hapi/cookie"));

  // Creates a new auth scheme called "cookie"
  // server.auth.scheme("cookie", () => {
  //   return {
  //     authenticate: async (request, h) => {
  //       const cookie = request.headers.cookie;

  //       if (!cookie) {
  //         return h.unauthenticated(new Error("No cookie :("));
  //       }

  //       return h.authenticated({ credentials: { id: "test" } });
  //     },
  //   };
  // });

  // Sets up cookie auth strategy
  server.auth.strategy("login", "cookie", {
    cookie: {
      name: "session",
      password: "password-should-be-32-characters", // Todo change this
      isSecure: false, // Todo set to true in production
      // ttl: 24 * 60 * 60 * 1000, // Set session to 1 day
      // path: "/", // Set cookie to root path
    },
    redirectTo: "/",

    validate: async (
      request: Hapi.Request<Hapi.ReqRefDefaults>, // Hapi request object
      session: SessionCookieObject // Session object
    ) => {
      if (session.id !== correctSessionId) {
        return { isValid: false };
      }

      return { isValid: true, credentials: createdSessionObject };
    },
  });

  // Sets default auth strategy for all routes
  server.auth.default("login");

  server.route([
    {
      method: "GET",
      path: "/",
      handler: (request, h, err) => {
        return "Welcome to the home page";
      },
      options: {
        auth: { mode: "try" },
      },
    },
    {
      method: "GET",
      path: "/user",
      handler: (request, h, err) => {
        return "Welcome to the secret user page";
      },
    },
    // {
    //   method: "GET",
    //   path: "/login",
    //   handler: (request, h, err) => {
    //     return "Login.... username: password:";
    //   },
    //   options: {
    //     auth: { mode: "try" },
    //   },
    // },
    {
      method: "POST",
      path: "/login",
      handler: (request, h, err) => {
        const { username, password } = request.payload as {
          username: string;
          password: string;
        };

        if (username === "test" && password === "test") {
          request.cookieAuth.set(createdSessionObject);
          return "success!!";
        }
        return "failed login :(";
      },
      options: {
        auth: { mode: "try" },
      },
    },
  ]);

  const prisma = new PrismaClient();
  const userStore = new UserStore(prisma);
  const userManager = new UserManager(userStore);

  // await route.userRoutes.register(server, userManager);
  // await route.authRoutes.register(server);

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
