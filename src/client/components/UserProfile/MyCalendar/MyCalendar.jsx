import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./MyCalendar.scss";

import arrow from "../../../../images/calendar-arrow.svg";
import doublearrow from "../../../../images/calendar-double-arrow.svg";
import { getWorkoutDays } from "../../../utils/workoutStorage";
import { useNavigate } from "react-router-dom";

export function MyCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const workoutDays = getWorkoutDays();
  const navigate = useNavigate();

  const handleDayClick = (date) => {
    const dateStr = date.toLocaleDateString("en-CA");
    const workoutDay = workoutDays[dateStr];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (date >= today) {
      if (workoutDay) {
        const type = workoutDay.type || "strength";
        navigate(`/home/plan/${dateStr}/${type}/step1`);
      } else {
        navigate(`/home/plan/${dateStr}/add-training`);
      }
    }
  };

  return (
    <div className="calendar-wrapper">
      <Calendar
        locale="en-US"
        value={selectedDate}
        onChange={setSelectedDate}
        onClickDay={handleDayClick}
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
          <img src={doublearrow} alt="prev" className="react-calendar__icon" />
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
        tileContent={() => null}
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
  );
}