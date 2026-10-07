import React, { createContext, useContext, useEffect, useState } from 'react';
import { AvayaInfinityOmniSdk, type JwtProvider, LogLevel } from '@avaya/infinity-omni-sdk-core';
import { MessagingConversation, AvayaInfinityMessaging , TextMessage, AttachmentMessage, ReplyMessage } from '@avaya/infinity-omni-sdk-messaging';

// ==========================================
// 1. Types & Interfaces
// ==========================================
export interface ChatEngineConfig {
  host: string;
  integrationId: string;
  displayName?: string;
  attributes?: Record<string, string>;
  logLevel?: any;
  fetchJwt?: () => Promise<string>; 
  auth?: {
    apiKey: string; // Just the key and the user!
    userId: string;
    userName: string;
  };
}

export interface ChatContextState {
  messages: any[]; 
  isConnecting: boolean;
  connectionError: string | null;
  typingParticipants: string[]; // NEW: Tracks who is currently typing
  isChatClosed: boolean;
  sendMessage: (text: string) => Promise<void>;
  sendAttachment: (file: File, text?: string) => Promise<void>; // NEW: Handles files
  sendReply: (payload: string, text: string) => Promise<void>;
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
  const [isChatClosed, setIsChatClosed] = useState(false);

  useEffect(() => {
    let activeConversation: any;
    let isMounted = true; 

const initChat = async () => {
      console.log("[ChatProvider] Starting initialization sequence...");
      
      try {
        setIsConnecting(true);
        setConnectionError(null);
        
        // 1. Determine which JWT strategy to use
        let activeFetchJwt = config.fetchJwt;

        // 2. If the user provided the simple auth object, use the default NJF service
        if (!activeFetchJwt && config.auth) {
          activeFetchJwt = async () => {
            const res = await fetch('https://app1.showme.avaya.com/njf-api/iChatJWT', {
              method: 'POST',
              headers: { 
                'Content-Type': 'application/json', 
                'x-nicknode-access': config.auth!.apiKey 
              },
              body: JSON.stringify({
                userId: config.auth!.userId,
                userName: config.auth!.userName,
                integrationId: config.integrationId,
                userIdentifiers: { emailAddresses: [config.auth!.userId] },
              })
            });
            const data = await res.json();
            return data.jwtToken;
          };
        }

        // 3. Safety Check
        if (!activeFetchJwt) {
          throw new Error("ChatEngine requires either a fetchJwt function or an auth configuration block.");
        }

        console.log("[ChatProvider] Fetching initial JWT...");
        // Use the resolved activeFetchJwt here!
        const initialToken = await activeFetchJwt(); 
        console.log("[ChatProvider] JWT fetched successfully. Token length:", initialToken?.length);
        
        // Pass the resolved activeFetchJwt here!
        const jwtLifecycleManager = new AutoRefreshJwtProvider(activeFetchJwt); 
        const EnhancedConversationClass = MessagingConversation();
        
        console.log(`[ChatProvider] Calling Avaya SDK init() on host: ${config.host}...`);
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
        console.log("[ChatProvider] SDK Init successful! User session created.");
        console.log("[ChatProvider] Resolving active conversation...");
        activeConversation = userSession.conversations[0] || await AvayaInfinityOmniSdk.createConversation(EnhancedConversationClass);
        console.log("[ChatProvider] Active conversation ready. ID:", activeConversation.id);
        
        if (!isMounted) return;
        setConversation(activeConversation);

        console.log("[ChatProvider] Fetching message history...");
        const historyIterator = await activeConversation.getMessages(15);
        console.log(`[ChatProvider] History fetched. Found ${historyIterator.items.length} messages.`);
        
        if (!isMounted) return;
        setIterator(historyIterator);
        setMessages(historyIterator.items);

        console.log("[ChatProvider] Attaching conversation event listeners...");
        
        // -- MESSAGE LISTENERS --
        activeConversation.addMessageArrivedListener((messageEvent: any) => {
          console.log("[ChatProvider] Message Arrived:", JSON.stringify( messageEvent, undefined, 4));
          if (isMounted) setMessages(prev => [...prev, messageEvent]);
        });

        activeConversation.addMessageDeliveredListener((messageEvent: any) => {
          console.log("[ChatProvider] Message Delivered to Avaya:", JSON.stringify( messageEvent, undefined, 4));
          // Optional: You can use this to update a "Delivered" checkmark in your UI later
        });

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

        console.log("[ChatProvider] Initialization complete. Connecting UI...");
        if (isMounted) {
          setIsConnecting(false);
        }

      } catch (error: any) {
        console.error("[ChatProvider] Initialization FAILED at step:", error);
        if (isMounted) {
          setConnectionError(error?.message || "Failed to initialize Avaya SDK.");
          setIsConnecting(false);
        }
      }
      AvayaInfinityMessaging.addEventStreamConnectedListener((eventPayload) => {
          console.log( "[ChatProvider] Stream Connected: " + JSON.stringify( eventPayload, null, 2 ) );
      });
      AvayaInfinityMessaging.addEventStreamFailedListener((eventPayload) => {
          console.log( "[ChatProvider] Stream Failed: " + JSON.stringify( eventPayload, null, 2 ) );
      });
      AvayaInfinityMessaging.addEventStreamClosedListener((eventPayload) => {
          console.log( "[ChatProvider] Stream Closed: " + JSON.stringify( eventPayload, null, 2 ) );
          if (isMounted) setIsChatClosed(true);
      });
    };

    initChat();

    return () => {
      console.log("[ChatProvider] Component unmounting. Terminating session...");
      isMounted = false;
      
      // 1. Formally end the conversation to clear it from the agent's workspace
      if (activeConversation && typeof activeConversation.end === 'function') {
        console.log("[ChatProvider] Sending 'End Conversation' signal to Avaya Cloud...");
        
        activeConversation.end().catch((e: any) => {
          // If the agent already closed it, the SDK throws this harmless error. Safely ignore it!
          if (e?.message && e.message.includes("Conversation is closed")) {
            console.log("[ChatProvider] Conversation was already closed by the agent. Clean exit.");
          } else {
            console.error("Failed to end conversation:", e);
          }
        });
      }

      // 2. Shut down the local SDK and sever the WebSocket
      AvayaInfinityOmniSdk.shutdown().catch((e: any) => console.error("[ChatProvider] Shutdown error:", e));
    };
  }, [config]); 

