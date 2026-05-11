import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  TrendingUp, 
  TrendingDown, 
  MessageSquare, 
  Zap,
  Heart,
  Meh,
  Frown,
  Cloud
} from 'lucide-react'
import { SentimentMetrics } from '@/types/sentiment'

interface MetricCardsProps {
  metrics: SentimentMetrics
}

export default function MetricCards({ metrics }: MetricCardsProps) {
  const cards = [
    {
      title: 'Total Mentions',
      value: metrics.totalMentions.toLocaleString(),
      icon: MessageSquare,
      trend: '+12%',
      trendUp: true,
      className: 'bg-blue-50 border-blue-200'
    },
    {
      title: 'Positive Sentiment',
      value: `${metrics.positivePercentage.toFixed(1)}%`,
      icon: Heart,
      trend: '+5.2%',
      trendUp: true,
      className: 'bg-green-50 border-green-200'
    },
    {
      title: 'Negative Sentiment',
      value: `${metrics.negativePercentage.toFixed(1)}%`,
      icon: Frown,
      trend: '-2.1%',
      trendUp: false,
      className: 'bg-red-50 border-red-200'
    },
    {
      title: 'Storm Alerts',
      value: metrics.criticalAlerts.toString(),
      icon: Zap,
      trend: 'Active',
      trendUp: false,
      className: 'bg-gradient-to-br from-orange-50 to-red-50 border-orange-200 glow-effect',
      badge: true
    }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <Card key={index} className={`${card.className} animate-fadeInUp hover:transform hover:scale-105 transition-all duration-300`} style={{ animationDelay: `${index * 0.1}s` }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">
              {card.title}
            </CardTitle>
            <card.icon className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-gray-900">
                {card.value}
              </div>
              {card.badge ? (
                <Badge variant={card.trendUp ? "default" : "destructive"}>
                  {card.trend}
                </Badge>
              ) : (
                <div className={`flex items-center text-xs ${
                  card.trendUp ? 'text-green-600' : 'text-red-600'
                }`}>
                  {card.trendUp ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  {card.trend}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}