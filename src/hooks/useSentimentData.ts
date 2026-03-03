import { useState, useEffect } from 'react'
import { SentimentData, Alert, SentimentMetrics } from '@/types/sentiment'

// Mock data generator for realistic sentiment data
const generateMockSentiment = (): SentimentData => {
  const sources = ['twitter', 'facebook', 'instagram', 'google-reviews', 'app-store', 'reddit', 'youtube'] as const
  const sentiments = ['positive', 'negative', 'neutral'] as const
  const urgencies = ['low', 'medium', 'high', 'critical'] as const
  
  const negativeComments = [
    "Terrible customer service, waited 2 hours on hold with no response!",
    "App keeps crashing every time I try to use it. Very frustrating.",
    "Worst experience ever. Product broke after just one week.",
    "Your support team is completely useless. No one cares about customers.",
    "Overpriced and under-delivered. Will never recommend this to anyone.",
    "Website is down again. This happens way too often.",
    "Charged my card twice and support won't respond to my emails.",
    "Product doesn't work as advertised. Total waste of money."
  ]
  
  const positiveComments = [
    "Amazing product! Exceeded all my expectations. Highly recommend!",
    "Customer service was fantastic, resolved my issue in minutes.",
    "Best purchase I've made this year. Quality is outstanding.",
    "Love the new features in the latest update. Great work team!",
    "Fast shipping and excellent packaging. Very impressed.",
    "User-friendly interface and great functionality. Five stars!"
  ]
  
  const neutralComments = [
    "Product is okay, does what it's supposed to do.",
    "Average service, nothing special but gets the job done.",
    "It's fine, could be better but could be worse too.",
    "Standard experience, met basic expectations."
  ]
  
  const authors = [
    "John Smith", "Sarah Johnson", "Mike Wilson", "Emily Brown", "David Lee", 
    "Jessica Garcia", "Chris Miller", "Amanda Davis", "Robert Taylor", "Lisa Anderson"
  ]
  
  const sentiment = sentiments[Math.floor(Math.random() * sentiments.length)]
  let content: string
  
  switch (sentiment) {
    case 'negative':
      content = negativeComments[Math.floor(Math.random() * negativeComments.length)]
      break
    case 'positive':
      content = positiveComments[Math.floor(Math.random() * positiveComments.length)]
      break
    default:
      content = neutralComments[Math.floor(Math.random() * neutralComments.length)]
  }
  
  return {
    id: Math.random().toString(36).substr(2, 9),
    source: sources[Math.floor(Math.random() * sources.length)],
    platform: sources[Math.floor(Math.random() * sources.length)].charAt(0).toUpperCase() + sources[Math.floor(Math.random() * sources.length)].slice(1),
    content,
    author: authors[Math.floor(Math.random() * authors.length)],
    sentiment,
    confidence: Math.random() * 0.4 + 0.6, // 0.6 to 1.0
    urgency: urgencies[Math.floor(Math.random() * urgencies.length)],
    timestamp: new Date(Date.now() - Math.random() * 86400000), // Within last 24 hours
    followers: Math.floor(Math.random() * 10000) + 100,
    engagement: Math.floor(Math.random() * 1000) + 10
  }
}

const generateAlert = (sentimentData: SentimentData): Alert => {
  const alertTypes = ['sentiment', 'volume', 'trending', 'keyword'] as const
  const severities = ['info', 'warning', 'error', 'critical'] as const
  
  const severity = sentimentData.sentiment === 'negative' && sentimentData.urgency === 'critical' 
    ? 'critical' 
    : severities[Math.floor(Math.random() * severities.length)]
  
  const titles = {
    sentiment: 'Negative Sentiment Spike Detected',
    volume: 'High Volume Alert',
    trending: 'Trending Topic Alert',
    keyword: 'Keyword Threshold Exceeded'
  }
  
  const type = alertTypes[Math.floor(Math.random() * alertTypes.length)]
  
  return {
    id: Math.random().toString(36).substr(2, 9),
    type,
    severity,
    title: titles[type],
    message: `${sentimentData.sentiment.toUpperCase()} sentiment detected from ${sentimentData.author} on ${sentimentData.platform}`,
    timestamp: sentimentData.timestamp,
    source: sentimentData.platform,
    data: sentimentData,
    isRead: false,
    suggestedResponse: sentimentData.sentiment === 'negative' 
      ? "Hi [Customer], we sincerely apologize for the inconvenience. We'd love to make this right. Please DM us your order details so we can resolve this immediately."
      : undefined
  }
}

export function useSentimentData() {
  const [sentimentData, setSentimentData] = useState<SentimentData[]>([])
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [metrics, setMetrics] = useState<SentimentMetrics>({
    totalMentions: 0,
    positivePercentage: 0,
    negativePercentage: 0,
    neutralPercentage: 0,
    avgSentimentScore: 0,
    trendingKeywords: [],
    criticalAlerts: 0
  })

  // Initialize with mock data
  useEffect(() => {
    const initialData: SentimentData[] = []
    for (let i = 0; i < 20; i++) {
      initialData.push(generateMockSentiment())
    }
    setSentimentData(initialData)

    const initialAlerts = initialData
      .filter(data => data.sentiment === 'negative' || Math.random() > 0.7)
      .map(generateAlert)
    setAlerts(initialAlerts)
  }, [])

  // Real-time data simulation
  useEffect(() => {
    const interval = setInterval(() => {
      const newData = generateMockSentiment()
      setSentimentData(prev => [newData, ...prev.slice(0, 49)]) // Keep last 50 items

      // Generate alert for negative sentiment
      if (newData.sentiment === 'negative' || (newData.urgency === 'critical' && Math.random() > 0.5)) {
        const newAlert = generateAlert(newData)
        setAlerts(prev => [newAlert, ...prev.slice(0, 19)]) // Keep last 20 alerts
      }
    }, 3000) // New data every 3 seconds

    return () => clearInterval(interval)
  }, [])

  // Calculate metrics
  useEffect(() => {
    const total = sentimentData.length
    if (total === 0) return

    const positive = sentimentData.filter(d => d.sentiment === 'positive').length
    const negative = sentimentData.filter(d => d.sentiment === 'negative').length
    const neutral = sentimentData.filter(d => d.sentiment === 'neutral').length
    const critical = alerts.filter(a => a.severity === 'critical').length

    const avgScore = sentimentData.reduce((acc, d) => {
      return acc + (d.sentiment === 'positive' ? 1 : d.sentiment === 'negative' ? -1 : 0)
    }, 0) / total

    setMetrics({
      totalMentions: total,
      positivePercentage: (positive / total) * 100,
      negativePercentage: (negative / total) * 100,
      neutralPercentage: (neutral / total) * 100,
      avgSentimentScore: avgScore,
      trendingKeywords: ['customer service', 'app crash', 'shipping', 'quality', 'support'],
      criticalAlerts: critical
    })
  }, [sentimentData, alerts])

  const markAlertAsRead = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, isRead: true } : alert
    ))
  }

  return {
    sentimentData,
    alerts,
    metrics,
    markAlertAsRead
  }
}