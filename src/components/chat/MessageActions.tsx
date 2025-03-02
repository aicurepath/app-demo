import { useNavigate } from 'react-router-dom';
import { useHealthPlan } from '../../hooks/useHealthPlan';
import { showSuccess } from '../notifications/toast';

interface MessageActionsProps {
  content: string;
}

export default function MessageActions({ content }: MessageActionsProps) {
  const navigate = useNavigate();
  const { addRecipe } = useHealthPlan();

  if (content.startsWith('[Category]')) {
    return (
      <button
        onClick={() => navigate('/practitioners')}
        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-green-400 text-sm"
      >
        Find Practitioner
      </button>
    );
  }

  if (content.startsWith('[Recipe]')) {
    const recipeTitle = content.replace('[Recipe]', '').trim();
    return (
      <button
        onClick={() => {
          addRecipe({
            title: recipeTitle,
            details: 'Details will be provided by your practitioner'
          });
          showSuccess('Recipe added to your health plan!');
          navigate('/health-score?tab=plan');
        }}
        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-green-400 text-sm"
      >
        Add to Your Plan
      </button>
    );
  }

  return null;
}