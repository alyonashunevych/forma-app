import './RepsStats.scss';
import { Graph } from '../Graph/Graph';

export function RepsStats() {
  return (
    <div className="reps-stats">
      <h2 className="reps-stats__title">Reps Over Time [20 kg]</h2>
      <Graph y={[6, 8, 9, 11, 12]} yTickStep={2} />
      <p className="reps-stats__name">Overhead Extensions</p>
    </div>
  );
}
