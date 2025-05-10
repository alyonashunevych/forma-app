import "./NextWorkout.scss";

export function NextWorkout() {
  const date = new Date();
  const nextDate = new Date(date);
  nextDate.setDate(date.getDate() + 5);

  const currentMonth = nextDate.toLocaleString("en-US", { month: "long" });

  const nextWorkout = {
    date: nextDate,
    type: "Strength Training",
    details: "Upper Body",
  };

  return (
    <div className="next-workout">
      <p className="next-workout__title">Next Workout</p>

      <div className="next-workout__date">
        <p className="next-workout__day">{nextDate.getDate()}</p>
        <p className="next-workout__month-year">
          {currentMonth}, {nextDate.getFullYear()}
        </p>
      </div>

      <div className="next-workout__training">
        <p className="next-workout__training__type">{nextWorkout.type}</p>
        <p className="next-workout__training__details">
          {nextWorkout.details}
        </p>
      </div>
    </div>
  );
}