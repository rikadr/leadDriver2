import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddCarPayload, AddCarResponse } from "shared";
import { httpClient } from "../../common/http-client";

export const useAddCarMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<AddCarResponse, Error, AddCarPayload, unknown>({
    mutationFn: (payload) => {
      return httpClient("/api/car", {
        method: "POST",
        body: JSON.stringify(payload),
      }).json();
    },
    onSuccess: () => queryClient.invalidateQueries(),
  });
};
