import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FeedbackForm } from './feedback-form/feedback-form';
import { FeedbackList } from './feedback-list/feedback-list';
import { FEEDBACK_SERVICE_TOKEN } from './interfaces/feedback.service.interface';
import { FeedbackService } from './services/feedback.service';

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MatCardModule,
		MatButtonModule,
		MatInputModule,
		MatSelectModule,
		HttpClientModule,
		FeedbackForm,
		FeedbackList
	],
	exports: [FeedbackForm, FeedbackList],
	providers: [
		{ provide: FEEDBACK_SERVICE_TOKEN, useClass: FeedbackService },
	]
})
export class FeedbackModule { }
