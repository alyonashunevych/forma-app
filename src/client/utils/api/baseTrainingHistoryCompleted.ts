import httpClient from "./httpClient";

export const getLastCompletedTraining = async () => {
  const response = await httpClient.get("/base-training-history/last-completed");
  return response.data;
};
