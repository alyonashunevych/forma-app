import { useLocation } from "react-router-dom";
import { YouTubeVideo } from "../../../components/YouTubeVideo/YouTubeVideo";
import { useEffect } from "react";

export function PilatesStep1() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  
  return (
    <div className="step">
      <p className="step__text">
        View the tutorial and practice the Pilates routine at your own pace
      </p>
      <YouTubeVideo link={"C2HX2pNbUCM"} />
    </div>
  );
}
