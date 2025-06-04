import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import "./AddTraining.scss";
import { useEffect, useState } from "react";
import { ChoicesSelect } from "../../components/ChoicesSelect/ChoicesSelect";
import arrow from "../../../images/calendar-arrow.svg";
import { addWorkoutDay } from "../../utils/workoutStorage";

export function AddTraining() {
  const { date } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [bodyValue, setBodyValue] = useState("");
  const [exerciseValue, setExerciseValue] = useState("");
  const [typeValue, setTypeValue] = useState("");

    const [showAlert, setShowAlert] = useState(false);

  const isPilates = typeValue === "pilates";
  const bodyOptions = isPilates
    ? [{ value: "full body", label: "Full Body" }]
    : [
        { value: "full body", label: "Full Body" },
        { value: "upper body", label: "Upper Body" },
        { value: "lower body", label: "Lower Body" },
      ];

  useEffect(() => {
    if (isPilates) {
      setBodyValue("full body");
      setExerciseValue("");
    }
  }, [isPilates]);

  const triggerAlert = () => {
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 2500);
  };

  const exercisesOptions = {
    "full body": [
      {
        value: "fullbody1",
        label:
          "Option 1: Hip Thrust, Hip Adduction, Pull-Ups, Chest Flys, Overhead Extensions",
      },
      {
        value: "fullbody2",
        label:
          "Option 2: Bulgarian Split Squats, Hip Adduction, Lat Pulldowns, Chest Flys, Tricep Pushdowns",
      },
      {
        value: "fullbody3",
        label:
          "Option 3: Split Squats, Hip Adduction, Dumbbell Rows, Chest Flys, Tricep KickBacks",
      },
    ],
    "upper body": [
      {
        value: "upperbody1",
        label:
          "Option 1: Lat Pulldowns, Bent Over Rows, Chest Flys, Bicep Curls, Overhead Extensions",
      },
      {
        value: "upperbody2",
        label:
          "Option 2: Pull-Ups, Bent Over Rows, Chest Flys, Bicep Curls, Tricep Pushdowns",
      },
      {
        value: "upperbody3",
        label:
          "Option 3: Lat Pullovers, Dumbbell Rows, Chest Flys, Bicep Curls, Tricep KickBacks",
      },
    ],
    "lower body": [
      {
        value: "lowerbody1",
        label:
          "Option 1: Hip Thrust, Bulgarian Split Squats, Romanian Deadlifts, Hip Adduction, Leg Press",
      },
      {
        value: "lowerbody2",
        label:
          "Option 2: Hip Thrust, Split Squats, Glute Extensions, Hip Adduction, Lying Leg Curls",
      },
      {
        value: "lowerbody3",
        label:
          "Option 3: Hip Thrust, Sumo Squats, KickBacks, Hip Adduction, Lying Leg Curls",
      },
    ],
  };
  const isFormValid = typeValue && bodyValue && (isPilates || exerciseValue);

const handleSubmit = (e) => {
  e.preventDefault();
  if (!isFormValid) return;
  const added = addWorkoutDay(date, {
    state: "scheduled",
    type: typeValue,
    body: bodyValue,
    exercises: exerciseValue,
  });
  if (!added) {
    triggerAlert();
    return;
  }
  navigate(`/home/plan`);
};

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

  return (
    <div className="add-training">
      <Link to="/home/plan" className="link">
        <div className="button-back">
          <img src={arrow} alt="arrow" className="button-back__arrow" />
          <p className="button-back__text">Back</p>
        </div>
      </Link>

      <h1 className="add-training__title">Add a New Workout</h1>
      <p className="add-training__date">Date: {formattedDate}</p>

      <form className="add-training__form" method="post">
        <div className="add-training__form__params">
          <label className="user-data__form__label">
            Workout Type
            <ChoicesSelect
              name="type"
              value={typeValue}
              onChange={(e) => {
                setTypeValue(e.target.value);
                setBodyValue("");
                setExerciseValue("");
              }}
              options={[
                { value: "strength", label: "Strength" },
                { value: "pilates", label: "Pilates" },
              ]}
              required
              placeholder="Select workout type"
            />
          </label>
          <label className="user-data__form__label">
            Which areas do you want to focus on?
            <ChoicesSelect
              name="body"
              value={bodyValue}
              onChange={(e) => {
                setBodyValue(e.target.value);
                setExerciseValue("");
              }}
              options={bodyOptions}
              required
              placeholder={isPilates ? "Full Body" : "Select your focus areas"}
              disabled={isPilates}
            />
          </label>
        </div>

        <label className="user-data__form__label">
          Exercises
          <ChoicesSelect
            name="exercises"
            value={exerciseValue}
            onChange={(e) => setExerciseValue(e.target.value)}
            options={bodyValue ? exercisesOptions[bodyValue] : []}
            required
            disabled={isPilates || !bodyValue}
            placeholder="Select exercises"
          />
        </label>

        <button
          type="submit"
          className="user-data__form__button"
          onClick={handleSubmit}
        >
          Add Workout
        </button>
      </form>

      {showAlert && (
        <div className="workout__alert">
          Training for this date has already been added!
        </div>
      )}
    </div>
  );
}
