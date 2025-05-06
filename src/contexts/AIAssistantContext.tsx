import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { geminiService } from '../services/geminiService';
import { toast } from 'sonner';
import { useAuth } from './AuthContext';

interface AIAssistantContextType {
  promptHistory: Array<{ role: 'user' | 'assistant', content: string }>;
  sendPrompt: (prompt: string) => Promise<void>;
  isLoading: boolean;
  clearHistory: () => void;
  remainingPrompts: number;
}

const AIAssistantContext = createContext<AIAssistantContextType | undefined>(undefined);

interface AIAssistantProviderProps {
  userId: string;
  problemId: string;
  children: React.ReactNode;
}

const MAX_PROMPTS = 5;

// API base URL
const API_URL = 'http://localhost:5000/api';

export const AIAssistantProvider: React.FC<AIAssistantProviderProps> = ({
  userId,
  problemId,
  children
}) => {
  const [promptHistory, setPromptHistory] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [promptCount, setPromptCount] = useState(0);
  const { user } = useAuth();
  
  useEffect(() => {
    if (userId && problemId && user?.token) {
      loadPromptCount(userId, problemId);
    }
  }, [userId, problemId, user?.token]);

  const loadPromptCount = async (userId: string, problemId: string) => {
    try {
      if (!user?.token) {
        console.error('No authentication token available');
        toast.error('Authentication required. Please log in again.');
        return;
      }
      
      const { data } = await axios.get(
        `${API_URL}/users/${userId}`,
        {
          headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      // Handle the prompts_used data structure
      const promptsUsed = data.prompts_used || {};
      const count = promptsUsed[problemId] || 0;
      setPromptCount(count);
      
      // Initialize chat history
      setPromptHistory([
        { 
          role: 'assistant' as const, 
          content: `Hi! I'm your coding assistant.` 
        }
      ]);
    } catch (error: any) {
      console.error('Error loading prompt count:', error);
      if (error.response?.status === 401) {
        toast.error('Session expired. Please log in again.');
      } else {
        toast.error('Failed to load prompt count. Please try again.');
      }
      setPromptHistory([
        { 
          role: 'assistant' as const, 
          content: `Hi! I'm your coding assistant.` 
        }
      ]);
      setPromptCount(0);
    }
  };

  const sendPrompt = async (prompt: string): Promise<void> => {
    if (!user?.token) {
      toast.error('Authentication required. Please log in again.');
      return;
    }

    if (promptCount >= MAX_PROMPTS) {
      toast.error('You have reached the maximum number of questions allowed (5).');
      return;
    }

    setIsLoading(true);
    try {
      const newPromptHistory = [
        ...promptHistory,
        { role: 'user' as const, content: prompt }
      ];
      setPromptHistory(newPromptHistory);

      // Increment prompt count
      await axios.put(
        `${API_URL}/submissions/${problemId}/prompt`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const response = await geminiService.sendMessage(prompt);

      const updatedHistory = [
        ...newPromptHistory,
        { role: 'assistant' as const, content: response }
      ];
      setPromptHistory(updatedHistory);
      setPromptCount(prev => prev + 1);

    } catch (error: any) {
      console.error('Error sending prompt:', error);
      if (error.response?.status === 401) {
        toast.error('Session expired. Please log in again.');
      } else {
        toast.error('Failed to send prompt. Please try again.');
      }
      setPromptHistory([
        ...promptHistory,
        { role: 'user' as const, content: prompt },
        { role: 'assistant' as const, content: 'Sorry, there was an error processing your request. Please try again.' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearHistory = () => {
    const newHistory = [
      { 
        role: 'assistant' as const, 
        content: `Hi! I'm your coding assistant.` 
      }
    ];
    setPromptHistory(newHistory);
    if (userId && problemId && user?.token) {
      loadPromptCount(userId, problemId);
    }
  };

  return (
    <AIAssistantContext.Provider
      value={{
        promptHistory,
        sendPrompt,
        isLoading,
        clearHistory,
        remainingPrompts: MAX_PROMPTS - promptCount
      }}
    >
      {children}
    </AIAssistantContext.Provider>
  );
};

export const useAIAssistant = () => {
  const context = useContext(AIAssistantContext);
  if (context === undefined) {
    throw new Error('useAIAssistant must be used within an AIAssistantProvider');
  }
  return context;
};
