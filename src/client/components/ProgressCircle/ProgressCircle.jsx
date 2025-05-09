import { useEffect, useRef } from "react";
import "./ProgressCircle.scss";

export function ProgressCircle() {
  const doneStrengthTrainings = 4;
  const strengthTrainings = 6;

  const donePilatesTrainings = 3;
  const pilatesTrainings = 7;

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
    const progressTotal = (completedTrainings / totalTrainings) * 100;
    const progressStrength = (doneStrengthTrainings / strengthTrainings) * 100;
    const progressPilates = (donePilatesTrainings / pilatesTrainings) * 100;

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
