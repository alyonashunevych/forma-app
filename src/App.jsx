import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Welcome } from "./client/pages/Welcome/Welcome";
import "./App.scss";
import { UpdateURLOnScroll } from "./client/components/utils/UpdateURLOnScroll";
import { LogIn } from "./client/pages/LogIn/LogIn";
import { SignUp } from "./client/pages/SignUp/SignUp";
import { UserData } from "./client/pages/UserData/UserData";

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
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </Router>
    </>
  );
}
