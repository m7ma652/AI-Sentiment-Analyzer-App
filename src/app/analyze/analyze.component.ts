import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SentimentService } from '../services/sentiment.service';
import { AnalysisService } from '../services/analysis.service';
import { NgZone } from '@angular/core';

// import { SentimentHistoryService } from './../services/sentiment-history.service';


@Component({
  selector: 'app-analyze',
  standalone: true,
  imports: [FormsModule, CommonModule, CardModule, ProgressSpinnerModule, ButtonModule, InputTextareaModule],
  templateUrl: './analyze.component.html',
  styleUrl: './analyze.component.css'
})
export class AnalyzeComponent {
  result: string | null = null;
  isLoading: boolean = false;
  errorMessage: string | null = null;
  text: string = '';

  constructor(
    private sentiment: SentimentService,
    private analysisService: AnalysisService,
    private ngZone: NgZone
  ) { }

  analyzeText(text: string) {
    this.isLoading = true;
    this.errorMessage = null;
    this.result = null;

    const englishTextPattern = /^[a-zA-Z0-9\s.,!?;:'"()&\-—_’‘]+$/;

    if (!text || text.trim() === '') {
      this.errorMessage = 'Please enter some text to analyze.';
      this.isLoading = false;
      return; // توقف عن التنفيذ إذا كان النص فارغًا
    }

    if (!englishTextPattern.test(text)) {
      this.errorMessage = 'Please enter English text only.';
      this.isLoading = false;
      return; // توقف عن التنفيذ إذا لم يكن النص إنجليزيًا
    }

    this.sentiment.analyzeSentiment(text).subscribe(
      response => {
        // Logging the raw response to confirm its structure
        console.log('Raw API Response:', response);

        // *** التغيير الأساسي هنا: نصل إلى المصفوفة الداخلية أولاً ***
        if (response && Array.isArray(response) && response.length > 0 && Array.isArray(response[0]) && response[0].length > 0) {
          const innerArray = response[0]; // هذه هي المصفوفة التي تحتوي على كائنات التسميات

          const mostLikely = innerArray.reduce((prev: any, current: any) => {
            return (prev.score > current.score) ? prev : current;
          });

          console.log('Full mostLikely object (after proper access):', mostLikely);
          console.log('Type of mostLikely.label (after proper access):', typeof mostLikely.label);
          console.log('Value of mostLikely.label (JSON stringified, after proper access):', JSON.stringify(mostLikely.label));
          let sentimentLabel = '';
          switch (mostLikely.label) {
            case 'LABEL_0':
              setTimeout(() => {
                this.ngZone.run(() => {
                  this.result = 'Negative 😞';
                  this.text = '';
                });
              }, 500);
              sentimentLabel = 'Negative';
              break;

            case 'LABEL_1':
              setTimeout(() => {
                this.ngZone.run(() => {
                  this.result = 'Neutral 😐';
                  this.text = '';
                });
              }, 500);
              sentimentLabel = 'Neutral';
              break;
            case 'LABEL_2':
              setTimeout(() => {
                this.ngZone.run(() => {
                  this.result = 'Positive 😊';
                  this.text = '';
                });
              }, 500);
              sentimentLabel = 'Positive';
              break;
            default:
              this.result = 'Unknown Sentiment';
              sentimentLabel = 'Unknown';
          }

          // Save the analysis result
          this.analysisService.addAnalysisResult({
            text: text,
            result: sentimentLabel,
            timestamp: new Date()
          });
        } else {
          this.result = 'No sentiment detected or invalid response format.';
        }
        this.isLoading = false;
      },
      error => {
        console.error('Error:', error);
        this.errorMessage = 'Failed to analyze sentiment. Please try again.';
        this.result = null;
        this.isLoading = false;

      }
    );
  }
}