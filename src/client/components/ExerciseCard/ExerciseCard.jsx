import { useEffect, useState } from "react";
import "./ExerciseCard.scss";
import arrow from "../../../images/faq-arrow.svg";
import { getLastCompletedTraining } from "../../utils/api/baseTrainingHistoryCompleted";

export function ExerciseCard() {
  const [exercises, setExercises] = useState([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getLastCompletedTraining();

        const formattedExercises = data.baseExToPositions.map((item) => {
          const fourthSet = item.baseSets?.find((set) => set.position === 4);

          return {
            name: item.baseExercise.name,
            img: item.baseExercise.miniImage,
            kg: fourthSet?.kg ?? 0,
            reps: fourthSet?.reps ?? 0,
            sets: item.baseSets?.length ?? 0,
          };
        });

        setExercises(formattedExercises);
      } catch (error) {
        console.error("Failed to fetch training data:", error);
      }
    }

    fetchData();
  }, []);

  const handleNext = () => {
    setCurrentExerciseIndex((prev) =>
      prev === exercises.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrev = () => {
    setCurrentExerciseIndex((prev) =>
      prev === 0 ? exercises.length - 1 : prev - 1
    );
  };

  if (exercises.length === 0) {
    return (
      <div className="exercise-card">
        <p className="exercise-card__loading">Loading exercises...</p>
      </div>
    );
  }

  const currentExercise = exercises[currentExerciseIndex];

  return (
    <div className="exercise-card">
      <img
        src={arrow}
        alt="arrow"
        className="exercise-card__arrow exercise-card__arrow--left"
        onClick={handlePrev}
      />

      <div className="exercise-card__content">
        <h2 className="exercise-card__name">{currentExercise.name}</h2>
        <img
          src={currentExercise.img}
          alt={currentExercise.name}
          className="exercise-card__img"
        />
        <div className="exercise-card__details">
          <div className="exercise-card__details__item">
            <p className="exercise-card__value">{currentExercise.kg}</p>
            <p className="exercise-card__key">kg</p>
          </div>
          <div className="exercise-card__details__item">
            <p className="exercise-card__value">{currentExercise.sets}</p>
            <p className="exercise-card__key">sets</p>
          </div>
          <div className="exercise-card__details__item">
            <p className="exercise-card__value">{currentExercise.reps}</p>
            <p className="exercise-card__key">reps</p>
          </div>
        </div>
      </div>

      <img
        src={arrow}
        alt="arrow"
        className="exercise-card__arrow exercise-card__arrow--right"
        onClick={handleNext}
      />
    </div>
  );
}
