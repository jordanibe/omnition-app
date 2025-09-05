'use client'

import { useState, useMemo } from 'react'
import { ChevronLeft, ChevronRight, Search, Send } from 'lucide-react'
import CustomGanttChart from './CustomGanttChart'
import RadarChart from './RadarChart'
import { Personnel, Appointment } from '../types'
import { createExampleMultiColorAssignments } from '../utils/ganttDataConverter'
import { 
  getPersonnelData, 
  getAppointmentsForDate, 
  getAllDates, 
  getOptimizationData, 
  getMetricCards,
  getEditedPersonnelData,
  getEditedAppointmentsForDate,
  getEditedOptimizationData,
  getEditedMetricCards,
  hasEditedData
} from '../data/scheduleDataLoader'

interface LogisticsViewProps {
  moduleName?: string
}

export default function LogisticsView({ moduleName }: LogisticsViewProps) {
  const availableDates = getAllDates()
  const [currentDate, setCurrentDate] = useState(availableDates[0] || '2025-09-01')
  const [searchTerm, setSearchTerm] = useState('')
  const [useEditedData, setUseEditedData] = useState(false)
  const [aiInput, setAiInput] = useState('')
  const [isThinking, setIsThinking] = useState(false)

  // Load real schedule data
  const allPersonnel: Personnel[] = useEditedData ? getEditedPersonnelData() : getPersonnelData()
  const currentAppointments: Appointment[] = useEditedData ? getEditedAppointmentsForDate(currentDate) : getAppointmentsForDate(currentDate)
  const optimizationData = useMemo(() => useEditedData ? getEditedOptimizationData() : getOptimizationData(), [useEditedData])
  const metricCards = useMemo(() => useEditedData ? getEditedMetricCards() : getMetricCards(), [useEditedData])

  const handlePreviousDay = () => {
    const currentIndex = availableDates.indexOf(currentDate)
    if (currentIndex > 0) {
      setCurrentDate(availableDates[currentIndex - 1])
    }
  }

  const handleNextDay = () => {
    const currentIndex = availableDates.indexOf(currentDate)
    if (currentIndex < availableDates.length - 1) {
      setCurrentDate(availableDates[currentIndex + 1])
    }
  }

  const handlePersonnelClick = (personnel: any) => {
    console.log('Personnel clicked:', personnel)
  }

  const handleAssignmentClick = (assignment: any, personnel: any) => {
    console.log('Assignment clicked:', assignment, 'for personnel:', personnel)
  }

  const handleAiInputSubmit = () => {
    if (aiInput.trim() && !isThinking) {
      // Show thinking state
      setIsThinking(true)
      
      // Wait 4 seconds before making changes
      setTimeout(() => {
        console.log('AI input submitted:', aiInput)
        // Switch to edited data when something is submitted
        if (hasEditedData()) {
          setUseEditedData(true)
        }
        setAiInput('')
        setIsThinking(false)
      }, 4000)
    }
  }

  const handleAiInputKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAiInputSubmit()
    }
  }

  // Filter personnel based on search term
  const filteredPersonnel = allPersonnel.filter(person => 
    person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    person.role.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Convert filtered data to Gantt format
  const ganttData = createExampleMultiColorAssignments(filteredPersonnel, currentAppointments, currentDate)

  return (
    <div className="flex-1 flex flex-col h-full bg-dark-950 graph-pattern overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-dark-700 flex-shrink-0">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-semibold text-white">Omnition</h1>
          <span className="text-xl text-gray-400">•</span>
          <h2 className="text-2xl font-medium text-white">
            {moduleName || 'Beacon Hill Scheduling Agent'}
          </h2>
          {useEditedData && (
            <span className="ml-4 px-3 py-1 bg-green-600 text-white text-sm rounded-full">
              Updated Schedule
            </span>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Gantt Chart */}
        <div className="flex-1 flex flex-col p-6 overflow-hidden">
          {/* Date Selector */}
          <div className="flex items-center justify-center mb-8 flex-shrink-0">
            <button
              onClick={handlePreviousDay}
              className="p-2 hover:bg-dark-800 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-400" />
            </button>
            <span className="mx-4 text-lg font-medium text-white">
              {new Date(currentDate + 'T00:00:00').toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
            <button
              onClick={handleNextDay}
              className="p-2 hover:bg-dark-800 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative mb-8 flex-shrink-0">
            <input
              type="text"
              placeholder="Search personnel..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Gantt Chart */}
          <div className="flex-1 min-h-0 overflow-hidden">
            <div className="h-full overflow-y-auto overflow-x-hidden">
              <CustomGanttChart
                personnel={ganttData}
                startHour={5}
                endHour={21}
                hourWidth={120}
                onPersonnelClick={handlePersonnelClick}
                onAssignmentClick={handleAssignmentClick}
              />
            </div>
          </div>
        </div>

        {/* Right Panel - Radar Chart and Metrics */}
        <div className="w-80 bg-dark-900 border-l border-dark-700 p-6 flex flex-col">
          {/* AI Input Text Box */}
          <div className="mb-6">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder={isThinking ? "Thinking..." : "What shall I change?"}
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                onKeyPress={handleAiInputKeyPress}
                disabled={isThinking}
                className="flex-1 px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <button 
                onClick={handleAiInputSubmit}
                disabled={!aiInput.trim() || isThinking}
                className="px-4 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-dark-700 disabled:cursor-not-allowed rounded-lg flex items-center justify-center transition-colors"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
            
            {/* Thinking Indicator */}
            {isThinking && (
              <div className="mt-3 flex items-center justify-center gap-3 text-blue-400">
                <span className="text-sm font-medium">Thinking...</span>
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            )}
          </div>
          
          {/* Radar Chart and Metrics */}
          <div className="h-80">
            <RadarChart data={optimizationData} metricCards={metricCards} />
          </div>
        </div>
      </div>
    </div>
  )
}
