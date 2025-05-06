import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Welcome } from "./client/pages/Welcome/Welcome";
import "./App.scss";
import { UpdateURLOnScroll } from "./client/components/utils/UpdateURLOnScroll";

export function App() {
  return (
    <>
      <UpdateURLOnScroll />
      <Router basename="/forma-app">
        <Routes>
          <Route path="/" element={<Welcome />} />
          {/* <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </Router>
    </>
  );
}
