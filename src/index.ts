// src/index.ts

// 1. The Headless Engine (Logic Only)
export { ChatProvider, useChat } from './ChatProvider';
export { ChatBridge, type ChatBridgeProps } from './ChatBridge';
export type { ChatEngineConfig, ChatContextState } from './ChatProvider';

// 2. The Presentation Layer (UI Only)
export { ChatWindow } from './components/ChatWindow';
export { ChatBubble } from './components/ChatBubble';

// 3. The All-in-One Drop-in (Logic + UI)
export { AvayaChatWidget } from './AvayaChatWidget';
export type { ChatUITheme } from './AvayaChatWidget';