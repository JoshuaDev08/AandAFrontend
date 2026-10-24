import { api } from "./client";

import type {
  ApiResponse,
  ResortLocation,
  RoomType,
  AvailabilityPayload,
  AvailabilityResult,
} from "../types/public";

// Supports either arrays or Laravel paginated data.
function unwrapList<T>(value: T[] | { data: T[] }): T[] {
  return Array.isArray(value) ? value : value.data;
}

export const publicApi = {
  async getLocations(): Promise<ResortLocation[]> {
    const response =
      await api.get<ApiResponse<ResortLocation[] | { data: ResortLocation[] }>>(
        "/locations",
      );

    return unwrapList(response.data.data);
  },

  async getRooms(locationSlug: string): Promise<RoomType[]> {
    const response = await api.get<
      ApiResponse<RoomType[] | { data: RoomType[] }>
    >(`/locations/${encodeURIComponent(locationSlug)}/rooms`);

    return unwrapList(response.data.data);
  },

  async searchAvailability(
    payload: AvailabilityPayload,
  ): Promise<AvailabilityResult> {
    const response = await api.post<ApiResponse<AvailabilityResult>>(
      "/availability/search",
      payload,
    );

    return response.data.data;
  },
};
