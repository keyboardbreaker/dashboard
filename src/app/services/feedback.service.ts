import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IFeedbackService } from '../interfaces/feedback.service.interface';
import { Feedback } from '../models/feedback.model';

@Injectable({ providedIn: 'root' })
export class FeedbackService implements IFeedbackService {
  // In-memory store of feedback entries with example data
  private feedbackEntries: Feedback[] = [
    { id: 1, user: 'Anna', comment: 'Great experience!', sentiment: 'positive', date: '2025-08-29' },
    { id: 2, user: 'Barry', comment: 'Could be better.', sentiment: 'neutral', date: '2025-08-28' },
    { id: 3, user: 'Charlie', comment: 'Not satisfied.', sentiment: 'negative', date: '2025-08-27' }
  ];

  private feedbackSubject: BehaviorSubject<Feedback[]> = new BehaviorSubject<Feedback[]>(this.feedbackEntries);
  feedbacks$ = this.feedbackSubject.asObservable();

  getFeedback(): Observable<Feedback[]> {
    return this.feedbackSubject.asObservable();
  }

  addFeedback(feedback: Feedback) {
    feedback.id = this.feedbackEntries.length > 0 ? Math.max(...this.feedbackEntries.map(e => e.id)) + 1 : 1;
    feedback.date = new Date().toISOString().slice(0, 10);
    this.feedbackEntries = [feedback, ...this.feedbackSubject.value];
    this.feedbackSubject.next(this.feedbackEntries);
  }

  deleteFeedback(id: number) {
    throw new Error('Method not implemented.');
  }
}
