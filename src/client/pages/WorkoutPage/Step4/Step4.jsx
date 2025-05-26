import { useLocation } from "react-router-dom";
import { YouTubeVideo } from "../../../components/YouTubeVideo/YouTubeVideo";
import "./Step4.scss";
import { useEffect } from "react";

export function Step4() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  
  return (
    <div className="step step4">
      <p className="step__text" style={{ fontWeight: "700" }}>
        Got extra energy?
      </p>
      <p className="step__text">Activate your core with a quick abs finisher</p>
      <YouTubeVideo link={"zv7kSlx7mqE"} />
    </div>
  );
}
