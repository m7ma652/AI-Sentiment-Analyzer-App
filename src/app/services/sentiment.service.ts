import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class SentimentService {
  private apiUrl = 'https://api-inference.huggingface.co/models';
  private token = environment.huggingFaceToken;

  constructor(private http: HttpClient) { }

  queryModel(modelName: string, inputs: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });

    const url = `${this.apiUrl}/${modelName}`;
    return this.http.post(url, inputs, { headers });
  }

  analyzeSentiment(text: string): Observable<any> {
    return this.queryModel('cardiffnlp/twitter-roberta-base-sentiment', {
      inputs: text
    });
  }
}