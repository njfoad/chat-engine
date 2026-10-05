# Omni Chat Headless SDK

A reusable, headless React context engine that abstracts the Avaya Infinity Omni SDK. It manages real-time network events, the JWT authentication lifecycle, session timeouts, and message history, exposing pure state and methods for completely custom UI development.

## Installation

Because this package is hosted privately via Git, install it directly from the repository.

```bash
npm install git+[https://github.com/njfoad/chat-engine.git](https://github.com/njfoad/chat-engine.git)
```

## Quick Start

Wrap your chat interface in the `<ChatProvider>` and pass it your Avaya configuration, including an asynchronous function to fetch a secure JWT from your backend.

```tsx
import { ChatProvider } from 'chat-engine';
import { ChatInterface } from './ChatInterface';

const config = {
  host: "example.avaya-infinity.com",
  integrationId: "abc-123",
  displayName: "Guest User",
  fetchJwt: async () => {
    // Proxy through your secure backend to protect the Avaya client_secret
    const res = await fetch('/api/token', { headers: { 'x-api-key': 'your-key' } });
    const data = await res.json();
    return data.access_token;
  }
};

export default function App() {
  return (
    <ChatProvider config="{config}">
      <ChatInterface/>
    </ChatProvider>
  );
}
```

## API Reference

### 1. `ChatProvider` Config Interface

| Property | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| **`host`** | `string` | Yes | The base URL of your Avaya Infinity platform instance. |
| **`integrationId`** | `string` | Yes | The unique identifier of the Web Chat Integration configured in Avaya. |
| **`displayName`** | `string` | Yes | The name of the user as it should appear to the Contact Center agent. |
| **`fetchJwt`** | `() => Promise<string>` | Yes | Async function returning a valid JWT. Called on initialization and 3 minutes before token expiry. |
| **`logLevel`** | `LogLevel` | No | Overrides the default internal logging verbosity (`LogLevel.WARN`). |

### 2. `useChat` Hook State & Methods

Call `useChat()` inside any component wrapped by `ChatProvider` to build your UI.

**State**
*   `messages` (`any[]`): Chronological array of chat messages.
*   `isConnecting` (`boolean`): `true` when initializing or establishing the Avaya event stream.
*   `connectionError` (`string | null`): Network or initialization error details.
*   `typingParticipants` (`string[]`): Array of remote agent display names currently typing.

**Methods**
*   `sendMessage(text: string): Promise<void>`: Sends a plain text message.
*   `sendAttachment(file: File, text?: string): Promise<void>`: Uploads a file attachment.
*   `notifyTyping(): void`: Broadcasts a typing indicator beacon to the remote agent.
*   `loadMoreHistory(): Promise<void>`: Fetches and prepends the previous page of historical messages.