import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { Feedback } from '../models/feedback.model';

export const FEEDBACK_SERVICE_TOKEN = new InjectionToken<IFeedbackService>('FeedbackService');

export interface IFeedbackService {
  getFeedback(): Observable<Feedback[]>;
  addFeedback(feedback: Feedback): void;
  deleteFeedback(id: number): void;
  feedbacks$: Observable<Feedback[]>;
}
