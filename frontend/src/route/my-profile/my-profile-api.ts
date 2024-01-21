import { useQuery } from "@tanstack/react-query";
import { IApiResponse } from "../../types";
import { httpClient } from "../../common/http-client";

export const useYou = () => {
  return useQuery<IApiResponse<any>>({
    queryKey: ["check-login"],
    queryFn: async () => {
      return httpClient("/api/user/you", {}).json();
    },
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
};
