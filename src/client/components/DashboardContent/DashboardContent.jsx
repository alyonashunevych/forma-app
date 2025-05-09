import { ExerciseCard } from "../ExerciseCard/ExerciseCard";
import { ProgressCircle } from "../ProgressCircle/ProgressCircle";
import "./DashboardContent.scss";

export function DashboardContent() {
  return (
    <div className="dashboard-content">
      <ExerciseCard />
      <ProgressCircle />
    </div>
  );
}
