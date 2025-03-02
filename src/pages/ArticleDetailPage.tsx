import { useParams } from 'react-router-dom';
import BackButton from '../components/shared/BackButton';

const ARTICLES = {
  '1': {
    title: 'Understanding the Five Elements in TCM',
    content: `The Five Elements theory (Wu Xing) is one of the fundamental concepts of Traditional Chinese Medicine (TCM). These elements—Wood, Fire, Earth, Metal, and Water—are believed to be the basic elements of the material world.

Each element corresponds to specific organs, emotions, tastes, and seasons:

1. Wood (Spring)
- Organs: Liver and Gallbladder
- Emotion: Anger
- Taste: Sour

2. Fire (Summer)
- Organs: Heart and Small Intestine
- Emotion: Joy
- Taste: Bitter

3. Earth (Late Summer)
- Organs: Spleen and Stomach
- Emotion: Worry
- Taste: Sweet

4. Metal (Autumn)
- Organs: Lungs and Large Intestine
- Emotion: Grief
- Taste: Spicy

5. Water (Winter)
- Organs: Kidneys and Bladder
- Emotion: Fear
- Taste: Salty

Understanding these relationships helps practitioners diagnose and treat various conditions by maintaining balance among these elements.`,
    author: 'Dr. Li Wei',
    date: '2024-02-20',
    likes: 156
  },
  '2': {
    title: 'Seasonal Wellness: Spring Health Tips',
    content: `As we transition into spring, our bodies need to adapt to the changing environment. According to TCM, spring is associated with the Wood element and the liver organ system.

Key Spring Health Tips:

1. Diet Adjustments
- Eat more green, leafy vegetables
- Include sour flavors to support liver function
- Avoid heavy, greasy foods

2. Lifestyle Changes
- Wake up earlier as days get longer
- Gentle stretching exercises
- Outdoor activities to connect with nature

3. Emotional Balance
- Practice stress management
- Express emotions healthily
- Maintain regular exercise routine

4. Common Spring Issues
- Allergies
- Mood swings
- Digestive changes

Following these guidelines helps maintain balance during seasonal transitions.`,
    author: 'Dr. Chen Yu',
    date: '2024-02-18',
    likes: 142
  },
  // Add content for articles 3-5...
};

export default function ArticleDetailPage() {
  const { id } = useParams();
  const article = ARTICLES[id as keyof typeof ARTICLES];

  if (!article) {
    return (
      <div className="max-w-lg mx-auto">
        <div className="p-4 bg-white border-b sticky top-0 z-10">
          <div className="mt-4 mb-4">
            <BackButton />
          </div>
        </div>
        <div className="p-4">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div>Article not found</div>
          </div>
        </div>
      </div> 
    );
  }

  return (
    <div className="max-w-lg mx-auto">
      <div className="p-4 bg-white border-b sticky top-0 z-10">
        <div className="mt-4 mb-4">
          <BackButton />
        </div>
      </div>

      <div className="p-4">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h1 className="text-xl text-center">{article.title}</h1>
          <div className="flex justify-between items-center mt-4 mb-4">
            <div className="text-sm text-gray-500">
              <div>{article.author}</div>
              <div>{new Date(article.date).toLocaleDateString()}</div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="text-red-500">❤️</button>
              <span>{article.likes}</span>
            </div>
          </div>

          <div className="prose">
            {article.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}