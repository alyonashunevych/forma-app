import { RoleTypeResponseDto } from "./RoleTypeResponseDto";

export interface UserResponseDto {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  trainingLevelDisplayName: string;
  roles: RoleTypeResponseDto[];
  lastLogin: string;
  age: number;
  height: number;
  weight: number;
  gender: string;
  daysPerWeek: number;
  baseTrainingName: string;
  createdAt: string;
}
