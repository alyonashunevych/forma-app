import './TrainingPeriod.scss';

export function TrainingPeriod() {
  return (
    <div className="training-period">
      <div className="training-period__days">
        <p className="training-period__days__text">You’ve been training for</p>
        <p className="training-period__days__number"><span>952</span> days</p>
      </div>

      <div className="training-period__months">
        <p className="training-period__months__number"><span>5,5</span> months</p>
        <p className="training-period__months__text">of Crushing Your Goals</p>
      </div>
    </div>
  );
}
