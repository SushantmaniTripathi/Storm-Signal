export interface SentimentData {
  id: string
  source: 'twitter' | 'facebook' | 'instagram' | 'google-reviews' | 'app-store' | 'reddit' | 'youtube'
  platform: string
  content: string
  author: string
  sentiment: 'positive' | 'negative' | 'neutral'
  confidence: number
  urgency: 'low' | 'medium' | 'high' | 'critical'
  timestamp: Date
  url?: string
  location?: string
  followers?: number
  engagement?: number
}

export interface Alert {
  id: string
  type: 'sentiment' | 'volume' | 'trending' | 'keyword'
  severity: 'info' | 'warning' | 'error' | 'critical'
  title: string
  message: string
  timestamp: Date
  source: string
  data: SentimentData
  isRead: boolean
  suggestedResponse?: string
}

export interface SentimentMetrics {
  totalMentions: number
  positivePercentage: number
  negativePercentage: number
  neutralPercentage: number
  avgSentimentScore: number
  trendingKeywords: string[]
  criticalAlerts: number
}

export interface ResponseSuggestion {
  id: string
  type: 'acknowledgment' | 'apology' | 'solution' | 'escalation'
  template: string
  tone: 'professional' | 'empathetic' | 'assertive'
  urgency: 'immediate' | 'within-hour' | 'within-day'
}