import './WeightStats.scss';
import { Graph } from '../Graph/Graph';

export function WeightStats() {
  return (
    <div className="weight-stats">
      <h2 className="weight-stats__title">Weight Progress</h2>
      <Graph y={[10, 12, 15, 18, 25]} yTickStep={5} />
      <p className="weight-stats__name">Bulgarian Squats</p>
    </div>
  );
}
