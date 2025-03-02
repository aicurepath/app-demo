import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ScoreCircle from '../components/health-score/ScoreCircle';
import MetricsList from '../components/health-score/MetricsList';
import AskAIDialog from '../components/health-score/AskAIDialog';
import HealthPlanTab from '../components/health-score/HealthPlanTab';
import { HealthScoreResult } from '../types/health-score';

type Tab = 'metrics' | 'plan';

const defaultResult: HealthScoreResult = {
  overallScore: 0,
  metrics: [],
  date: new Date(),
  answers: [] // Add the missing answers property
};

export default function HealthScorePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [result, setResult] = useState<HealthScoreResult>(defaultResult);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>(() => 
    (searchParams.get('tab') as Tab) || 'metrics'
  );

  useEffect(() => {
    const savedResult = localStorage.getItem('healthScoreResult');
    if (savedResult) {
      const parsed = JSON.parse(savedResult);
      parsed.date = new Date(parsed.date);
      setResult(parsed);
    }
  }, []);

  return (
    <div className="max-w-lg mx-auto p-4">
      <div className="bg-white rounded-3xl shadow-card p-8 mb-6">
        <div className="flex flex-col items-center">
          <ScoreCircle score={result.overallScore} />
          <div className="mt-8 text-center">
            <h2 className="text-xl text-gray-800">Overall Health Score</h2>
            <p className="text-sm text-gray-500 mt-2">
              Last updated: {result.date.toLocaleDateString()}
            </p>
            <div className="mt-8 grid grid-cols-3 gap-8 w-full max-w-sm mx-auto">
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
      </div>

      <div className="flex space-x-2 mb-6">
        {['metrics', 'plan'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as Tab)}
            className={`flex-1 py-3 px-4 rounded-xl font-medium transition-colors ${
              activeTab === tab
                ? 'bg-primary-500 text-white'
                : 'bg-white text-gray-600 hover:bg-primary-50'
            }`}
          >
            {tab === 'metrics' ? 'Health Metrics' : 'Health Plan'}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-card p-6">
        {activeTab === 'metrics' ? (
          <MetricsList 
            metrics={result.metrics}
            onStartAssessment={() => navigate('/health-score/assessment')}
            onAskAI={() => setIsDialogOpen(true)}
          />
        ) : (
          <HealthPlanTab />
        )}
      </div>

      <AskAIDialog 
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </div>
  );
}