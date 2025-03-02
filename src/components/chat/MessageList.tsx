import { useEffect, useRef } from 'react';
import { Message } from '../../types/chat';
import MessageContent from './MessageContent';
import MessageActions from './MessageActions';

interface MessageListProps {
  messages: Message[];
  isConsultation?: boolean;
}

export default function MessageList({ messages, isConsultation = false }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col space-y-4 p-4">
      {messages.map((message) => (
        <div key={message.id}>
          <div
            className={`flex ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`rounded-2xl p-4 max-w-[80%] shadow-soft ${
                message.role === 'user'
                  ? 'bg-primary-500 text-white'
                  : isConsultation
                  ? 'bg-white border border-primary-100'
                  : 'bg-white'
              }`}
            >
              {isConsultation && message.role === 'assistant' && (
                <div className="text-sm text-gray-500 mb-1">
                  {new Date(message.timestamp).toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </div>
              )}
              <MessageContent message={message} />
            </div>
          </div>
          {!isConsultation && message.role === 'assistant' && (
            <div className="mt-2 ml-2">
              <MessageActions content={message.content} />
            </div>
          )}
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
}