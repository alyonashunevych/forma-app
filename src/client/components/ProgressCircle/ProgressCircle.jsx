import { useEffect, useRef, useState } from "react";
import "./ProgressCircle.scss";
import { getBaseTrainingHistoryStatusStats } from "../../utils/api/getBaseTrainingHistoryStatusStats";

function getWeekRange(date = new Date()) {
  const d = new Date(date);
  const day = d.getDay();
  const diffToMonday = (day + 6) % 7;
  const monday = new Date(d);
  monday.setDate(d.getDate() - diffToMonday);
  monday.setHours(0, 0, 0, 0);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);
  return { monday, sunday };
}

export function ProgressCircle() {
  const [completedCount, setCompletedCount] = useState(0);
  const [planningCount, setPlanningCount] = useState(0);

  const textRef = useRef(null);
  const progressStrengthRef = useRef(null);
  const progressPilatesRef = useRef(null);

  function setProgress(progressStrength, progressPilates, progressTotal) {
    const circleStrength = progressStrengthRef.current;
    const circlePilates = progressPilatesRef.current;
    const text = textRef.current;

    if (!circleStrength || !circlePilates || !text) return;

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
    const fetchWeeklyStats = async () => {
      try {
        const { monday, sunday } = getWeekRange();
        const from = monday.toISOString().split("T")[0];
        const to = sunday.toISOString().split("T")[0];

        const stats = await getBaseTrainingHistoryStatusStats(from, to);

        const completedObj = stats.find((s) => s.statusName.toLowerCase() === "completed");
        const planningObj = stats.find((s) => s.statusName.toLowerCase() === "planning");

        setCompletedCount(completedObj ? completedObj.count : 0);
        setPlanningCount(planningObj ? planningObj.count : 0);
      } catch (error) {
        console.error("❗ Error fetching weekly stats:", error);
      }
    };

    fetchWeeklyStats();
  }, []);

  useEffect(() => {
    const total = completedCount + planningCount;
    const completed = completedCount;

    const progressTotal = total > 0 ? (completed / total) * 100 : 0;
    const progressStrength = progressTotal;
    const progressPilates = 0;

    setProgress(progressStrength, progressPilates, progressTotal);
  }, [completedCount, planningCount]);

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
        <p className="progress-circle__information__title">Current Week Stats</p>
        <div ref={textRef} className="progress-circle__text"></div>

        <div className="progress-circle__information__training">
          <div className="progress-circle__information__training__color progress-circle__information__training__color--blue"></div>
          <div className="progress-circle__information__training__text">
            <p className="progress-circle__information__training__title">Strength Training</p>
            <p className="progress-circle__information__training__value">
              {completedCount}/{completedCount + planningCount} completed
            </p>
          </div>
        </div>

        <div className="progress-circle__information__training">
          <div className="progress-circle__information__training__color progress-circle__information__training__color--purple"></div>
          <div className="progress-circle__information__training__text">
            <p className="progress-circle__information__training__title">Pilates</p>
            <p className="progress-circle__information__training__value">0/0 completed</p>
          </div>
        </div>
      </div>
    </div>
  );
}
