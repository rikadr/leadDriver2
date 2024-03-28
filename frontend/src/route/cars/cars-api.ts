import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AddCarPayload,
  AddCarResponse,
  DeleteCarPayload,
  EditCarPayload,
  GetCarResponse,
  GetCarsResponse,
  IApiResponse,
} from "shared";
import { httpClient } from "../../common/http-client";
import { useNavigate } from "react-router-dom";
import { getAppUrl } from "../../utils/app-url";

export const useCar = (carId?: string) => {
  return useQuery<GetCarResponse>({
    queryKey: ["car", carId],
    queryFn: async () => {
      return httpClient("/api/car", {
        searchParams: carId ? { carId } : {},
      }).json();
    },
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    enabled: !!carId,
  });
};

export const useYourCars = () => {
  return useQuery<GetCarsResponse>({
    queryKey: ["your-cars"],
    queryFn: async () => {
      return httpClient("/api/cars/your", {}).json();
    },
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
};

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

export const useEditCarMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<IApiResponse, Error, EditCarPayload, unknown>({
    mutationFn: (payload) => {
      return httpClient("/api/car", {
        method: "PUT",
        body: JSON.stringify(payload),
      }).json();
    },
    onSuccess: () => queryClient.invalidateQueries(),
  });
};

export const useDeleteCarMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation<IApiResponse, Error, DeleteCarPayload, unknown>({
    mutationFn: (payload) => {
      return httpClient("/api/car", {
        method: "DELETE",
        body: JSON.stringify(payload),
      }).json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
      navigate(getAppUrl("my-profile"));
    },
  });
};
