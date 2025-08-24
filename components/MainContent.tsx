'use client'

import { useState } from 'react'
import { 
  Send, 
  Upload, 
  Mic,
  Settings,
  User,
  Plus
} from 'lucide-react'
import Image from 'next/image'
import { CLIENT_NAME } from '@/app/config'
import { DocumentationModule } from '@/docs_demo'

interface MainContentProps {
  clientName?: string
  clientLogo?: string
}

type ModuleType = 'none' | 'logistics' | 'analytics' | 'documentation'

export default function MainContent({ clientName = CLIENT_NAME, clientLogo }: MainContentProps) {
  const [selectedModule, setSelectedModule] = useState<'none' | 'logistics' | 'analytics' | 'documentation'>('none')
  const [message, setMessage] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [analyticsItems, setAnalyticsItems] = useState<string[]>([])
  const [analyticsInput, setAnalyticsInput] = useState('')
  
  // Title arrays for different modules
  const logisticsTitles = [
    "What can I perfect for you?",
    "Let's make things better.",
    "What can I optimize for you?"
  ]
  
  const analyticsTitles = [
    "What insights would you like?",
    "Let's dive deeper.",
    "What do you want to know?"
  ]
  
  // Get random title for current module
  const getCurrentTitle = () => {
    if (selectedModule === 'logistics') {
      return logisticsTitles[Math.floor(Math.random() * logisticsTitles.length)]
    } else if (selectedModule === 'analytics') {
      return analyticsTitles[Math.floor(Math.random() * analyticsTitles.length)]
    }
    return "Hi, I'm Omni. What shall I build for you?"
  }

  const handleSend = () => {
    if (message.trim()) {
      console.log('Sending message:', message)
      setMessage('')
    }
  }

  const handleDataUpload = () => {
    console.log('Opening data upload dialog')
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    console.log('Toggle recording:', !isRecording)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleModuleSelect = (module: ModuleType) => {
    setSelectedModule(module)
    setMessage('')
    setAnalyticsInput('')
  }

  const handleAddAnalyticsItem = () => {
    if (analyticsInput.trim()) {
      setAnalyticsItems([...analyticsItems, analyticsInput.trim()])
      setAnalyticsInput('')
    }
  }

  const handleAnalyticsKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddAnalyticsItem()
    }
  }

  const handleFormSubmit = (documentType: any, data: any) => {
    console.log('Document submitted:', { documentType, data })
  }

  const handleBackToMain = () => {
    setSelectedModule('none')
  }

  // If documentation module is selected, render it
  if (selectedModule === 'documentation') {
    return <DocumentationModule onFormSubmit={handleFormSubmit} onBackToMain={handleBackToMain} />
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-dark-950 graph-pattern overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-6 flex-shrink-0">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-semibold text-white">Omnition</h1>
          <span className="text-xl text-gray-400">@ {clientName}</span>
        </div>
        
        <div className="w-12 h-12 rounded-lg bg-dark-800 border border-dark-600 flex items-center justify-center">
          {clientLogo ? (
            <Image
              src={clientLogo}
              alt={`${clientName} logo`}
              width={32}
              height={32}
              className="rounded"
            />
          ) : (
            <User className="w-6 h-6 text-gray-400" />
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 relative overflow-hidden">
        {/* Dynamic Title - Always Visible */}
        <div className="mb-12 text-center flex-shrink-0">
          <h2 className="text-4xl font-medium mb-4 animate-float">
            {selectedModule === 'none' ? (
              <>
                <span className="text-white">Hi, I'm </span>
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent bg-200% animate-shimmer">
                    Omni
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent opacity-50 blur-sm">
                    Omni
                  </span>
                </span>
                <span className="text-white">. What shall I build for you?</span>
              </>
            ) : (
              <span className="text-white">{getCurrentTitle()}</span>
            )}
          </h2>
        </div>

        {/* Logistics Module Input Area */}
        {selectedModule === 'logistics' && (
        <div className="w-full max-w-3xl flex-shrink-0">
          <div className="relative">
                          <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={`Describe your desired outcomes and key constraints. For example:
  - Assign patients to nurses to maximize the number of patients assigned.
  - Each patient's duration is in minutes.
  - Each nurse can only do one patient at a time.
  - Each nurse can do up to their max capacity in patients.`}
                className="w-full p-4 pr-24 pb-16 bg-dark-900 border border-dark-700 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors resize-none min-h-[180px]"
                rows={5}
              />
            
            {/* Bottom Controls */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              {/* Microphone Button */}
              <button
                onClick={toggleRecording}
                className={`p-2 rounded-lg transition-colors ${
                  isRecording 
                    ? 'bg-red-600 hover:bg-red-700' 
                    : 'bg-dark-700 hover:bg-dark-600'
                }`}
              >
                <Mic className={`w-5 h-5 ${isRecording ? 'text-white' : 'text-gray-400'}`} />
              </button>

              <div className="flex items-center gap-2">
                {/* Data Upload Button */}
                <button
                  onClick={handleDataUpload}
                  className="flex items-center gap-2 px-3 py-2 bg-dark-700 hover:bg-dark-600 rounded-lg transition-colors"
                >
                  <Upload className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-400 text-sm">Data</span>
                </button>

                {/* Send Button */}
                <button
                  onClick={handleSend}
                  disabled={!message.trim()}
                  className="p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-dark-700 disabled:cursor-not-allowed rounded-lg transition-colors"
                >
                  <Send className={`w-5 h-5 ${message.trim() ? 'text-white' : 'text-gray-500'}`} />
                </button>
              </div>
            </div>
          </div>
        </div>
        )}

        {/* Analytics Module Input Area */}
        {selectedModule === 'analytics' && (
          <div className="w-full max-w-3xl mb-8 flex-shrink-0">
            <div className="flex items-center gap-3">
              {/* Browse Button */}
              <button className="px-4 py-2 bg-dark-700 hover:bg-dark-600 rounded-lg transition-colors text-gray-300">
                Browse insights...
              </button>
              
              {/* Analytics Input */}
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={analyticsInput}
                  onChange={(e) => setAnalyticsInput(e.target.value)}
                  onKeyPress={handleAnalyticsKeyPress}
                  placeholder="Describe your desired insight..."
                  className="w-full p-3 pr-12 bg-dark-900 border border-dark-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                />
                
                {/* Add Button */}
                <button
                  onClick={handleAddAnalyticsItem}
                  disabled={!analyticsInput.trim()}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 bg-blue-600 hover:bg-blue-700 disabled:bg-dark-700 disabled:cursor-not-allowed rounded transition-colors"
                >
                  <Plus className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            {/* Analytics Items List */}
            {analyticsItems.length > 0 && (
              <div className="mt-4">
                <div className={`space-y-2 ${analyticsItems.length > 4 ? 'max-h-48 overflow-y-auto' : ''}`}>
                  {analyticsItems.map((item, index) => (
                    <div key={index} className="p-3 bg-dark-800 border border-dark-600 rounded-lg text-gray-300 text-sm flex items-center justify-between group">
                      <span className="flex-1">{item}</span>
                      <button
                        onClick={() => {
                          const newItems = analyticsItems.filter((_, i) => i !== index)
                          setAnalyticsItems(newItems)
                        }}
                        className="ml-3 p-1 text-gray-400 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                
                {/* Build Analytics Module Button */}
                <button className="mt-4 px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-white font-medium mx-auto block">
                  Build Analytics Module
                </button>
              </div>
            )}
          </div>
        )}

        {/* Module Cards */}
        <div className="w-full max-w-4xl mt-12 flex-shrink-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Logistics Module Card */}
            <div 
              onClick={() => handleModuleSelect('logistics')}
              className={`p-6 rounded-2xl transition-colors cursor-pointer group ${
                selectedModule === 'logistics' 
                  ? 'bg-dark-800 border-2 border-blue-500' 
                  : 'bg-dark-900 border border-dark-700 hover:border-dark-600'
              }`}
            >
              <h3 className={`text-lg font-semibold mb-2 transition-colors ${
                selectedModule === 'logistics' 
                  ? 'text-blue-400' 
                  : 'text-white group-hover:text-blue-400'
              }`}>
                Logistics Module
              </h3>
              <p className="text-gray-400 text-sm">
                Optimize scheduling, routing, or any logistical problem.
              </p>
            </div>

            {/* Analytics Module Card */}
            <div 
              onClick={() => handleModuleSelect('analytics')}
              className={`p-6 rounded-2xl transition-colors cursor-pointer group ${
                selectedModule === 'analytics' 
                  ? 'bg-dark-800 border-2 border-blue-500' 
                  : 'bg-dark-900 border border-dark-700 hover:border-dark-600'
              }`}
            >
              <h3 className={`text-lg font-semibold mb-2 transition-colors ${
                selectedModule === 'analytics' 
                  ? 'text-blue-400' 
                  : 'text-white group-hover:text-blue-400'
              }`}>
                Analytics Module
              </h3>
              <p className="text-gray-400 text-sm">
                Ask questions and get insights about your operations.
              </p>
            </div>

            {/* Documentation Module Card */}
            <div 
              onClick={() => handleModuleSelect('documentation' as any)}
              className={`p-6 rounded-2xl transition-colors cursor-pointer group ${
                (selectedModule as any) === 'documentation' 
                  ? 'bg-dark-800 border-2 border-blue-500' 
                  : 'bg-dark-900 border border-dark-700 hover:border-dark-600'
              }`}
            >
              <h3 className={`text-lg font-semibold mb-2 transition-colors ${
                (selectedModule as any) === 'documentation' 
                  ? 'text-blue-400' 
                  : 'text-white group-hover:text-blue-400'
              }`}>
                Documentation Module
              </h3>
              <p className="text-gray-400 text-sm">
                Create encounter notes and progress notes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
