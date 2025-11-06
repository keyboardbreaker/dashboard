export interface SentimentResponse {
    Text: string;
    Compound: number;
    Positive: number;
    Neutral: number;
    Negative: number;
    Label: 'positive' | 'neutral' | 'negative';
}