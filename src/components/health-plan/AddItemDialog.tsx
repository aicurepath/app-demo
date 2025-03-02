import { useState } from 'react';
import { PlanItemType } from '../../types';

interface AddItemDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (item: PlanItemType) => void;
  title: string;
  emoji: string;
}

export default function AddItemDialog({ 
  isOpen, 
  onClose, 
  onAdd, 
  title,
  emoji 
}: AddItemDialogProps) {
  const [newItem, setNewItem] = useState<PlanItemType>({ 
    title: '', 
    details: '' 
  });

  const handleSubmit = () => {
    if (newItem.title && newItem.details) {
      onAdd(newItem);
      setNewItem({ title: '', details: '' });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-2xl">{emoji}</span>
          <h3 className="text-lg font-semibold">Add New {title}</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={newItem.title}
              onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
              className="w-full border rounded-lg p-2"
              placeholder={`Enter ${title.toLowerCase()} name`}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Details
            </label>
            <textarea
              value={newItem.details}
              onChange={(e) => setNewItem({ ...newItem, details: e.target.value })}
              className="w-full border rounded-lg p-2 h-32"
              placeholder="Enter description, instructions, or other relevant details..."
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!newItem.title || !newItem.details}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}