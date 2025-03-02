import { useState, useCallback, useEffect } from 'react';
import { Message, ChatState } from '../types/chat';
import { getAllResponses } from '../utils/mockResponses';
import { generateUniqueId } from '../utils/helpers';

const CHAT_STORAGE_KEY = 'tcm_chat_messages';

export function useChat() {
  const [state, setState] = useState<ChatState>(() => {
    const saved = localStorage.getItem(CHAT_STORAGE_KEY);
    return saved ? JSON.parse(saved) : {
      messages: [],
      isLoading: false,
      error: null,
    };
  });

  useEffect(() => {
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const setInitialMessages = useCallback((messages: Message[]) => {
    setState(prev => ({
      ...prev,
      messages,
    }));
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    const userMessage: Message = {
      id: generateUniqueId(),
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true,
      error: null,
    }));

    try {
      const responses = getAllResponses(content);
      
      const assistantMessages = responses.map(response => ({
        id: generateUniqueId(),
        role: 'assistant' as const,
        content: response,
        timestamp: new Date(),
      }));

      setState(prev => ({
        ...prev,
        messages: [...prev.messages, ...assistantMessages],
        isLoading: false,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to send message',
      }));
    }
  }, []);

  return {
    messages: state.messages,
    isLoading: state.isLoading,
    error: state.error,
    sendMessage,
    setInitialMessages,
  };
}