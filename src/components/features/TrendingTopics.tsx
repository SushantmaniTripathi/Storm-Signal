import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Hash, 
  TrendingUp, 
  TrendingDown,
  Flame
} from 'lucide-react'

interface TrendingTopicsProps {
  keywords: string[]
}

export default function TrendingTopics({ keywords }: TrendingTopicsProps) {
  // Generate trending data for keywords
  const trendingData = keywords.map((keyword, index) => ({
    keyword,
    mentions: Math.floor(Math.random() * 500) + 50,
    change: (Math.random() - 0.5) * 100, // -50% to +50%
    sentiment: Math.random() > 0.5 ? 'positive' : 'negative',
    volume: Math.random() * 100
  })).sort((a, b) => b.mentions - a.mentions)

  const hotTopics = [
    { topic: 'App Crashes', mentions: 156, sentiment: 'negative', change: 45 },
    { topic: 'Customer Service', mentions: 124, sentiment: 'negative', change: 23 },
    { topic: 'Fast Delivery', mentions: 98, sentiment: 'positive', change: -12 },
    { topic: 'User Interface', mentions: 87, sentiment: 'positive', change: 18 },
    { topic: 'Pricing', mentions: 76, sentiment: 'neutral', change: 8 }
  ]

  return (
    <Card className="animate-fadeInUp">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Flame className="w-5 h-5 text-orange-500" />
          <span>Trending Topics</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Hot Topics */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
              <Hash className="w-4 h-4 mr-1" />
              Hot Topics (24h)
            </h4>
            <div className="space-y-3">
              {hotTopics.map((topic, index) => (
                <div
                  key={topic.topic}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg animate-fadeInUp"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-gray-900 text-sm">
                        #{topic.topic.replace(' ', '').toLowerCase()}
                      </span>
                      <Badge variant={
                        topic.sentiment === 'positive' ? 'default' : 
                        topic.sentiment === 'negative' ? 'destructive' : 'secondary'
                      }>
                        {topic.mentions} mentions
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Progress 
                        value={Math.min((topic.mentions / 200) * 100, 100)} 
                        className="flex-1 h-2"
                      />
                      <div className={`flex items-center text-xs ${
                        topic.change > 0 ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {topic.change > 0 ? (
                          <TrendingUp className="w-3 h-3 mr-1" />
                        ) : (
                          <TrendingDown className="w-3 h-3 mr-1" />
                        )}
                        {Math.abs(topic.change)}%
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Keywords Cloud */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">
              Keyword Activity
            </h4>
            <div className="flex flex-wrap gap-2">
              {trendingData.slice(0, 8).map((item, index) => (
                <Badge
                  key={item.keyword}
                  variant="outline"
                  className={`animate-fadeInUp ${
                    item.sentiment === 'positive' 
                      ? 'border-green-300 text-green-700 bg-green-50' 
                      : 'border-red-300 text-red-700 bg-red-50'
                  }`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  #{item.keyword.replace(' ', '').toLowerCase()}
                  <span className="ml-1 text-xs">
                    {item.mentions}
                  </span>
                </Badge>
              ))}
            </div>
          </div>

          {/* Sentiment Breakdown */}
          <div className="pt-4 border-t">
            <h4 className="text-sm font-medium text-gray-700 mb-3">
              Topic Sentiment Distribution
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-green-600">Positive Topics</span>
                <span className="font-medium">42%</span>
              </div>
              <Progress value={42} className="h-2" />
              
              <div className="flex justify-between text-sm">
                <span className="text-red-600">Negative Topics</span>
                <span className="font-medium">35%</span>
              </div>
              <Progress value={35} className="h-2" />
              
              <div className="flex justify-between text-sm">
                <span className="text-yellow-600">Neutral Topics</span>
                <span className="font-medium">23%</span>
              </div>
              <Progress value={23} className="h-2" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}