import { useParams } from 'react-router-dom';
import BackButton from '../components/shared/BackButton';
import { mockHealthReport } from '../data/mockAccounts';
import { useAuth } from '../hooks/useAuth';
import { healthQuestions } from '../data/health-questions';

export default function HealthReportPage() {
  const { user } = useAuth();
  const isPractitioner = user?.role === 'practitioner';

  // Always show the mock report for practitioners
  const report = isPractitioner ? mockHealthReport : null;

  if (!report) {
    return (
      <div className="max-w-lg mx-auto">
        <div className="p-4 bg-white border-b sticky top-0 z-10">
          <div className="relative">
            <BackButton />
            <h1 className="text-lg font-medium text-center">Patient Health Report</h1>
          </div>
        </div>

        <div className="p-4">
          <div className="bg-white rounded-2xl shadow-md p-6 text-center">
            <div className="text-gray-500">
              <p className="mb-2">Health report not available.</p>
              <p className="text-sm">You don't have permission to view this health report.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto">
      <div className="p-4 bg-white border-b sticky top-0 z-10">
        <div className="relative">
          <BackButton />
          <h1 className="text-lg font-medium text-center">Patient Health Report</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Overall Score */}
        <div className="bg-white rounded-3xl shadow-card p-8">
          <div className="flex flex-col items-center">
            <div className="text-6xl font-bold text-primary-500 mb-4">
              {report.overallScore}
            </div>
            <div className="text-center">
              <h2 className="text-xl text-gray-800">Overall Health Score</h2>
              <p className="text-sm text-gray-500 mt-2">
                Last updated: {new Date(report.date).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Health Metrics */}
        <div className="bg-white rounded-2xl shadow-card p-6">
          <h2 className="text-lg font-semibold mb-4">Health Metrics</h2>
          <div className="space-y-4">
            {report.metrics.map((metric, index) => (
              <div
                key={index}
                className="p-4 bg-gray-50 rounded-xl"
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{getMetricIcon(metric.name)}</span>
                    <h3 className="font-medium">{metric.name}</h3>
                  </div>
                  <span className="text-xl font-bold text-primary-500">{metric.score}</span>
                </div>
                <p className="text-sm text-gray-600">{metric.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Assessment Details */}
        <div className="bg-white rounded-2xl shadow-card p-6">
          <h2 className="text-lg font-semibold mb-4">Assessment Details</h2>
          <div className="space-y-6">
            {healthQuestions.map((question, index) => {
              const answerScore = report.answers[index];
              const selectedAnswer = question.answers.find(a => a.value === answerScore);
              
              return (
                <div key={index} className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex justify-between items-start mb-3">
                    <p className="font-medium flex-1">{question.text}</p>
                    <span className="ml-4 px-2 py-1 bg-primary-50 text-primary-600 rounded-lg text-sm">
                      Score: {answerScore}/8
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Answer: </span>
                    {selectedAnswer?.text || 'Not answered'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function getMetricIcon(name: string): string {
  const icons: Record<string, string> = {
    'Physical Activity': '🏃',
    'Diet & Nutrition': '🥗',
    'Sleep Quality': '😴',
    'Mental Health': '🧠',
    'Substance Use': '🚭',
    'Hydration': '💧',
    'Preventive Care': '🏥',
    'Weight Management': '⚖️',
    'Lifestyle Balance': '⚡',
    'Health Conditions': '❤️'
  };
  return icons[name] || '📊';
}