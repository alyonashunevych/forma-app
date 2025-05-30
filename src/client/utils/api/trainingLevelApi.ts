import httpClient from "./httpClient";
import { TrainingLevelResponseDto } from "../dto/TrainingLevelResponseDto";

export const getTrainingLevels = async (): Promise<TrainingLevelResponseDto[]> => {
  const response = await httpClient.get<TrainingLevelResponseDto[]>("/training-level");
  return response.data;
};
