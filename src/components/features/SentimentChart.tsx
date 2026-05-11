import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { SentimentData } from '@/types/sentiment'
import { formatTime } from '@/lib/utils'
import { TrendingUp } from 'lucide-react'

interface SentimentChartProps {
  data: SentimentData[]
}

export default function SentimentChart({ data }: SentimentChartProps) {
  // Process data for chart - group by hour
  const processedData = data.reduce((acc, item) => {
    const hour = new Date(item.timestamp).getHours()
    const timeKey = `${hour}:00`
    
    if (!acc[timeKey]) {
      acc[timeKey] = {
        time: timeKey,
        positive: 0,
        negative: 0,
        neutral: 0,
        total: 0
      }
    }
    
    acc[timeKey][item.sentiment]++
    acc[timeKey].total++
    
    return acc
  }, {} as Record<string, any>)

  const chartData = Object.values(processedData)
    .sort((a, b) => parseInt(a.time) - parseInt(b.time))
    .slice(-12) // Last 12 hours

  // Calculate sentiment percentages for the period
  const totalSentiments = data.reduce((acc, item) => {
    acc[item.sentiment]++
    return acc
  }, { positive: 0, negative: 0, neutral: 0 })

  const totalCount = data.length
  const sentimentPercentages = {
    positive: totalCount > 0 ? (totalSentiments.positive / totalCount) * 100 : 0,
    negative: totalCount > 0 ? (totalSentiments.negative / totalCount) * 100 : 0,
    neutral: totalCount > 0 ? (totalSentiments.neutral / totalCount) * 100 : 0
  }

  return (
    <Card className="animate-fadeInUp">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">
            Sentiment Trends
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-green-600 border-green-200">
              <TrendingUp className="w-3 h-3 mr-1" />
              +15% positive
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="text-2xl font-bold text-green-700">
              {sentimentPercentages.positive.toFixed(1)}%
            </div>
            <div className="text-sm text-green-600">Positive</div>
          </div>
          <div className="text-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="text-2xl font-bold text-yellow-700">
              {sentimentPercentages.neutral.toFixed(1)}%
            </div>
            <div className="text-sm text-yellow-600">Neutral</div>
          </div>
          <div className="text-center p-3 bg-red-50 rounded-lg border border-red-200">
            <div className="text-2xl font-bold text-red-700">
              {sentimentPercentages.negative.toFixed(1)}%
            </div>
            <div className="text-sm text-red-600">Negative</div>
          </div>
        </div>

        {/* Line Chart */}
        <div className="h-64 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="time" 
                stroke="#666"
                fontSize={12}
              />
              <YAxis stroke="#666" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="positive" 
                stroke="#10b981" 
                strokeWidth={2}
                dot={{ fill: '#10b981', r: 4 }}
                name="Positive"
              />
              <Line 
                type="monotone" 
                dataKey="negative" 
                stroke="#ef4444" 
                strokeWidth={2}
                dot={{ fill: '#ef4444', r: 4 }}
                name="Negative"
              />
              <Line 
                type="monotone" 
                dataKey="neutral" 
                stroke="#f59e0b" 
                strokeWidth={2}
                dot={{ fill: '#f59e0b', r: 4 }}
                name="Neutral"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Volume Chart */}
        <div className="h-32">
          <div className="text-sm font-medium text-gray-700 mb-2">
            Mention Volume (Last 12 Hours)
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="time" stroke="#666" fontSize={10} />
              <YAxis stroke="#666" fontSize={10} />
              <Tooltip />
              <Bar dataKey="total" fill="#3b82f6" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}