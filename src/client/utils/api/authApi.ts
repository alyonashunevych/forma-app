import { UserLoginDto } from "../dto/UserLoginDto";
import { UserLoginResponseDto } from "../dto/UserLoginResponseDto";
import { UserRegisterDto } from "../dto/UserRegisterDto";
import httpClient from "./httpClient";

export const login = async (data: UserLoginDto) => {
  const response = await httpClient.post<UserLoginResponseDto>("/auth/login", data);
  return response.data;
};

export const register = async (data: UserRegisterDto) => {
  const response = await httpClient.post("/auth/registration", data);
  return response.data;
};
