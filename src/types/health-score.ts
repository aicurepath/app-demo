// Question and Answer types
export interface Answer {
  text: string;
  value: number;
}

export interface Question {
  id: number;
  text: string;
  answers: Answer[];
}

// Health Metrics
export interface HealthMetric {
  name: string;
  score: number;
  description: string;
}

export interface HealthScoreResult {
  overallScore: number;
  metrics: HealthMetric[];
  date: Date;
  answers: number[]; // Added to store user's answers
}