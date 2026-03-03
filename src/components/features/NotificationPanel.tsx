import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { 
  Bell, 
  BellOff, 
  Check, 
  X, 
  ExternalLink,
  Clock,
  AlertTriangle,
  MessageSquare,
  TrendingUp,
  Hash
} from 'lucide-react'
import { useSentimentData } from '@/hooks/useSentimentData'
import { formatTime } from '@/lib/utils'

interface NotificationPanelProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function NotificationPanel({ open, onOpenChange }: NotificationPanelProps) {
  const { alerts, markAlertAsRead } = useSentimentData()
  
  const unreadAlerts = alerts.filter(alert => !alert.isRead)
  const readAlerts = alerts.filter(alert => alert.isRead)

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'sentiment':
        return MessageSquare
      case 'volume':
        return TrendingUp
      case 'trending':
        return Hash
      case 'keyword':
        return AlertTriangle
      default:
        return Bell
    }
  }

  const markAllAsRead = () => {
    unreadAlerts.forEach(alert => markAlertAsRead(alert.id))
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bell className="w-5 h-5" />
              <span>Notifications</span>
              {unreadAlerts.length > 0 && (
                <Badge variant="destructive">
                  {unreadAlerts.length}
                </Badge>
              )}
            </div>
            {unreadAlerts.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllAsRead}
                className="text-xs"
              >
                <Check className="w-4 h-4 mr-1" />
                Mark all read
              </Button>
            )}
          </SheetTitle>
          <SheetDescription>
            Real-time alerts and notifications from your sentiment monitoring
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6">
          {/* Quick Actions */}
          <div className="flex space-x-2 mb-4">
            <Button variant="outline" size="sm" className="flex-1">
              <BellOff className="w-4 h-4 mr-1" />
              Pause Alerts
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              Settings
            </Button>
          </div>

          <ScrollArea className="h-[calc(100vh-200px)]">
            {/* Unread Notifications */}
            {unreadAlerts.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  New ({unreadAlerts.length})
                </h3>
                <div className="space-y-3">
                  {unreadAlerts.map((alert) => {
                    const AlertIcon = getAlertIcon(alert.type)
                    return (
                      <div
                        key={alert.id}
                        className="p-4 border border-red-200 bg-red-50 rounded-lg"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3 flex-1">
                            <AlertIcon className="w-5 h-5 text-red-600 mt-0.5" />
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <span className="font-medium text-red-900">
                                  {alert.title}
                                </span>
                                <Badge 
                                  variant={alert.severity === 'critical' ? 'destructive' : 'secondary'}
                                >
                                  {alert.severity}
                                </Badge>
                              </div>
                              <p className="text-sm text-red-800 mb-2">
                                {alert.message}
                              </p>
                              <div className="flex items-center space-x-4 text-xs text-red-700">
                                <span className="flex items-center">
                                  <Clock className="w-3 h-3 mr-1" />
                                  {formatTime(alert.timestamp)}
                                </span>
                                <span>{alert.source}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex space-x-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => markAlertAsRead(alert.id)}
                              className="h-8 w-8 p-0"
                            >
                              <Check className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        
                        {alert.suggestedResponse && (
                          <div className="mt-3 p-3 bg-white rounded-md border border-red-200">
                            <div className="text-xs font-medium text-red-900 mb-1">
                              💡 Suggested Response:
                            </div>
                            <p className="text-xs text-red-800">
                              {alert.suggestedResponse}
                            </p>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Read Notifications */}
            {readAlerts.length > 0 && (
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <Separator className="flex-1" />
                  <span className="text-sm text-gray-500">Earlier</span>
                  <Separator className="flex-1" />
                </div>
                <div className="space-y-3">
                  {readAlerts.slice(0, 10).map((alert) => {
                    const AlertIcon = getAlertIcon(alert.type)
                    return (
                      <div
                        key={alert.id}
                        className="p-4 border border-gray-200 bg-gray-50 rounded-lg opacity-75"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3 flex-1">
                            <AlertIcon className="w-5 h-5 text-gray-500 mt-0.5" />
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <span className="font-medium text-gray-700">
                                  {alert.title}
                                </span>
                                <Badge variant="secondary">
                                  {alert.severity}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600 mb-2">
                                {alert.message}
                              </p>
                              <div className="flex items-center space-x-4 text-xs text-gray-500">
                                <span className="flex items-center">
                                  <Clock className="w-3 h-3 mr-1" />
                                  {formatTime(alert.timestamp)}
                                </span>
                                <span>{alert.source}</span>
                              </div>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Empty State */}
            {alerts.length === 0 && (
              <div className="text-center py-12">
                <Bell className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  All caught up!
                </h3>
                <p className="text-gray-500">
                  No new notifications right now. We'll let you know when something needs your attention.
                </p>
              </div>
            )}
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  )
}