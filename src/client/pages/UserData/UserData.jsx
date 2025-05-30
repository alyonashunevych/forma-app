import "./UserData.scss";
import img from "../../../images/user-data-img.png";
import logo from "../../../images/logo-black.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ChoicesSelect } from "../../components/ChoicesSelect/ChoicesSelect";
import { register } from "../../utils/api/authApi";
import { getBaseTrainings } from "../../utils/api/baseTrainings";
import { getTrainingLevels } from "../../utils/api/trainingLevelApi";

// const TRAINING_LEVELS = [
//   { value: "d6ccfc2b-e1cc-4ee9-9f76-794cce1c6ae3", label: "Light" },
//   { value: "b1e5b8e2-1b2a-4d7e-9e2e-1234567890ab", label: "Moderate" },
//   { value: "a2f7c8d3-2c3b-5e8f-0f3f-abcdefabcdef", label: "Intense" },
// ];

// const exercisesOptions = {
//     "full body": [
//       {
//         value: "fullbody1",
//         label:
//           "Option 1: Hip Thrust, Hip Adduction, Pull-Ups, Chest Flys, Overhead Extensions",
//       },
//       {
//         value: "fullbody2",
//         label:
//           "Option 2: Bulgarian Split Squats, Hip Adduction, Lat Pulldowns, Chest Flys, Tricep Pushdowns",
//       },
//       {
//         value: "fullbody3",
//         label:
//           "Option 3: Split Squats, Hip Adduction, Dumbbell Rows, Chest Flys, Tricep KickBacks",
//       },
//     ],
//     "upper body": [
//       {
//         value: "upperbody1",
//         label:
//           "Option 1: Lat Pulldowns, Underhand Rows, Chest Flys, Bicep Curls, Overhead Extensions",
//       },
//       {
//         value: "upperbody2",
//         label:
//           "Option 2: Pull-Ups, Bent Over Rows, Chest Flys, Bicep Curls, Tricep Pushdowns",
//       },
//       {
//         value: "upperbody3",
//         label:
//           "Option 3: Lat Pullovers, Dumbbell Rows, Chest Flys, Bicep Curls, Tricep KickBacks",
//       },
//     ],
//     "lower body": [
//       {
//         value: "lowerbody1",
//         label:
//           "Option 1: Hip Thrust, Bulgarian Split Squats, Romanian Deadlifts, Hip Adduction, Leg Press",
//       },
//       {
//         value: "lowerbody2",
//         label:
//           "Option 2: Hip Thrust, Split Squats, Glute Extensions, Hip Adduction, Lying Leg Curls",
//       },
//       {
//         value: "lowerbody3",
//         label:
//           "Option 3: Hip Thrust, Sumo Squats, KickBacks, Hip Adduction, Lying Leg Curls",
//       },
//     ],
//   };

