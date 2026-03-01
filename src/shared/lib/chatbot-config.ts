export interface ChatBotConfig {
    webhook: {
        url: string;
        fallbackUrl?: string;
        timeout: number;
        testTimeout?: number;
        retries: number;
    };
    ui: {
        position: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
        theme: 'dark' | 'light' | 'auto';
        showTimestamps: boolean;
        maxMessages: number;
        welcomeMessage: string;
        placeholderText: string;
    };
    features: {
        enableAudio: boolean;
        enableFileUpload: boolean;
        enableTypingIndicator: boolean;
        enableMessageStatus: boolean;
    };
    branding: {
        name: string;
        avatar: string;
        description: string;
    };
}

export const defaultChatBotConfig: ChatBotConfig = {
    webhook: {
        url: 'https://zzn8n.danielcarreon.site/webhook-test/chat',
        fallbackUrl: 'https://zzwebhookn8n.danielcarreon.site/webhook/chat',
        timeout: 30000,
        testTimeout: 3000,
        retries: 3
    },
    ui: {
        position: 'bottom-right',
        theme: 'dark',
        showTimestamps: true,
        maxMessages: 100,
        welcomeMessage: '¡Hola! 👋\n\nSoy Lezi, tu asistente de IA de Lezrai. ¿En qué puedo ayudarte hoy?',
        placeholderText: 'Escribe tu mensaje...'
    },
    features: {
        enableAudio: false,
        enableFileUpload: false,
        enableTypingIndicator: true,
        enableMessageStatus: true
    },
    branding: {
        name: 'Lezi',
        avatar: 'LZ',
        description: 'Aquí para ayudarte 24/7'
    }
};

export function getChatBotConfig(): ChatBotConfig {
    return defaultChatBotConfig;
}
