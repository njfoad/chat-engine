// src/AvayaChatWidget.tsx
import React, { useState, type ReactNode } from 'react';
import { ChatProvider, type ChatEngineConfig } from './ChatProvider';
import { ChatWindow } from './components/ChatWindow';
import { ChatBubble } from './components/ChatBubble';

export interface ChatUITheme {
  header: { title: string; logoText?: string; logoUrl?: string; backgroundColor: string; textColor: string; };
  bubbles: { userBackground: string; userText: string; agentBackground: string; agentText: string; richMediaBackground: string; richMediaButtonColor: string; };
  input: { placeholderText: string; sendButtonBackground: string; sendButtonText: string; };
  typography: { fontFamily: string; baseFontSize: string; };
}

const defaultTheme: ChatUITheme = {
  header: { title: "Altamino Assistant", logoText: "ALT", backgroundColor: "#0033a0", textColor: "#ffffff" },
  bubbles: { userBackground: "#0033a0", userText: "#ffffff", agentBackground: "#ffffff", agentText: "#333333", richMediaBackground: "#e8eaf6", richMediaButtonColor: "#958fd6" },
  input: { placeholderText: "Type message...", sendButtonBackground: "#0033a0", sendButtonText: "#ffffff" },
  typography: { fontFamily: "inherit", baseFontSize: "14px" }
};

export interface ChatWidgetProps {
  config: ChatEngineConfig;
  theme?: Partial<ChatUITheme>; 
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  showBubble?: boolean;
  children?: ReactNode;
}

export const AvayaChatWidget: React.FC<ChatWidgetProps> = ({ 
  config, 
  theme, 
  isOpen: externalIsOpen, 
  onOpen, 
  onClose,
  showBubble = true,
  children
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isChatOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;

  const handleOpen = () => {
    setInternalIsOpen(true);
    if (onOpen) onOpen();
  };

  const handleClose = () => {
    setInternalIsOpen(false);
    if (onClose) onClose();
  };

  const activeTheme = { 
    ...defaultTheme, 
    ...theme,
    header: { ...defaultTheme.header, ...theme?.header },
    bubbles: { ...defaultTheme.bubbles, ...theme?.bubbles },
    input: { ...defaultTheme.input, ...theme?.input },
    typography: { ...defaultTheme.typography, ...theme?.typography }
  };

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 9999, fontFamily: activeTheme.typography.fontFamily }}>
      {isChatOpen ? (
        <div style={{ width: '400px', height: '600px', display: 'flex', flexDirection: 'column', boxShadow: '0 12px 32px rgba(0,0,0,0.18)', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#fff', border: `1px solid ${activeTheme.header.backgroundColor}` }}>
          <ChatProvider config={config}>
            <ChatWindow 
              closeChat={handleClose} 
              theme={activeTheme} 
              autoStartMessage={config.autoStartMessage} 
            />
            {children}
          </ChatProvider>
        </div>
      ) : (
        // Only render the bubble if showBubble is true
        showBubble && <ChatBubble onClick={handleOpen} theme={activeTheme} />
      )}
    </div>
  );
};