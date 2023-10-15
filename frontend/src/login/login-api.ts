import { useMutation } from "@tanstack/react-query";
import { IApiResponse } from "../types";

type LoginMutationResponse = IApiResponse<{ success: true }>;
type LoginCredentials = { email: string; password: string };

export const useLoginMutation = () => {
  return useMutation<LoginMutationResponse, Error, LoginCredentials, unknown>({
    mutationFn: (credentials: LoginCredentials) => {
      return fetch("/login", {
        method: "POST",
        // headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      }).then((res) => res.json());
    },
  });
};
