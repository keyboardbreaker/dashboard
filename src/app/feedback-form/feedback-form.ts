import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { NonNullableFormBuilder, FormsModule, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FEEDBACK_SERVICE_TOKEN, IFeedbackService } from '../interfaces/feedback.service.interface';
import { Feedback } from '../models/feedback.model';
import { Sentiment } from '../models/sentiment.model';
import { ISentimentService, SENTIMENT_SERVICE_TOKEN } from '../interfaces/sentiment.service.interface';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs';
import { SentimentResponse } from '../models/sentiment-response.model';
import { SentimentService } from '../services/sentiment.service';

@Component({
  selector: 'app-feedback-form',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [{ provide: SENTIMENT_SERVICE_TOKEN, useClass: SentimentService }],
  templateUrl: './feedback-form.html',
  styleUrls: ['./feedback-form.scss'],
})
export class FeedbackForm implements OnInit {
  private feedbackService: IFeedbackService = inject(FEEDBACK_SERVICE_TOKEN);
  private sentimentService: ISentimentService = inject(SENTIMENT_SERVICE_TOKEN);
  private formBuilder = inject(NonNullableFormBuilder);
  submitted: boolean = false;

  addFeedbackForm: FormGroup = this.formBuilder.group({
    user: this.formBuilder.control<string>('', [Validators.required, Validators.minLength(3)]),
    sentiment: this.formBuilder.control<Sentiment>('positive', [Validators.required]),
    comment: this.formBuilder.control<string>('', [Validators.required, Validators.minLength(3)]),
  });

  ngOnInit() {
    this.addFeedbackForm.get('comment')!.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      filter(text => text.length >= 3),
      switchMap(text => this.sentimentService.getSentiment(text))
    ).subscribe((response: SentimentResponse) => {
      this.addFeedbackForm.get('sentiment')!.setValue(response.Label as Sentiment);
    });
  }

  onSubmit() {
    const newFeedback: Feedback = {
      id: 0,
      user: this.addFeedbackForm.get('user')!.value!,
      sentiment: this.addFeedbackForm.get('sentiment')!.value!,
      date: '',
      comment: this.addFeedbackForm.get('comment')!.value!,
    };

    this.feedbackService.addFeedback(newFeedback);
    this.submitted = true;
    this.addFeedbackForm.reset();
    this.addFeedbackForm.markAsPristine();
    this.addFeedbackForm.markAsUntouched();

    Object.keys(this.addFeedbackForm.controls).forEach((key) => {
      const control = this.addFeedbackForm.get(key);
      control?.setErrors(null);
    });
    setTimeout(() => (this.submitted = false), 4000);
  }
}
