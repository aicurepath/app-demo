import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, PhotoIcon, MicrophoneIcon, PlusIcon, ChartBarIcon, SparklesIcon } from '@heroicons/react/24/outline';
import MessageList from '../components/chat/MessageList';
import MessageInput from '../components/chat/MessageInput';
import { useConsultationChat } from '../hooks/useConsultationChat';
import { useAuth } from '../hooks/useAuth';
import { showError } from '../components/notifications/toast';
import { mockConsultations } from '../data/mockAccounts';

export default function ConsultationChatPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { messages, isLoading, sendMessage, setInitialMessages } = useConsultationChat();
  const [isRecording, setIsRecording] = useState(false);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [isMediaMenuOpen, setIsMediaMenuOpen] = useState(false);
  const isPractitioner = user?.role === 'practitioner';

  useEffect(() => {
    if (id && mockConsultations[id]) {
      setInitialMessages(mockConsultations[id].messages);
    }

    // Set up polling for new messages
    const pollInterval = setInterval(() => {
      if (id && mockConsultations[id]) {
        setInitialMessages(mockConsultations[id].messages);
      }
    }, 2000);

    return () => clearInterval(pollInterval);
  }, [id, setInitialMessages]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showError('Image size should be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        sendMessage(`[Image] ${imageUrl}`);
      };
      reader.readAsDataURL(file);
    }
    setIsMediaMenuOpen(false);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setMediaStream(stream);
      
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
      
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setAudioChunks((chunks) => [...chunks, event.data]);
        }
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const reader = new FileReader();
        reader.onload = (e) => {
          const audioUrl = e.target?.result as string;
          sendMessage(`[Audio] ${audioUrl}`);
        };
        reader.readAsDataURL(audioBlob);
        setAudioChunks([]);
      };

      recorder.start();
      setIsRecording(true);
    } catch (error) {
      showError('Could not access microphone');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
      mediaStream?.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
    setIsMediaMenuOpen(false);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="fixed top-0 left-0 right-0 bg-white border-b shadow-sm z-10">
        <div className="max-w-lg mx-auto flex items-center px-4 h-16">
          <div className="flex items-center">
            <button
              onClick={() => window.history.back()}
              className="p-2 hover:bg-gray-100 rounded-full mr-4"
            >
              <ArrowLeftIcon className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold">
              Chat with {isPractitioner ? 'Patient' : id === '1' ? 'Dr. Li Wei' : 'Dr. Chen Yu'}
            </h1>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-gray-50 pt-16">
        <div className="max-w-lg mx-auto relative">
          <MessageList messages={messages} isConsultation={true} />
        </div>
      </div>

      <div className="bg-white border-t">
        <div className="max-w-lg mx-auto w-full">
          {isPractitioner && (
            <div className="p-2 border-b grid grid-cols-2 gap-2">
              <button
                onClick={() => navigate(`/health-report/${id}`)}
                className="bg-primary-50 text-primary-500 py-2 px-4 rounded-xl hover:bg-primary-100 transition-colors flex items-center justify-center space-x-2"
              >
                <ChartBarIcon className="w-5 h-5" />
                <span className="font-medium">Health Report</span>
              </button>
              <button
                onClick={() => navigate('/chat')}
                className="bg-primary-50 text-primary-500 py-2 px-4 rounded-xl hover:bg-primary-100 transition-colors flex items-center justify-center space-x-2"
              >
                <SparklesIcon className="w-5 h-5" />
                <span className="font-medium">Ask AI</span>
              </button>
            </div>
          )}
          <div className="flex items-center p-4 space-x-2">
            <div className="relative">
              <button
                onClick={() => setIsMediaMenuOpen(!isMediaMenuOpen)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <PlusIcon className="w-6 h-6 text-gray-500" />
              </button>
              
              {isMediaMenuOpen && (
                <div className="absolute bottom-full left-0 mb-2 bg-white rounded-lg shadow-lg border p-2 min-w-[120px]">
                  <label className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                    <PhotoIcon className="w-5 h-5" />
                    <span>Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                  <button
                    className={`flex items-center space-x-2 w-full p-2 hover:bg-gray-100 rounded-lg ${
                      isRecording ? 'text-red-500' : ''
                    }`}
                    onMouseDown={startRecording}
                    onMouseUp={stopRecording}
                    onTouchStart={startRecording}
                    onTouchEnd={stopRecording}
                  >
                    <MicrophoneIcon className="w-5 h-5" />
                    <span>Voice</span>
                  </button>
                </div>
              )}
            </div>
            
            <MessageInput 
              onSendMessage={sendMessage} 
              isLoading={isLoading} 
              isConsultation={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}