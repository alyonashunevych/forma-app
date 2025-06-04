import { useState, useEffect } from "react";
import { useTraining } from "../../utils/useTraining";
import { getExerciseHistories } from "../../utils/api/baseExHistoryAll";
import { Graph } from "../Graph/Graph";
import "./WeightStats.scss";

export function WeightStats() {
  const { trainingHistory } = useTraining();
  const [weights, setWeights] = useState([]);
  const [exerciseName, setExerciseName] = useState("");
  const [exerciseId, setExerciseId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedExerciseId = localStorage.getItem("savedExerciseId");
    if (savedExerciseId) {
      setExerciseId(savedExerciseId);
    } else setExerciseId("a261e822-76f3-4268-918e-35d1d31108a4");
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
      const firstExerciseId =
        trainingHistory.baseExToPositions[0].baseExercise.id;
      setExerciseId(firstExerciseId);
      setExerciseName(trainingHistory.baseExToPositions[0].baseExercise.name);

      localStorage.setItem("savedExerciseId", firstExerciseId);
    }

    if (exerciseId) {
      fetchWeights(exerciseId);
    }
  }, [trainingHistory, exerciseId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!weights.length) {
    return <div>No weight data available.</div>;
  }

  return (
    <div className="weight-stats">
      <h2 className="weight-stats__title">Weight Progress</h2>
      <Graph y={weights} yTickStep={5} />
      <p className="weight-stats__name">{exerciseName}</p>
    </div>
  );
}
