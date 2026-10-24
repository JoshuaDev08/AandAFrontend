import { useMutation, useQuery } from "@tanstack/react-query";
import { publicApi } from "../api/publicApi";

export function useLocations() {
  return useQuery({
    queryKey: ["public", "locations"],
    queryFn: publicApi.getLocations,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}

export function useRooms(locationSlug?: string) {
  return useQuery({
    queryKey: ["public", "rooms", locationSlug],
    queryFn: () => publicApi.getRooms(locationSlug!),
    enabled: Boolean(locationSlug),
    staleTime: 2 * 60 * 1000,
    retry: 1,
  });
}

export function useAvailabilitySearch() {
  return useMutation({
    mutationFn: publicApi.searchAvailability,
  });
}
