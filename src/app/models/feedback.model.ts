import { Sentiment } from "./sentiment.model";

export interface Feedback {
  id: number;
  user: string;
  comment?: string;
  sentiment: Sentiment;
  date: string;
  score?: number;
}
