import { useState, useCallback, useEffect, useRef } from 'react';
import { Message, ChatState } from '../types/chat';
import { generateUniqueId } from '../utils/helpers';
import { mockConsultations } from '../data/mockAccounts';
import { useAuth } from './useAuth';

export function useConsultationChat() {
  const { user } = useAuth();
  const pollIntervalRef = useRef<NodeJS.Timeout>();
  const [state, setState] = useState<ChatState>({
    messages: [],
    isLoading: false,
    error: null,
  });

  const setInitialMessages = useCallback((messages: Message[]) => {
    if (!Array.isArray(messages)) return;
    
    setState(prev => ({
      ...prev,
      messages,
      error: null
    }));
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || !user) return;

    const newMessage: Message = {
      id: generateUniqueId(),
      role: user.role === 'practitioner' ? 'assistant' : 'user',
      content,
      timestamp: new Date(),
    };

    try {
      setState(prev => ({
        ...prev,
        messages: [...prev.messages, newMessage],
        isLoading: true,
        error: null,
      }));

      // Simulate network delay with timeout protection
      await Promise.race([
        new Promise(resolve => setTimeout(resolve, 500)),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Message delivery timeout')), 10000)
        )
      ]);
      
      const consultationId = window.location.pathname.split('/').pop();
      if (consultationId && mockConsultations[consultationId]) {
        mockConsultations[consultationId].messages = [
          ...mockConsultations[consultationId].messages,
          newMessage
        ];
      }
      
      setState(prev => ({
        ...prev,
        isLoading: false,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to send message',
      }));
    }
  }, [user]);

  // Set up polling with cleanup and error handling
  useEffect(() => {
    const consultationId = window.location.pathname.split('/').pop();
    if (!consultationId) return;

    const pollMessages = () => {
      try {
        const consultation = mockConsultations[consultationId];
        if (consultation && consultation.messages.length !== state.messages.length) {
          setInitialMessages(consultation.messages);
        }
      } catch (error) {
        console.error('Error polling messages:', error);
      }
    };

    // Initial load
    pollMessages();

    // Set up polling
    pollIntervalRef.current = setInterval(pollMessages, 2000);

    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
      }
    };
  }, [state.messages.length, setInitialMessages]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
      }
    };
  }, []);

  return {
    messages: state.messages,
    isLoading: state.isLoading,
    error: state.error,
    sendMessage,
    setInitialMessages,
  };
}