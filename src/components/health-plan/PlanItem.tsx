import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface PlanItemProps {
  title: string;
  details: string;
  emoji: string;
  onRemove: () => void;
}

export default function PlanItem({ title, details, emoji, onRemove }: PlanItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-gray-50 rounded-xl overflow-hidden">
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center flex-1">
          <span className="text-xl mr-3">{emoji}</span>
          <span className="flex-1">{title}</span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 hover:bg-gray-200 rounded-full"
          >
            {isExpanded ? (
              <ChevronUpIcon className="w-5 h-5" />
            ) : (
              <ChevronDownIcon className="w-5 h-5" />
            )}
          </button>
          <button
            onClick={onRemove}
            className="p-1 hover:bg-red-100 text-red-500 rounded-full"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
      {isExpanded && (
        <div className="px-4 pb-4 pt-2 border-t border-gray-200">
          <p className="text-gray-600 whitespace-pre-wrap">{details}</p>
        </div>
      )}
    </div>
  );
}