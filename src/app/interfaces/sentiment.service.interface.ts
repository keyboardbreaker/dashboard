import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export const SENTIMENT_SERVICE_TOKEN = new InjectionToken<ISentimentService>('SentimentService');

export interface ISentimentService {
  getSentiment(text: string): Observable<any>;
}
