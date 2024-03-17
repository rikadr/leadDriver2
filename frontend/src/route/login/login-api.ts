import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { httpClient } from "../../common/http-client";
import { IApiResponse, LoginResponse } from "shared/types/api-types";

type SignupMutationResponse = IApiResponse<string>;
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
  const queryClient = useQueryClient();
  return useMutation<LoginResponse, Error, LoginCredentials, unknown>({
    mutationFn: (credentials: LoginCredentials) => {
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
