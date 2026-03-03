import { useSentimentData } from '@/hooks/useSentimentData'
import MetricCards from '@/components/features/MetricCards'
import AlertFeed from '@/components/features/AlertFeed'
import SentimentChart from '@/components/features/SentimentChart'
import RecentMentions from '@/components/features/RecentMentions'
import TrendingTopics from '@/components/features/TrendingTopics'
import ResponseSuggestions from '@/components/features/ResponseSuggestions'
import SearchBar from '@/components/features/SearchBar'

export default function Dashboard() {
  const { sentimentData, alerts, metrics, markAlertAsRead } = useSentimentData()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Storm Radar
            </h1>
            <p className="text-gray-500 mt-1">
              Track sentiment storms across all digital channels
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 bg-green-50 px-3 py-2 rounded-full border border-green-200">
              <div className="relative">
                <div className="w-3 h-3 bg-green-500 rounded-full pulse-animation"></div>
                <div className="absolute inset-0 bg-green-400/30 rounded-full blur-sm pulse-animation"></div>
              </div>
              <span className="text-sm font-medium text-green-700">Radar Active</span>
            </div>
          </div>
        </div>
        
        {/* Enhanced Search Bar */}
        <SearchBar onSearch={(query, filters) => console.log('Search:', query, filters)} />
      </div>

      {/* Metrics Overview */}
      <MetricCards metrics={metrics} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Sentiment Chart - Takes 2 columns on xl screens */}
        <div className="xl:col-span-2">
          <SentimentChart data={sentimentData} />
        </div>

        {/* Alert Feed */}
        <div>
          <AlertFeed 
            alerts={alerts.slice(0, 8)} 
            onMarkAsRead={markAlertAsRead}
          />
        </div>

        {/* Recent Mentions */}
        <div>
          <RecentMentions mentions={sentimentData.slice(0, 6)} />
        </div>

        {/* Trending Topics */}
        <div>
          <TrendingTopics keywords={metrics.trendingKeywords} />
        </div>

        {/* Response Suggestions */}
        <div>
          <ResponseSuggestions 
            negativeAlerts={alerts.filter(a => a.data.sentiment === 'negative').slice(0, 3)} 
          />
        </div>
      </div>
    </div>
  )
}