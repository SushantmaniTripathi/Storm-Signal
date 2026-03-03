import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  BarChart3, 
  Bell, 
  Settings, 
  Zap, 
  Menu, 
  X,
  AlertTriangle,
  TrendingUp,
  Cloud
} from 'lucide-react'
import NotificationPanel from '@/components/features/NotificationPanel'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [notificationOpen, setNotificationOpen] = useState(false)
  const location = useLocation()

  const navigation = [
    { name: 'Dashboard', href: '/', icon: BarChart3 },
    { name: 'Analytics', href: '/analytics', icon: TrendingUp },
    { name: 'Settings', href: '/settings', icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out",
        sidebarOpen ? "translate-x-0" : "-translate-x-full",
        "lg:translate-x-0 lg:static lg:inset-0"
      )}>
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Cloud className="w-8 h-8 text-purple-600" />
              <Zap className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Storm Signal</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <nav className="mt-8 px-4 space-y-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                )}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="p-4 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 rounded-xl text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent animate-pulse"></div>
            <div className="relative z-10">
              <div className="flex items-center space-x-2 mb-2">
                <div className="relative">
                  <Zap className="w-5 h-5 text-yellow-300 animate-pulse" />
                  <div className="absolute inset-0 bg-yellow-400/20 rounded-full blur-sm"></div>
                </div>
                <span className="font-semibold">Storm Status</span>
              </div>
              <div className="text-sm opacity-90">
                Weather radar active
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs">3 storm fronts detected</span>
                <div className="flex space-x-1">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full pulse-animation"></div>
                  <div className="w-1.5 h-1.5 bg-orange-400 rounded-full pulse-animation" style={{animationDelay: '0.5s'}}></div>
                  <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full pulse-animation" style={{animationDelay: '1s'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top navigation */}
        <div className="bg-white shadow-sm border-b">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden"
                >
                  <Menu className="w-5 h-5" />
                </Button>
                <h1 className="ml-2 lg:ml-0 text-lg font-semibold text-gray-900">
                  Customer Sentiment Monitor
                </h1>
              </div>
              
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setNotificationOpen(true)}
                  className="relative"
                >
                  <Bell className="w-5 h-5" />
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 text-xs bg-red-500 hover:bg-red-500">
                    7
                  </Badge>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>

      {/* Notification Panel */}
      <NotificationPanel 
        open={notificationOpen} 
        onOpenChange={setNotificationOpen} 
      />
    </div>
  )
}