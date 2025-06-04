import httpClient from "./httpClient";
import { BaseTrainingHistoryDto } from "../dto/BaseTrainingHistoryDto";

export const getBaseTrainingHistory = async (): Promise<BaseTrainingHistoryDto[]> => {
  const token = localStorage.getItem("token");
  
  const response = await httpClient.get<BaseTrainingHistoryDto[]>("/base-training-history", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
