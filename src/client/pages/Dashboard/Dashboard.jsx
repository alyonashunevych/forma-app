import { Outlet } from "react-router-dom";
import "./Dashboard.scss";
import { Navigation } from "../../components/Navigation/Navigation";
import { useEffect, useRef } from "react";
import hand from "../../../images/hand.png";
import twemoji from "twemoji";
import training from "../../../images/training.svg";

export function Dashboard() {
  const contentRef = useRef(null);
  const date = new Date();
  const currentMonth = date.toLocaleString("en-US", { month: "long" });
  const currentDate = `${currentMonth} ${date.getDate()}, ${date.getFullYear()}`;

  useEffect(() => {
    if (contentRef.current) {
      twemoji.parse(contentRef.current, {
        folder: "svg",
        ext: ".svg",
      });
    }
  }, []);

  return (
    <div className="dashboard">
      <Navigation />
      <div className="dashboard__content" ref={contentRef}>
        <div className="dashboard__header">
          <div className="dashboard__header__title">
            <h1 className="dashboard__header__title__text">
              Hello, Alyona!
              <img
                className="dashboard__header__emoji"
                src={hand}
                alt="Waving hand emoji"
              />
            </h1>
            <p className="dashboard__header__information__item">
              Ready to crush your goals today?
            </p>
          </div>

          <div className="dashboard__header__information">
            <p className="dashboard__header__information__item">Today is </p>
            <p className="dashboard__header__information__value">
              {currentDate}
            </p>
          </div>

          <div className="dashboard__header__information">
            <p className="dashboard__header__information__item">Workout </p>
            <p className="dashboard__header__information__value">№17 </p>
          </div>

          <button className="dashboard__header__button">
            Start Training
            <img
              src={training}
              alt={`training icon`}
              className="dashboard__navigation__icon"
            />
          </button>
        </div>

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
