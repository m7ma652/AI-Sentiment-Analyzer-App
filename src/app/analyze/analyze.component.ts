import { Component } from '@angular/core';
import { SentimentService } from '../services/sentiment.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'app-analyze',
  standalone: true,
  imports: [FormsModule, CommonModule, CardModule, ProgressSpinnerModule, ButtonModule, InputTextareaModule],
  templateUrl: './analyze.component.html',
  styleUrl: './analyze.component.css'
})
export class AnalyzeComponent {

  textInput: string = '';
  result: any = null;
  loading: boolean = false;
  error: string = '';

  constructor(private sentiment: SentimentService) { }

  analyze() {
    if (!this.textInput.trim()) return;
    this.result = null;
    this.error = '';
    this.loading = true;
    console.log('Sending text for analysis:', this.textInput); // سجل النص المرسل

    this.sentiment.analyzeSentiment(this.textInput).subscribe({
      next: (res: any) => {
        console.log('API Response:', res);
        this.loading = false;

        // تنسيق النتيجة حسب استجابة AssemblyAI
        if (res && res.sentiment) {
          this.result = {
            label: res.sentiment,
            score: res.confidence ? (res.confidence * 100).toFixed(2) + '%' : 'N/A'
          };
        } else {
          this.result = res;
        }
      },
      error: (err) => {
        console.error('API Error:', err);
        this.loading = false;
        this.error = "Something went wrong while analyzing. Please try again.";
      }
    });
  }
}
