import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddEventPayload, AddEventResponse } from "shared";
import { httpClient } from "../../common/http-client";

export const useAddEventMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<AddEventResponse, Error, AddEventPayload, unknown>({
    mutationFn: (payload) => {
      return httpClient("/api/event", {
        method: "POST",
        body: JSON.stringify(payload),
      }).json();
    },
    onSuccess: () => queryClient.invalidateQueries(),
  });
};
