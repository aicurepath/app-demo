import { Question } from '../types/health-score';

export const healthQuestions: Question[] = [
  {
    id: 1,
    text: "How often do you exercise each week?",
    answers: [
      { text: "Rarely or never", value: 0 },
      { text: "1-2 times", value: 2 },
      { text: "3-4 times", value: 5 },
      { text: "5 or more times", value: 8 }
    ]
  },
  {
    id: 2,
    text: "How balanced is your diet (fruits, vegetables, proteins, etc.)?",
    answers: [
      { text: "Very poor", value: 0 },
      { text: "Somewhat unbalanced", value: 2 },
      { text: "Mostly balanced", value: 5 },
      { text: "Very balanced", value: 8 }
    ]
  },
  {
    id: 3,
    text: "How many hours do you sleep per night on average?",
    answers: [
      { text: "Less than 5 hours", value: 0 },
      { text: "5-6 hours", value: 3 },
      { text: "6-8 hours", value: 6 },
      { text: "More than 8 hours", value: 8 }
    ]
  },
  {
    id: 4,
    text: "How often do you experience stress or anxiety?",
    answers: [
      { text: "Daily", value: 0 },
      { text: "3-4 times a week", value: 2 },
      { text: "1-2 times a week", value: 5 },
      { text: "Rarely", value: 8 }
    ]
  },
  {
    id: 5,
    text: "Do you smoke?",
    answers: [
      { text: "Yes, regularly", value: 0 },
      { text: "Occasionally", value: 2 },
      { text: "Rarely", value: 5 },
      { text: "Never", value: 8 }
    ]
  },
  {
    id: 6,
    text: "How often do you consume alcohol?",
    answers: [
      { text: "Daily", value: 0 },
      { text: "Weekly", value: 3 },
      { text: "Monthly", value: 6 },
      { text: "Rarely or never", value: 8 }
    ]
  },
  {
    id: 7,
    text: "How much water do you drink daily?",
    answers: [
      { text: "Less than 2 cups", value: 0 },
      { text: "2-4 cups", value: 3 },
      { text: "4-8 cups", value: 6 },
      { text: "More than 8 cups", value: 8 }
    ]
  },
  {
    id: 8,
    text: "How often do you feel physically tired or fatigued?",
    answers: [
      { text: "Daily", value: 0 },
      { text: "A few times a week", value: 3 },
      { text: "Occasionally", value: 5 },
      { text: "Rarely or never", value: 8 }
    ]
  },
  {
    id: 9,
    text: "How often do you eat fast food or processed meals?",
    answers: [
      { text: "Daily", value: 0 },
      { text: "A few times a week", value: 2 },
      { text: "Occasionally", value: 5 },
      { text: "Rarely or never", value: 8 }
    ]
  },
  {
    id: 10,
    text: "Do you regularly take any medications or supplements?",
    answers: [
      { text: "None at all", value: 0 },
      { text: "Occasionally, self-prescribed", value: 3 },
      { text: "As prescribed", value: 5 },
      { text: "Consistently, as recommended", value: 8 }
    ]
  },
  {
    id: 11,
    text: "How often do you get a health check-up?",
    answers: [
      { text: "Rarely or never", value: 0 },
      { text: "Once every few years", value: 2 },
      { text: "Annually", value: 6 },
      { text: "Every 6 months", value: 8 }
    ]
  },
  {
    id: 12,
    text: "What is your BMI category?",
    answers: [
      { text: "Underweight/Overweight", value: 0 },
      { text: "Borderline", value: 3 },
      { text: "Healthy", value: 6 },
      { text: "Optimal", value: 8 }
    ]
  },
  {
    id: 13,
    text: "Do you have chronic health conditions?",
    answers: [
      { text: "Multiple unmanaged", value: 0 },
      { text: "One, unmanaged", value: 2 },
      { text: "One, managed", value: 5 },
      { text: "None", value: 8 }
    ]
  },
  {
    id: 14,
    text: "How would you rate your mental health?",
    answers: [
      { text: "Poor", value: 0 },
      { text: "Average", value: 3 },
      { text: "Good", value: 6 },
      { text: "Excellent", value: 8 }
    ]
  },
  {
    id: 15,
    text: "How often do you socialize with friends or family?",
    answers: [
      { text: "Rarely or never", value: 0 },
      { text: "Occasionally", value: 3 },
      { text: "Regularly", value: 6 },
      { text: "Very frequently", value: 8 }
    ]
  },
  {
    id: 16,
    text: "How often do you engage in activities for mental stimulation (e.g., reading, puzzles)?",
    answers: [
      { text: "Rarely or never", value: 0 },
      { text: "Occasionally", value: 3 },
      { text: "Frequently", value: 6 },
      { text: "Daily", value: 8 }
    ]
  },
  {
    id: 17,
    text: "How would you rate your work-life balance?",
    answers: [
      { text: "Poor", value: 0 },
      { text: "Below average", value: 3 },
      { text: "Good", value: 6 },
      { text: "Excellent", value: 8 }
    ]
  },
  {
    id: 18,
    text: "Do you experience chronic pain?",
    answers: [
      { text: "Always", value: 0 },
      { text: "Often", value: 3 },
      { text: "Occasionally", value: 6 },
      { text: "Rarely or never", value: 8 }
    ]
  },
  {
    id: 19,
    text: "Do you have regular hobbies or activities you enjoy?",
    answers: [
      { text: "None", value: 0 },
      { text: "Occasionally", value: 3 },
      { text: "Frequently", value: 6 },
      { text: "Always", value: 8 }
    ]
  },
  {
    id: 20,
    text: "How would you describe your energy levels throughout the day?",
    answers: [
      { text: "Very low", value: 0 },
      { text: "Below average", value: 3 },
      { text: "Good", value: 6 },
      { text: "Excellent", value: 8 }
    ]
  }
];