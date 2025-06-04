import httpClient from "./httpClient";
import { UserResponseDto } from "../dto/UserResponseDto";

export const getCurrentUser = async (): Promise<UserResponseDto> => {
  const token = localStorage.getItem("token");
  const response = await httpClient.get<UserResponseDto>("/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
