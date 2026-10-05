import React, { createContext, useContext, useEffect, useState } from 'react';
import { AvayaInfinityOmniSdk } from '@avaya/infinity-omni-sdk-core';
import { MessagingConversation, AvayaInfinityMessaging, TextMessage } from '@avaya/infinity-omni-sdk-messaging';

interface ChatContextState {
  messages: any[]; // The Avaya Message list
  isConnecting: boolean;
  connectionError: string | null;
  sendMessage: (text: string) => Promise<void>;
  notifyTyping: () => void;
  loadMoreHistory: () => Promise<void>;
}

const ChatContext = createContext<ChatContextState | null>(null);

export const ChatProvider: React.FC<{ children: React.ReactNode, initConfig: any }> = ({ children, initConfig }) => {
  const [conversation, setConversation] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [isConnecting, setIsConnecting] = useState(true);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [iterator, setIterator] = useState<any>(null);

  useEffect(() => {
    let activeConversation: any;

    const initChat = async () => {
      try {
        const EnhancedConversationClass = MessagingConversation();
        const userSession = await AvayaInfinityOmniSdk.init(initConfig, EnhancedConversationClass);
        activeConversation = userSession.conversations[0];
        setConversation(activeConversation);

        const historyIterator = await activeConversation.getMessages(15);
        setIterator(historyIterator);
        setMessages(historyIterator.items);

        activeConversation.addMessageArrivedListener((message: any) => {
          setMessages(prev => [...prev, message]);
        });
      } catch (error) {
        setConnectionError("Failed to initialize SDK.");
      }
    };

    initChat();

    AvayaInfinityMessaging.addEventStreamConnectedListener(() => {
      setIsConnecting(false);
      setConnectionError(null);
    });

    AvayaInfinityMessaging.addEventStreamFailedListener((eventPayload: any) => {
      setConnectionError(`Disconnected: ${eventPayload.reason}`);
    });
  }, [initConfig]);

  const sendMessage = async (text: string) => {
    if (!conversation) return;
    await conversation.sendMessage(new TextMessage(text));
  };

  const loadMoreHistory = async () => {
    if (iterator && iterator.hasPrevious()) {
      const previousPage = await iterator.previous();
      setMessages(prev => [...previousPage, ...prev]); 
    }
  };

  const notifyTyping = () => conversation?.notifyUserTyping();

  return (
    <ChatContext.Provider value={{ messages, isConnecting, connectionError, sendMessage, notifyTyping, loadMoreHistory }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) throw new Error("useChat must be used within a ChatProvider");
  return context;
};