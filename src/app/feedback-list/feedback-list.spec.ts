import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { FEEDBACK_SERVICE_TOKEN } from '../interfaces/feedback.service.interface';
import { Feedback } from '../models/feedback.model';
import { FeedbackList } from './feedback-list';

const mockFeedbacks: Feedback[] = [
    { id: 1, user: 'Alice', comment: 'Great!', sentiment: 'positive', date: '2025-09-07' },
    { id: 2, user: 'Bob', comment: 'Okay', sentiment: 'neutral', date: '2025-09-07' },
    { id: 3, user: 'Carol', comment: 'Bad', sentiment: 'negative', date: '2025-09-07' }
];

describe('FeedbackList', () => {
    let fixture: ComponentFixture<FeedbackList>;
    let component: FeedbackList;
    let mockService: any;

    beforeEach(async () => {
        mockService = {
            getFeedback: () => of(mockFeedbacks)
        };
        await TestBed.configureTestingModule({
            imports: [FeedbackList],
            providers: [
                { provide: FEEDBACK_SERVICE_TOKEN, useValue: mockService },
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(FeedbackList);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render feedback items', () => {
        fixture.detectChanges();
        const html: HTMLElement = fixture.nativeElement;
        // Assert comments
        expect(html.textContent).toContain('Great!');
        expect(html.textContent).toContain('Okay');
        expect(html.textContent).toContain('Bad');
        // Assert user names
        expect(html.textContent).toContain('Alice');
        expect(html.textContent).toContain('Bob');
        expect(html.textContent).toContain('Carol');
    });
});
