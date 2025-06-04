import axios from "axios";

const httpClient = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

httpClient.interceptors.request.use((config) => {
  if (
    !config.url.endsWith("/auth/login") &&
    !config.url.endsWith("/auth/registration") &&
    !config.url.endsWith("/base-trainings/min") &&
    !config.url.endsWith("/training-level")
  ) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default httpClient;
