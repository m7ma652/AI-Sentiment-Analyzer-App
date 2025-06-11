import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface AnalysisResult {
    text: string;
    result: string;
    timestamp: Date;
}

@Injectable({
    providedIn: 'root'
})
export class AnalysisService {
    private analysisResults = new BehaviorSubject<AnalysisResult[]>([]);

    constructor() {
        // Load saved results from localStorage if they exist
        const savedResults = localStorage.getItem('analysisResults');
        if (savedResults) {
            const parsedResults = JSON.parse(savedResults).map((item: any) => ({
                ...item,
                timestamp: new Date(item.timestamp)
            }));
            this.analysisResults.next(parsedResults);
        }
    }

    getAnalysisResults(): Observable<AnalysisResult[]> {
        return this.analysisResults.asObservable();
    }

    addAnalysisResult(result: AnalysisResult) {
        const currentResults = this.analysisResults.value;
        const updatedResults = [result, ...currentResults];
        this.analysisResults.next(updatedResults);

        // Save to localStorage
        localStorage.setItem('analysisResults', JSON.stringify(updatedResults));
    }

    clearResults() {
        this.analysisResults.next([]);
        localStorage.removeItem('analysisResults');
    }
} 