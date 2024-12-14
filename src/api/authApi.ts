import { api } from "./api";

// Login User API
export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};

// Get Profile API
export const GetProfileData = async () => {
  const response = await api.get("/auth/profile");
  return response.data;
};
