import { useMutation } from "@tanstack/react-query";
import { IApiResponse } from "../types";
import { httpClient } from "../common/http-client";

type LoginMutationResponse = IApiResponse<string>;
type LoginCredentials = { email: string; password: string };

export const useLoginMutation = () => {
  return useMutation<LoginMutationResponse, Error, LoginCredentials, unknown>({
    mutationFn: (credentials: LoginCredentials) => {
      return httpClient("/api/login", {
        method: "POST",
        body: JSON.stringify(credentials),
      }).then((res) => res.json());
    },
  });
};
