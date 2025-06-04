import httpClient from "./httpClient";
import { BaseTrainingResponseDto } from "../dto/BaseTrainingResponseDto";

export const getBaseTrainings = async (): Promise<BaseTrainingResponseDto[]> => {
  const response = await httpClient.get<BaseTrainingResponseDto[]>("/base-trainings");
  return response.data;
};