import { PlusIcon } from '@heroicons/react/24/outline';
import PlanItem from './PlanItem';
import { PlanItemType } from '../../types';

interface PlanSectionProps {
  title: string;
  items: PlanItemType[];
  emoji: string;
  onAddItem: () => void;
  onRemoveItem: (index: number) => void;
}

export default function PlanSection({ 
  title, 
  items = [], // Provide default empty array
  emoji, 
  onAddItem, 
  onRemoveItem 
}: PlanSectionProps) {
  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <button
          onClick={onAddItem}
          className="flex items-center space-x-1 text-blue-500 hover:text-blue-600"
        >
          <PlusIcon className="w-5 h-5 text-primary-500" />
        </button>
      </div>
      <div className="space-y-3">
        {items?.map((item, index) => (
          <PlanItem
            key={`${title}-${index}`}
            title={item.title}
            details={item.details}
            emoji={emoji}
            onRemove={() => onRemoveItem(index)}
          />
        ))}
        {(!items || items.length === 0) && (
          <div className="text-gray-500 text-center py-4">
            No items added yet
          </div>
        )}
      </div>
    </section>
  );
}