import { default as React } from 'react';
export interface ChatEngineConfig {
    host: string;
    integrationId: string;
    displayName?: string;
    attributes?: Record<string, string>;
    logLevel?: any;
    fetchJwt?: () => Promise<string>;
    auth?: {
        userId: string;
        userName: string;
    };
    autoStartMessage?: string;
}
export interface ChatContextState {
    messages: any[];
    isConnecting: boolean;
    connectionError: string | null;
    typingParticipants: string[];
    isChatClosed: boolean;
    sendMessage: (text: string) => Promise<void>;
    sendAttachment: (file: File, text?: string) => Promise<void>;
    sendReply: (payload: string, text: string) => Promise<void>;
    notifyTyping: () => void;
    loadMoreHistory: () => Promise<void>;
}
export declare const ChatProvider: React.FC<{
    children: React.ReactNode;
    config: ChatEngineConfig;
}>;
export declare const useChat: () => ChatContextState;
