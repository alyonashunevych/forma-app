import "./LogIn.scss";
import img from "../../../images/login-img.png";
import logo from "../../../images/logo-black.svg";
import google from "../../../images/google.svg";
import apple from "../../../images/apple.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { login } from "../../utils/api/authApi";
import { useUser } from "../../utils/UserContext";


export function LogIn() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setUser } = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      await login({ email, password }, setUser);

      navigate("/home/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setError("Login failed. Please check your email or password.");
    }
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
            <img src={google} alt="Google logo" className="login__continue-button__img" />
            Continue with Google
          </button>
          <button className="login__continue-button">
            <img src={apple} alt="Apple logo" className="login__continue-button__img" />
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label className="login__form__label">
            Password
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              className="login__form__input"
              maxLength={20}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <button className="login__form__forgot" type="button">
            Forgot password?
          </button>

          {error && (
            <div className="login__form__error">
              {error}
            </div>
          )}

          <button type="submit" className="login__form__button">Log In</button>
        </form>

        <div className="login__signup">
          <p className="login__signup__text">Don't have an account?</p>
          <Link to="/signup" className="link">
            <button className="login__signup__button">Sign Up</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
