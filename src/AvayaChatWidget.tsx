// src/AvayaChatWidget.tsx
import React, { useState } from 'react';
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
  theme?: Partial<ChatUITheme>; // Allows partial overrides
}

export const AvayaChatWidget: React.FC<ChatWidgetProps> = ({ config, theme }) => {
  // Merge defaults with whatever the client provides
  const activeTheme = { 
    ...defaultTheme, 
    ...theme,
    header: { ...defaultTheme.header, ...theme?.header },
    bubbles: { ...defaultTheme.bubbles, ...theme?.bubbles },
    input: { ...defaultTheme.input, ...theme?.input },
    typography: { ...defaultTheme.typography, ...theme?.typography }
  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <ChatProvider config={config}>
      <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 9999, fontFamily: activeTheme.typography.fontFamily }}>
        {isOpen ? (
          <ChatWindow closeChat={() => setIsOpen(false)} theme={activeTheme} />
        ) : (
          <ChatBubble onClick={() => setIsOpen(true)} theme={activeTheme} />
        )}
      </div>
    </ChatProvider>
  );
};