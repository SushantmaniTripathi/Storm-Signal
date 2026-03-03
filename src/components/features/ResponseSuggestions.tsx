import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { 
  Lightbulb, 
  Copy, 
  Send, 
  MessageSquare,
  Clock,
  User,
  CheckCircle
} from 'lucide-react'
import { Alert } from '@/types/sentiment'
import { toast } from 'sonner'

interface ResponseSuggestionsProps {
  negativeAlerts: Alert[]
}

const responseTemplates = [
  {
    id: 'acknowledgment',
    title: 'Acknowledge Issue',
    template: 'Hi [Customer], thank you for bringing this to our attention. We understand your frustration and are looking into this matter right away.',
    tone: 'empathetic',
    urgency: 'immediate'
  },
  {
    id: 'apology',
    title: 'Apologetic Response', 
    template: 'Hi [Customer], we sincerely apologize for the inconvenience you\'ve experienced. This is not the level of service we strive for, and we\'d like to make this right.',
    tone: 'apologetic',
    urgency: 'immediate'
  },
  {
    id: 'solution',
    title: 'Solution Focused',
    template: 'Hi [Customer], we\'ve identified the issue and have a solution ready. Please DM us your account details so we can resolve this for you immediately.',
    tone: 'professional',
    urgency: 'within-hour'
  },
  {
    id: 'escalation',
    title: 'Escalation Required',
    template: 'Hi [Customer], your feedback is very important to us. I\'m escalating this to our senior team who will contact you within the next hour to resolve this personally.',
    tone: 'professional',
    urgency: 'immediate'
  }
]

export default function ResponseSuggestions({ negativeAlerts }: ResponseSuggestionsProps) {
  const [selectedTemplate, setSelectedTemplate] = useState(responseTemplates[0])
  const [customResponse, setCustomResponse] = useState(selectedTemplate.template)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    toast.success('Response copied to clipboard!')
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleSend = () => {
    toast.success('Response scheduled for review and sending!')
    setCustomResponse(selectedTemplate.template)
  }

  const activeAlert = negativeAlerts[0]

  return (
    <Card className="animate-fadeInUp">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Lightbulb className="w-5 h-5 text-yellow-500" />
          <span>AI Response Assistant</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!activeAlert ? (
          <div className="text-center py-8 text-gray-500">
            <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>No negative mentions to respond to</p>
            <p className="text-sm">Great job! Keep up the good work.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Active Alert Context */}
            <div className="p-3 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-center space-x-2 mb-2">
                <User className="w-4 h-4 text-red-600" />
                <span className="font-medium text-red-800">
                  {activeAlert.data.author}
                </span>
                <Badge className="text-xs bg-red-100 text-red-700">
                  {activeAlert.data.platform}
                </Badge>
              </div>
              <p className="text-sm text-red-700 italic">
                "{activeAlert.data.content}"
              </p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-red-600 flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {new Date(activeAlert.timestamp).toLocaleString()}
                </span>
                <Badge variant="destructive">
                  {activeAlert.data.urgency} priority
                </Badge>
              </div>
            </div>

            {/* Template Selection */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Choose Response Type:
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {responseTemplates.map((template) => (
                  <Button
                    key={template.id}
                    variant={selectedTemplate.id === template.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setSelectedTemplate(template)
                      setCustomResponse(template.template)
                    }}
                    className="text-xs h-8"
                  >
                    {template.title}
                  </Button>
                ))}
              </div>
            </div>

            {/* Response Editor */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-gray-700">
                  Customize Response:
                </h4>
                <div className="flex items-center space-x-1 text-xs text-gray-500">
                  <span>{selectedTemplate.tone}</span>
                  <span>•</span>
                  <span>{selectedTemplate.urgency}</span>
                </div>
              </div>
              <Textarea
                value={customResponse}
                onChange={(e) => setCustomResponse(e.target.value)}
                className="min-h-[100px] text-sm"
                placeholder="Customize your response here..."
              />
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2">
              <Button
                onClick={() => handleCopy(customResponse, 'custom')}
                variant="outline"
                size="sm"
                className="flex-1"
              >
                {copiedId === 'custom' ? (
                  <CheckCircle className="w-4 h-4 mr-1 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4 mr-1" />
                )}
                Copy
              </Button>
              <Button
                onClick={handleSend}
                size="sm"
                className="flex-1"
              >
                <Send className="w-4 h-4 mr-1" />
                Send via Slack
              </Button>
            </div>

            {/* Quick Actions */}
            <div className="pt-4 border-t">
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Quick Actions:
              </h4>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="text-xs">
                  Escalate to Manager
                </Button>
                <Button variant="outline" size="sm" className="text-xs">
                  Schedule Follow-up
                </Button>
                <Button variant="outline" size="sm" className="text-xs">
                  Add to CRM
                </Button>
                <Button variant="outline" size="sm" className="text-xs">
                  Flag for Review
                </Button>
              </div>
            </div>

            {/* Response History */}
            {negativeAlerts.length > 1 && (
              <div className="pt-4 border-t">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Recent Responses ({negativeAlerts.length - 1} pending):
                </h4>
                <div className="space-y-2 max-h-24 overflow-y-auto">
                  {negativeAlerts.slice(1, 3).map((alert, index) => (
                    <div key={alert.id} className="text-xs p-2 bg-gray-50 rounded">
                      <div className="font-medium text-gray-700">
                        {alert.data.author} • {alert.data.platform}
                      </div>
                      <div className="text-gray-600 truncate">
                        "{alert.data.content.substring(0, 60)}..."
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}