'use client';

import { useState, useRef, useEffect } from 'react';
import { ChatMessageType } from '@/shared/components/ui/ChatMessage';
import { getChatBotConfig } from '@/shared/lib/chatbot-config';

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

export function useChatBot(): ChatBotState {
    const [messages, setMessages] = useState<ChatMessageType[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const config = getChatBotConfig();

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    const generateMessageId = (): string => {
        return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    };

    const addMessage = (content: string, role: 'user' | 'assistant', status?: 'sending' | 'sent' | 'error'): ChatMessageType => {
        const newMessage: ChatMessageType = {
            id: generateMessageId(),
            content,
            role,
            timestamp: new Date(),
            status
        };

        setMessages(prev => [...prev, newMessage]);
        return newMessage;
    };

    const updateMessageStatus = (messageId: string, status: 'sending' | 'sent' | 'error') => {
        setMessages(prev =>
            prev.map(msg =>
                msg.id === messageId
                    ? { ...msg, status }
                    : msg
            )
        );
    };

    const tryWebhook = async (url: string, message: string, timeout: number): Promise<string> => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        try {
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

            if (data.output) return data.output;
            else if (Array.isArray(data) && data.length > 0 && data[0].output) return data[0].output;
            else if (data.response) return data.response;
            else if (data.message) return data.message;
            else if (typeof data === 'string') return data;
            else if (data.data && data.data.response) return data.data.response;
            else return 'Gracias por tu mensaje. Te responderé pronto.';

        } finally {
            clearTimeout(timeoutId);
        }
    };

    const sendToWebhook = async (message: string, retryCount = 0): Promise<string> => {
        try {
            if (config.webhook.url) {
                try {
                    const testResponse = await tryWebhook(
                        config.webhook.url,
                        message,
                        config.webhook.testTimeout || 3000
                    );
                    return testResponse;
                } catch {
                    // fallback
                }
            }

            if (config.webhook.fallbackUrl) {
                const prodResponse = await tryWebhook(
                    config.webhook.fallbackUrl,
                    message,
                    config.webhook.timeout
                );
                return prodResponse;
            }

            throw new Error('No webhook URLs configured');

        } catch (error) {
            if (retryCount < config.webhook.retries && config.webhook.fallbackUrl) {
                await new Promise(resolve => setTimeout(resolve, 1000 * (retryCount + 1)));
                return sendToWebhook(message, retryCount + 1);
            }

            if (error instanceof Error && error.name === 'AbortError') {
                return 'Lo siento, la respuesta está tardando más de lo esperado. Por favor, intenta de nuevo.';
            } else {
                return 'Disculpa, hay un problema temporal con la conexión. Por favor, intenta de nuevo en unos momentos.';
            }
        }
    };

    const sendMessage = async (content: string): Promise<void> => {
        if (!content.trim() || isLoading) return;

        setIsLoading(true);
        const userMessage = addMessage(content, 'user', 'sending');

        try {
            updateMessageStatus(userMessage.id, 'sent');
            setIsTyping(true);

            const response = await sendToWebhook(content);

            setIsTyping(false);
            addMessage(response, 'assistant', 'sent');

        } catch (error) {
            console.error('Error sending message:', error);
            setIsTyping(false);
            updateMessageStatus(userMessage.id, 'error');
            addMessage(
                'Disculpa, ha ocurrido un error. Por favor, intenta de nuevo.',
                'assistant',
                'sent'
            );
        } finally {
            setIsLoading(false);
        }
    };

    const clearMessages = () => {
        setMessages([]);
    };

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
