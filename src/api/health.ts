import { api } from "./client";

export interface HealthResponse {
  success: boolean;
  message: string;
  data: {
    status: string;
    application: string;
    version: string;
  };
}

export async function getHealth(): Promise<HealthResponse> {
  const response = await api.get<HealthResponse>("/health");

  return response.data;
}
