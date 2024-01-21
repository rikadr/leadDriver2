import { useMutation, useQuery } from "@tanstack/react-query";
import { IApiResponse } from "../types";
import { httpClient } from "../common/http-client";

type SignupMutationResponse = IApiResponse<string>;
type LoginMutationResponse = IApiResponse<string>;
type LoginCredentials = { email: string; password: string };

export const useSignupMutation = () => {
  return useMutation<
    SignupMutationResponse,
    Error,
    LoginCredentials & { name: string },
    unknown
  >({
    mutationFn: (credentials: LoginCredentials) => {
      return httpClient("/api/signup", {
        method: "POST",
        body: JSON.stringify(credentials),
      }).json();
    },
  });
};
export const useLoginMutation = () => {
  return useMutation<LoginMutationResponse, Error, LoginCredentials, unknown>({
    mutationFn: (credentials: LoginCredentials) => {
      return httpClient("/api/login", {
        method: "POST",
        body: JSON.stringify(credentials),
      }).json();
    },
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
