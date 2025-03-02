interface ScoreCircleProps {
  score: number;
}

export default function ScoreCircle({ score }: ScoreCircleProps) {
  const circumference = 2 * Math.PI * 100; // Increased radius from 45 to 60
  const offset = circumference - (score / 100) * circumference;
  
  return (
    <div className="relative w-64 h-64"> {/* Increased from w-48 h-48 */}
      <svg className="w-full h-full transform -rotate-90">
        {/* Background circle */}
        <circle
          cx="128"  
          cy="128"
          r="100"   
          stroke="#E5E7EB"
          strokeWidth="12" 
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx="128"  
          cy="128"
          r="100"    
          stroke="url(#gradient)"
          strokeWidth="12"
          fill="none"
          strokeLinecap="round"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: offset,
            transition: 'stroke-dashoffset 1s ease-in-out',
          }}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00af91" />
            <stop offset="100%" stopColor="#33bfa7" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-6xl font-bold text-gray-800">{score}</span>
      </div>
    </div>
  );
}