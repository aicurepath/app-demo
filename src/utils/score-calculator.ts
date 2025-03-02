import { HealthMetric } from '../types/health-score';

const QUESTION_GROUPS = {
  physicalActivity: [0, 7, 17, 19], // Questions about exercise, fatigue, and energy
  diet: [1, 6, 8], // Questions about diet, water, and food habits
  sleep: [2, 7], // Questions about sleep and fatigue
  mentalHealth: [3, 13, 14, 15], // Questions about stress, mental health, and social life
  substanceUse: [4, 5], // Questions about smoking and alcohol
  hydration: [6], // Question about water intake
  preventiveCare: [9, 10], // Questions about medications and check-ups
  weightManagement: [11], // BMI question
  lifestyle: [14, 15, 16, 18], // Questions about social life, hobbies, and pain
  chronicConditions: [12, 17] // Questions about chronic conditions and pain
};

function calculateGroupScore(answers: number[], questionIndices: number[]): number {
  const relevantAnswers = questionIndices.map(index => answers[index] || 0);
  const maxScore = questionIndices.length * 8;
  const score = relevantAnswers.reduce((sum, score) => sum + score, 0);
  return Math.round((score / maxScore) * 10);
}

export function calculateMetricScores(answers: number[]): HealthMetric[] {
  return [
    {
      name: "Physical Activity",
      score: calculateGroupScore(answers, QUESTION_GROUPS.physicalActivity),
      description: "Exercise frequency and energy levels"
    },
    {
      name: "Diet & Nutrition",
      score: calculateGroupScore(answers, QUESTION_GROUPS.diet),
      description: "Eating habits and nutrition"
    },
    {
      name: "Sleep Quality",
      score: calculateGroupScore(answers, QUESTION_GROUPS.sleep),
      description: "Sleep duration and quality"
    },
    {
      name: "Mental Health",
      score: calculateGroupScore(answers, QUESTION_GROUPS.mentalHealth),
      description: "Stress, anxiety, and emotional well-being"
    },
    {
      name: "Substance Use",
      score: calculateGroupScore(answers, QUESTION_GROUPS.substanceUse),
      description: "Smoking and alcohol consumption"
    },
    {
      name: "Hydration",
      score: calculateGroupScore(answers, QUESTION_GROUPS.hydration),
      description: "Daily water intake"
    },
    {
      name: "Preventive Care",
      score: calculateGroupScore(answers, QUESTION_GROUPS.preventiveCare),
      description: "Regular check-ups and medication management"
    },
    {
      name: "Weight Management",
      score: calculateGroupScore(answers, QUESTION_GROUPS.weightManagement),
      description: "BMI and weight status"
    },
    {
      name: "Lifestyle Balance",
      score: calculateGroupScore(answers, QUESTION_GROUPS.lifestyle),
      description: "Work-life balance and daily activities"
    },
    {
      name: "Health Conditions",
      score: calculateGroupScore(answers, QUESTION_GROUPS.chronicConditions),
      description: "Management of chronic conditions"
    }
  ];
}

export function calculateOverallScore(answers: number[]): number {
  const totalScore = answers.reduce((sum, score) => sum + (score || 0), 0);
  const maxPossibleScore = 160; // 20 questions * 8 points max
  return Math.round((totalScore / maxPossibleScore) * 100);
}