import { useState, useEffect } from "react";
import "./ExerciseTable.scss";
import checkMark from "../../../images/check-mark.svg";
import checkMarkWhite from "../../../images/check-mark-white.svg";
import classNames from "classnames";

const API_URL = import.meta.env.VITE_API_URL;

async function patchBaseTraining(baseTrainingId, sets) {
  try {
    const response = await fetch(
      `${API_URL}/base-ex-to-position-history/finish/${baseTrainingId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(sets),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message ||
          `Failed to start base training (status ${response.status})`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("patchBaseTraining error:", error);
    throw error;
  }
}

export default function ExerciseTable({ baseSets, onSave, id }) {
  const [sets, setSets] = useState([]);

  useEffect(() => {
    if (!baseSets) return;

    const initialSets = baseSets.map((set, index) => ({
      id: set.id,
      kg: set.kg,
      reps: set.reps,
      previousKg: index === 0 ? set.kg : baseSets[index - 1].kg,
      done: false,
    }));
    setSets(initialSets);
  }, [baseSets]);

  const updateSetField = (index, field, value) => {
    const newSets = [...sets];
    newSets[index][field] = value;
    setSets(newSets);
  };

  const handleRowSubmit = (index) => {
    const newSets = [...sets];
    newSets[index].done = true;

    for (let i = index + 1; i < newSets.length; i++) {
      newSets[i].previousKg = newSets[i - 1].kg || 0;
    }

    setSets(newSets);
  };

  const handleSave = async () => {
    const dataToSave = sets.map(({ id, kg, reps }) => ({
      id,
      kg: Number(kg),
      reps: Number(reps),
    }));

    try {
      const result = await patchBaseTraining(id, dataToSave);
      console.log("Результат з серверу:", result);
      if (onSave) {
        onSave(result);
      }
      alert("Результати успішно збережено");
    } catch (error) {
      alert("Помилка при збереженні результатів: " + error.message);
    }
  };

  return (
    <div>
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
          <div className="exercise-table__row" key={set.id}>
            <div className="exercise-table__row__tile">{index + 1}</div>

            <input
              className="exercise-table__row__tile"
              type="number"
              value={set.previousKg}
              disabled
            />
            <input
              className="exercise-table__row__tile"
              type="number"
              value={set.kg}
              placeholder={baseSets?.[index]?.kg || "-"}
              onChange={(e) => updateSetField(index, "kg", e.target.value)}
            />
            <input
              className="exercise-table__row__tile"
              type="number"
              value={set.reps}
              placeholder="-"
              onChange={(e) => updateSetField(index, "reps", e.target.value)}
            />
            <button
              className={classNames("exercise-table__row__tile", {
                done: set.done,
              })}
              onClick={() => handleRowSubmit(index)}
            >
              <img
                src={set.done ? checkMarkWhite : checkMark}
                className="checkMark--big"
              />
            </button>
          </div>
        ))}
      </div>

      <button className="save-button" onClick={handleSave}>
        Зберегти результати
      </button>
    </div>
  );
}
