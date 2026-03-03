import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTime(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }).format(date)
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date)
}

export function getSentimentColor(sentiment: string): string {
  switch (sentiment.toLowerCase()) {
    case 'positive':
      return 'text-green-600 bg-green-50 border-green-200'
    case 'negative':
      return 'text-red-600 bg-red-50 border-red-200'
    case 'neutral':
      return 'text-yellow-600 bg-yellow-50 border-yellow-200'
    default:
      return 'text-gray-600 bg-gray-50 border-gray-200'
  }
}

export function getSentimentScore(sentiment: string): number {
  switch (sentiment.toLowerCase()) {
    case 'positive':
      return Math.random() * 0.4 + 0.6 // 0.6-1.0
    case 'negative':
      return Math.random() * 0.4 // 0.0-0.4
    case 'neutral':
      return Math.random() * 0.2 + 0.4 // 0.4-0.6
    default:
      return 0.5
  }
}