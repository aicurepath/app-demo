interface MetricCardProps {
  name: string;
  score: number;
  description: string;
  icon: string;
}

export default function MetricCard({ name, score, description, icon }: MetricCardProps) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-soft hover:shadow-card transition-shadow">
      <div className="flex items-start space-x-4">
        <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center text-primary-500">
          {icon}
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-center mb-1">
            <h3 className="font-semibold text-gray-800">{name}</h3>
            <span className="text-lg font-bold text-primary-500">{score}</span>
          </div>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
      <div className="mt-3 w-full bg-gray-100 rounded-full h-1.5">
        <div 
          className="bg-primary-500 h-1.5 rounded-full transition-all duration-500"
          style={{ width: `${score * 10}%` }}
        />
      </div>
    </div>
  );
}