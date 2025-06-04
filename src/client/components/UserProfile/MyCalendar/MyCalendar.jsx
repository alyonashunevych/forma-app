import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./MyCalendar.scss";

import arrow from "../../../../images/calendar-arrow.svg";
import doublearrow from "../../../../images/calendar-double-arrow.svg";
import { getBaseTrainingHistory } from "../../../utils/api/baseTrainingHistory";

export function MyCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [trainingHistory, setTrainingHistory] = useState([]);

  useEffect(() => {
    async function fetchTraining() {
      const data = await getBaseTrainingHistory();
      setTrainingHistory(data);
    }

    fetchTraining();
  }, [setTrainingHistory]);

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
            const dateStr = date.toLocaleDateString("en-CA");
            const dayData = trainingHistory.find((t) => t.dateTime === dateStr);

            if (dayData) {
              const { trStatusDisplayName } = dayData;

              const stateClasses = {
                Completed: "day-completed",
                Missed: "day-missed",
                Planning: "day-scheduled",
                "In Progress": "day-in-progress",
              };

              console.log(`${
                stateClasses[trStatusDisplayName] || ""
              } day-strength`.trim())

              return `${
                stateClasses[trStatusDisplayName] || ""
              } day-strength`.trim();
            }
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
