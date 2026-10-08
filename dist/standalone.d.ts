import { ChatEngineConfig } from './ChatProvider';
interface StandaloneOptions {
    config: ChatEngineConfig;
    theme?: any;
    containerId?: string;
    onMessage?: (message: any) => void;
    onTypingChange?: (isAgentTyping: boolean, participants: any[]) => void;
}
declare function init(options: StandaloneOptions): {
    sendMessage: (text: string) => any;
    sendAttachment: (file: File) => any;
    unmount: () => void;
};
export { init };
