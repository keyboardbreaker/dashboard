import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
  imports: [CommonModule, MatCardModule, MatButtonModule, MatInputModule, MatSelectModule, FormsModule, ReactiveFormsModule],
  providers: [],
  templateUrl: './feedback-form.html',
  styleUrls: ['./feedback-form.scss'],
})

export class FeedbackForm {
  private feedbackService: IFeedbackService = inject(FEEDBACK_SERVICE_TOKEN);
  private formBuilder = inject(FormBuilder);
  submitted = false;

  addFeedbackForm = this.formBuilder.group({
    user: [''],
    sentiment: this.formBuilder.control<Sentiment>('positive')
  })

  onSubmit() {
    const newFeedback: Feedback = {
      id: 0,
      user: this.addFeedbackForm.get('user')!.value as string,
      sentiment: this.addFeedbackForm.get('sentiment')!.value as Sentiment,
      date: ''
    };
    this.feedbackService.addFeedback(newFeedback);
    this.submitted = true;
    this.addFeedbackForm.get('user')?.reset();
    this.addFeedbackForm.get('sentiment')?.reset();
    setTimeout(() => this.submitted = false, 4000);
  }
}