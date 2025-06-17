// chat.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ChatMessage } from './chat-message.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private messages: ChatMessage[] = [];
  private messagesSubject = new BehaviorSubject<ChatMessage[]>([]);

  messages$ = this.messagesSubject.asObservable();

  addMessage(message: ChatMessage) {
    this.messages.push(message);
    this.messagesSubject.next(this.messages);
  }

  clearMessages() {
    this.messages = [];
    this.messagesSubject.next(this.messages);
  }
}
