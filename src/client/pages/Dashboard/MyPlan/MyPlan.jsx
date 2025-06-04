import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./MyPlan.scss";

import arrow from "../../../../images/calendar-arrow.svg";
import doublearrow from "../../../../images/calendar-double-arrow.svg";
import { getBaseTrainingHistory } from "../../../utils/api/baseTrainingHistory";
import { useTraining } from "../../../utils/useTraining";
import { startBaseTraining } from "../../../utils/api/baseTraining";

export function MyPlan() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [trainingHistory, setTrainingHistory] = useState([]);
  const [todayWorkout, setTodayWorkout] = useState(null);
  const navigate = useNavigate();
  const { setTrainingHistory: setContextTrainingHistory } = useTraining();

  const date = new Date();
  const dateStr = date.toLocaleDateString("en-CA");

  useEffect(() => {
    async function fetchTraining() {
      try {
        const data = await getBaseTrainingHistory();
        setTrainingHistory(data);

        const today = data.find((w) => w.dateTime === dateStr);
        setTodayWorkout(today);
      } catch (error) {
        console.error("Failed to fetch base training history", error);
      }
    }

    fetchTraining();
  }, [dateStr]);

  const handleStartTraining = async () => {
    try {
      if (!todayWorkout) return;

      const startedTraining = await startBaseTraining(todayWorkout.id);
      console.log("MyPlan: trainingHistory to send", startedTraining);

      setContextTrainingHistory(startedTraining);
      navigate(`/home/plan/${dateStr}/strength/step1`);
    } catch (error) {
      console.error("Failed to start training:", error);
    }
  };

  return (
    <div className="plan">
      <div className="calendar-wrapper">
        <Calendar
          locale="en-CA"
          formatShortWeekday={(locale, date) =>
            date.toLocaleDateString("en-CA", { weekday: "long" })
          }
          value={selectedDate}
          onChange={setSelectedDate}
          prevLabel={
            <img
              src={arrow}
              alt="prev"
              className="react-calendar__icon react-calendar__icon--left"
            />
          }
          nextLabel={
            <img src={arrow} alt="next" className="react-calendar__icon" />
          }
          prev2Label={
            <img
              src={doublearrow}
              alt="prev"
              className="react-calendar__icon react-calendar__icon--left"
            />
          }
          next2Label={
            <img
              src={doublearrow}
              alt="prev"
              className="react-calendar__icon"
            />
          }
          tileClassName={({ date, view }) => {
            if (view === "month") {
              const dateStr = date.toLocaleDateString("en-CA");
              const dayData = trainingHistory.find(
                (t) => t.dateTime === dateStr
              );

              if (dayData) {
                const { trStatusDisplayName } = dayData;

                const stateClasses = {
                  Completed: "day-completed",
                  Missed: "day-missed",
                  Planning: "day-scheduled",
                  "In Progress": "day-in-progress",
                };

                return `${
                  stateClasses[trStatusDisplayName] || ""
                } day-strength`.trim();
              }
            }
            return null;
          }}
          tileContent={({ date }) => {
            const dateStr = date.toLocaleDateString("en-CA");
            const dayData = trainingHistory.find((t) => t.dateTime === dateStr);

            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const isTodayOrFuture = date >= today;

            if (isTodayOrFuture) {
              if (
                dayData &&
                dateStr === new Date().toLocaleDateString("en-CA") &&
                dayData.trStatusDisplayName !== "Completed"
              ) {
                return (
                  <button
                    className="calendar__button calendar__button--view"
                    onClick={handleStartTraining}
                  >
                    Start training
                  </button>
                );
              }
            }

            return null;
          }}
        />

        <div className="calendar-wrapper__information">
          <div className="calendar-wrapper__information__box">
            <div className="calendar-wrapper__information__color calendar-wrapper__information__color--yellow"></div>
            <p className="calendar-wrapper__information__title">Scheduled</p>
          </div>
          <div className="calendar-wrapper__information__box">
            <div className="calendar-wrapper__information__color calendar-wrapper__information__color--pink"></div>
            <p className="calendar-wrapper__information__title">In progress</p>
          </div>
          <div className="calendar-wrapper__information__box">
            <div className="calendar-wrapper__information__color calendar-wrapper__information__color--green"></div>
            <p className="calendar-wrapper__information__title">Completed</p>
          </div>
          <div className="calendar-wrapper__information__box">
            <div className="calendar-wrapper__information__color calendar-wrapper__information__color--red"></div>
            <p className="calendar-wrapper__information__title">Missed</p>
          </div>
          <div className="calendar-wrapper__information__box">
            <div className="calendar-wrapper__information__color calendar-wrapper__information__color--blue"></div>
            <p className="calendar-wrapper__information__title">
              Strength Training
            </p>
          </div>
          <div className="calendar-wrapper__information__box">
            <div className="calendar-wrapper__information__color calendar-wrapper__information__color--purple"></div>
            <p className="calendar-wrapper__information__title">Pilates</p>
          </div>
        </div>
      </div>
    </div>
  );
}
