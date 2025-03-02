import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface AskAIDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AskAIDialog({ isOpen, onClose }: AskAIDialogProps) {
  const navigate = useNavigate();
  const [symptoms, setSymptoms] = useState('');

  const handleSubmit = () => {
    if (symptoms.trim()) {
      localStorage.setItem('initial_symptoms', symptoms.trim());
    }
    onClose();
    navigate('/chat');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">Consult AI Assistant</h3>
        <p className="text-gray-600 mb-4">Would you like to describe any specific symptoms or concerns?</p>
        
        <textarea
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          placeholder="Enter your symptoms or concerns (optional)"
          className="w-full border rounded-lg p-3 mb-4 h-32"
        />
        
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Start Consultation
          </button>
        </div>
      </div>
    </div>
  );
}