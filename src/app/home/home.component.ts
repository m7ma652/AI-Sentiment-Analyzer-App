import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  textInput: string = '';
  sentimentResult: string = '';
  confidence: number = 0;
  showResult: boolean = false;

  analyzeSentiment() {
    const text = this.textInput.toLowerCase();
    if (text.includes('happy') || text.includes('good')) {
      this.sentimentResult = 'Positive 😊';
      this.confidence = 85;
    } else if (text.includes('bad') || text.includes('sad')) {
      this.sentimentResult = 'Negative 😞';
      this.confidence = 80;
    } else {
      this.sentimentResult = 'Neutral 😐';
      this.confidence = 60;
    }
    this.showResult = true;
  }
}
