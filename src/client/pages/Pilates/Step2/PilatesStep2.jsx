import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import "./PilatesStep2.scss";

export function PilatesStep2() {
  const location = useLocation();
  const doneTrainingRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    if (doneTrainingRef.current) {
      setCircleProgress(doneTrainingRef.current, 100);
    }
  }, [doneTrainingRef]);

  const setCircleProgress = (circle, progress) => {
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;

    circle.style.strokeDasharray = `${circumference}`;
    circle.style.strokeDashoffset = `${
      circumference - (progress / 100) * circumference
    }`;
  };

  return (
    <div className="step step2">
      <p className="step__text" style={{ fontWeight: "700" }}>
        Great work, Alyona!
      </p>
      <p className="step__text">
        You showed up. You pushed through. That’s what matters
      </p>

      <div className="step2__animation">
        <svg viewBox="0 0 36 36" className="progress-circle__svg">
          <circle
            className="progress-circle__background"
            cx="18"
            cy="18"
            r="15.915"
          ></circle>
          <circle
            ref={doneTrainingRef}
            className="progress-circle__progress"
            cx="18"
            cy="18"
            r="15.915"
          ></circle>
        </svg>
        <p className="step__text" style={{marginBottom: "0"}}>
          <span className="step__text--bold">+1</span> workout 
          completed
        </p>
      </div>
    </div>
  );
}
