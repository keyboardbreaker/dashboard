import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FEEDBACK_SERVICE_TOKEN, IFeedbackService } from '../interfaces/feedback.service.interface';
import { Feedback } from '../models/feedback.model';
import { Sentiment } from '../models/sentiment.model';
import { L } from '@angular/cdk/keycodes';

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
  private formBuilder: NonNullableFormBuilder = inject(NonNullableFormBuilder);
  submitted: boolean = false;

  addFeedbackForm = this.formBuilder.group({
    user: this.formBuilder.control<string>('', [Validators.required, Validators.minLength(3)]),
    sentiment: this.formBuilder.control<Sentiment>('positive', [Validators.required]),
    comment: this.formBuilder.control<string>('', [Validators.required, Validators.minLength(3)]),
  })

  onSubmit() {
    const newFeedback: Feedback = {
      id: 0,
      user: this.addFeedbackForm.get('user')!.value as string,
      sentiment: this.addFeedbackForm.get('sentiment')!.value as Sentiment,
      date: '',
      comment: this.addFeedbackForm.get('comment')!.value as string,
    };
    this.feedbackService.addFeedback(newFeedback);
    this.submitted = true;
    this.addFeedbackForm.reset();
    this.addFeedbackForm.markAsPristine();
    this.addFeedbackForm.markAsUntouched();
    setTimeout(() => this.submitted = false, 4000);
  }
}