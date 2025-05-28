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
import { AddTraining } from "./client/pages/AddTraining";
import { Pilates } from "./client/pages/Pilates/Pilates";
import { PilatesStep1 } from "./client/pages/Pilates/Step1/PilatesStep1";
import { PilatesStep2 } from "./client/pages/Pilates/Step2/PilatesStep2";
import { setWorkoutDays } from "./client/utils/workoutStorage";
import { ChangeTraining } from "./client/pages/ChangeTraining/ChangeTraining";
import { useEffect } from "react";
import { autoMarkMissedWorkouts } from "./client/utils/workoutStorage";

export function App() {
  // localStorage.removeItem("workoutDays");
  if (!localStorage.getItem("workoutDays")) {
    setWorkoutDays({
      "2025-05-01": { state: "missed", type: "strength", body: "full body", exercises: "fullbody1" },
      "2025-05-02": { state: "completed", type: "pilates", body: "full body" },
      "2025-05-04": { state: "completed", type: "pilates", body: "full body" },
      "2025-05-27": { state: "scheduled", type: "strength", body: "lower body", exercises: "lowerbody2"  },
      "2025-06-17": { state: "scheduled", type: "pilates", body: "full body"},
      "2025-06-13": { state: "scheduled", type: "strength", body: "full body", exercises: "fullbody1"  },
      "2025-06-05": { state: "scheduled", type: "pilates", body: "full body" },
      "2025-06-22": { state: "scheduled", type: "strength", body: "upper body", exercises: "upperbody3"  },
    });
  }

  useEffect(() => {
    autoMarkMissedWorkouts();
  }, []);

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
            <Route path="plan/:date/add-training" element={<AddTraining />} />
            <Route path="plan/:date/change-training" element={<ChangeTraining />} />
            <Route path="plan/:date/strength" element={<WorkoutPage />}>
              <Route path="step1" element={<Step1 />} />
              <Route path="step2" element={<Step2 />} />
              <Route path="step3" element={<Step3 />} />
              <Route path="step4" element={<Step4 />} />
              <Route path="step5" element={<Step5 />} />
            </Route>
            <Route path="plan/:date/pilates" element={<Pilates />}>
              <Route path="step1" element={<PilatesStep1 />} />
              <Route path="step2" element={<PilatesStep2 />} />
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
