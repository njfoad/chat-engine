import { createRef } from 'react';
import { createRoot } from 'react-dom/client';
import { AvayaChatWidget } from './AvayaChatWidget';
import { ChatBridge } from './ChatBridge';
import type { ChatEngineConfig } from './ChatProvider';

interface StandaloneOptions {
  config: ChatEngineConfig;
  theme?: any;
  containerId?: string;
  onMessage?: (message: any) => void;
  onTypingChange?: (isAgentTyping: boolean, participants: any[]) => void;
}

// Global initialization function
function init(options: StandaloneOptions) {
  const { config, theme, containerId, onMessage, onTypingChange } = options;

  // 1. Find or create a DOM element to mount the widget into
  let container = containerId ? document.getElementById(containerId) : null;
  if (!container) {
    container = document.createElement('div');
    container.id = containerId || 'avaya-chat-widget-root';
    document.body.appendChild(container);
  }

  // 2. Ref to capture method controls (sendMessage, sendAttachment, etc.)
  const chatRef = createRef<any>();

  // 3. Mount React into the vanilla DOM
  const root = createRoot(container);
  root.render(
    <AvayaChatWidget config={config} theme={theme} showBubble={true}>
      <ChatBridge
        chatRef={chatRef}
        customerName={config.displayName}
        onMessage={onMessage}
        onTypingChange={onTypingChange}
      />
    </AvayaChatWidget>
  );

  // 4. Return an imperative control handle to the plain JS caller
  return {
    sendMessage: (text: string) => chatRef.current?.sendMessage(text),
    sendAttachment: (file: File) => chatRef.current?.sendAttachment(file),
    unmount: () => root.unmount()
  };
}

// Attach to global window object
if (typeof window !== 'undefined') {
  (window as any).AvayaChatEngine = { init };
}

export { init };