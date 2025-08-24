import { useState } from 'react'
import { ChevronRight } from 'lucide-react'

interface Tab {
  id: string
  label: string
  content: React.ReactNode
}

interface TabbedFormProps {
  tabs: Tab[]
  onSubmit: () => void
  isSubmitting?: boolean
  submitLabel?: string
  isFormValid?: boolean
}

export default function TabbedForm({ tabs, onSubmit, isSubmitting = false, submitLabel = "Submit", isFormValid = true }: TabbedFormProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || '')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit()
  }

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      <style jsx>{`
        input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(1);
        }
        input[type="datetime-local"]::-webkit-calendar-picker-indicator {
          filter: invert(1);
        }
      `}</style>
      
      {/* Tabs Navigation */}
      <div className="flex border-b border-dark-700 mb-8 flex-shrink-0">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-4 text-base font-medium transition-colors border-b-2 ${
              activeTab === tab.id
                ? 'text-blue-400 border-blue-400 bg-dark-800'
                : 'text-gray-400 border-transparent hover:text-gray-300 hover:bg-dark-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <form onSubmit={handleSubmit} className="h-full flex flex-col">
          <div className="flex-1 overflow-y-auto pb-8">
            {tabs.find(tab => tab.id === activeTab)?.content}
          </div>
          
          {/* Submit Button */}
          <div className="pt-8 border-t border-dark-700 flex-shrink-0">
            <button
              type="submit"
              disabled={isSubmitting || !isFormValid}
              className={`w-full py-4 rounded-lg transition-colors text-white font-medium text-lg ${
                isFormValid && !isSubmitting
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-dark-700 cursor-not-allowed'
              }`}
            >
              {isSubmitting ? 'Submitting...' : submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
