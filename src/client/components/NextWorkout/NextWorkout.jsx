import "./NextWorkout.scss";
import { getNextWorkout } from "../../utils/workoutStorage";

export function NextWorkout() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const nextWorkout = getNextWorkout();

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

  const currentMonth = nextWorkout.date.toLocaleString("en-US", {
    month: "long",
  });

  return (
    <div className="next-workout">
      <p className="next-workout__title">Next Workout</p>

      <div className="next-workout__date">
        <p className="next-workout__day">{nextWorkout.date.getDate()}</p>
        <p className="next-workout__month-year">
          {currentMonth}, {nextWorkout.date.getFullYear()}
        </p>
      </div>

      <div className="next-workout__training">
        <p className="next-workout__training__type">
          {nextWorkout.type
            ? nextWorkout.type.charAt(0).toUpperCase() +
              nextWorkout.type.slice(1) +
              " Training"
            : ""}
        </p>
        <p className="next-workout__training__details">
          {nextWorkout.body
            ? nextWorkout.body.charAt(0).toUpperCase() +
              nextWorkout.body.slice(1)
            : ""}
        </p>
      </div>
    </div>
  );
}
