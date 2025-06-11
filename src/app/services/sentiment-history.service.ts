import { Injectable } from '@angular/core';
import { SentimentResult } from '../sentiment-result'
@Injectable({
  providedIn: 'root'
})
export class SentimentHistoryService {
  private storageKey = 'sentiment_history';


  addResult(result: SentimentResult) {
    const existing = this.getHistory();
    existing.unshift(result); // نضيف في البداية
    localStorage.setItem(this.storageKey, JSON.stringify(existing.slice(0, 5))); // نخزن آخر 5 فقط
  }

  getHistory(): SentimentResult[] {
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : [];
  }
}
