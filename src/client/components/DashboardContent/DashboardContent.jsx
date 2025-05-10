import { Calendar } from "../Calendar/Calendar";
import { ExerciseCard } from "../ExerciseCard/ExerciseCard";
import { NextWorkout } from "../NextWorkout/NextWorkout";
import { ProgressCircle } from "../ProgressCircle/ProgressCircle";
import "./DashboardContent.scss";

export function DashboardContent() {
  return (
    <div className="dashboard-content">
      <ExerciseCard />
      <ProgressCircle />
      <NextWorkout />
    </div>
  );
}
