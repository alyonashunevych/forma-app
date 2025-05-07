import "./UserData.scss";
import img from "../../../images/user-data-img.png";
import logo from "../../../images/logo-black.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import Choices from "choices.js";

export function UserData() {
  const location = useLocation();
  const sexSelectRef = useRef(null);
  const injuriesSelectRef = useRef(null);
  const intensitySelectRef = useRef(null);
  const bodySelectRef = useRef(null);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted");
    navigate("/app-dashboard");
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    [
      sexSelectRef,
      injuriesSelectRef,
      intensitySelectRef,
      bodySelectRef,
    ].forEach((select) => {
      if (select.current) {
        new Choices(select.current, {
          searchEnabled: false,
          itemSelectText: "",
          shouldSort: false,
        });
      }
    });
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
                min="0"
                max="120"
                required
              />
            </label>
            <label className="user-data__form__label">
              Sex
              <select name="sex" ref={sexSelectRef} required>
                <option value="" disabled selected>
                  Select your gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
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
            Injuries
            <select name="injuries" ref={injuriesSelectRef} required>
              <option value="" disabled selected>
                Have any injuries or restrictions?
              </option>
              <option value="none">None</option>
              <option value="knee injury">Knee Injury</option>
              <option value="ankle sprain">Ankle Sprain</option>
              <option value="lower back pain">Lower Back Pain</option>
              <option value="shoulder injury">Shoulder Injury</option>
              <option value="wrist pain">Wrist Pain</option>
              <option value="elbow injury">Elbow Injury</option>
              <option value="hip injury">Asthma</option>
              <option value="other">Other</option>
            </select>
          </label>

          <label className="user-data__form__label">
            What intensity level do you prefer for your workouts?
            <select name="intensity" ref={intensitySelectRef} required>
              <option value="" disabled selected>
                Intensity
              </option>
              <option value="light">Light</option>
              <option value="moderate">Moderate</option>
              <option value="intense">Intense</option>
            </select>
          </label>
          <p className="user-data__form__text">
            You can change intensity anytime in your profile
          </p>

          <label className="user-data__form__label">
            How many days per week do you want to train?
            <input
              type="number"
              name="days"
              placeholder="Number of days"
              className="user-data__form__input"
              min="0"
              max="7"
              required
            />
          </label>

          <label className="user-data__form__label">
            Which areas do you want to focus on?
            <select name="body" ref={bodySelectRef} required>
              <option value="" disabled selected>
                Select your focus areas
              </option>
              <option value="full body">Full Body</option>
              <option value="upper body">Upper Body</option>
              <option value="lower body">Lower Body</option>
              <option value="core">Core</option>
            </select>
          </label>

          <button type="submit" className="user-data__form__button">
            Generate My Plan
          </button>
        </form>
      </div>
    </div>
  );
}
