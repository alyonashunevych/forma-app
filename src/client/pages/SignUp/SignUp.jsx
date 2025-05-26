import "./SignUp.scss";
import img from "../../../images/signup-img.png";
import logo from "../../../images/logo-black.svg";
import google from "../../../images/google.svg";
import apple from "../../../images/apple.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function SignUp() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted");
    navigate("/user-data");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="signup">
      <img src={img} alt="Uniform for sports" className="signup__img" />

      <div className="signup__content">
        <Link to="/" className="signup__logo">
          <img src={logo} alt="logo" className="signup__logo-img" />
        </Link>

        <h1 className="signup__title">Create an account</h1>
        <p className="signup__description">
          Join FORMA and take control of your training
        </p>

        <div className="signup__continue-buttons">
          <button className="signup__continue-button">
            <img
              src={google}
              alt="Google logo"
              className="signup__continue-button__img"
            />
            Continue with Google
          </button>
          <button className="signup__continue-button">
            <img
              src={apple}
              alt="Apple logo"
              className="signup__continue-button__img"
            />
            Continue with Apple
          </button>
        </div>

        <div className="signup__or">
          <div className="signup__or__line"></div>
          <p className="signup__description">or</p>
          <div className="signup__or__line"></div>
        </div>

        <form className="signup__form" onSubmit={handleSubmit} method="post">
          <div className="signup__form__name">
            <label className="signup__form__label">
              Name
              <input
                type="text"
                name="name"
                placeholder="Alyona"
                className="signup__form__input"
                required
              />
            </label>
            <label className="signup__form__label">
              Surname
              <input
                type="text"
                name="surname"
                placeholder="Shunevych"
                className="signup__form__input"
                required
              />
            </label>
          </div>

          <label className="signup__form__label">
            Email
            <input
              type="email"
              name="email"
              placeholder="example@gmail.com"
              className="signup__form__input"
              required
            />
          </label>

          <label className="signup__form__label">
            Password
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              className="signup__form__input"
              maxlength="20"
              required
            />
          </label>

          <label className="signup__form__label">
            Confirm Password
            <input
              type="password"
              name="confirm-password"
              placeholder="••••••••"
              className="signup__form__input"
              maxlength="20"
              required
            />
          </label>

          <button type="submit" className="signup__form__button">
            Create account
          </button>
        </form>

        <div className="signup__login">
          <p className="signup__login__text">Already have an account?</p>
          <Link to="/login" className="link">
            <button className="signup__login__button">Log In</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
