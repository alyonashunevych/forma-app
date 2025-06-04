import React, { useState } from "react";
import { TrainingContext } from "./TrainingContext";

export function TrainingProvider({ children }) {
  const [trainingHistory, setTrainingHistory] = useState(null);

  return (
    <TrainingContext.Provider value={{ trainingHistory, setTrainingHistory }}>
      {children}
    </TrainingContext.Provider>
  );
}
