import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SentimentService {
  private apiUrl = "https://corsproxy.io/?https://api.assemblyai.com/v2/sentiment";
  private apiKey = "aac8cff9504b4844bf130b8e3fefe7c6";

  constructor(private http: HttpClient) { }

  analyzeSentiment(text: string) {
    const headers = new HttpHeaders({
      'Authorization': this.apiKey,
      'Content-Type': 'application/json'
    });

    const body = { text: text };
    return this.http.post(this.apiUrl, body, { headers });
  }
}
