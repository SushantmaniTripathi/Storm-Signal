import { useState, useRef, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Search, 
  Filter, 
  Calendar,
  Tag,
  TrendingUp,
  Clock,
  X,
  Zap
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface SearchBarProps {
  onSearch?: (query: string, filters: SearchFilters) => void
}

interface SearchFilters {
  platform?: string
  sentiment?: string
  dateRange?: string
  urgency?: string
}

const suggestions = [
  { type: 'recent', text: 'customer service', count: 156 },
  { type: 'trending', text: 'app crashes', count: 89 },
  { type: 'keyword', text: 'billing issue', count: 45 },
  { type: 'platform', text: 'twitter mentions', count: 234 },
  { type: 'sentiment', text: 'negative reviews', count: 67 }
]

const quickFilters = [
  { label: 'Last 24h', value: '24h', icon: Clock },
  { label: 'Critical', value: 'critical', icon: Zap },
  { label: 'Trending', value: 'trending', icon: TrendingUp },
  { label: 'Social', value: 'social', icon: Tag }
]

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
        setIsExpanded(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = () => {
    if (query.trim()) {
      onSearch?.(query, {})
      setShowSuggestions(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const addFilter = (filter: string) => {
    if (!activeFilters.includes(filter)) {
      setActiveFilters([...activeFilters, filter])
    }
  }

  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter(f => f !== filter))
  }

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'trending':
        return <TrendingUp className="w-3 h-3 text-orange-500" />
      case 'platform':
        return <Tag className="w-3 h-3 text-blue-500" />
      case 'sentiment':
        return <Zap className="w-3 h-3 text-red-500" />
      default:
        return <Clock className="w-3 h-3 text-gray-500" />
    }
  }

  return (
    <div ref={containerRef} className="relative">
      {/* Main Search Bar */}
      <div className={cn(
        "relative transition-all duration-300 ease-in-out",
        isExpanded ? "transform scale-105" : ""
      )}>
        <div className={cn(
          "flex items-center bg-white rounded-full border-2 transition-all duration-300",
          isExpanded || showSuggestions 
            ? "border-blue-400 shadow-lg shadow-blue-100" 
            : "border-gray-200 hover:border-gray-300"
        )}>
          <div className="flex items-center flex-1">
            <Search className="w-5 h-5 text-gray-400 ml-4" />
            <Input
              ref={searchRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              onFocus={() => {
                setIsExpanded(true)
                setShowSuggestions(true)
              }}
              placeholder="Search mentions, keywords, platforms..."
              className="border-0 focus:ring-0 rounded-full bg-transparent text-gray-900 placeholder-gray-500"
            />
          </div>
          
          <div className="flex items-center space-x-2 pr-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="rounded-full h-8 w-8 p-0"
            >
              <Filter className="w-4 h-4" />
            </Button>
            <Button
              onClick={handleSearch}
              size="sm"
              className="rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-md"
            >
              Search
            </Button>
          </div>
        </div>

        {/* Floating Glass Effect Background */}
        {(isExpanded || showSuggestions) && (
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full -z-10 blur-xl opacity-50 scale-110 animate-pulse"></div>
        )}
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="flex items-center space-x-2 mt-3 animate-fadeInUp">
          <span className="text-xs text-gray-500 font-medium">Filters:</span>
          {activeFilters.map((filter) => (
            <Badge
              key={filter}
              variant="secondary"
              className="cursor-pointer hover:bg-red-100 hover:text-red-800 transition-colors"
              onClick={() => removeFilter(filter)}
            >
              {filter}
              <X className="w-3 h-3 ml-1" />
            </Badge>
          ))}
        </div>
      )}

      {/* Quick Filters */}
      {isExpanded && (
        <div className="mt-4 animate-fadeInUp">
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-sm font-medium text-gray-700">Quick Filters:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {quickFilters.map((filter) => (
              <Button
                key={filter.value}
                variant={activeFilters.includes(filter.value) ? "default" : "outline"}
                size="sm"
                onClick={() => 
                  activeFilters.includes(filter.value) 
                    ? removeFilter(filter.value)
                    : addFilter(filter.value)
                }
                className="rounded-full text-xs h-8"
              >
                <filter.icon className="w-3 h-3 mr-1" />
                {filter.label}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Search Suggestions Dropdown */}
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-gray-200 shadow-xl z-50 animate-fadeInUp glass-effect">
          <div className="p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Zap className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-semibold text-gray-700">Popular Searches</span>
            </div>
            
            <div className="space-y-2">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors group"
                  onClick={() => {
                    setQuery(suggestion.text)
                    setShowSuggestions(false)
                  }}
                >
                  <div className="flex items-center space-x-3">
                    {getSuggestionIcon(suggestion.type)}
                    <span className="text-sm text-gray-700 group-hover:text-gray-900">
                      {suggestion.text}
                    </span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {suggestion.count}
                  </Badge>
                </div>
              ))}
            </div>

            <div className="border-t pt-3 mt-3">
              <div className="flex items-center space-x-2 mb-2">
                <Calendar className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-semibold text-gray-700">Recent Searches</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {['app issues', 'customer support', 'pricing complaints'].map((term) => (
                  <Badge
                    key={term}
                    variant="outline"
                    className="cursor-pointer hover:bg-blue-50 hover:border-blue-300 text-xs"
                    onClick={() => {
                      setQuery(term)
                      setShowSuggestions(false)
                    }}
                  >
                    {term}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}