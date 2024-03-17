import { useQuery } from "@tanstack/react-query";
import { httpClient } from "../../common/http-client";
import { FeedResponse } from "shared";

export const useFeed = () => {
  return useQuery<FeedResponse>({
    queryKey: ["feed"],
    queryFn: async () => {
      return httpClient("/api/feed", {}).json();
    },
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
};
