import { Question } from '../../types/health-score';

interface QuestionCardProps {
  question: Question;
  selectedAnswer: number | null;
  onAnswerSelect: (value: number) => void;
}

export default function QuestionCard({ 
  question, 
  selectedAnswer, 
  onAnswerSelect 
}: QuestionCardProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h3 className="text-lg font-semibold mb-4">{question.text}</h3>
      <div className="space-y-3">
        {question.answers.map((answer, index) => (
          <button
            key={index}
            onClick={() => onAnswerSelect(answer.value)}
            className={`w-full text-left p-3 rounded-lg border ${
              selectedAnswer === answer.value
                ? 'bg-primary-50 border-primary-500'
                : 'border-gray-200 hover:bg-gray-50'
            }`}
          >
            {answer.text}
          </button>
        ))}
      </div>
    </div>
  );
}