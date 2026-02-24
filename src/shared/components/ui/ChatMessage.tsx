'use client';

import { motion } from 'framer-motion';
import { UserIcon, SparklesIcon } from '@heroicons/react/24/outline';

export interface ChatMessageType {
    id: string;
    content: string;
    role: 'user' | 'assistant';
    timestamp: Date;
    status?: 'sending' | 'sent' | 'error';
}

interface ChatMessageProps {
    message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
    const isUser = message.role === 'user';
    const isError = message.status === 'error';
    const isSending = message.status === 'sending';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3 }}
            className={`flex items-start space-x-2 ${isUser ? 'flex-row-reverse space-x-reverse' : 'flex-row'
                }`}
        >
            <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isUser
                    ? 'bg-gradient-to-r from-brand-cyan to-brand-orange text-white'
                    : 'bg-gray-100 dark:bg-dark-700 border border-gray-200 dark:border-brand-cyan/20'
                    }`}
            >
                {isUser ? (
                    <UserIcon className="w-4 h-4" />
                ) : (
                    <SparklesIcon className="w-4 h-4 text-brand-orange" />
                )}
            </div>

            <div
                className={`max-w-[280px] rounded-2xl px-4 py-3 relative ${isUser
                    ? 'bg-gradient-to-r from-brand-cyan to-brand-orange text-white rounded-br-md'
                    : 'bg-gray-100 dark:bg-dark-700 text-dark-950 dark:text-white border border-gray-200 dark:border-brand-cyan/10 rounded-bl-md'
                    } ${isError ? 'border-red-500/50 bg-red-900/20' : ''} ${isSending ? 'opacity-70' : ''
                    }`}
            >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {message.content}
                </p>

                {isSending && (
                    <div className="absolute -bottom-1 -right-1">
                        <motion.div
                            className="w-2 h-2 bg-brand-cyan rounded-full"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: 'easeInOut'
                            }}
                        />
                    </div>
                )}

                {isError && (
                    <div className="mt-2 text-xs text-red-400">
                        Error al enviar mensaje
                    </div>
                )}

                <div
                    className={`text-xs mt-1 opacity-60 ${isUser ? 'text-dark-800' : 'text-gray-400'
                        }`}
                >
                    {message.timestamp.toLocaleTimeString('es-ES', {
                        hour: '2-digit',
                        minute: '2-digit'
                    })}
                </div>
            </div>
        </motion.div>
    );
}
