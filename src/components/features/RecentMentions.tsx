import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { 
  MessageSquare, 
  ExternalLink,
  ThumbsUp,
  Users,
  Clock
} from 'lucide-react'
import { SentimentData } from '@/types/sentiment'
import { formatTime, getSentimentColor } from '@/lib/utils'

interface RecentMentionsProps {
  mentions: SentimentData[]
}

const getPlatformIcon = (platform: string) => {
  const icons: Record<string, string> = {
    twitter: '🐦',
    facebook: '📘',
    instagram: '📷',
    'google-reviews': '⭐',
    'app-store': '📱',
    reddit: '🤖',
    youtube: '🎥'
  }
  return icons[platform] || '💬'
}

const getPlatformColor = (platform: string) => {
  const colors: Record<string, string> = {
    twitter: 'bg-blue-100 text-blue-800',
    facebook: 'bg-blue-100 text-blue-800',
    instagram: 'bg-pink-100 text-pink-800',
    'google-reviews': 'bg-yellow-100 text-yellow-800',
    'app-store': 'bg-gray-100 text-gray-800',
    reddit: 'bg-orange-100 text-orange-800',
    youtube: 'bg-red-100 text-red-800'
  }
  return colors[platform] || 'bg-gray-100 text-gray-800'
}

export default function RecentMentions({ mentions }: RecentMentionsProps) {
  return (
    <Card className="animate-fadeInUp">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MessageSquare className="w-5 h-5 text-blue-500" />
          <span>Recent Mentions</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96">
          <div className="space-y-4">
            {mentions.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>No recent mentions</p>
              </div>
            ) : (
              mentions.map((mention, index) => (
                <div
                  key={mention.id}
                  className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200 bg-white animate-fadeInUp"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start justify-between space-x-3">
                    <div className="flex items-start space-x-3 flex-1">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="text-xs">
                          {mention.author.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="font-medium text-gray-900 text-sm">
                            {mention.author}
                          </span>
                          <Badge className={getPlatformColor(mention.source)}>
                            {getPlatformIcon(mention.source)} {mention.platform}
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-gray-700 mb-3 line-clamp-3">
                          "{mention.content}"
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3 text-xs text-gray-500">
                            <span className="flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {formatTime(mention.timestamp)}
                            </span>
                            {mention.followers && (
                              <span className="flex items-center">
                                <Users className="w-3 h-3 mr-1" />
                                {mention.followers.toLocaleString()}
                              </span>
                            )}
                            {mention.engagement && (
                              <span className="flex items-center">
                                <ThumbsUp className="w-3 h-3 mr-1" />
                                {mention.engagement}
                              </span>
                            )}
                          </div>
                          <ExternalLink className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer" />
                        </div>
                      </div>
                    </div>
                    
                    <Badge className={getSentimentColor(mention.sentiment)}>
                      {mention.sentiment}
                    </Badge>
                  </div>
                  
                  {/* Confidence Indicator */}
                  <div className="mt-3 flex items-center space-x-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-1">
                      <div 
                        className="bg-blue-500 h-1 rounded-full transition-all duration-300"
                        style={{ width: `${mention.confidence * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500">
                      {(mention.confidence * 100).toFixed(0)}% confidence
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}