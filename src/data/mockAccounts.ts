import { User } from '../types/auth';
import { Message } from '../types/chat';
import { HealthScoreResult } from '../types/health-score';

// Mock user accounts
export const mockUsers: Record<string, User> = {
  'patient@example.com': {
    id: 'user1',
    email: 'patient@example.com',
    name: 'John Smith',
    role: 'user',
    // Password: Patient123
  },
  'drli@tcm.com': {
    id: 'pract1',
    email: 'drli@tcm.com',
    name: 'Dr. Li Wei',
    role: 'practitioner',
    licenseNumber: 'TCM1001',
    consultPrice: 50,
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&auto=format&fit=crop&q=80',
    // Password: DrLi123
  },
  'drchen@tcm.com': {
    id: 'pract2',
    email: 'drchen@tcm.com',
    name: 'Dr. Chen Yu',
    role: 'practitioner',
    licenseNumber: 'TCM1002',
    consultPrice: 45,
    avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&auto=format&fit=crop&q=80',
    // Password: DrChen123
  },
  'drzhang@tcm.com': {
    id: 'pract3',
    email: 'drzhang@tcm.com',
    name: 'Dr. Zhang Wei',
    role: 'practitioner',
    licenseNumber: 'TCM1003',
    consultPrice: 55,
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&auto=format&fit=crop&q=80',
    // Password: DrZhang123
  }
};

// Mock consultations
export const mockConsultations: Record<string, {
  id: string;
  patientId: string;
  practitionerId: string;
  messages: Message[];
  sharedHealthReport: boolean;
  startDate: Date;
}> = {
  'consult1': {
    id: 'consult1',
    patientId: 'user1',
    practitionerId: 'pract1',
    messages: [
      {
        id: '1',
        role: 'assistant',
        content: 'Hello! How has your response been to the acupuncture treatment?',
        timestamp: new Date('2024-02-20T10:00:00')
      },
      {
        id: '2',
        role: 'user',
        content: 'The pain has reduced significantly, but I still feel some stiffness in the morning.',
        timestamp: new Date('2024-02-20T10:01:00')
      }
    ],
    sharedHealthReport: true,
    startDate: new Date('2024-02-20T10:00:00')
  },
  'consult2': {
    id: 'consult2',
    patientId: 'user2',
    practitionerId: 'pract2',
    messages: [
      {
        id: '3',
        role: 'assistant',
        content: 'Welcome! What brings you to the consultation today?',
        timestamp: new Date('2024-02-21T14:00:00')
      },
      {
        id: '4',
        role: 'user',
        content: "I have been experiencing frequent headaches and would like to explore TCM treatments.",
        timestamp: new Date('2024-02-21T14:01:00')
      }
    ],
    sharedHealthReport: false,
    startDate: new Date('2024-02-21T14:00:00')
  }
};

// Mock health report
export const mockHealthReport: HealthScoreResult = {
  overallScore: 75,
  metrics: [
    {
      name: "Physical Activity",
      score: 7,
      description: "Exercise frequency and energy levels"
    },
    {
      name: "Diet & Nutrition",
      score: 8,
      description: "Eating habits and nutrition"
    },
    {
      name: "Sleep Quality",
      score: 6,
      description: "Sleep duration and quality"
    },
    {
      name: "Mental Health",
      score: 7,
      description: "Stress, anxiety, and emotional well-being"
    },
    {
      name: "Substance Use",
      score: 9,
      description: "Smoking and alcohol consumption"
    },
    {
      name: "Hydration",
      score: 8,
      description: "Daily water intake"
    },
    {
      name: "Preventive Care",
      score: 6,
      description: "Regular check-ups and medication management"
    },
    {
      name: "Weight Management",
      score: 7,
      description: "BMI and weight status"
    },
    {
      name: "Lifestyle Balance",
      score: 8,
      description: "Work-life balance and daily activities"
    },
    {
      name: "Health Conditions",
      score: 7,
      description: "Management of chronic conditions"
    }
  ],
  date: new Date('2024-02-15'),
  answers: [5, 6, 4, 7, 8, 6, 7, 5, 6, 7, 8, 6, 7, 5, 6, 7, 8, 6, 7, 5]
};