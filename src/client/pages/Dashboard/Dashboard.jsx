import { Outlet } from "react-router-dom";
import "./Dashboard.scss";
import { Navigation } from "../../components/Navigation/Navigation";
import { useRef } from "react";
import { DashboardHeader } from "../../components/DashBoardHeader/DashboardHeader";
import { Calendar } from "../../components/Calendar/Calendar";


export function Dashboard() {
  const contentRef = useRef(null);

  return (
    <div className="dashboard">
      <Navigation />
      <DashboardHeader />

      <main className="dashboard__content" ref={contentRef}>
        <Outlet />
      </main>

      <Calendar />
    </div>
  );
}
