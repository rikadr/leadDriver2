import { useMutation } from "@tanstack/react-query";
import { IApiResponse } from "../types";

type LoginMutationResponse = IApiResponse<{ success: true }>;
type LoginCredentials = { email: string; password: string };

export const useLoginMutation = (credentials: LoginCredentials) => {
  return useMutation<LoginMutationResponse, Error, string>({
    mutationFn: () => {
      return fetch("/login", {
        method: "POST",
        // headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      }).then((res) => res.json());
    },
  });
};
