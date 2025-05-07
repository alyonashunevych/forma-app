import "./LogIn.scss";
import img from "../../../images/login-img.png";
import logo from "../../../images/logo-black.svg";
import google from "../../../images/google.svg";
import apple from "../../../images/apple.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function LogIn() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted");
    navigate("/app-dashboard");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="login">
      <img src={img} alt="Uniform for sports" className="login__img" />

      <div className="login__content">
        <Link to="/" className="login__logo">
          <img src={logo} alt="logo" className="login__logo-img" />
        </Link>

        <h1 className="login__title">Welcome back</h1>
        <p className="login__description">
          Let’s get back to your training journey
        </p>

        <div className="login__continue-buttons">
          <button className="login__continue-button">
            <img
              src={google}
              alt="Google logo"
              className="login__continue-button__img"
            />
            Continue with Google
          </button>
          <button className="login__continue-button">
            <img
              src={apple}
              alt="Apple logo"
              className="login__continue-button__img"
            />
            Continue with Apple
          </button>
        </div>

        <div className="login__or">
          <div className="login__or__line"></div>
          <p className="login__description">or</p>
          <div className="login__or__line"></div>
        </div>

        <form className="login__form" onSubmit={handleSubmit} method="post">
          <label className="login__form__label">
            Email
            <input
              type="email"
              name="email"
              placeholder="example@gmail.com"
              className="login__form__input"
              required
            />
          </label>

          <label className="login__form__label">
            Password
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              className="login__form__input"
              maxlength="20"
              required
            />
          </label>
          <button className="login__form__forgot">Forgot password?</button>
          
          <button type="submit" className="login__form__button">Log In</button>
        </form>

        <div className="login__signup">
          <p className="login__signup__text">Don't have an account?</p>
          <Link to="/signup" className="login__signup__link">
            <button className="login__signup__button">Sign Up</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
