import "./HowItWorks.scss";
import img from "../../../images/howitworks-img.png";

export function HowItWorks() {
  return (
    <div className="how-it-works">
      <div className="how-it-works__content">
        <div className="how-it-works__title">
          <h2 className="how-it-works__title__normal">How it </h2>
          <span className="how-it-works__title__italic">works</span>
        </div>

        <ul className="how-it-works__steps">
          <li className="how-it-works__step">
            <p className="how-it-works__step-number">01</p>
            <p className="how-it-works__step-text">
              Create your profile with basic info
            </p>
          </li>
          <li className="how-it-works__step">
            <p className="how-it-works__step-number">02</p>
            <p className="how-it-works__step-text">
              Get a personalized training plan
            </p>
          </li>
          <li className="how-it-works__step">
            <p className="how-it-works__step-number">03</p>
            <p className="how-it-works__step-text">
              Follow guided workouts with tips and videos
            </p>
          </li>
          <li className="how-it-works__step">
            <p className="how-it-works__step-number">04</p>
            <p className="how-it-works__step-text">
              Track your performance and stay motivated
            </p>
          </li>
          <li className="how-it-works__step">
            <p className="how-it-works__step-number">05</p>
            <p className="how-it-works__step-text">Progress at your own pace</p>
          </li>
        </ul>
      </div>

      <img src={img} alt="Uniform for sports" className="how-it-works__img" />
    </div>
  );
}
