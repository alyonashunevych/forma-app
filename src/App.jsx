import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Welcome } from "./client/pages/Welcome/Welcome";
import "./App.scss";
import { UpdateURLOnScroll } from "./client/utils/UpdateURLOnScroll";
import { LogIn } from "./client/pages/LogIn/LogIn";
import { SignUp } from "./client/pages/SignUp/SignUp";
import { UserData } from "./client/pages/UserData/UserData";
import { Dashboard } from "./client/pages/Dashboard/Dashboard";
import { DashboardContent } from "./client/components/DashboardContent/DashboardContent";
import { MyPlan } from "./client/pages/Dashboard/MyPlan/MyPlan";
import { Progress } from "./client/pages/Dashboard/Progress/Progress";
import { Profile } from "./client/pages/Dashboard/Profile/Profile";
import { NotFound } from "./client/pages/NotFound/NotFound";
import { WorkoutPage } from "./client/pages/WorkoutPage/WorkoutPage";
import { Step1 } from "./client/pages/WorkoutPage/Step1/Step1";
import { Step2 } from "./client/pages/WorkoutPage/Step2/Step2";
import { Step3 } from "./client/pages/WorkoutPage/Step3/Step3";
import { Step4 } from "./client/pages/WorkoutPage/Step4/Step4";
import { Step5 } from "./client/pages/WorkoutPage/Step5/Step5";

export function App() {
  return (
    <>
      <UpdateURLOnScroll />
      <Router basename="/forma-app">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/user-data" element={<UserData />} />
          <Route path="/home" element={<Dashboard />}>
            <Route path="dashboard" element={<DashboardContent />} />
            <Route path="plan" element={<MyPlan />} />
            <Route path="plan/:date" element={<WorkoutPage />}>
              <Route path="step1" element={<Step1 />} />
              <Route path="step2" element={<Step2 />} />
              <Route path="step3" element={<Step3 />} />
              <Route path="step4" element={<Step4 />} />
              <Route path="step5" element={<Step5 />} />
            </Route>
            <Route path="progress" element={<Progress />} />
            <Route path="profile" element={<Profile />} />
            {/* <Route path="settings" element={<Settings />} /> */}
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
