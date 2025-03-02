import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { healthQuestions } from '../data/health-questions';
import QuestionCard from '../components/health-score/QuestionCard';
import AssessmentHeader from '../components/health-score/AssessmentHeader';
import { calculateMetricScores, calculateOverallScore } from '../utils/score-calculator';

export default function HealthAssessmentPage() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);

    if (currentQuestion < healthQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate results
      const metrics = calculateMetricScores(newAnswers);
      const overallScore = calculateOverallScore(newAnswers);
      
      // Store results in localStorage
      const result = {
        overallScore,
        metrics,
        date: new Date(),
        answers: newAnswers
      };
      localStorage.setItem('healthScoreResult', JSON.stringify(result));
      
      // Navigate back to score page
      navigate('/health-score');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <AssessmentHeader 
        currentQuestion={currentQuestion} 
        totalQuestions={healthQuestions.length} 
      />

      <QuestionCard
        question={healthQuestions[currentQuestion]}
        selectedAnswer={answers[currentQuestion] || null}
        onAnswerSelect={handleAnswer}
      />
    </div>
  );
}