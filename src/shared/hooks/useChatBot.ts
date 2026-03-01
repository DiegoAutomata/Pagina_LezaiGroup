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
    messagesEndRef: React.RefObject<HTMLDivElement | null>;
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

    const sendToWebhook = async (allMessages: ChatMessageType[]): Promise<string> => {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), config.webhook.timeout || 15000);

            const payload = {
                messages: allMessages.map(m => ({
                    role: m.role,
                    content: m.content
                }))
            };

            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data.output || 'Gracias por tu mensaje. Te responderé pronto.';

        } catch (error) {
            console.error(error);
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

            // Send the entire conversation history instead of just the latest message
            const response = await sendToWebhook([...messages, userMessage]);

            setIsTyping(false);

            // Split response by double newlines or list bullets to create separate messages organically
            const messageChunks = response
                .replace(/\\n/g, '\n') // Sanitize literal strings just in case the LLM prints them
                .split(/\n\s*\n/)
                .map(chunk => chunk.trim())
                .filter(chunk => chunk.length > 0);

            for (let i = 0; i < messageChunks.length; i++) {
                if (i > 0) {
                    setIsTyping(true);
                    // Add a dynamic natural pseudo-typing delay based on message length
                    const delay = Math.min(1500, Math.max(700, messageChunks[i].length * 15));
                    await new Promise(resolve => setTimeout(resolve, delay));
                    setIsTyping(false);
                }

                addMessage(messageChunks[i], 'assistant', 'sent');
            }

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
