import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FeedbackForm } from './feedback-form/feedback-form';
import { FeedbackList } from './feedback-list/feedback-list';
import { FEEDBACK_SERVICE_TOKEN } from './interfaces/feedback.service.interface';
import { FeedbackService } from './services/feedback.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FeedbackList,
    FeedbackForm,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    HttpClientModule
  ],
  providers: [
    { provide: FEEDBACK_SERVICE_TOKEN, useClass: FeedbackService }
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
}
