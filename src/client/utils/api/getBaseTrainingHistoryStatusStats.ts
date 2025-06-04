import httpClient from "./httpClient";
import { BaseTrainingHistoryDto } from "../dto/BaseTrainingHistoryDto";

export const getBaseTrainingHistoryStatusStats = async (
  from?: string,
  to?: string
): Promise<BaseTrainingHistoryDto[]> => {
  const token = localStorage.getItem("token");

  const response = await httpClient.get<BaseTrainingHistoryDto[]>(
    "/base-training-history/statistic/statuses",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: from && to ? { from, to } : undefined,
    }
  );

  return response.data;
};
