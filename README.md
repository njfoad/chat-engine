# Avaya Omni Chat Engine

A headless, highly themeable, and lazy-loaded React library for integrating Avaya Infinity Omni chat into modern web applications. 

This engine abstracts away complex Avaya SDK initialization, JWT lifecycle management, and WebSocket message parsing so web developers can focus purely on the customer experience. It offers two modes: a drop-in **All-in-One Widget** and a fully **Headless SDK** for building completely custom chat interfaces.

## Installation

Install the package directly from the repository:

```bash
npm install git+[https://github.com/njfoad/chat-engine.git#main](https://github.com/njfoad/chat-engine.git#main)
```

## Quick Start (Widget Mode)

The simplest way to integrate chat is using the `AvayaChatWidget`. It handles the floating launch icon, the chat window rendering, and lazy-loads the Avaya network connection only when the customer opens the chat.

```tsx
import { useState } from 'react';
import { AvayaChatWidget } from 'chat-engine';

export default function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const chatConfig = {
    host: "core.showmeavayacom.ec.avayacloud.com",
    integrationId: "YOUR_INTEGRATION_ID",
    displayName: "Jane Doe",
    attributes: {
      launchSource: "website_floating_icon",
      previousTranscript: "" // Pass empty string if null
    },
    // The engine automatically fetches and refreshes the JWT using this block
    auth: {
      apiKey: "YOUR_API_KEY",
      userId: "jane.doe@email.com",
      userName: "Jane Doe"
    }
  };

  return (
    <div>
      {/* Your Website Content Here */}

      <AvayaChatWidget config="{chatConfig}" isOpen="{isChatOpen}" onOpen="{()"> setIsChatOpen(true)}
        onClose={() => setIsChatOpen(false)}
        showBubble={true} 
      />
    </div>
  );
}
```

## Component API: `AvayaChatWidget`

| Prop | Type | Description |
|---|---|---|
| `config` | `ChatEngineConfig` | **Required.** Connection and user details (see Configuration below). |
| `theme` | `Partial<ChatUITheme>` | *Optional.* Overrides default colors, fonts, and branding. |
| `isOpen` | `boolean` | *Optional.* Programmatically forces the chat window open or closed (great for proactive popups). |
| `onOpen` | `() => void` | *Optional.* Callback fired when the user clicks the chat bubble. |
| `onClose` | `() => void` | *Optional.* Callback fired when the user clicks the close `×` button. |
| `showBubble` | `boolean` | *Optional.* Defaults to `true`. Set to `false` to hide the launcher icon entirely. |
| `children` | `ReactNode` | *Optional.* Rendered inside `<ChatProvider>`. Used for injecting context observers like `ChatBridge`. |

---

## Configuration: `ChatEngineConfig`

The engine requires a configuration object to connect to your Avaya environment.

```typescript
interface ChatEngineConfig {
  host: string;
  integrationId: string;
  displayName?: string;
  attributes?: Record<string, string>; // Context data sent to the agent
  logLevel?: any;
  
  // OPTION 1: Easy Auth
  auth?: {
    apiKey: string; 
    userId: string;
    userName: string;
  };

  // OPTION 2: Custom Auth (Overrides 'auth' if provided)
  fetchJwt?: () => Promise<string>; 
}
```

### Authentication Strategies
- **Easy Mode (`auth`):** Provide your API key and user details. The engine will securely query the default Avaya NJF endpoint under the hood.
- **Power User (`fetchJwt`):** If you route authentication through your own custom proxy backend, omit `auth` and pass a custom async function returning a JWT string to `fetchJwt`.

---

## Theming the UI

The widget is fully customizable. Pass a `theme` object to match your brand guidelines. Any omitted properties will fall back to default styling.

```tsx
const customTheme = {
  header: {
    backgroundColor: '#0033A0',
    textColor: '#FFFFFF',
    title: 'Altamino Assistant',
    logoText: 'ALT'
  },
  bubbles: {
    userBackground: '#0033A0',
    userText: '#FFFFFF',
    agentBackground: '#FFFFFF',
    agentText: '#102A43',
    richMediaBackground: '#e8eaf6',
    richMediaButtonColor: '#958fd6'
  },
  input: {
    placeholderText: 'Type message to Altamino...',
    sendButtonBackground: '#0033A0',
    sendButtonText: '#FFFFFF'
  },
  typography: {
    fontFamily: 'system-ui, sans-serif'
  }
};

// <AvayaChatWidget config="{config}" theme="{customTheme}"/>
```

