import { Server } from "@hapi/hapi";

export const register = async (server: Server) => {
  server.route({
    method: "GET",
    path: "/new",
    handler: (request, h, err) => {
      return "Hello New World! ";
    },
  });
};
