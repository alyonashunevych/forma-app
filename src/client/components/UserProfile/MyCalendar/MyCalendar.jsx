import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./MyCalendar.scss";

import arrow from "../../../../images/calendar-arrow.svg";
import doublearrow from "../../../../images/calendar-double-arrow.svg";

export function MyCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const workoutDays = {
    "2025-05-01": { state: "missed", type: "strength" },
    "2025-05-02": { state: "completed", type: "pilates" },
    "2025-05-04": { state: "completed", type: "pilates" },
    "2025-05-27": { state: "scheduled", type: "strength" },
    "2025-06-17": { state: "scheduled", type: "pilates" },
    "2025-06-13": { state: "missed", type: "strength" },
    "2025-06-05": { state: "completed", type: "pilates" },
    "2025-06-22": { state: "scheduled", type: "strength" },
  };

  return (
    <div className="calendar-wrapper">
      <Calendar
        locale="en-US"
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
          <img src={doublearrow} alt="prev" className="react-calendar__icon" />
        }
        tileClassName={({ date, view }) => {
          if (view === "month") {
            const key = date.toLocaleDateString("en-CA");
            const workoutDay = workoutDays[key];

            if (workoutDay) {
              const { state, type } = workoutDay;

              const stateClass = (() => {
                switch (state) {
                  case "completed":
                    return "day-completed";
                  case "missed":
                    return "day-missed";
                  case "scheduled":
                    return "day-scheduled";
                  default:
                    return "";
                }
              })();

              const typeClass = (() => {
                switch (type) {
                  case "strength":
                    return "day-strength";
                  case "pilates":
                    return "day-pilates";
                  default:
                    return "";
                }
              })();

              return `${stateClass} ${typeClass}`.trim();
            }

            return null;
          }

          return null;
        }}
      />

      <div className="calendar-wrapper__information">
        <div className="calendar-wrapper__information__box">
          <div className="calendar-wrapper__information__color calendar-wrapper__information__color--yellow"></div>
          <p className="calendar-wrapper__information__title">
            Scheduled
          </p>
        </div>
        <div className="calendar-wrapper__information__box">
          <div className="calendar-wrapper__information__color calendar-wrapper__information__color--green"></div>
          <p className="calendar-wrapper__information__title">
            Completed
          </p>
        </div>
        <div className="calendar-wrapper__information__box">
          <div className="calendar-wrapper__information__color calendar-wrapper__information__color--red"></div>
          <p className="calendar-wrapper__information__title">
            Missed
          </p>
        </div>
        <div className="calendar-wrapper__information__box">
          <div className="calendar-wrapper__information__color calendar-wrapper__information__color--blue"></div>
          <p className="calendar-wrapper__information__title">
            Strength Training
          </p>
        </div>
        <div className="calendar-wrapper__information__box">
          <div className="calendar-wrapper__information__color calendar-wrapper__information__color--purple"></div>
          <p className="calendar-wrapper__information__title">
            Pilates
          </p>
        </div>
      </div>
    </div>
  );
}