---

## Extensibility & The ChatBridge Pattern

The `<AvayaChatWidget>` accepts React `children`, which are rendered directly inside the internal `<ChatProvider>` context tree. This architecture allows parent applications to hook into internal chat engine capabilities—monitoring real-time events, eavesdropping on agent messages, detecting typing status, and programmatically executing out-of-band actions (sending text or uploading attachments) without modifying the core widget UI.

### Key Capabilities Exposed

| Capability | Hook Method / Property | Description |
| :--- | :--- | :--- |
| **Out-of-Band Text** | `sendMessage(text)` | Programmatically send chat messages from external portal buttons or modals. |
| **Out-of-Band File Upload** | `sendAttachment(file)` | Trigger file attachments directly from custom UI file pickers. |
| **Agent Message Eavesdropping** | `messages` array | Intercept and react to incoming agent messages in real time for analytics or portal banners. |
| **Agent Typing Indicator** | `typingParticipants` | Detect when an agent starts or stops typing. |
| **Session State Tracking** | `isChatClosed` | Monitor session status to dynamically show or hide floating toolbars. |

### Implementation Guide

#### 1. Define the `ChatBridge` Observer

Create a bridge component in your application that sits inside `<AvayaChatWidget>`. It accesses `useChat()` and proxies internal state and methods back to the parent application using a React `ref` and optional callbacks.

```tsx
import { useEffect, MutableRefObject } from 'react';
import { useChat } from 'chat-engine';

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

  // 1. Sync internal hook state and methods to the parent ref
  useEffect(() => {
    chatRef.current = chat;
  }, [chat, chatRef]);

  // 2. Reactively notify parent when a new message arrives
  useEffect(() => {
    if (chat.messages.length === 0) return;
    const latestMessage = chat.messages[chat.messages.length - 1];

    if (onMessage) {
      onMessage(latestMessage);
    }
  }, [chat.messages, onMessage]);

  // 3. Reactively notify parent when typing state changes
  useEffect(() => {
    if (!onTypingChange) return;

    const names: string[] = chat.typingParticipants || [];
    const isAgentTyping = names.some((name) => name !== customerName);

    onTypingChange(isAgentTyping, names);
  }, [chat.typingParticipants, customerName, onTypingChange]);

  return null; // Invisible component
};
```

#### 2. Connect `ChatBridge` in the Parent Application

Instantiate a `chatRef` in `App.tsx` and nest `<ChatBridge/>` inside `<AvayaChatWidget/>`:

```tsx
import { useState, useRef } from 'react';
import { AvayaChatWidget, useChat } from 'chat-engine';
import { ChatBridge } from './ChatBridge';

export default function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const chatRef = useRef<ReturnType<typeof useChat> | null>(null);

  // Helper function to programmatically open chat and send a message
  const sendMessage = (text: string) => {
    setIsChatOpen(true);
    setTimeout(() => {
      chatRef.current?.sendMessage(text);
    }, 200);
  };

  // Callback for monitoring agent messages
  const handleIncomingMessage = (latestMessage: any) => {
    const isAgent = latestMessage?.senderParticipant?.participantType === 'AGENT';
    if (isAgent) {
      console.log('Analytics Event - Agent response:', latestMessage?.body?.elementText?.text);
    }
  };

  // Callback for typing status
  const handleTypingChange = (isAgentTyping: boolean, participants: string[]) => {
    console.log('Agent is typing:', isAgentTyping, participants);
  };

  return (
    <div>
      {/* External Portal Action Button */}
      <button onClick={() => sendMessage("I would like to upgrade my monthly data tier.")}>
        Upgrade Tier
      </button>

      {/* Widget with embedded ChatBridge */}
      <AvayaChatWidget config="{chatConfig}" isOpen="{isChatOpen}" onOpen="{()"> setIsChatOpen(true)}
        onClose={() => setIsChatOpen(false)}
      >
        <ChatBridge chatRef="{chatRef}" customerName="Jackson Smith" onMessage="{handleIncomingMessage}" onTypingChange="{handleTypingChange}"/>
      </AvayaChatWidget>
    </div>
  );
}
```

---

## Advanced: Pure Headless Mode

If you need to completely replace the chat UI, bypass `AvayaChatWidget` and use `ChatProvider` combined with the `useChat` hook. This exposes raw SDK methods and reactive message arrays while handling background socket connections.

