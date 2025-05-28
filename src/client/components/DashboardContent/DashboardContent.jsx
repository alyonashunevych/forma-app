import { ExerciseCard } from "../ExerciseCard/ExerciseCard";
import { NextWorkout } from "../NextWorkout/NextWorkout";
import { ProgressCircle } from "../ProgressCircle/ProgressCircle";
import { RepsStats } from "../RepsStats/RepsStats";
import { WeightStats } from "../WeightStats/WeightStats";
import "./DashboardContent.scss";

export function DashboardContent() {
  return (
    <div className="dashboard-content">
      <ExerciseCard />
      <ProgressCircle />
      <NextWorkout />
      <RepsStats />
      <WeightStats />
    </div>
  );
}
