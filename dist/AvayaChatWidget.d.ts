import React from 'react';
import { type ChatEngineConfig } from './ChatProvider';
export interface ChatUITheme {
    header: {
        title: string;
        logoText?: string;
        logoUrl?: string;
        backgroundColor: string;
        textColor: string;
    };
    bubbles: {
        userBackground: string;
        userText: string;
        agentBackground: string;
        agentText: string;
        richMediaBackground: string;
        richMediaButtonColor: string;
    };
    input: {
        placeholderText: string;
        sendButtonBackground: string;
        sendButtonText: string;
    };
    typography: {
        fontFamily: string;
        baseFontSize: string;
    };
}
export interface ChatWidgetProps {
    config: ChatEngineConfig;
    theme?: Partial<ChatUITheme>;
    isOpen?: boolean;
    onOpen?: () => void;
    onClose?: () => void;
    showBubble?: boolean;
}
export declare const AvayaChatWidget: React.FC<ChatWidgetProps>;
