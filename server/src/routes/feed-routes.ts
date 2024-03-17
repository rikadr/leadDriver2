import { Server } from "@hapi/hapi";
import { FeedResponse } from "shared";

export const register = async (server: Server) => {
  server.route({
    method: "GET",
    path: "/api/feed",
    handler: async (request, h): Promise<FeedResponse> => {
      return { data: { posts: ["post1", "post2", "post3"] } };
    },
  });
};
