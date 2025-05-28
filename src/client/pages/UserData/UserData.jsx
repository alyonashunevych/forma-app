import "./UserData.scss";
import img from "../../../images/user-data-img.png";
import logo from "../../../images/logo-black.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ChoicesSelect } from "../../components/ChoicesSelect/ChoicesSelect";

export function UserData() {
  const location = useLocation();
  const navigate = useNavigate();

  const [sex, setSex] = useState("");
  const [injuries, setInjuries] = useState("");
  const [intensity, setIntensity] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted");
    navigate("/home/dashboard");
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
                min="0"
                max="120"
                required
              />
            </label>
            <label className="user-data__form__label">
              Sex
              <ChoicesSelect
                name="sex"
                value={sex}
                onChange={e => setSex(e.target.value)}
                options={[
                  { value: "male", label: "Male" },
                  { value: "female", label: "Female" },
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
            Injuries
            <ChoicesSelect
              name="injuries"
              value={injuries}
              onChange={e => setInjuries(e.target.value)}
              options={[
                { value: "none", label: "None" },
                { value: "knee injury", label: "Knee Injury" },
                { value: "ankle sprain", label: "Ankle Sprain" },
                { value: "lower back pain", label: "Lower Back Pain" },
                { value: "shoulder injury", label: "Shoulder Injury" },
                { value: "wrist pain", label: "Wrist Pain" },
                { value: "elbow injury", label: "Elbow Injury" },
                { value: "hip injury", label: "Asthma" },
                { value: "other", label: "Other" },
              ]}
              required
              placeholder="Have any injuries or restrictions?"
            />
          </label>

          <label className="user-data__form__label">
            What intensity level do you prefer for your workouts?
            <ChoicesSelect
              name="intensity"
              value={intensity}
              onChange={e => setIntensity(e.target.value)}
              options={[
                { value: "light", label: "Light" },
                { value: "moderate", label: "Moderate" },
                { value: "intense", label: "Intense" },
              ]}
              required
              placeholder="Intensity"
            />
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
            <ChoicesSelect
              name="body"
              value={body}
              onChange={e => setBody(e.target.value)}
              options={[
                { value: "full body", label: "Full Body" },
                { value: "upper body", label: "Upper Body" },
                { value: "lower body", label: "Lower Body" },
              ]}
              required
              placeholder="Select your focus areas"
            />
          </label>

          <button type="submit" className="user-data__form__button">
            Generate My Plan
          </button>
        </form>
      </div>
    </div>
  );
}