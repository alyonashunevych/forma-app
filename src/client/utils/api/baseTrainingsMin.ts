import httpClient from "./httpClient";
import { BaseTrainingMinResponseDto } from "../dto/BaseTrainingMinResponseDto";

export const getBaseTrainings = async (): Promise<BaseTrainingMinResponseDto[]> => {
  const response = await httpClient.get<BaseTrainingMinResponseDto[]>("/base-trainings/min");
  return response.data;
};