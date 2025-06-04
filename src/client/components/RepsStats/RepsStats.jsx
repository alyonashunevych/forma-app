import "./RepsStats.scss";
import { Graph } from "../Graph/Graph";
import { useTraining } from "../../utils/useTraining";
import { useEffect, useState } from "react";
import { getExerciseHistories } from "../../utils/api/baseExHistoryAll";

export function RepsStats() {
  const { trainingHistory } = useTraining();
  const [weights, setWeights] = useState([]);
  const [exerciseName, setExerciseName] = useState("");
  const [exerciseId, setExerciseId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedExerciseId = localStorage.getItem("savedExerciseId2");
    if (savedExerciseId) {
      setExerciseId(savedExerciseId);
    }
  }, []);

  useEffect(() => {
    async function fetchWeights(exId) {
      if (!exId) {
        setLoading(false);
        return;
      }

      try {
        const data = await getExerciseHistories(exId);
        const weightsArray = data.map((item) => item.baseSets[3].kg || 0);
        setWeights(weightsArray);
      } catch (error) {
        console.error("Failed to fetch exercise weights", error);
        setWeights([]);
      }
      setLoading(false);
    }

    if (trainingHistory && trainingHistory.baseExToPositions?.length > 0) {
      const secondExerciseId =
        trainingHistory.baseExToPositions[1].baseExercise.id;
      setExerciseId(secondExerciseId);
      setExerciseName(trainingHistory.baseExToPositions[0].baseExercise.name);

      localStorage.setItem("savedExerciseId2", secondExerciseId);
    }

    if (exerciseId) {
      fetchWeights(exerciseId);
    }
  }, [trainingHistory, exerciseId]);

  if (loading) {
    return <div className="reps-stats__title">Loading...</div>;
  }

  if (!weights.length) {
    return <div className="reps-stats__title">No weight data available.</div>;
  }

  return (
    <div className="reps-stats">
      <h2 className="reps-stats__title">Weight Progress</h2>
      <Graph y={weights} yTickStep={5} />
      <p className="reps-stats__name">{exerciseName}</p>
    </div>
  );
}
