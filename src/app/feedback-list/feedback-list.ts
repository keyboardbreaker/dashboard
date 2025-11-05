
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { Feedback } from '../models/feedback.model';
import { Sentiment } from "../models/sentiment.model";
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';
import { FEEDBACK_SERVICE_TOKEN, IFeedbackService } from '../interfaces/feedback.service.interface';

@Component({
  selector: 'app-feedback-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './feedback-list.html',
  styleUrls: ['./feedback-list.scss'],
})
export class FeedbackList implements OnInit {
  feedbackEntries$!: Observable<Feedback[]>;
  private feedbackService: IFeedbackService = inject(FEEDBACK_SERVICE_TOKEN);

  ngOnInit() {
    this.feedbackEntries$ = this.feedbackService.getFeedback();
  }

  getSentimentIcon(sentiment: Sentiment): string {
    switch (sentiment) {
      case 'positive': return '😊';
      case 'neutral': return '😐';
      case 'negative': return '😞';
      default: return '';
    }
  }
}
