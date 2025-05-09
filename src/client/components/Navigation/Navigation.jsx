import dashboardIcon from "../../../images/dashboard.svg";
import planIcon from "../../../images/plan.svg";
import progressIcon from "../../../images/progress.svg";
import profileIcon from "../../../images/profile.svg";
import subscriptionsIcon from "../../../images/subscriptions.svg";
import settingsIcon from "../../../images/settings.svg";
import logo from "../../../images/logo-black.svg";
import "./Navigation.scss";

import { Link, NavLink } from "react-router-dom";

const images = {
  dashboard: dashboardIcon,
  plan: planIcon,
  progress: progressIcon,
  profile: profileIcon,
  subscriptions: subscriptionsIcon,
  settings: settingsIcon,
};

export function Navigation() {
  return (
    <div className="dashboard__navigation">
      <Link to="/" className="signup__logo">
        <img src={logo} alt="logo" className="signup__logo-img" />
      </Link>

      <nav className="dashboard__navigation__list">
        {[
          "dashboard",
          "plan",
          "progress",
          "profile",
          "subscriptions",
          "settings",
        ].map((item) => (
          <NavLink
            to={item}
            className={({ isActive }) =>
              isActive
                ? `dashboard__navigation__link--${item} dashboard__navigation__link--${item}--active`
                : `dashboard__navigation__link--${item}`
            }
            key={item}
          >
            <img
              src={images[item]}
              alt={`${item} icon`}
              className="dashboard__navigation__icon"
            />
            <p className="dashboard__navigation__text">
              {item === 'plan' ? 'My Plan' : (item.charAt(0).toUpperCase() + item.slice(1))}
            </p>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