```tsx
import { ChatProvider, useChat } from 'chat-engine';

function MyCustomUI() {
  const { messages, sendMessage, isConnecting } = useChat();
  return ( /* Build your own UI rendering the messages array */ );
}

function App() {
  return (
    <ChatProvider config="{chatConfig}">
      <MyCustomUI/>
    </ChatProvider>
  );
}
```

## Vanilla JavaScript Usage (Standalone IIFE Bundle)

For non-React web applications, legacy CMS setups, or static HTML pages, `chat-engine` provides a standalone IIFE bundle that includes all necessary dependencies (including React runtime) in a single script.

### Quick Start Example

Add a target container element, include the script tag, and initialize `AvayaChatEngine` when the DOM is ready:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Chat Engine Test</title>
</head>
<body>
  <!-- 1. HTML Mount Point -->
  <div id="avaya-chat-root"></div>

  <!-- 2. Avaya Chat Engine Standalone Script -->
  <script src="[https://app1.showme.avaya.com/njfoad/lib/avaya-chat-engine.min.js](https://app1.showme.avaya.com/njfoad/lib/avaya-chat-engine.min.js)"></script>

  <!-- 3. Initialize Widget -->
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      if (typeof window.AvayaChatEngine !== 'undefined') {
        window.AvayaChatEngine.init({
          containerId: 'avaya-chat-root',
          config: {
            host: 'core.showmeavayacom.ec.avayacloud.com',
            integrationId: 'YOUR_INTEGRATION_ID',
            displayName: 'Customer Name',
            auth: {
              userId: 'user@example.com',
              userName: 'Customer Name'
            }
          },
        });
      } else {
        console.error('AvayaChatEngine failed to load.');
      }
    });
  </script>
</body>
</html>
```

### Initialize with custom attributes, styling and event handlers

You can pass custom data to your infinity workflow using an attributes property.  Pass in callback functions for message and typing events by adding onMessage and onTypingChance properties. You can customize the UI by passing a theme property:

```javascript
const chat = window.AvayaChatEngine.init({
  containerId: 'avaya-chat-root', // Optional: defaults to 'avaya-chat-widget-root'
  
  config: {
    host: 'core.showmeavayacom.ec.avayacloud.com',
    integrationId: 'YOUR_INTEGRATION_ID',
    attributes: {
      launchSource: 'VanillaHTMLPage',
      previousTranscript: ''
    },
    auth: {
      userId: 'user@example.com',
      userName: 'John Doe'
    }
  },
  theme: {
    header: {
      title: "Altamino Assistant",
      logoText: "ALT",
      backgroundColor: "#0033a0",
      textColor: "#ffffff"
    },
    bubbles: {
      userBackground: "#0033a0",
      userText: "#ffffff",
      agentBackground: "#ffffff",
      agentText: "#333333",
      richMediaBackground: "#e8eaf6",
      richMediaButtonColor: "#958fd6"
    },
    input: {
      placeholderText: "Type message...",
      sendButtonBackground: "#0033a0",
      sendButtonText: "#ffffff"
    },
    typography: {
      fontFamily: "system-ui, -apple-system, sans-serif",
      baseFontSize: "14px"
    }
  },

  onMessage: (msg) => {
    console.log('New message received:', msg);
  },

  onTypingChange: (isAgentTyping, participants) => {
    console.log('Agent typing status:', isAgentTyping);
  }
});
```

### Controlling the Widget

You can control visibility, messaging, and unmounting either globally through `window.AvayaChatEngine` or via the instance handle returned by `init()`.

#### Global API Methods (`window.AvayaChatEngine`)

```javascript
// Hide the chat bubble and window
window.AvayaChatEngine.hide();

// Show the chat bubble and window
window.AvayaChatEngine.show();

// Unmount the widget and clean up DOM references
window.AvayaChatEngine.destroy();
```

#### Instance Handle Methods (`chat`)

```javascript
const chat = window.AvayaChatEngine.init({ ... });

// Programmatically send text or attachments
chat.sendMessage('Hello from JavaScript!');
chat.sendAttachment(fileObject);

// Control visibility
chat.hide();
chat.show();

