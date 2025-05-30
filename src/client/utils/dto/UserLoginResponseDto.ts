import { UserResponseDto } from "./UserResponseDto";

export interface UserLoginResponseDto {
  jwtToken: string;
  user: UserResponseDto;
}
