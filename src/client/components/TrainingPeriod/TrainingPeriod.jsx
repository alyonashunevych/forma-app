import { useMemo } from "react";
import { useUser } from "../../utils/UserContext";
import "./TrainingPeriod.scss";

export function TrainingPeriod() {
  const { user } = useUser();
  const createdAt = user?.createdAt;

  const { days, months } = useMemo(() => {
    if (!createdAt) return { days: 0, months: "0.0" };

    const created = new Date(createdAt);
    const now = new Date();

    const msDiff = now.getTime() - created.getTime();
    const days = Math.floor(msDiff / (1000 * 60 * 60 * 24));

    const months = (days / 30.44).toFixed(1);

    return { days, months };
  }, [createdAt]);

  return (
    <div className="training-period">
      <div className="training-period__days">
        <p className="training-period__days__text">You’ve been training for</p>
        <p className="training-period__days__number">
          <span>{days === 0 ? '1' : days}</span> days
        </p>
      </div>

      <div className="training-period__months">
        <p className="training-period__months__number">
          <span>{months}</span> months
        </p>
        <p className="training-period__months__text">of Crushing Your Goals</p>
      </div>
    </div>
  );
}
