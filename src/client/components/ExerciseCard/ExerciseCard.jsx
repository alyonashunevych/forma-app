import { useState } from "react";
import "./ExerciseCard.scss";
import glutebridge from "../../../images/glute-bridge.svg";
import arrow from "../../../images/faq-arrow.svg";

export function ExerciseCard() {
  const exercises = [
    {
      name: "Glute Bridge",
      img: glutebridge,
      kg: 100,
      sets: 4,
      reps: 8,
    },
    {
      name: "Push Up",
      img: glutebridge,
      kg: 150,
      sets: 3,
      reps: 12,
    },
    {
      name: "Squat",
      img: glutebridge,
      kg: 10,
      sets: 3,
      reps: 7,
    },
    {
      name: "Plank",
      img: glutebridge,
      kg: 25,
      sets: 4,
      reps: 10,
    },
    {
      name: "Lunges",
      img: glutebridge,
      kg: 42,
      sets: 4,
      reps: 8,
    },
    {
      name: "Deadlift",
      img: glutebridge,
      kg: 65,
      sets: 3,
      reps: 9,
    },
  ];

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);

  const handleNext = () => {
    setCurrentExerciseIndex((prevIndex) =>
      prevIndex === exercises.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentExerciseIndex((prevIndex) =>
      prevIndex === 0 ? exercises.length - 1 : prevIndex - 1
    );
  };

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