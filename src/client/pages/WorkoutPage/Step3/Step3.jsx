import ExerciseTable from "../../../components/ExerciseTable/ExerciseTable";
import { YouTubeVideo } from "../../../components/YouTubeVideo/YouTubeVideo";
import { useTraining } from "../../../utils/useTraining";
import "./Step3.scss";

export function Step3() {
  const { trainingHistory } = useTraining();

  if (!trainingHistory) {
    return <div>No training data available.</div>;
  }

  const exercises = trainingHistory.baseExToPositions || [];

  if (exercises.length === 0) {
    return <div>No exercises found.</div>;
  }

  return (
    <div className="step step3">
      {exercises.map((exercise, idx) => (
        <div className="exercise" key={exercise.id}>
          <p className="step__text exercise__name">
            Exercise №{idx + 1}:{" "}
            <span className="exercise__name--700">
              {exercise.baseExercise.name}
            </span>
          </p>

          <div className="exercise__img">
            <img
              src={exercise.baseExercise.mainImage}
              alt={exercise.baseExercise.name}
            />
          </div>

          <p className="step__text exercise__text">
            Watch this video to learn proper technique and avoid injuries
          </p>

          <YouTubeVideo link={exercise.baseExercise.videoUrl} />

          <p className="step__text exercise__text">
            Log your results and watch your progress grow!
          </p>

          <div className="exercise__form-box">
            <div className="exercise__advice">
              <p className="exercise__advice__text exercise__name--700">
                Recommended load:
              </p>
              <p className="exercise__advice__text">
                Sets:{" "}
                <span className="exercise__name--700">
                  {exercise.baseSets.length}
                </span>{" "}
                Reps:{" "}
                <span className="exercise__name--700">
                  {exercise.baseSets[0]?.reps ?? "-"}
                </span>
              </p>
              <p className="exercise__advice__text">
                Weight:{" "}
                <span className="exercise__name--700">
                  {exercise.baseSets[0]?.kg ?? "-"} kg
                </span>
              </p>
            </div>

            <ExerciseTable baseSets={exercise.baseSets} id={exercise.id} />
          </div>
        </div>
      ))}
    </div>
  );
}
