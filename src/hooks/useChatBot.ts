'use client';

import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { ChatMessageType } from '@/components/ui/ChatMessage';
import { getChatBotConfig } from '@/lib/chatbot-config';

interface ChatBotState {
  messages: ChatMessageType[];
  inputMessage: string;
  setInputMessage: (message: string) => void;
  isTyping: boolean;
  isLoading: boolean;
  sendMessage: (content: string) => Promise<void>;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  clearMessages: () => void;
}

/**
 * Custom hook for managing chatbot state and N8N webhook communication
 * Handles message sending, receiving, and conversation state
 */
export function useChatBot(): ChatBotState {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Memoize chatbot configuration to avoid recreating on each render
  const config = useMemo(() => getChatBotConfig(), []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  /**
   * Generate unique message ID - memoized function
   */
  const generateMessageId = useCallback((): string => {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  /**
   * Add a new message to the conversation - memoized function
   */
  const addMessage = useCallback((content: string, role: 'user' | 'assistant', status?: 'sending' | 'sent' | 'error'): ChatMessageType => {
    const newMessage: ChatMessageType = {
      id: generateMessageId(),
      content,
      role,
      timestamp: new Date(),
      status
    };
    
    setMessages(prev => [...prev, newMessage]);
    return newMessage;
  }, [generateMessageId]);

  /**
   * Update message status - memoized function
   */
  const updateMessageStatus = useCallback((messageId: string, status: 'sending' | 'sent' | 'error') => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId 
          ? { ...msg, status }
          : msg
      )
    );
  }, []);

  /**
   * Try single webhook with specific timeout - memoized function
   */
  const tryWebhook = useCallback(async (url: string, message: string, timeout: number): Promise<string> => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      // Build query parameters for GET request (N8N webhook configuration)
      const params = new URLSearchParams({
        message,
        timestamp: new Date().toISOString(),
        sessionId: `session_${Date.now()}`,
        source: 'landing-page-chatbot',
        userAgent: navigator.userAgent
      });

      const response = await fetch(`${url}?${params.toString()}`, {
        method: 'GET',
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Handle different response formats from N8N
      // Format 1: LezaiGroup outputParser format (NEW - for your webhook)
      if (data.outputParser) {
        return typeof data.outputParser === 'string' ? data.outputParser : String(data.outputParser);
      }
      // Format 2: Direct object with output property (N8N current format)
      else if (data.output) {
        return data.output;
      }
      // Format 3: Array with output property (N8N alternative format)
      else if (Array.isArray(data) && data.length > 0 && data[0].output) {
        return data[0].output;
      }
      // Format 4: Object with response property
      else if (data.response) {
        return data.response;
      }
      // Format 5: Object with message property
      else if (data.message) {
        return data.message;
      }
      // Format 6: Direct string
      else if (typeof data === 'string') {
        return data;
      }
      // Format 7: Nested data object
      else if (data.data && data.data.response) {
        return data.data.response;
      }
      // Fallback
      else {
        console.warn('Unexpected webhook response format:', data);
        return 'Gracias por tu mensaje. Te responderé pronto.';
      }

    } finally {
      clearTimeout(timeoutId);
    }
  }, []);

  /**
   * Send message to LezaiGroup webhook - memoized function
   * Uses only the main LezaiGroup webhook with retry logic
   */
  const sendToWebhook = useCallback(async (message: string, retryCount = 0): Promise<string> => {
    try {
      // Send to LezaiGroup webhook
      if (config.webhook.url) {
        console.log('🚀 Sending to LezaiGroup webhook:', config.webhook.url);
        const response = await tryWebhook(
          config.webhook.url, 
          message, 
          config.webhook.timeout
        );
        console.log('✅ LezaiGroup webhook successful');
        return response;
      }

      // No webhook configured
      throw new Error('No webhook URL configured');

    } catch (error) {
      console.error('LezaiGroup webhook failed:', error);
      
      // Retry logic
      if (retryCount < config.webhook.retries) {
        console.log(`🔄 Retrying LezaiGroup webhook... Attempt ${retryCount + 1}`);
        await new Promise(resolve => setTimeout(resolve, 1000 * (retryCount + 1))); // Exponential backoff
        return sendToWebhook(message, retryCount + 1);
      }

      // If all retries failed, return a fallback message
      if (error instanceof Error && error.name === 'AbortError') {
        return 'Lo siento, la respuesta está tardando más de lo esperado. Por favor, intenta de nuevo.';
      } else {
        return 'Disculpa, hay un problema temporal con la conexión. Por favor, intenta de nuevo en unos momentos.';
      }
    }
  }, [config.webhook, tryWebhook]);

  /**
   * Send a message and handle the conversation flow - memoized function
   */
  const sendMessage = useCallback(async (content: string): Promise<void> => {
    if (!content.trim() || isLoading) return;

    setIsLoading(true);

    // Add user message with "sending" status
    const userMessage = addMessage(content, 'user', 'sending');

    try {
      // Mark user message as sent
      updateMessageStatus(userMessage.id, 'sent');

      // Show typing indicator
      setIsTyping(true);

      // Send to N8N webhook
      const response = await sendToWebhook(content);

      // Hide typing indicator and add assistant response
      setIsTyping(false);
      addMessage(response, 'assistant', 'sent');

    } catch (error) {
      console.error('Error sending message:', error);
      
      // Hide typing indicator
      setIsTyping(false);
      
      // Mark user message as error
      updateMessageStatus(userMessage.id, 'error');
      
      // Add error message from assistant
      addMessage(
        'Disculpa, ha ocurrido un error. Por favor, intenta de nuevo.',
        'assistant',
        'sent'
      );
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, addMessage, updateMessageStatus, sendToWebhook]);

  /**
   * Clear all messages (for future use) - memoized function
   */
  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    inputMessage,
    setInputMessage,
    isTyping,
    isLoading,
    sendMessage,
    messagesEndRef,
    clearMessages
  };
}

/**
 * IMPORTANT: N8N WEBHOOK CONFIGURATION
 * 
 * To connect this chatbot to your N8N workflow:
 * 
 * 1. Go to line 11 in this file (WEBHOOK_CONFIG.url)
 * 2. Replace 'https://your-n8n-instance.com/webhook/chatbot-test' 
 *    with your actual N8N webhook URL
 * 
 * Expected N8N webhook payload format:
 * {
 *   "message": "User message content",
 *   "timestamp": "2024-01-01T00:00:00.000Z",
 *   "sessionId": "session_1234567890",
 *   "metadata": {
 *     "source": "landing-page-chatbot",
 *     "userAgent": "Mozilla/5.0..."
 *   }
 * }
 * 
 * Expected N8N response format (any of these):
 * Option 1: { "response": "Assistant response text" }
 * Option 2: { "message": "Assistant response text" }
 * Option 3: "Direct string response"
 */ 