// Unmount and destroy the instance
chat.destroy();
```

### API Reference

#### `AvayaChatEngine.init(options)`

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `containerId` | `string` | **Yes** | The HTML `id` of the element where the widget should mount. |
| `config` | `object` | **Yes** | Core configuration object for the chat engine. |
| `onMessage` | `function` | No | Callback invoked whenever a new message is received. |
| `onTypingChange` | `function` | No | Callback invoked when an agent starts or stops typing. |

#### `config` Object Properties

| Property | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `host` | `string` | **Yes** | Avaya Cloud core host URL. |
| `integrationId` | `string` | **Yes** | Your Avaya integration identifier. |
| `auth.userId` | `string` | **Yes** | Unique identifier for the user or customer session. |
| `auth.userName` | `string` | **Yes** | Display name for the user. |
| `auth.apiKey` | `string` | No | Optional override for the internal default API key. |
| `displayName` | `string` | No | Alternate display name fallback. |
| `attributes` | `object` | No | Key-value pairs passed as initial metadata to the chat workflow. |

#### `theme` property specification

#### `header` Options
| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `title` | `string` | `"Chat Support"` | Main title in the header bar. |
| `subtitle` | `string` | `"We typically reply in a few minutes"` | Secondary status or subtitle text. |
| `logoText` | `string` | `"AV"` | Initials displayed in avatar placeholder if no image URL is supplied. |
| `logoUrl` | `string` | `undefined` | Image URL for header logo/avatar. |
| `backgroundColor` | `string` | `"#0033a0"` | Background color for the header bar. |
| `textColor` | `string` | `"#ffffff"` | Text color for header title and subtitle. |
| `closeButtonColor` | `string` | `"#ffffff"` | Icon color for the minimize/close button. |

#### `bubbles` Options
| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `userBackground` | `string` | `"#0033a0"` | Background color for end-user message bubbles. |
| `userText` | `string` | `"#ffffff"` | Text color for end-user message bubbles. |
| `agentBackground` | `string` | `"#f0f2f5"` | Background color for agent and bot message bubbles. |
| `agentText` | `string` | `"#1c1e21"` | Text color for agent and bot message bubbles. |
| `systemMessageColor` | `string` | `"#65676b"` | Text color for system status messages (e.g. "Agent connected"). |
| `richMediaBackground` | `string` | `"#ffffff"` | Background color for rich cards, carousels, and quick replies. |
| `richMediaButtonColor` | `string` | `"#0033a0"` | Accent/fill color for interactive card buttons and quick reply pills. |
| `richMediaButtonTextColor`| `string` | `"#ffffff"` | Text color for interactive card buttons and quick reply pills. |
| `timestampColor` | `string` | `"#8a8d91"` | Text color for message timestamps. |

#### `input` Options
| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `placeholderText` | `string` | `"Type a message..."` | Placeholder text inside the message textarea. |
| `backgroundColor` | `string` | `"#ffffff"` | Background color of the footer/input section. |
| `textColor` | `string` | `"#1c1e21"` | Text color inside the message input field. |
| `borderColor` | `string` | `"#e4e6eb"` | Border color around the input field. |
| `sendButtonBackground` | `string` | `"#0033a0"` | Background color of the send button. |
| `sendButtonText` | `string` | `"#ffffff"` | Icon/text color of the send button. |
| `attachmentButtonColor` | `string` | `"#65676b"` | Icon color for file upload attachment button. |

#### `launcher` Options
| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `buttonBackground` | `string` | `"#0033a0"` | Background color of the floating launcher bubble. |
| `iconColor` | `string` | `"#ffffff"` | Icon color inside the floating launcher bubble. |
| `badgeBackground` | `string` | `"#e41e3f"` | Background color for the unread message counter badge. |
| `badgeTextColor` | `string` | `"#ffffff"` | Text color for the unread message counter badge. |

#### `typography` Options
| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `fontFamily` | `string` | `"system-ui, -apple-system, sans-serif"` | CSS font family stack. |
| `baseFontSize` | `string` | `"14px"` | Base font size for message content. |
| `headingFontSize` | `string` | `"16px"` | Font size for header titles. |
| `borderRadius` | `string` | `"12px"` | Border radius for message bubbles and input containers. |

#### `layout` Options
| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `width` | `string` | `"380px"` | Fixed width of the expanded chat window. |
| `height` | `string` | `"600px"` | Fixed height of the expanded chat window. |
| `position` | `string` | `"bottom-right"` | Screen corner alignment (`'bottom-right'` or `'bottom-left'`). |
| `zIndex` | `number` | `99999` | CSS z-index stacking order for the launcher and widget. |
| `boxShadow` | `string` | `"0 8px 24px rgba(0, 0, 0, 0.15)"` | CSS box-shadow string for the open chat window. |