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
*   **Easy Mode (`auth`):** Provide your API key and user details. The engine will securely query the default Avaya NJF endpoint under the hood.
*   **Power User (`fetchJwt`):** If you route authentication through your own custom proxy backend, omit `auth` and pass a custom async function returning a JWT string to `fetchJwt`.

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

## Advanced: Headless Mode

If you need to completely replace the chat UI, bypass `AvayaChatWidget` and use `ChatProvider` combined with the `useChat` hook. This exposes raw SDK methods and reactive message arrays while handling the background socket connections.

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