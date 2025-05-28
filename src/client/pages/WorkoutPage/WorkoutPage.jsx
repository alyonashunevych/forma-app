import {
  Outlet,
  useParams,
  useLocation,
  Link,
  useNavigate,
} from "react-router-dom";
import arrow from "../../../images/calendar-arrow.svg";
import arrowBlack from "../../../images/calendar-arrow-black.svg";
import settings from "../../../images/settings.svg";
import "./WorkoutPage.scss";
import classNames from "classnames";
import { useCallback, useEffect, useState } from "react";
import {
  changeWorkoutDay,
  getWorkoutDay,
  getWorkoutNumber,
} from "../../utils/workoutStorage";

export function WorkoutPage() {
  const { date } = useParams();
  const location = useLocation();
  const workout = getWorkoutDay(date);
  const number = getWorkoutNumber(date);
  const navigate = useNavigate();
  const [showAlertDone, setShowAlertDone] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const isToday = (() => {
    if (!date) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const workoutDate = new Date(date);
    workoutDate.setHours(0, 0, 0, 0);
    return today.getTime() === workoutDate.getTime();
  })();

  const steps = [
    "Cardio Warm-up",
    "Joint Mobility",
    "Strength Exercises",
    "Optional Core Activation",
    "Complete Workout",
  ];
  const [isDone, setIsDone] = useState(Array(steps.length - 1).fill(false));

  const areRequiredStepsDone = useCallback(() => {
    return isDone.map((done, idx) => (idx === 3 ? true : done)).every(Boolean);
  }, [isDone]);

  const match = location.pathname.match(/step(\d+)/);
  const currentStep = match ? Number(match[1]) : 1;

  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    if (currentStep === 5 && !areRequiredStepsDone()) {
      navigate(`step${isDone.findIndex((done) => !done) + 1}`, {
        replace: true,
      });
    }
  }, [currentStep, isDone, navigate, areRequiredStepsDone]);

  const triggerAlertDone = () => {
    setShowAlertDone(true);
    setTimeout(() => setShowAlertDone(false), 2500);
  };

  const triggerAlert = () => {
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 2500);
  };

  function capitalizeWords(str) {
    if (!str) return "";
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }

  return (
    <div className="workout">
      <Link to="/home/plan" className="link">
        <div className="button-back">
          <img src={arrow} alt="arrow" className="button-back__arrow" />
          <p className="button-back__text">Back</p>
        </div>
      </Link>

      <h1 className="workout__number">Workout №{number}</h1>

      {workout.state !== 'completed' && <Link to={`./../change-training`} className="link">
        <img src={settings} alt="settings" className="button-settings" />
      </Link>}

      <p className="workout__type">
        {capitalizeWords(workout.type)} Training -{" "}
        {capitalizeWords(workout.body)}
      </p>
      <p className="workout__date">Scheduled for: {formattedDate}</p>

      <div className="workout__steps">
        <p className="workout__step-number">
          Step {currentStep}: {steps[currentStep - 1]}
        </p>

        <div className="workout__progress-bar">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className={classNames("workout__progress-bar__tile", {
                [`workout__progress-bar__tile--${idx + 1}`]: idx < currentStep,
              })}
            ></div>
          ))}
        </div>
      </div>

      <Outlet context={{ isDone, setIsDone, currentStep }} />

      <div
        className={classNames("workout__buttons", {
          "workout__buttons--step4": currentStep === 4,
        })}
      >
        <Link
          to={`step${currentStep - 1}`}
          className={classNames("link", { inactive: currentStep === 1 })}
          onClick={(e) => {
            if (currentStep === 1) e.preventDefault();
          }}
        >
          <div className="button-previous">
            <img
              src={arrowBlack}
              alt="arrow"
              className="button-previous__arrow"
            />
            <p className="button-previous__text">Previous Step</p>
          </div>
        </Link>

        {currentStep < 5 && (
          <button
            className={classNames("workout__button-done", {
              "workout__button-done--active": isDone[currentStep - 1],
              "workout__button-done--step4--yes": currentStep === 4,
            })}
            onClick={() => {
              if (!isToday) {
                triggerAlert();
                return;
              }
              setIsDone((prev) => {
                const updated = [...prev];
                updated[currentStep - 1] = true;
                return updated;
              });
            }}
          >
            {isDone[currentStep - 1]
              ? "Done"
              : currentStep === 4
              ? "Yes, let's go"
              : "Mark as Done"}
          </button>
        )}

        {currentStep === 4 && (
          <Link
            to={"step5"}
            onClick={(e) => {
              if (!areRequiredStepsDone() || !isToday) {
                e.preventDefault();
                triggerAlertDone();
                return;
              }
              changeWorkoutDay(date, { state: "completed" });
            }}
          >
            <button className="workout__button-done workout__button-done--step4--no">
              No, finish workout
            </button>
          </Link>
        )}

        {currentStep === 5 && (
          <button
            className="workout__button-done workout__button-done--dashboard"
            onClick={() => {
              navigate("/home/dashboard");
            }}
          >
            Go to Dashboard
          </button>
        )}

        <Link
          to={`step${currentStep + 1}`}
          className={classNames("link", {
            inactive:
              currentStep === steps.length ||
              (currentStep === 4 && !areRequiredStepsDone()),
          })}
          onClick={(e) => {
            if (
              currentStep === steps.length ||
              (currentStep === 4 && !areRequiredStepsDone())
            ) {
              e.preventDefault();
            }
          }}
        >
          <div className="button-next">
            <p className="button-next__text">Next Step</p>
            <img src={arrowBlack} alt="arrow" className="button-next__arrow" />
          </div>
        </Link>
      </div>

      {showAlertDone && (
        <div className="workout__alert">
          Please complete and mark all steps before finishing the workout!
        </div>
      )}

      {showAlert && (
        <div className="workout__alert">
          Please wait until the scheduled day to complete this workout!
        </div>
      )}
    </div>
  );
}
