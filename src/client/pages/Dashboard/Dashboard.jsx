import { Outlet, useLocation } from "react-router-dom";
import "./Dashboard.scss";
import { Navigation } from "../../components/Navigation/Navigation";
import { useRef } from "react";
import { DashboardHeader } from "../../components/DashBoardHeader/DashboardHeader";
import { UserProfile } from "../../components/UserProfile/UserProfile";
import classNames from "classnames";

export function Dashboard() {
  const contentRef = useRef(null);
  const location = useLocation();

  const isDashboardPage = location.pathname === "/home/dashboard";
  const isWorkoutPage = location.pathname.startsWith("/home/plan/");

  return (
    <div className="dashboard">
      <Navigation />
      {!isWorkoutPage && <DashboardHeader />}

      <main
        className={classNames({
          dashboard__content: isDashboardPage,
          dashboard__main: !isDashboardPage,
          dashboard__workout: isWorkoutPage,
        })}
        ref={contentRef}
      >
        <Outlet />
      </main>

      {isDashboardPage && <UserProfile />}
    </div>
  );
}
