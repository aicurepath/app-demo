import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/shared/BackButton';

interface InsightArticle {
  id: string;
  title: string;
  date: string;
  author: string;
  likes: number;
  preview: string;
}

const SAMPLE_ARTICLES: InsightArticle[] = [
  {
    id: '1',
    title: 'Understanding the Five Elements in TCM',
    date: '2024-02-20',
    author: 'Dr. Li Wei',
    likes: 156,
    preview: 'The five elements theory is fundamental to Traditional Chinese Medicine...'
  },
  {
    id: '2',
    title: 'Seasonal Wellness: Spring Health Tips',
    date: '2024-02-18',
    author: 'Dr. Chen Yu',
    likes: 142,
    preview: 'As we transition into spring, our bodies need to adapt...'
  },
  {
    id: '3',
    title: 'The Role of Acupuncture in Stress Management',
    date: '2024-02-15',
    author: 'Dr. Zhang Wei',
    likes: 198,
    preview: 'Modern research validates traditional acupuncture practices...'
  },
  {
    id: '4',
    title: 'Herbal Remedies for Common Cold',
    date: '2024-02-12',
    author: 'Dr. Liu Mei',
    likes: 167,
    preview: 'Traditional Chinese herbs can effectively support immune function...'
  },
  {
    id: '5',
    title: 'Balance in Diet: TCM Perspective',
    date: '2024-02-10',
    author: 'Dr. Wang Jun',
    likes: 184,
    preview: 'Learn how to maintain dietary balance according to TCM principles...'
  }
];

export default function HealthInsightsPage() {
  const navigate = useNavigate();
  const [articles] = useState<InsightArticle[]>(SAMPLE_ARTICLES);

  return (
    <div className="max-w-lg mx-auto">
      <div className="p-4 bg-white border-b sticky top-0 z-10">
        <BackButton />
        <h1 className="text-sm text-center">Health Insights</h1>
      </div>

      <div className="p-4 space-y-4">
        {articles.map(article => (
          <button
            key={article.id}
            onClick={() => navigate(`/insights/${article.id}`)}
            className="w-full bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow text-left"
          >
            <h2 className="font-semibold text-lg mb-2">{article.title}</h2>
            <p className="text-gray-600 text-sm mb-3">{article.preview}</p>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <span>{article.author}</span>
                <span>•</span>
                <span>{new Date(article.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-1">
                <span>❤️</span>
                <span>{article.likes}</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}