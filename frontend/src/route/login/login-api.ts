import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { httpClient } from "../../common/http-client";

import {
  IApiResponse,
  LoginPayload,
  LoginResponse,
  SignupPayload,
  SignupResponse,
} from "shared";

export const useSignupMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<SignupResponse, Error, SignupPayload, unknown>({
    mutationFn: (credentials: SignupPayload) => {
      return httpClient("/api/signup", {
        method: "POST",
        body: JSON.stringify(credentials),
      }).json();
    },
    onSuccess: () => queryClient.invalidateQueries(),
  });
};

export const useLoginMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<LoginResponse, Error, LoginPayload, unknown>({
    mutationFn: (credentials: LoginPayload) => {
      return httpClient("/api/login", {
        method: "POST",
        body: JSON.stringify(credentials),
      }).json();
    },
    onSuccess: () => queryClient.invalidateQueries(),
  });
};

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<LoginResponse, Error, void, unknown>({
    mutationFn: () => {
      return httpClient("/api/logout", {
        method: "POST",
      }).json();
    },
    onSuccess: () => queryClient.invalidateQueries(),
  });
};

export const useCheckLogin = () => {
  return useQuery<IApiResponse<string>>({
    queryKey: ["check-login"],
    queryFn: async () => {
      return httpClient("/api/check-login", {}).json();
    },
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
};
