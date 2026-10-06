import React from 'react';
import { LogLevel } from '@avaya/infinity-omni-sdk-core';
export interface ChatEngineConfig {
    host: string;
    integrationId: string;
    displayName: string;
    fetchJwt: () => Promise<string>;
    logLevel?: LogLevel;
}
interface ChatContextState {
    messages: any[];
    isConnecting: boolean;
    connectionError: string | null;
    typingParticipants: string[];
    isChatClosed: boolean;
    sendMessage: (text: string) => Promise<void>;
    sendAttachment: (file: File, text?: string) => Promise<void>;
    notifyTyping: () => void;
    loadMoreHistory: () => Promise<void>;
}
export declare const ChatProvider: React.FC<{
    children: React.ReactNode;
    config: ChatEngineConfig;
}>;
export declare const useChat: () => ChatContextState;
export {};
