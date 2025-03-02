import { HealthMetric } from '../../types/health-score';
import MetricCard from './MetricCard';

interface MetricsListProps {
  metrics: HealthMetric[];
  onStartAssessment: () => void;
  onAskAI: () => void;
}

export default function MetricsList({ metrics, onStartAssessment, onAskAI }: MetricsListProps) {
  const getMetricIcon = (name: string) => {
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
  };

  return (
    <div>
      <div className="space-y-4 mb-8">
        {metrics.map((metric, index) => (
          <MetricCard 
            key={index} 
            {...metric} 
            icon={getMetricIcon(metric.name)}
          />
        ))}
      </div>

      <div className="space-y-3">
        <button
          onClick={onStartAssessment}
          className="w-full bg-primary-500 text-white py-3 px-4 rounded-xl hover:bg-primary-600 font-medium transition-colors"
        >
          Take Health Assessment
        </button>
        
        <button
          onClick={onAskAI}
          className="w-full bg-primary-50 text-primary-500 py-3 px-4 rounded-xl hover:bg-primary-100 font-medium transition-colors"
        >
          Ask AI Assistant
        </button>
      </div>
    </div>
  );
}