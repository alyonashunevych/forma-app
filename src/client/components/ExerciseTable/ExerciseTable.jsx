import { useState } from "react";
import "./ExerciseTable.scss";
import checkMark from "../../../images/check-mark.svg";
import checkMarkWhite from "../../../images/check-mark-white.svg";
import classNames from "classnames";

export default function ExerciseTable() {
  const [sets, setSets] = useState([
    { previousKg: 10, kg: 10, reps: 8, done: true },
    { previousKg: 10, kg: 15, reps: 6, done: true },
    { previousKg: 15, kg: "", reps: "", done: false },
    { previousKg: "", kg: "", reps: "", done: false },
  ]);

  const updateSet = (index, field, value) => {
    const newSets = [...sets];
    newSets[index][field] = value;
    setSets(newSets);
  };

  const handleRowSubmit = (index) => {
    const setData = sets[index];

    console.log("Зберігаємо рядок:", index + 1, setData);

    updateSet(index, "done", true);
  };

  return (
    <div className="exercise-table">
      <div className="exercise-table__row">
        <p className="exercise-table__row-title">Set</p>
        <p className="exercise-table__row-title">Previous KG</p>
        <p className="exercise-table__row-title">KG</p>
        <p className="exercise-table__row-title">Reps</p>
        <p className="exercise-table__row-title">
          <img className="checkMark" src={checkMark} />
        </p>
      </div>

      {sets.map((set, index) => (
        <div className="exercise-table__row" key={index}>
          <div className="exercise-table__row__tile">{index + 1}</div>
          <input
            className="exercise-table__row__tile"
            type="number"
            value={set.previousKg}
            placeholder="-"
            disabled
          />
          <input
            className="exercise-table__row__tile"
            type="number"
            value={set.kg}
            placeholder="-"
            onChange={(e) => updateSet(index, "kg", e.target.value)}
          />
          <input
            className="exercise-table__row__tile"
            type="number"
            value={set.reps}
            placeholder="-"
            onChange={(e) => updateSet(index, "reps", e.target.value)}
          />
          <button
            className={classNames("exercise-table__row__tile", {done: set.done})}
            onClick={() => handleRowSubmit(index)}
          >
            <img src={set.done ? checkMarkWhite : checkMark} className="checkMark--big"/>
          </button>
        </div>
      ))}
    </div>
  );
}
