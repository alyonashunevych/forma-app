import './DashBoardHeader.scss'
import training from "../../../images/training.svg";
import hand from "../../../images/hand.png";

export function DashboardHeader() {
  const date = new Date();
  const currentMonth = date.toLocaleString("en-US", { month: "long" });
  const currentDate = `${currentMonth} ${date.getDate()}, ${date.getFullYear()}`;

  return (
    <header className="dashboard__header">
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
        <p className="dashboard__header__information__value">{currentDate}</p>
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
    </header>
  );
}
