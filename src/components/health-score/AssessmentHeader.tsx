import ProgressBar from './ProgressBar';

interface AssessmentHeaderProps {
  currentQuestion: number;
  totalQuestions: number;
}

export default function AssessmentHeader({ currentQuestion, totalQuestions }: AssessmentHeaderProps) {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Health Assessment</h2>
        <span className="text-sm text-gray-600">
          Question {currentQuestion + 1} of {totalQuestions}
        </span>
      </div>
      <ProgressBar current={currentQuestion + 1} total={totalQuestions} />
    </div>
  );
}