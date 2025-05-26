import "./Step1.scss";
import treadmill from "../../../../images/treadmill.png";
import stairStepper from "../../../../images/stair-stepper.png";
import exerciseBike from "../../../../images/exercise-bike.png";
import { useEffect, useState } from "react";
import { YouTubeVideo } from "../../../components/YouTubeVideo/YouTubeVideo";
import classNames from "classnames";
import { useLocation } from "react-router-dom";

export function Step1() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const images = {
    treadmillImg: treadmill,
    stairStepperImg: stairStepper,
    exerciseBikeImg: exerciseBike,
  };

  const videos = {
    treadmillLink: "HxsFneJFM2c",
    stairStepperLink: "GMc8fUksKpY",
    exerciseBikeLink: "NwwDBARCGgo",
  };

  const [videoContent, setVideoContent] = useState(videos.treadmillLink);

  return (
    <div className="step step1">
      <p className="step__text">Choose your cardio</p>

      <div className="step1__buttons">
        {["treadmill", "stairStepper", "exerciseBike"].map((i) => (
          <button
            key={i}
            className={classNames("step1__button", {
              selected: videoContent === videos[`${i}Link`],
            })}
            onClick={() => {
              setVideoContent(videos[`${i}Link`]);
            }}
          >
            <img src={images[`${i}Img`]} alt={i} />
          </button>
        ))}
      </div>

      <YouTubeVideo link={videoContent} />
    </div>
  );
}
