import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  AlertTriangle, 
  Eye, 
  ExternalLink,
  Clock,
  TrendingUp,
  MessageCircle,
  Hash
} from 'lucide-react'
import { Alert } from '@/types/sentiment'
import { formatTime } from '@/lib/utils'

interface AlertFeedProps {
  alerts: Alert[]
  onMarkAsRead: (alertId: string) => void
}

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'critical':
      return 'bg-red-100 text-red-800 border-red-200'
    case 'error':
      return 'bg-orange-100 text-orange-800 border-orange-200'
    case 'warning':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    case 'info':
      return 'bg-blue-100 text-blue-800 border-blue-200'
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'sentiment':
      return MessageCircle
    case 'volume':
      return TrendingUp
    case 'trending':
      return Hash
    case 'keyword':
      return AlertTriangle
    default:
      return AlertTriangle
  }
}

export default function AlertFeed({ alerts, onMarkAsRead }: AlertFeedProps) {
  const unreadCount = alerts.filter(alert => !alert.isRead).length

  return (
    <Card className="animate-fadeInUp">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-orange-500" />
            <span>Live Alerts</span>
          </CardTitle>
          <Badge variant={unreadCount > 0 ? "destructive" : "secondary"}>
            {unreadCount} unread
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96">
          <div className="space-y-3">
            {alerts.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <AlertTriangle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>No alerts at the moment</p>
                <p className="text-sm">We'll notify you when something needs attention</p>
              </div>
            ) : (
              alerts.map((alert, index) => {
                const TypeIcon = getTypeIcon(alert.type)
                return (
                  <div
                    key={alert.id}
                    className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${
                      alert.isRead 
                        ? 'bg-gray-50 border-gray-200' 
                        : 'bg-white border-l-4 border-l-red-400 shadow-sm'
                    } animate-fadeInUp`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-start justify-between space-x-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <TypeIcon className="w-4 h-4 text-gray-600" />
                          <Badge className={getSeverityColor(alert.severity)}>
                            {alert.severity.toUpperCase()}
                          </Badge>
                          <span className="text-xs text-gray-500 flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {formatTime(alert.timestamp)}
                          </span>
                        </div>
                        
                        <h4 className="font-medium text-gray-900 mb-1">
                          {alert.title}
                        </h4>
                        
                        <p className="text-sm text-gray-600 mb-2">
                          {alert.message}
                        </p>
                        
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <span>Source: {alert.source}</span>
                          {alert.data.followers && (
                            <span>• {alert.data.followers.toLocaleString()} followers</span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex flex-col space-y-1">
                        {!alert.isRead && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onMarkAsRead(alert.id)}
                            className="h-8 w-8 p-0"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    {alert.suggestedResponse && !alert.isRead && (
                      <div className="mt-3 p-3 bg-blue-50 rounded-md border border-blue-200">
                        <div className="text-xs font-medium text-blue-800 mb-1">
                          💡 Suggested Response:
                        </div>
                        <p className="text-sm text-blue-700">
                          {alert.suggestedResponse}
                        </p>
                      </div>
                    )}
                  </div>
                )
              })
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}