// chat-message.model.ts
export interface ChatMessage {
    sender: 'user' | 'bot';
    text: string;
    timestamp: string;
}