  // ==========================================
  // 4. Exposed Actions
  // ==========================================
  
  const sendMessage = async (text: string) => {
    if (!conversation) return;
    
    // The Promise resolves with the official Message object from Avaya
    const finalizedMessage = await conversation.sendMessage(new TextMessage(text));
    
    // Append the verified message directly to the UI
    setMessages(prev => [...prev, finalizedMessage]);
    
    AvayaInfinityOmniSdk.resetIdleTimeout(); 
  };

  // NEW: Send Attachment Action
  const sendAttachment = async (file: File, text: string = "") => {
    if (!conversation) return;
    // The Promise resolves with the official Message object from Avaya
    const finalizedMessage = await conversation.sendMessage(new AttachmentMessage(file, text));
    // Append the verified message directly to the UI
    setMessages(prev => [...prev, finalizedMessage]);
    AvayaInfinityOmniSdk.resetIdleTimeout(); 
  };

  const sendReply = async (payload: string, text: string) => {
    if (!conversation) return;
    // According to Avaya spec, ReplyMessage takes (payload, actionText)
    const finalizedMessage = await conversation.sendMessage(new ReplyMessage(payload, text));
    setMessages(prev => [...prev, finalizedMessage]);
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
      isChatClosed,
      sendMessage, 
      sendAttachment, 
      sendReply,
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