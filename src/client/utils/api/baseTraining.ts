const API_URL = import.meta.env.VITE_API_URL;


export async function startBaseTraining(baseTrainingId) {
  try {
    const response = await fetch(
      `${API_URL}/base-training-history/start/${baseTrainingId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({}),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `Failed to start base training (status ${response.status})`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("startBaseTraining error:", error);
    throw error;
  }
}

export async function finishBaseTraining(baseTrainingId) {
  try {
    const response = await fetch(
      `${API_URL}/base-training-history/finish/${baseTrainingId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({}),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `Failed to finish base training (status ${response.status})`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("finishBaseTraining error:", error);
    throw error;
  }
}

