import { useLocation } from "react-router-dom";
import latPulldowns from "../../../../images/lat-pulldowns.png";
import ExerciseTable from "../../../components/ExerciseTable/ExerciseTable";
import { YouTubeVideo } from "../../../components/YouTubeVideo/YouTubeVideo";
import "./Step3.scss";
import { useEffect } from "react";

export function Step3() {
  const exercises = [
    { name: "Lat Pulldowns", img: latPulldowns, video: "AOpi-p0cJkc" },
    { name: "Pull-Up", img: latPulldowns, video: "f4x3-BGRLFQ" },
    { name: "Lat Pulldowns", img: latPulldowns, video: "AOpi-p0cJkc" },
  ];

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="step step3">
      {exercises.map((exercise, idx) => (
        <div className="exercise">
          <p className="step__text exercise__name">
            Exercise №{idx + 1}:{" "}
            <span className="exercise__name--700">{exercise.name}</span>{" "}
          </p>

          <div className="exercise__img">
            <img src={exercise.img} />
          </div>

          <p className="step__text exercise__text">
            Watch this video to learn proper technique and avoid injuries
          </p>

          <YouTubeVideo link={exercise.video} />

          <p className="step__text exercise__text">
            Log your results and watch your progress grow!
          </p>

          <div className="exercise__form-box">
            <div className="exercise__advice">
              <p className="exercise__advice__text exercise__name--700">
                Recommended load:
              </p>
              <p className="exercise__advice__text">
                Sets: <span className="exercise__name--700">3-4</span> Reps:
                <span className="exercise__name--700">6-12</span>
              </p>
              <p className="exercise__advice__text">
                Weight: <span className="exercise__name--700">15 kg</span>
              </p>
            </div>

            <ExerciseTable />
          </div>
        </div>
      ))}
    </div>
  );
}
