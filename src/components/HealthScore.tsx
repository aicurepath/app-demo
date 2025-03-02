import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ScoreCircle from './health-score/ScoreCircle';

export default function HealthScore() {
  const [score, setScore] = useState(0);

  useEffect(() => {
    const savedResult = localStorage.getItem('healthScoreResult');
    if (savedResult) {
      const { overallScore } = JSON.parse(savedResult);
      setScore(overallScore);
    }
  }, []);

  return (
    <div className="bg-white rounded-3xl shadow-card p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl text-gray-800">Health Score</h2>
        <Link
          to="/health-score"
          className="text-primary-500 hover:text-primary-600 font-medium text-sm"
        >
          View Details
        </Link>
      </div>
      <div className="flex flex-col items-center">
        <ScoreCircle score={score} />
        <div className="mt-8 grid grid-cols-3 gap-8 w-full">
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-1">Physical</p>
            <p className="text-xl font-semibold text-primary-500">85</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-1">Mental</p>
            <p className="text-xl font-semibold text-primary-500">78</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-1">Balance</p>
            <p className="text-xl font-semibold text-primary-500">92</p>
          </div>
        </div>
      </div>
    </div>
  );
}