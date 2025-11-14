export interface Email {
  id: string;
  sender: string;
  subject: string;
  body: string;
  timestamp: string;
}

export enum EmailCategory {
  COMPLAINT = 'Complaint',
  MISSED_SLOT = 'Missed Slot/Appointment',
  URGENT = 'Urgent',
  REMINDER = 'Reminder',
  GENERAL = 'General Information',
  UNKNOWN = 'Unknown',
}

export enum Sentiment {
  POSITIVE = 'Positive',
  NEGATIVE = 'Negative',
  NEUTRAL = 'Neutral',
}

export interface ClassificationResult {
  category: EmailCategory;
  summary: string;
  keywords: string[];
  sentiment: Sentiment;
}

export interface ClassifiedEmail extends Email {
  classification: ClassificationResult;
  calendarEventId?: string;
  calendarEventTitle?: string;
}

export interface DashboardStats {
  totalEmails: number;
  categoryCounts: Record<EmailCategory, number>;
  sentimentCounts: Record<Sentiment, number>;
  complaintTrend: number;
  missedSlots: number;
}