'use client'

import { useState, useMemo } from 'react'
import { ChevronLeft, ChevronRight, Search, Send } from 'lucide-react'
import CustomGanttChart from './CustomGanttChart'
import RadarChart from './RadarChart'
import { Personnel, Appointment } from '../types'
import { createExampleMultiColorAssignments } from '../utils/ganttDataConverter'
import { getPersonnelData, getAppointmentsForDate, getAllDates } from '../data/scheduleDataLoader'

interface LogisticsViewProps {
  moduleName?: string
}

export default function LogisticsView({ moduleName }: LogisticsViewProps) {
  const availableDates = getAllDates()
  const [currentDate, setCurrentDate] = useState(availableDates[0] || '2025-09-01')
  const [searchTerm, setSearchTerm] = useState('')

  // Load real schedule data
  const allPersonnel: Personnel[] = getPersonnelData()
  const currentAppointments: Appointment[] = getAppointmentsForDate(currentDate)

  const mockOptimizationData = useMemo(() => ({
    recommended: {
      appointmentVolume: 85,
      providerBalance: 92,
      travelEfficiency: 78,
      continuityOfCare: 88
    },
    baseline: {
      appointmentVolume: 65,
      providerBalance: 70,
      travelEfficiency: 45,
      continuityOfCare: 72
    }
  }), [])

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
            {moduleName || 'Logistics Optimization'}
          </h2>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Gantt Chart */}
        <div className="flex-1 p-6 overflow-hidden">
          {/* Date Selector */}
          <div className="flex items-center justify-center mb-8">
            <button
              onClick={handlePreviousDay}
              className="p-2 hover:bg-dark-800 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-400" />
            </button>
            <span className="mx-4 text-lg font-medium text-white">
              {new Date(currentDate).toLocaleDateString('en-US', {
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
          <div className="relative mb-8">
            <input
              type="text"
              placeholder="Search personnel..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Gantt Chart */}
          <div className="flex-1 overflow-hidden">
            <div className="h-full overflow-y-auto">
              <CustomGanttChart
                personnel={ganttData}
                startHour={5}
                endHour={21}
                hourWidth={60}
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
                placeholder="What shall I change?"
                className="flex-1 px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="px-4 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors">
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
          
          {/* Radar Chart and Metrics */}
          <div className="h-80">
            <RadarChart data={mockOptimizationData} />
          </div>
        </div>
      </div>
    </div>
  )
}
