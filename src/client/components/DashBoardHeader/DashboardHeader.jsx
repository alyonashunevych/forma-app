import "./DashBoardHeader.scss";
import training from "../../../images/training.svg";
import hand from "../../../images/hand.png";
import { useNavigate } from "react-router-dom";
import {
  getNextWorkout,
  getWorkoutDays,
  getWorkoutNumber,
} from "../../utils/workoutStorage";

export function DashboardHeader() {
  const date = new Date();
  const dateStr = date.toLocaleDateString("en-CA");
  const currentMonth = date.toLocaleString("en-US", { month: "long" });
  const currentDate = `${currentMonth} ${date.getDate()}, ${date.getFullYear()}`;
  const nextWorkout = getNextWorkout();
  const number = nextWorkout ? getWorkoutNumber(nextWorkout.dateStr) : null;
  const navigate = useNavigate();

  const workoutDays = getWorkoutDays();
  const todayWorkout = workoutDays[dateStr];
  const type = todayWorkout?.type;

  const handleStartTraining = () => {
    if (todayWorkout) {
      navigate(`/home/plan/${dateStr}/${type}/step1`);
    } else {
      navigate(`/home/plan/${dateStr}/add-training`);
    }
  };

  return (
    <header className="dashboard__header">
      <div className="dashboard__header__title">
        <h1 className="dashboard__header__title__text">
          Hello, Alyona!
          <img
            className="dashboard__header__emoji"
            src={hand}
            alt="Waving hand emoji"
          />
        </h1>
        <p className="dashboard__header__information__item">
          Ready to crush your goals today?
        </p>
      </div>

      <div className="dashboard__header__information">
        <p className="dashboard__header__information__item">Today is </p>
        <p className="dashboard__header__information__value">{currentDate}</p>
      </div>

      <div className="dashboard__header__information">
        <p className="dashboard__header__information__item">Workout </p>
        <p className="dashboard__header__information__value">№{number} </p>
      </div>

      <button
        className="dashboard__header__button"
        onClick={handleStartTraining}
      >
        Start Training
        <img
          src={training}
          alt={`training icon`}
          className="dashboard__navigation__icon"
        />
      </button>
    </header>
  );
}
