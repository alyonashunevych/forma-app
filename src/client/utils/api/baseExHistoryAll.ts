import httpClient from "./httpClient";

export const getExerciseHistories = async (exerciseId: string): Promise<any[]> => {
  const response = await httpClient.get<any[]>(`/base-ex-to-position-history/last-5-by-exercise/${exerciseId}`);
  return response.data;
};
