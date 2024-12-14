import axios from "axios";

// Create an Axios instance
export const api = axios.create({
  baseURL: "https://api.escuelajs.co/api/v1", // Add base URL here
  headers: {
    "Content-Type": "application/json",
  },
});
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
