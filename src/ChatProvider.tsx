import React, { createContext, useContext, useEffect, useState } from 'react';
import { AvayaInfinityOmniSdk, type JwtProvider, LogLevel } from '@avaya/infinity-omni-sdk-core';
import { MessagingConversation, AvayaInfinityMessaging, TextMessage, AttachmentMessage } from '@avaya/infinity-omni-sdk-messaging';

// ==========================================
// 1. Types & Interfaces
// ==========================================
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
  typingParticipants: string[]; // NEW: Tracks who is currently typing
  sendMessage: (text: string) => Promise<void>;
  sendAttachment: (file: File, text?: string) => Promise<void>; // NEW: Handles files
  notifyTyping: () => void;
  loadMoreHistory: () => Promise<void>;
}

// ==========================================
// 2. Context & JWT Manager
// ==========================================
const ChatContext = createContext<ChatContextState | null>(null);

class AutoRefreshJwtProvider implements JwtProvider {
  public fetchJwt: () => Promise<string>;

  constructor(fetchJwt: () => Promise<string>) {
    this.fetchJwt = fetchJwt;
  }

  onExpireWarning(timeToExpiry: number): void {
    console.debug(`JWT expiring in ${timeToExpiry}ms. Fetching fresh token...`);
    this.fetchJwt()
      .then(newToken => AvayaInfinityOmniSdk.setJwt(newToken))
      .catch(error => console.error("Failed to refresh JWT on expiry warning:", error));
  }

  onExpire(): void {
    console.warn("JWT expired. Forcing token refresh...");
    this.fetchJwt()
      .then(newToken => AvayaInfinityOmniSdk.setJwt(newToken))
      .catch(error => console.error("Failed to refresh JWT on expiry:", error));
  }
}

// ==========================================
// 3. Main Provider Component
// ==========================================
export const ChatProvider: React.FC<{ children: React.ReactNode, config: ChatEngineConfig }> = ({ children, config }) => {
  const [conversation, setConversation] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [isConnecting, setIsConnecting] = useState(true);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [iterator, setIterator] = useState<any>(null);
  const [typingParticipants, setTypingParticipants] = useState<string[]>([]); // NEW

  useEffect(() => {
    let activeConversation: any;
    let isMounted = true; 

    const initChat = async () => {
      try {
        setIsConnecting(true);
        setConnectionError(null);
        
        const initialToken = await config.fetchJwt();
        const jwtLifecycleManager = new AutoRefreshJwtProvider(config.fetchJwt);
        const EnhancedConversationClass = MessagingConversation();
        
        const userSession = await AvayaInfinityOmniSdk.init({
          host: config.host,
          integrationId: config.integrationId,
          token: initialToken,
          jwtProvider: jwtLifecycleManager,
          displayName: config.displayName,
          logLevel: config.logLevel || LogLevel.WARN,
          idleTimeoutDuration: 5 * 60 * 1000, 
          idleShutdownGraceTimeoutDuration: 1 * 60 * 1000,
        }, EnhancedConversationClass);

        activeConversation = userSession.conversations[0] || await AvayaInfinityOmniSdk.createConversation(EnhancedConversationClass);
        
        if (!isMounted) return;
        setConversation(activeConversation);

        const historyIterator = await activeConversation.getMessages(15);
        if (!isMounted) return;
        
        setIterator(historyIterator);
        setMessages(historyIterator.items);

        // -- MESSAGE LISTENERS --
        activeConversation.addMessageArrivedListener((message: any) => {
          if (isMounted) setMessages(prev => [...prev, message]);
        });

        // -- TYPING LISTENERS (NEW) --
        activeConversation.addTypingStartedListener((event: any) => {
          if (isMounted) {
            setTypingParticipants(prev => {
              const name = event.participant.displayName;
              return prev.includes(name) ? prev : [...prev, name];
            });
          }
        });

        activeConversation.addTypingStoppedListener((event: any) => {
          if (isMounted) {
            setTypingParticipants(prev => prev.filter(name => name !== event.participant.displayName));
          }
        });

      } catch (error: any) {
        if (isMounted) {
          setConnectionError(error?.message || "Failed to initialize Avaya SDK.");
          setIsConnecting(false);
        }
      }
    };

    initChat();

    AvayaInfinityMessaging.addEventStreamConnectedListener(() => {
      if (isMounted) {
        setIsConnecting(false);
        setConnectionError(null);
      }
    });

    AvayaInfinityMessaging.addEventStreamFailedListener((eventPayload: any) => {
      if (isMounted) setConnectionError(`Network disconnected: ${eventPayload.reason}`);
    });

    return () => {
      isMounted = false;
      AvayaInfinityOmniSdk.shutdown().catch(console.error);
    };
  }, [config]); 

  // ==========================================
  // 4. Exposed Actions
  // ==========================================
  
  const sendMessage = async (text: string) => {
    if (!conversation) return;
    await conversation.sendMessage(new TextMessage(text));
    AvayaInfinityOmniSdk.resetIdleTimeout(); 
  };

  // NEW: Send Attachment Action
  const sendAttachment = async (file: File, text: string = "") => {
    if (!conversation) return;
    await conversation.sendMessage(new AttachmentMessage(file, text));
    AvayaInfinityOmniSdk.resetIdleTimeout(); 
  };

  const loadMoreHistory = async () => {
    if (iterator && iterator.hasPrevious()) {
      const previousPage = await iterator.previous();
      setMessages(prev => [...previousPage, ...prev]); 
    }
  };

  const notifyTyping = () => {
    conversation?.notifyUserTyping();
    AvayaInfinityOmniSdk.resetIdleTimeout();
  };

  return (
    <ChatContext.Provider value={{ 
      messages, 
      isConnecting, 
      connectionError, 
      typingParticipants, 
      sendMessage, 
      sendAttachment, 
      notifyTyping, 
      loadMoreHistory 
    }}>
      {children}
    </ChatContext.Provider>
  );
};

// ==========================================
// 5. Custom Hook for Consumers
// ==========================================
export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) throw new Error("useChat must be used within a ChatProvider");
  return context;
};