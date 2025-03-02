import { useState, FormEvent } from 'react';
import { useAuth } from '../../hooks/useAuth';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  isConsultation?: boolean;
}

export default function MessageInput({ onSendMessage, isLoading, isConsultation = false }: MessageInputProps) {
  const [message, setMessage] = useState('');
  const { user } = useAuth();
  const isPractitioner = user?.role === 'practitioner';

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <div className="flex space-x-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={isConsultation 
            ? (isPractitioner 
              ? "Type your message to the patient..." 
              : "Type your message to the practitioner...")
            : "Type your message..."}
          className="flex-1 rounded-xl px-4 py-3 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !message.trim()}
          className={`px-6 py-3 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${
            isConsultation 
              ? 'bg-primary-500 hover:bg-primary-600 text-white'
              : 'bg-primary-500 hover:bg-primary-600 text-white'
          }`}
        >
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </div>
      {isConsultation && isLoading && !isPractitioner && (
        <div className="text-center text-sm text-gray-500 mt-2">
          Waiting for practitioner's response...
        </div>
      )}
    </form>
  );
}