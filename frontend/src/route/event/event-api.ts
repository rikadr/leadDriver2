import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AddEventPayload,
  AddEventResponse,
  AttendEventPayload,
  EditEventPayload,
  GetEventResponse,
  GetEventType,
  GetEventsPayload,
  GetEventsResponse,
  IApiResponse,
  RevokeAttendenceEventPayload,
} from "shared";
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

export const useEditEventMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<IApiResponse, Error, EditEventPayload, unknown>({
    mutationFn: (payload) => {
      return httpClient("/api/event", {
        method: "PUT",
        body: JSON.stringify(payload),
      }).json();
    },
    onSuccess: () => queryClient.invalidateQueries(),
  });
};

export const useAttendEventMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, AttendEventPayload, unknown>({
    mutationFn: (payload) => {
      return httpClient("/api/event/attend", {
        method: "POST",
        body: JSON.stringify(payload),
      }).json();
    },
    onSuccess: () => queryClient.invalidateQueries(),
  });
};
export const useRevokeAttendenceEventMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, RevokeAttendenceEventPayload, unknown>({
    mutationFn: (payload) => {
      return httpClient("/api/event/attend", {
        method: "DELETE",
        body: JSON.stringify(payload),
      }).json();
    },
    onSuccess: () => queryClient.invalidateQueries(),
  });
};

export const useEvents = (type: GetEventType) => {
  return useQuery<GetEventsResponse>({
    queryKey: ["events", type],
    queryFn: async () => {
      const queryParams: GetEventsPayload = { type };
      return httpClient("/api/events", { searchParams: queryParams }).json();
    },
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
};

export const useEvent = (eventId?: string) => {
  return useQuery<GetEventResponse>({
    queryKey: ["event", eventId],
    queryFn: async () => {
      return httpClient("/api/event", {
        searchParams: eventId ? { eventId } : {},
      }).json();
    },
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    enabled: !!eventId,
  });
};