export function UserData() {
  const location = useLocation();
  const navigate = useNavigate();

  const [sex, setSex] = useState("");
  const [trainingLevelId, setTrainingLevelId] = useState("");
  const [muscleGroup, setMuscleGroup] = useState("");
  const [daysPerWeek, setDaysPerWeek] = useState("");
  const [exerciseValue, setExerciseValue] = useState("");
  const [baseTrainings, setBaseTrainings] = useState([]);
  const [trainingLevels, setTrainingLevels] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const data = localStorage.getItem("signUpData");
    if (!data) {
      navigate("/sign-up");
    }
  }, [navigate]);

  useEffect(() => {
    getBaseTrainings().then(setBaseTrainings);
  }, []);

  useEffect(() => {
    getTrainingLevels().then(setTrainingLevels);
  }, []);

  const baseTrainingOptions = baseTrainings.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const trainingLevelOptions = trainingLevels.map((item) => ({
    value: item.id,
    label: item.displayName,
  }));

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = new FormData(event.target);
    const age = form.get("age");
    const height = form.get("height");
    const weight = form.get("weight");
    // const muscleGroupValue = form.get("body");
    const baseTrainingId = form.get("exercises");
    const days = form.get("days");

    const signUpData = JSON.parse(localStorage.getItem("signUpData"));

    const finalUserData = {
      email: signUpData.email,
      password: signUpData.password,
      firstName: signUpData.firstName,
      lastName: signUpData.lastName,
      age: parseInt(age, 10),
      gender: sex,
      trainingLevelId: trainingLevelId,
      weight: parseInt(weight, 10),
      height: parseInt(height, 10),
      baseTrainingId: baseTrainingId,
      // muscleGroup: muscleGroupValue,
      daysPerWeek: parseInt(days, 10),
    };

    try {
      await register(finalUserData);
      localStorage.removeItem("signUpData");
      navigate("/home/dashboard");
    } catch (err) {
      console.error("Registration failed", err);
      setError("Registration failed. Please try again.");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="user-data">
      <img src={img} alt="Uniform for sports" className="user-data__img" />

      <div className="user-data__content">
        <Link to="/" className="user-data__logo">
          <img src={logo} alt="logo" className="user-data__logo-img" />
        </Link>

        <h1 className="user-data__title">Account created! Welcome to FORMA!</h1>
        <p className="user-data__description">
          Let’s personalize your training plan by understanding your body
        </p>

        <form className="user-data__form" onSubmit={handleSubmit} method="post">
          <div className="user-data__form__params">
            <label className="user-data__form__label">
              Age
              <input
                type="number"
                name="age"
                placeholder="Enter your age"
                className="user-data__form__input"
                min="15"
                max="120"
                required
              />
            </label>
            <label className="user-data__form__label">
              Sex
              <ChoicesSelect
                name="sex"
                value={sex}
                onChange={(e) => setSex(e.target.value)}
                options={[
                  { value: "MALE", label: "Male" },
                  { value: "FEMALE", label: "Female" },
                ]}
                required
                placeholder="Select your gender"
              />
            </label>
          </div>

          <div className="user-data__form__params">
            <label className="user-data__form__label">
              Height
              <input
                type="number"
                name="height"
                placeholder="Your height (cm)"
                className="user-data__form__input"
                min="0"
                max="300"
                required
              />
            </label>

            <label className="user-data__form__label">
              Weight
              <input
                type="number"
                name="weight"
                placeholder="Your current weight (kg)"
                className="user-data__form__input"
                min="0"
                max="300"
                required
              />
            </label>
          </div>

          <label className="user-data__form__label">
            What training level do you prefer for your workouts?
            <ChoicesSelect
              name="training-level"
              value={trainingLevelId}
              onChange={(e) => setTrainingLevelId(e.target.value)}
              options={trainingLevelOptions}
              required
              placeholder="Training level"
            />
          </label>
          <p className="user-data__form__text">
            You can change intensity anytime in your profile
          </p>

          <label className="user-data__form__label">
            Which areas do you want to focus on?
            <ChoicesSelect
              name="body"
              value={muscleGroup}
              onChange={(e) => setMuscleGroup(e.target.value)}
              options={[
                { value: "full body", label: "Full Body" },
                { value: "upper body", label: "Upper Body" },
                { value: "lower body", label: "Lower Body" },
              ]}
              required
              placeholder="Select your focus areas"
            />
          </label>

          <label className="user-data__form__label">
            Exercises
            <ChoicesSelect
              name="exercises"
              value={exerciseValue}
              onChange={(e) => setExerciseValue(e.target.value)}
              options={baseTrainingOptions}
              required
              placeholder="Select exercises"
            />
          </label>

          <label className="user-data__form__label">
            How many days per week do you want to train?
            <input
              type="number"
              name="days"
              placeholder="Number of days (2 or 3)"
              className="user-data__form__input"
              min="2"
              max="3"
              value={daysPerWeek}
              onChange={(e) => setDaysPerWeek(e.target.value)}
              required
            />
          </label>

          {error && <div className="user-data__form__error">{error}</div>}

          <button type="submit" className="user-data__form__button">
            Generate My Plan
          </button>
        </form>
      </div>
    </div>
  );
}
