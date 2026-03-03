import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Settings as SettingsIcon, 
  Bell, 
  Shield, 
  Zap, 
  Globe, 
  MessageSquare,
  Slack,
  Mail,
  Webhook,
  Plus,
  Trash2,
  Save
} from 'lucide-react'
import { toast } from 'sonner'

export default function Settings() {
  const [monitoringEnabled, setMonitoringEnabled] = useState(true)
  const [slackNotifications, setSlackNotifications] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(false)
  const [keywords, setKeywords] = useState(['customer service', 'bug', 'crash', 'support'])
  const [newKeyword, setNewKeyword] = useState('')

  const platforms = [
    { id: 'twitter', name: 'Twitter', enabled: true, icon: '🐦' },
    { id: 'facebook', name: 'Facebook', enabled: true, icon: '📘' },
    { id: 'instagram', name: 'Instagram', enabled: false, icon: '📷' },
    { id: 'google-reviews', name: 'Google Reviews', enabled: true, icon: '⭐' },
    { id: 'app-store', name: 'App Store', enabled: true, icon: '📱' },
    { id: 'reddit', name: 'Reddit', enabled: false, icon: '🤖' },
    { id: 'youtube', name: 'YouTube', enabled: false, icon: '🎥' }
  ]

  const [platformSettings, setPlatformSettings] = useState(platforms)

  const handleSave = () => {
    toast.success('Settings saved successfully!')
  }

  const addKeyword = () => {
    if (newKeyword && !keywords.includes(newKeyword)) {
      setKeywords([...keywords, newKeyword])
      setNewKeyword('')
    }
  }

  const removeKeyword = (keyword: string) => {
    setKeywords(keywords.filter(k => k !== keyword))
  }

  const togglePlatform = (platformId: string) => {
    setPlatformSettings(prev => 
      prev.map(p => 
        p.id === platformId ? { ...p, enabled: !p.enabled } : p
      )
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-500 mt-1">
            Configure your sentiment monitoring and alert preferences
          </p>
        </div>
        <Button onClick={handleSave}>
          <Save className="w-4 h-4 mr-1" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* General Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <SettingsIcon className="w-5 h-5" />
                <span>General Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="monitoring">Real-time Monitoring</Label>
                  <p className="text-sm text-gray-500">Enable continuous sentiment monitoring</p>
                </div>
                <Switch
                  id="monitoring"
                  checked={monitoringEnabled}
                  onCheckedChange={setMonitoringEnabled}
                />
              </div>
              
              <Separator />
              
              <div>
                <Label htmlFor="company">Company/Brand Name</Label>
                <Input
                  id="company"
                  placeholder="Enter your company name"
                  className="mt-1"
                  defaultValue="TechCorp Inc."
                />
              </div>
              
              <div>
                <Label htmlFor="threshold">Alert Threshold</Label>
                <Select defaultValue="medium">
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select sensitivity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low - Only critical issues</SelectItem>
                    <SelectItem value="medium">Medium - Important mentions</SelectItem>
                    <SelectItem value="high">High - All negative sentiment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Platform Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="w-5 h-5" />
                <span>Platform Monitoring</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {platformSettings.map((platform) => (
                  <div
                    key={platform.id}
                    className={`p-4 border rounded-lg transition-colors ${
                      platform.enabled ? 'border-blue-200 bg-blue-50' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl">{platform.icon}</span>
                        <span className="font-medium">{platform.name}</span>
                      </div>
                      <Switch
                        checked={platform.enabled}
                        onCheckedChange={() => togglePlatform(platform.id)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Keywords */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5" />
                <span>Keyword Tracking</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="keywords">Monitored Keywords</Label>
                <p className="text-sm text-gray-500 mb-2">
                  Add keywords to monitor for specific mentions
                </p>
                <div className="flex space-x-2">
                  <Input
                    value={newKeyword}
                    onChange={(e) => setNewKeyword(e.target.value)}
                    placeholder="Enter keyword"
                    onKeyPress={(e) => e.key === 'Enter' && addKeyword()}
                  />
                  <Button onClick={addKeyword} size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {keywords.map((keyword) => (
                  <Badge
                    key={keyword}
                    variant="secondary"
                    className="cursor-pointer hover:bg-red-100 hover:text-red-800"
                    onClick={() => removeKeyword(keyword)}
                  >
                    {keyword}
                    <Trash2 className="w-3 h-3 ml-1" />
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6">
          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="w-5 h-5" />
                <span>Notifications</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Slack className="w-4 h-4" />
                  <span className="text-sm">Slack Alerts</span>
                </div>
                <Switch
                  checked={slackNotifications}
                  onCheckedChange={setSlackNotifications}
                />
              </div>
              
              {slackNotifications && (
                <div className="ml-6 space-y-2">
                  <Input
                    placeholder="Slack webhook URL"
                    defaultValue="https://hooks.slack.com/services/..."
                  />
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All alerts</SelectItem>
                      <SelectItem value="critical">Critical only</SelectItem>
                      <SelectItem value="negative">Negative sentiment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">Email Alerts</span>
                </div>
                <Switch
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>
              
              {emailNotifications && (
                <div className="ml-6">
                  <Input
                    placeholder="Email address"
                    defaultValue="team@company.com"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* API Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="w-5 h-5" />
                <span>API Configuration</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="api-key">API Key</Label>
                <Input
                  id="api-key"
                  type="password"
                  placeholder="Enter your API key"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="webhook">Webhook URL</Label>
                <Input
                  id="webhook"
                  placeholder="https://yourapp.com/webhook"
                  className="mt-1"
                />
              </div>
              
              <Button variant="outline" size="sm" className="w-full">
                <Webhook className="w-4 h-4 mr-1" />
                Test Connection
              </Button>
            </CardContent>
          </Card>

          {/* Security */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>Security</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="retention">Data Retention</Label>
                <Select defaultValue="90">
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 days</SelectItem>
                    <SelectItem value="90">90 days</SelectItem>
                    <SelectItem value="365">1 year</SelectItem>
                    <SelectItem value="forever">Forever</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm">Two-Factor Auth</span>
                  <p className="text-xs text-gray-500">Secure your account</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <Button variant="outline" size="sm" className="w-full">
                Export Data
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}