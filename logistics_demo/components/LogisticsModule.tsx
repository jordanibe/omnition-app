'use client'

import { useState } from 'react'
import { ChevronLeft, ArrowRight } from 'lucide-react'
import GanttChart from './GanttChart'
import RadarChart from './RadarChart'
import { mockPersonnel, mockAppointments, mockOptimizationData } from '../mockData'

interface LogisticsModuleProps {
  moduleTitle: string
  onBackToHome: () => void
}

export default function LogisticsModule({ moduleTitle, onBackToHome }: LogisticsModuleProps) {
  const [currentDate, setCurrentDate] = useState('2024-01-15')
  const [changePrompt, setChangePrompt] = useState('')

  const handleSubmitChange = () => {
    if (changePrompt.trim()) {
      console.log('Change requested:', changePrompt)
      setChangePrompt('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSubmitChange()
    }
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-dark-950 graph-pattern">
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <div className="flex items-center gap-4">
          <button
            onClick={onBackToHome}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-white font-medium flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Home
          </button>
          
          <div>
            <h1 className="text-3xl font-semibold text-white">{moduleTitle}</h1>
            <p className="text-blue-400 text-sm mt-1">
              Omni has completed analyzing schedules and metrics
            </p>
          </div>
        </div>
        
        {/* Change Prompt Input */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="What shall I change?"
            value={changePrompt}
            onChange={(e) => setChangePrompt(e.target.value)}
            onKeyPress={handleKeyPress}
            className="px-4 py-2 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors w-64"
          />
          <button
            onClick={handleSubmitChange}
            disabled={!changePrompt.trim()}
            className="p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-dark-700 disabled:cursor-not-allowed rounded-lg transition-colors"
          >
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex gap-6 p-6 overflow-hidden">
        {/* Left Side - Gantt Chart */}
        <div className="flex-1 overflow-y-auto">
          <GanttChart
            personnel={mockPersonnel}
            appointments={mockAppointments}
            currentDate={currentDate}
            onDateChange={setCurrentDate}
          />
        </div>

        {/* Right Side - Radar Chart Panel */}
        <div className="w-80 bg-dark-900 border border-dark-700 rounded-2xl overflow-hidden">
          <RadarChart data={mockOptimizationData} />
        </div>
      </div>
    </div>
  )
}
