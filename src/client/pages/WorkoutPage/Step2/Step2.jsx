import { useLocation } from "react-router-dom";
import { YouTubeVideo } from "../../../components/YouTubeVideo/YouTubeVideo";
import { useEffect } from "react";

export function Step2() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  
  return (
    <div className="step">
      <p className="step__text">
        Follow a guided joint mobility routine to prepare for strength work
      </p>
      <YouTubeVideo link={"cmple9fw65w"} />
    </div>
  );
}
