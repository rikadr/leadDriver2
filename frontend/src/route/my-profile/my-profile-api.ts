import { useQuery } from "@tanstack/react-query";
import { httpClient } from "../../common/http-client";
import { YouResponse, YouInitialsResponse } from "shared";

export const useYou = () => {
  return useQuery<YouResponse>({
    queryKey: ["you-profile"],
    queryFn: async () => {
      return httpClient("/api/user/you", {}).json();
    },
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
};

export const useYouInitials = () => {
  return useQuery<YouInitialsResponse>({
    queryKey: ["you-initials"],
    queryFn: async () => {
      return httpClient("/api/user/you/initials", {}).json();
    },
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
};
