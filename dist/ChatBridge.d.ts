import { type MutableRefObject } from 'react';
import { useChat } from './ChatProvider';
export interface ChatBridgeProps {
    chatRef: MutableRefObject<ReturnType<typeof useChat> | null>;
    customerName?: string;
    onMessage?: (latestMessage: any) => void;
    onTypingChange?: (isAgentTyping: boolean, participants: string[]) => void;
}
export declare const ChatBridge: ({ chatRef, customerName, onMessage, onTypingChange }: ChatBridgeProps) => null;
