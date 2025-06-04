import { useEffect, useState } from "react";
import { getBaseTrainingHistory } from "../../utils/api/baseTrainingHistory";
import { getBaseTrainings } from "../../utils/api/baseTrainings";
import "./NextWorkout.scss";

export function NextWorkout() {
  const [nextWorkout, setNextWorkout] = useState(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTrainingHistory() {
      try {
        const data = await getBaseTrainingHistory();

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const planningWorkouts = data.filter((t) => {
          return (
            t.trStatusDisplayName === "Planning" &&
            new Date(t.dateTime) >= today
          );
        });

        const nearestWorkout = planningWorkouts.reduce((nearest, current) => {
          const currentDate = new Date(current.dateTime);
          if (!nearest || currentDate < new Date(nearest.dateTime)) {
            return current;
          }
          return nearest;
        }, null);

        setNextWorkout(nearestWorkout);

        if (nearestWorkout?.name) {
          const baseTrainings = await getBaseTrainings();

          const matchedTraining = baseTrainings.find(
            (bt) => bt.name === nearestWorkout.name
          );

          if (matchedTraining?.description) {
            setDescription(matchedTraining.description);
          }
        }
      } catch (error) {
        console.error(
          "Error fetching training history or base trainings",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    fetchTrainingHistory();
  }, []);

  if (loading) {
    return (
      <div className="next-workout">
        <p className="next-workout__title">Next Workout</p>
        <p>Loading...</p>
      </div>
    );
  }

  if (!nextWorkout) {
    return (
      <div className="next-workout">
        <p className="next-workout__title">Next Workout</p>
        <div className="next-workout__date">
          <p className="next-workout__day">-</p>
          <p className="next-workout__month-year">No scheduled workouts</p>
        </div>
      </div>
    );
  }

  const workoutDate = new Date(nextWorkout.dateTime);
  const currentMonth = workoutDate.toLocaleString("en-US", { month: "long" });

  return (
    <div className="next-workout">
      <p className="next-workout__title">Next Workout</p>

      <div className="next-workout__date">
        <p className="next-workout__day">{workoutDate.getDate()}</p>
        <p className="next-workout__month-year">
          {currentMonth}, {workoutDate.getFullYear()}
        </p>
      </div>

      <div className="next-workout__training">
        <p className="next-workout__training__type">Base Training</p>
        <p className="next-workout__training__details">
          {description || "No description"}
        </p>
      </div>
    </div>
  );
}
