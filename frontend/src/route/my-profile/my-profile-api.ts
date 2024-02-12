import { useQuery } from "@tanstack/react-query";
import { httpClient } from "../../common/http-client";
import { IApiResponse } from "shared/types/api-types";

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
