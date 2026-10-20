import axios, { AxiosError } from "axios";

export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15000,
  headers: {
    Accept: "application/json",
  },
  withCredentials: false,
  withXSRFToken: false,
});

export function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError<ApiError>(error)) {
    const axiosError = error as AxiosError<ApiError>;

    return (
      axiosError.response?.data?.message ??
      (axiosError.response
        ? `Request failed (${axiosError.response.status})`
        : "Unable to connect to the server.")
    );
  }

  return "An unexpected error occurred.";
}
