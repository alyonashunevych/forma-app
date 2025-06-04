import { UserLoginDto } from "../dto/UserLoginDto";
import { UserLoginResponseDto } from "../dto/UserLoginResponseDto";
import { UserRegisterDto } from "../dto/UserRegisterDto";
import httpClient from "./httpClient";
import { UserResponseDto } from "../dto/UserResponseDto";

export const login = async (
  data: UserLoginDto,
  setUser: (user: UserResponseDto) => void
) => {
  const response = await httpClient.post<UserLoginResponseDto>("/auth/login", data);
  const { jwtToken, user } = response.data;

  if (jwtToken) {
    localStorage.setItem("token", jwtToken);
  }

  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  }

  return response.data;
};

export const register = async (
  data: UserRegisterDto,
  setUser: (user: UserResponseDto) => void
) => {
  const response = await httpClient.post<UserLoginResponseDto>("/auth/registration", data);
  const { jwtToken, user } = response.data;

  if (jwtToken) {
    localStorage.setItem("token", jwtToken);
  }

  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  }

  return response.data;
};
