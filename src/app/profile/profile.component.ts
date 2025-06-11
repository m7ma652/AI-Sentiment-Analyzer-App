import { TagModule } from 'primeng/tag';
import { TableModule } from 'primeng/table';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalysisService, AnalysisResult } from '../services/analysis.service';
import { Subscription } from 'rxjs';

type Severity = 'success' | 'secondary' | 'info' | 'warning' | 'danger' | 'contrast';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [TableModule, CommonModule, TagModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit, OnDestroy {
  analysis: AnalysisResult[] = [];
  private subscription: Subscription;

  constructor(private analysisService: AnalysisService) {
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.subscription = this.analysisService.getAnalysisResults()
      .subscribe(results => {
        this.analysis = results;
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getSeverity(result: string): Severity {
    switch (result.toLowerCase()) {
      case 'positive':
        return 'success';
      case 'negative':
        return 'danger';
      default:
        return 'info';
    }
  }
}
