// src/ChatBridge.tsx inside chat-engine
import { useEffect, type MutableRefObject } from 'react';
import { useChat } from './ChatProvider';

export interface ChatBridgeProps {
  chatRef: MutableRefObject<ReturnType<typeof useChat> | null>;
  customerName?: string;
  onMessage?: (latestMessage: any) => void;
  onTypingChange?: (isAgentTyping: boolean, participants: string[]) => void;
}

export const ChatBridge = ({
  chatRef,
  customerName,
  onMessage,
  onTypingChange
}: ChatBridgeProps) => {
  const chat = useChat();

  // Sync methods & reactive state to parent ref
  useEffect(() => {
    chatRef.current = chat;
  }, [chat, chatRef]);

  // Handle incoming messages
  useEffect(() => {
    if (chat.messages.length === 0) return;
    const latestMessage = chat.messages[chat.messages.length - 1];

    if (onMessage) {
      onMessage(latestMessage);
    }
  }, [chat.messages, onMessage]);

  // Handle typing status
  useEffect(() => {
    if (!onTypingChange) return;

    const names: string[] = chat.typingParticipants || [];
    const isAgentTyping = names.some((name) => name !== customerName);

    onTypingChange(isAgentTyping, names);
  }, [chat.typingParticipants, customerName, onTypingChange]);

  return null;
};