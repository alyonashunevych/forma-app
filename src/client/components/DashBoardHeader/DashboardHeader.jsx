import "./DashBoardHeader.scss";
import training from "../../../images/training.svg";
import hand from "../../../images/hand.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTraining } from "../../utils/useTraining";
import { startBaseTraining } from "../../utils/api/baseTraining";
import { getBaseTrainingHistory } from "../../utils/api/baseTrainingHistory";

export function DashboardHeader() {
  const { setTrainingHistory } = useTraining();
  const navigate = useNavigate();
  const [todayWorkout, setTodayWorkout] = useState(null);
  const [workoutNumber, setWorkoutNumber] = useState(null);

  const date = new Date();
  const dateStr = date.toLocaleDateString("en-CA");
  const currentMonth = date.toLocaleString("en-US", { month: "long" });
  const currentDate = `${currentMonth} ${date.getDate()}, ${date.getFullYear()}`;

  useEffect(() => {
    async function fetchTraining() {
      try {
        const data = await getBaseTrainingHistory();
        const today = data.find((w) => w.dateTime === dateStr);
        setTodayWorkout(today);

        const sorted = [...data].sort(
          (a, b) => new Date(a.dateTime) - new Date(b.dateTime)
        );
        const idx = sorted.findIndex((w) => w.dateTime === dateStr);
        if (idx !== -1) setWorkoutNumber(idx + 1);
      } catch (err) {
        console.error("Failed to fetch base training history", err);
      }
    }

    fetchTraining();
  }, [dateStr]);

  const handleStartTraining = async () => {
    try {
      if (!todayWorkout) return;

      const startedTraining = await startBaseTraining(todayWorkout.id);
      console.log("DashboardHeader: trainingHistory to send", startedTraining);

      setTrainingHistory(startedTraining);

      navigate(`/home/plan/${dateStr}/strength/step1`);
    } catch (error) {
      console.error("Failed to start training:", error);
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
        <p className="dashboard__header__information__item">Today is</p>
        <p className="dashboard__header__information__value">{currentDate}</p>
      </div>

      <div className="dashboard__header__information">
        <p className="dashboard__header__information__item">Workout</p>
        <p className="dashboard__header__information__value">
          №{workoutNumber ?? "—"}
        </p>
      </div>

      {todayWorkout && todayWorkout.trStatusDisplayName !== "Completed" ? (
        <button
          className="dashboard__header__button"
          onClick={handleStartTraining}
        >
          Start Training
          <img
            src={training}
            alt="training icon"
            className="dashboard__navigation__icon"
          />
        </button>
      ) : (
        <button className="dashboard__header__button dashboard__header__button--completed" disabled>
          Training Completed
        </button>
      )}
    </header>
  );
}
