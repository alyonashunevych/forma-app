import "./MyPlan.scss";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import arrow from "../../../../images/calendar-arrow.svg";
import doublearrow from "../../../../images/calendar-double-arrow.svg";
import { getWorkoutDays } from "../../../utils/workoutStorage";

export function MyPlan() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigate = useNavigate();

  const workoutDays = getWorkoutDays();

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
              const key = date.toLocaleDateString("en-CA");
              const workoutDay = workoutDays[key];

              if (workoutDay) {
                const { state, type } = workoutDay;

                const stateClasses = {
                  completed: "day-completed",
                  missed: "day-missed",
                  scheduled: "day-scheduled",
                };

                const typeClasses = {
                  strength: "day-strength",
                  pilates: "day-pilates",
                };

                return `${stateClasses[state] || ""} ${
                  typeClasses[type] || ""
                }`.trim();
              }

              return null;
            }

            return null;
          }}
          tileContent={({ date }) => {
            const dateStr = date.toLocaleDateString("en-CA");
            const workoutDay = workoutDays[dateStr];

            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (date >= today) {
              if (workoutDay) {
                const type = workoutDay.type || "strength";
                return (
                  <button
                    className="calendar__button calendar__button--view"
                    onClick={() =>
                      navigate(`/home/plan/${dateStr}/${type}/step1`)
                    }
                  >
                    View plan
                  </button>
                );
              }

              return (
                <button
                  className="calendar__button calendar__button--add"
                  onClick={() => navigate(`/home/plan/${dateStr}/add-training`)}
                >
                  Add training
                </button>
              );
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
