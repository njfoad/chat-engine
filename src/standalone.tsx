import { createRef } from 'react';
import { createRoot, type Root } from 'react-dom/client';
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

// Module-level references to track active DOM container and React root
let activeRoot: Root | null = null;
let activeContainer: HTMLElement | null = null;

// Global visibility & lifecycle controls
function show() {
  if (activeContainer) {
    activeContainer.style.display = 'block';
  }
}

function hide() {
  if (activeContainer) {
    activeContainer.style.display = 'none';
  }
}

function unmount() {
  if (activeRoot) {
    activeRoot.unmount();
    activeRoot = null;
  }
  if (activeContainer) {
    activeContainer.style.display = 'none';
    activeContainer = null;
  }
}

// Global initialization function
function init(options: StandaloneOptions) {
  const { config, theme, containerId, onMessage, onTypingChange } = options;

  // Clean up any existing active root if re-initialized
  if (activeRoot) {
    unmount();
  }

  // 1. Find or create a DOM element to mount the widget into
  let container = containerId ? document.getElementById(containerId) : null;
  if (!container) {
    container = document.createElement('div');
    container.id = containerId || 'avaya-chat-widget-root';
    document.body.appendChild(container);
  }

  // Ensure container is visible on init
  container.style.display = 'block';
  activeContainer = container;

  // 2. Ref to capture method controls (sendMessage, sendAttachment, etc.)
  const chatRef = createRef<any>();

  // 3. Mount React into the vanilla DOM
  const root = createRoot(container);
  activeRoot = root;

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
    show,
    hide,
    destroy: unmount,
    unmount
  };
}

// Attach to global window object
if (typeof window !== 'undefined') {
  (window as any).AvayaChatEngine = {
    init,
    show,
    hide,
    destroy: unmount,
    unmount
  };
}

export { init, show, hide, unmount as destroy, unmount };