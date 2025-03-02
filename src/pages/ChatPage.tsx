import { useChat } from '../hooks/useChat';
import ChatHeader from '../components/chat/ChatHeader';
import MessageList from '../components/chat/MessageList';
import MessageInput from '../components/chat/MessageInput';
import { Toaster } from 'react-hot-toast';

export default function ChatPage() {
  const { messages, isLoading, error, sendMessage } = useChat();

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <div className="bg-white shadow-soft">
        <div className="max-w-lg mx-auto">
          <div className="p-4 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center text-primary-500">
              <img src="/robot.svg" alt="AI Assistant" className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto bg-gray-50">
        {error && (
          <div className="max-w-lg mx-auto p-4">
            <div className="bg-red-50 text-red-500 text-center p-4 rounded-xl">
              {error}
            </div>
          </div>
        )}
        <div className="max-w-lg mx-auto">
          <MessageList messages={messages} />
        </div>
      </div>

      <div className="bg-white shadow-soft">
        <div className="max-w-lg mx-auto">
          <MessageInput onSendMessage={sendMessage} isLoading={isLoading} />
        </div>
      </div>
      <Toaster />
    </div>
  );
}