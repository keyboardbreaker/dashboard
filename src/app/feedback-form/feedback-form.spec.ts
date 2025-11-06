import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { FeedbackForm } from './feedback-form';
import { FEEDBACK_SERVICE_TOKEN, IFeedbackService } from '../interfaces/feedback.service.interface';
import { Observable } from 'rxjs';
import { Feedback } from '../models/feedback.model';
import { provideHttpClient } from '@angular/common/http';

const mockFeedbackService: IFeedbackService = {
	feedbacks$: new Observable<Feedback[]>(),
	getFeedback: jasmine.createSpy('getFeedback').and.returnValue(new Observable<Feedback[]>()),
	addFeedback: jasmine.createSpy('addFeedback'),
	deleteFeedback: jasmine.createSpy('deleteFeedback'),
};

describe('FeedbackFormComponent', () => {
	let component: FeedbackForm;
  let fixture: ComponentFixture<FeedbackForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FeedbackForm],
      providers: [
        provideHttpClient(),
        { provide: FEEDBACK_SERVICE_TOKEN, useValue: mockFeedbackService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FeedbackForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render form controls', () => {
    const userInput = fixture.nativeElement.querySelector('input[formControlName="user"]');
    const sentimentSelect = fixture.nativeElement.querySelector('mat-select[formControlName="sentiment"]');
    const commentInput = fixture.nativeElement.querySelector('input[formControlName="comment"]');
    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]'));

    expect(userInput).toBeTruthy();
    expect(sentimentSelect).toBeTruthy();
    expect(commentInput).toBeTruthy();
    expect(submitButton).toBeTruthy();
  });

  it('should show validation error when user is touched and empty', () => {
    const userControl = component.addFeedbackForm.get('user')!;
    userControl.markAsTouched();
    userControl.setValue('');
    fixture.detectChanges();

    const errorMsg = fixture.nativeElement.querySelector('mat-error');
    expect(errorMsg.textContent).toContain('User is required');
  });

  it('should reset form when valid and not when invalid', () => {
    component.addFeedbackForm.setValue({ user: '', sentiment: 'positive', comment: 'I enjoyed the experience' });
    component.onSubmit();
    expect(component.addFeedbackForm.value.user).toBe('');
  

    component.addFeedbackForm.setValue({ user: 'Alice', sentiment: 'negative', comment: 'I disliked the experience' });
    component.onSubmit();
  
    expect(component.addFeedbackForm.value).toEqual({
      user: '',
      sentiment: 'positive',
      comment:  ''
    });
    expect(component.addFeedbackForm.pristine).toBeTrue();
    expect(component.addFeedbackForm.untouched).toBeTrue();
  });
});
