import { useSentimentData } from '@/hooks/useSentimentData'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts'
import { 
  TrendingUp, 
  Download, 
  Calendar,
  Filter,
  BarChart3,
  PieChart as PieChartIcon,
  Activity
} from 'lucide-react'

export default function Analytics() {
  const { sentimentData, metrics } = useSentimentData()

  // Process data for various charts
  const dailyData = sentimentData.reduce((acc, item) => {
    const day = item.timestamp.toDateString()
    if (!acc[day]) {
      acc[day] = { date: day, positive: 0, negative: 0, neutral: 0 }
    }
    acc[day][item.sentiment]++
    return acc
  }, {} as Record<string, any>)

  const chartData = Object.values(dailyData).slice(-7) // Last 7 days

  const platformData = sentimentData.reduce((acc, item) => {
    if (!acc[item.platform]) {
      acc[item.platform] = { platform: item.platform, mentions: 0, positive: 0, negative: 0, neutral: 0 }
    }
    acc[item.platform].mentions++
    acc[item.platform][item.sentiment]++
    return acc
  }, {} as Record<string, any>)

  const platformChartData = Object.values(platformData)

  const sentimentPieData = [
    { name: 'Positive', value: metrics.positivePercentage, color: '#10b981' },
    { name: 'Negative', value: metrics.negativePercentage, color: '#ef4444' },
    { name: 'Neutral', value: metrics.neutralPercentage, color: '#f59e0b' }
  ]

  const hourlyData = sentimentData.reduce((acc, item) => {
    const hour = item.timestamp.getHours()
    const timeSlot = `${hour}:00`
    if (!acc[timeSlot]) {
      acc[timeSlot] = { time: timeSlot, mentions: 0 }
    }
    acc[timeSlot].mentions++
    return acc
  }, {} as Record<string, any>)

  const hourlyChartData = Object.values(hourlyData)
    .sort((a, b) => parseInt(a.time) - parseInt(b.time))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Analytics Dashboard
          </h1>
          <p className="text-gray-500 mt-1">
            Deep insights into customer sentiment patterns and trends
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-1" />
            Last 30 Days
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-1" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-1" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BarChart3 className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Avg. Daily Mentions</p>
                <p className="text-xl font-bold">{Math.round(metrics.totalMentions / 7)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Sentiment Score</p>
                <p className="text-xl font-bold">{(metrics.avgSentimentScore * 100).toFixed(0)}/100</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <PieChartIcon className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Top Platform</p>
                <p className="text-xl font-bold">
                  {platformChartData.sort((a, b) => b.mentions - a.mentions)[0]?.platform || 'N/A'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Activity className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Response Rate</p>
                <p className="text-xl font-bold">94%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Sentiment Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Sentiment Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="positive" stroke="#10b981" strokeWidth={2} name="Positive" />
                  <Line type="monotone" dataKey="negative" stroke="#ef4444" strokeWidth={2} name="Negative" />
                  <Line type="monotone" dataKey="neutral" stroke="#f59e0b" strokeWidth={2} name="Neutral" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Sentiment Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Sentiment Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sentimentPieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {sentimentPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value.toFixed(1)}%`, 'Percentage']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Platform Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Platform Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={platformChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="platform" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="positive" stackId="a" fill="#10b981" name="Positive" />
                  <Bar dataKey="neutral" stackId="a" fill="#f59e0b" name="Neutral" />
                  <Bar dataKey="negative" stackId="a" fill="#ef4444" name="Negative" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Hourly Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Hourly Activity Pattern</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={hourlyChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="mentions" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Platform Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {platformChartData.map((platform, index) => (
              <div key={platform.platform} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">{platform.platform}</h4>
                  <Badge>{platform.mentions} mentions</Badge>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600">Positive</span>
                    <span>{platform.positive} ({((platform.positive / platform.mentions) * 100).toFixed(0)}%)</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-red-600">Negative</span>
                    <span>{platform.negative} ({((platform.negative / platform.mentions) * 100).toFixed(0)}%)</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-yellow-600">Neutral</span>
                    <span>{platform.neutral} ({((platform.neutral / platform.mentions) * 100).toFixed(0)}%)</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}