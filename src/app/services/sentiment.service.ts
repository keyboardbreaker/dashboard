import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, retry, catchError, of, map } from 'rxjs';
import { SentimentResponse } from '../models/sentiment-response.model';
import { ISentimentService } from '../interfaces/sentiment.service.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SentimentService implements ISentimentService{
  private http = inject(HttpClient);
  private readonly apiUrl = environment.sentimentApiUrl;
  private readonly apiKey = environment.sentimentApiKey;

  getSentiment(text: string): Observable<SentimentResponse> {
    const headers = new HttpHeaders({
      'x-functions-key': this.apiKey,
      'Content-Type': 'application/json',
    });

    return this.http.post<SentimentResponse>(`${this.apiUrl}`, { text }, { headers }).pipe(
        retry({ count: 3, delay: (error, retryCount) => of(retryCount * 500) }),
        catchError((error: HttpErrorResponse) => {
					console.error('Sentiment API failed:', error.message);
          // Return a safe fallback so app keeps running
          return of({
            Text: text,
            Compound: 0,
            Positive: 0,
            Neutral: 1,
            Negative: 0,
            Label: 'neutral'
          } as SentimentResponse);
        })
      );
  }
}
