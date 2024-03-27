import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AddCarPayload,
  AddCarResponse,
  GetCarResponse,
  GetCarsResponse,
} from "shared";
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
