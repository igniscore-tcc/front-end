export const API_URL = process.env.API_URL!;

export const INTERNAL_API = "/api";

export function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}