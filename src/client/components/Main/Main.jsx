import "./Main.scss";
import arrow from "../../../images/main-but-arrow.svg";

export function Main() {
  return (
    <section className="main" id="main">
      <h1 className="main__title">
        Your Fitness Journey Starts{" "}
        <span className="main__title--italic">Here</span>
      </h1>

      <div className="main__content">
        <div className="main__buttons">
          <button className="main__button main__button__start">
            Start for Free
            <div className="main__button__start__circle">
              <img
                src={arrow}
                alt="arrow"
                className="main__button__arrow"
              />
            </div>
          </button>

          <button className="main__button main__button__explore">
            Explore Features
            <img
              src={arrow}
              alt="arrow"
              className="main__button__arrow"
            />
          </button>
        </div>

        <p className="main__description">
          Smash your goals with smart, personalized workout plans and real-time
          progress tracking
        </p>
      </div>
    </section>
  );
}
