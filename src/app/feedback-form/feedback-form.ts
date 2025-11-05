import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FEEDBACK_SERVICE_TOKEN, IFeedbackService } from '../interfaces/feedback.service.interface';
import { Feedback } from '../models/feedback.model';
import { Sentiment } from '../models/sentiment.model';

@Component({
  selector: 'app-feedback-form',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatInputModule, MatSelectModule, FormsModule],
  providers: [],
  templateUrl: './feedback-form.html',
  styleUrls: ['./feedback-form.scss'],
})

export class FeedbackForm {
  private feedbackService: IFeedbackService = inject(FEEDBACK_SERVICE_TOKEN);

  user = '';
  sentiment: Sentiment = 'positive';
  submitted = false;

  onSubmit() {
    const newFeedback: Feedback = {
      id: 0,
      user: this.user,
      sentiment: this.sentiment,
      date: ''
    };
    this.feedbackService.addFeedback(newFeedback);
    this.submitted = true;
    this.user = '';
    this.sentiment = 'positive';
    setTimeout(() => this.submitted = false, 4000);
  }
}