import { Component } from '@angular/core';
import { SentimentService } from '../services/sentiment.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Message {
  sender: 'user' | 'bot';
  content: string;
}

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ChatbotComponent {
  messages: Message[] = [];
  inputMessage: string = '';
  currentStep: 'normal' | 'awaitingAnswer' | 'awaitingDetails' = 'normal';

  // ✅ ردود عشوائية لكل نوع مشاعر
  positiveReplies = [
    "That's awesome! 😊 What made you happy?",
    "I'm glad to hear that! Tell me more!",
    "Great to hear! What happened exactly?",
    "Wow! Sounds like a good day 😄"
  ];

  neutralReplies = [
    "I see. Tell me more if you’d like.",
    "Hmm okay, feel free to continue.",
    "Alright, I'm listening!",
    "Okay, what else is on your mind?"
  ];

  negativeReplies = [
    "I'm sorry to hear that. Would you like to talk more about what happened? (yes/no)",
    "That sounds tough. Want to share more?",
    "I’m here to listen, want to continue? (yes/no)",
    "Do you feel like talking about it more? (yes/no)"
  ];

  constructor(private sentimentService: SentimentService) { }

  sendMessage() {
    const text = this.inputMessage.trim();
    if (!text) return;

    this.messages.push({ sender: 'user', content: text });
    const lower = text.toLowerCase();

    // ✅ لو رسالة ترحيب
    if (this.isGreeting(lower)) {
      this.messages.push({
        sender: 'bot',
        content: this.getGreetingReply()
      });
      this.inputMessage = '';
      return;
    }

    // ✅ لو المستخدم في مرحلة الإجابة على سؤال سابق
    if (this.currentStep === 'awaitingAnswer') {
      if (lower.includes('yes')) {
        this.messages.push({ sender: 'bot', content: "What exactly bothered you the most today?" });
        this.currentStep = 'awaitingDetails';
      } else if (lower.includes('no')) {
        this.messages.push({ sender: 'bot', content: "Okay, I'm always here if you change your mind." });
        this.currentStep = 'normal';
      }
      this.inputMessage = '';
      return;
    }

    // ✅ المستخدم بيشرح تفاصيل بعد السؤال
    if (this.currentStep === 'awaitingDetails') {
      this.messages.push({
        sender: 'bot',
        content: "Thanks for sharing. I'm listening. How did that make you feel?"
      });
      this.currentStep = 'normal';
      this.inputMessage = '';
      return;
    }

    // ✅ تحليل المشاعر
    this.sentimentService.analyzeSentiment(text).subscribe(result => {
      const type = result.sentiment?.type;
      let reply = '';

      if (type === 'negative') {
        const i = Math.floor(Math.random() * this.negativeReplies.length);
        reply = this.negativeReplies[i];
        this.currentStep = 'awaitingAnswer';
      } else if (type === 'positive') {
        const i = Math.floor(Math.random() * this.positiveReplies.length);
        reply = this.positiveReplies[i];
      } else {
        const i = Math.floor(Math.random() * this.neutralReplies.length);
        reply = this.neutralReplies[i];
      }

      this.messages.push({ sender: 'bot', content: reply });
      this.inputMessage = '';
    });
  }

  // ✅ دالة تتحقق من الرسائل الترحيبية
  isGreeting(message: string): boolean {
    const greetings = ['hi', 'hello', 'hey', 'السلام عليكم', 'good morning', 'good evening', 'hola'];
    return greetings.some(greet => message.includes(greet));
  }

  // ✅ رد ترحيبي عشوائي
  getGreetingReply(): string {
    const replies = [
      "Hello there! 👋 How are you feeling today?",
      "Hi! I'm FeelBot. Want to talk?",
      "Hey hey! I'm here to listen.",
      "Welcome! Ready to share how your day is going?",
      "وعليكم السلام! إزيك؟ 😄"
    ];
    return replies[Math.floor(Math.random() * replies.length)];
  }
}
