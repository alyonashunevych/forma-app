import arrow from "../../../images/calendar-arrow.svg";
import arrowBlack from "../../../images/calendar-arrow-black.svg";
import settings from "../../../images/settings.svg";
import "./Pilates.scss";
import { useEffect, useState } from "react";
import {
  Outlet,
  useParams,
  useLocation,
  Link,
  useNavigate,
} from "react-router-dom";
import classNames from "classnames";
import { changeWorkoutDay, getWorkoutNumber } from "../../utils/workoutStorage";

export function Pilates() {
  const { date } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertDone, setShowAlertDone] = useState(false);

  const steps = ["Pilates Exercises", "Complete Workout"];
  const [isDone, setIsDone] = useState(false);

  const match = location.pathname.match(/step(\d+)/);
  const currentStep = match ? Number(match[1]) : 1;

  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";

  // Перевірка: чи сьогоднішній день співпадає з датою тренування
  const isToday = (() => {
    if (!date) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const workoutDate = new Date(date);
    workoutDate.setHours(0, 0, 0, 0);
    return today.getTime() === workoutDate.getTime();
  })();

  useEffect(() => {
    if (currentStep === 2 && !isDone) {
      navigate(`step1`, {
        replace: true,
      });
    }
  }, [currentStep, isDone, navigate]);

  const triggerAlert = () => {
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 2500);
  };

  const triggerAlertDone = () => {
    setShowAlertDone(true);
    setTimeout(() => setShowAlertDone(false), 2500);
  };

  return (
    <div className="pilates">
      <Link to="/home/plan" className="link">
        <div className="button-back">
          <img src={arrow} alt="arrow" className="button-back__arrow" />
          <p className="button-back__text">Back</p>
        </div>
      </Link>

      <h1 className="pilates__number">Workout №{getWorkoutNumber(date)}</h1>

      <Link to={`./../change-training`} className="link">
        <img src={settings} alt="settings" className="button-settings" />
      </Link>
      <p className="pilates__type">Pilates Training - Full Body</p>
      <p className="pilates__date">Scheduled for: {formattedDate}</p>
      <div className="pilates__steps">
        <p className="pilates__step-number">
          Step {currentStep}: {steps[currentStep - 1]}
        </p>

        <div className="pilates__progress-bar">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className={classNames("pilates__progress-bar__tile", {
                [`pilates__progress-bar__tile--${idx + 1}`]: idx < currentStep,
              })}
            ></div>
          ))}
        </div>
      </div>

      <Outlet context={{ isDone, setIsDone, currentStep }} />

      <div
        className={classNames("pilates__buttons", {
          "pilates__buttons--step2": currentStep === 2,
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

        {currentStep === 1 && (
          <>
            <button
              className={classNames("workout__button-done", {
                "workout__button-done--active": isDone,
              })}
              onClick={() => {
                if (!isToday) {
                  triggerAlert();
                  return;
                }
                setIsDone(true);
              }}
            >
              {isDone ? "Done" : "Mark as Done"}
            </button>

            <Link
              to={"step2"}
              onClick={(e) => {
                if (!isDone || !isToday) {
                  e.preventDefault();
                  triggerAlertDone();
                  return;
                }
                changeWorkoutDay(date, { state: "completed" });
              }}
            >
              <button className="pilates__button-done pilates__button-finish">
                Finish pilates
              </button>
            </Link>
          </>
        )}

        {currentStep === 2 && (
          <button
            className="pilates__button-done pilates__button-done--dashboard"
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
              currentStep === steps.length || (currentStep === 1 && !isDone),
          })}
          onClick={(e) => {
            if (
              currentStep === steps.length ||
              (currentStep === 1 && !isDone)
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
        <div className="pilates__alert">
          Please complete and mark this step before finishing the pilates training!
        </div>
      )}

      {showAlert && (
        <div className="pilates__alert">
          Please wait until the scheduled day to complete this workout!
        </div>
      )}
    </div>
  );
}
