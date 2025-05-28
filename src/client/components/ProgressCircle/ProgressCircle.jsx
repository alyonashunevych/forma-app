import { useEffect, useRef } from "react";
import { getWorkoutDays } from "../../utils/workoutStorage";
import "./ProgressCircle.scss";

function getWeekRange(date = new Date()) {
  const d = new Date(date);
  const day = d.getDay(); // 0 (Sun) ... 6 (Sat)
  const diffToMonday = (day + 6) % 7;
  const monday = new Date(d);
  monday.setDate(d.getDate() - diffToMonday);
  monday.setHours(0, 0, 0, 0);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);
  return { monday, sunday };
}

function getWeeklyStats() {
  const { monday, sunday } = getWeekRange();
  const workoutDays = getWorkoutDays();

  let strengthTrainings = 0;
  let doneStrengthTrainings = 0;
  let pilatesTrainings = 0;
  let donePilatesTrainings = 0;

  Object.entries(workoutDays).forEach(([dateStr, workout]) => {
    const workoutDate = new Date(dateStr);
    workoutDate.setHours(0, 0, 0, 0);
    if (workoutDate >= monday && workoutDate <= sunday) {
      if (workout.type === "strength") {
        strengthTrainings++;
        if (workout.state === "completed") doneStrengthTrainings++;
      }
      if (workout.type === "pilates") {
        pilatesTrainings++;
        if (workout.state === "completed") donePilatesTrainings++;
      }
    }
  });

  return {
    strengthTrainings,
    doneStrengthTrainings,
    pilatesTrainings,
    donePilatesTrainings,
  };
}

export function ProgressCircle() {
  const {
    strengthTrainings,
    doneStrengthTrainings,
    pilatesTrainings,
    donePilatesTrainings,
  } = getWeeklyStats();

  const textRef = useRef(null);
  const progressStrengthRef = useRef(null);
  const progressPilatesRef = useRef(null);

  function setProgress(progressStrength, progressPilates, progressTotal) {
    const circleStrength = progressStrengthRef.current;
    const circlePilates = progressPilatesRef.current;
    const text = textRef.current;

    if (!circleStrength || !circlePilates || !text) {
      console.error("One or more SVG elements are not available.");
      return;
    }

    const updateCircleProgress = (circle, progress) => {
      const radius = circle.r.baseVal.value;
      const circumference = 2 * Math.PI * radius;

      circle.style.strokeDasharray = `${circumference}`;
      circle.style.strokeDashoffset = `${
        circumference - (progress / 100) * circumference
      }`;
    };

    updateCircleProgress(circleStrength, progressStrength);
    updateCircleProgress(circlePilates, progressPilates);

    text.textContent = `${Math.round(progressTotal)}%`;
  }

  useEffect(() => {
    const totalTrainings = strengthTrainings + pilatesTrainings;
    const completedTrainings = doneStrengthTrainings + donePilatesTrainings;
    const progressTotal =
      totalTrainings > 0 ? (completedTrainings / totalTrainings) * 100 : 0;
    const progressStrength =
      strengthTrainings > 0
        ? (doneStrengthTrainings / strengthTrainings) * 100
        : 0;
    const progressPilates =
      pilatesTrainings > 0
        ? (donePilatesTrainings / pilatesTrainings) * 100
        : 0;

    setProgress(progressStrength, progressPilates, progressTotal);
  }, [
    strengthTrainings,
    doneStrengthTrainings,
    pilatesTrainings,
    donePilatesTrainings,
  ]);

  return (
    <div className="progress-circle">
      <div className="progress-circle__circles">
        <svg viewBox="0 0 36 36" className="progress-circle__svg">
          <circle
            className="progress-circle__background"
            cx="18"
            cy="18"
            r="15.915"
          ></circle>
          <circle
            ref={progressStrengthRef}
            className="progress-circle__progress"
            cx="18"
            cy="18"
            r="15.915"
          ></circle>
          <circle
            className="progress-circle__background"
            cx="18"
            cy="18"
            r="11"
          ></circle>
          <circle
            ref={progressPilatesRef}
            className="progress-circle__progress progress-circle__progress--small"
            cx="18"
            cy="18"
            r="11"
          ></circle>
        </svg>
      </div>

      <div className="progress-circle__information">
        <p className="progress-circle__information__title">
          Current Week Stats
        </p>
        <div ref={textRef} className="progress-circle__text"></div>

        <div className="progress-circle__information__training">
          <div className="progress-circle__information__training__color progress-circle__information__training__color--blue"></div>

          <div className="progress-circle__information__training__text">
            <p className="progress-circle__information__training__title">
              Strength Training
            </p>
            <p className="progress-circle__information__training__value">
              {doneStrengthTrainings}/{strengthTrainings} completed
            </p>
          </div>
        </div>

        <div className="progress-circle__information__training">
          <div className="progress-circle__information__training__color progress-circle__information__training__color--purple"></div>

          <div className="progress-circle__information__training__text">
            <p className="progress-circle__information__training__title">
              Pilates
            </p>
            <p className="progress-circle__information__training__value">
              {donePilatesTrainings}/{pilatesTrainings} completed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}