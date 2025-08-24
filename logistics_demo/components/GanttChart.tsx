'use client'

import { useEffect, useRef, useState } from 'react'
import { Personnel, Appointment } from '../types'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface GanttChartProps {
  personnel: Personnel[]
  appointments: Appointment[]
  currentDate: string
  onDateChange: (date: string) => void
}

declare global {
  interface Window {
    google: any
  }
}

export default function GanttChart({ personnel, appointments, currentDate, onDateChange }: GanttChartProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState<'personnel' | 'gantt'>('gantt')
  const chartRef = useRef<HTMLDivElement>(null)
  const chartInstance = useRef<any>(null)

  const filteredPersonnel = personnel.filter(person => 
    person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    person.role.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const changeDate = (direction: 'prev' | 'next') => {
    const date = new Date(currentDate)
    if (direction === 'prev') {
      date.setDate(date.getDate() - 1)
    } else {
      date.setDate(date.getDate() + 1)
    }
    onDateChange(date.toISOString().split('T')[0])
  }

  const createGanttData = () => {
    const data = new window.google.visualization.DataTable()
    data.addColumn('string', 'Task ID')
    data.addColumn('string', 'Task Name')
    data.addColumn('string', 'Resource')
    data.addColumn('date', 'Start Date')
    data.addColumn('date', 'End Date')
    data.addColumn('number', 'Duration')
    data.addColumn('number', 'Percent Complete')
    data.addColumn('string', 'Dependencies')

    const rows: any[] = []
    
    filteredPersonnel.forEach((person) => {
      const personAppointments = appointments.filter(apt => apt.personnelId === person.id)
      
      if (personAppointments.length === 0) {
        // Add person with no appointments
        const startDate = new Date(currentDate)
        startDate.setHours(7, 0, 0, 0) // 07:00
        const endDate = new Date(currentDate)
        endDate.setHours(17, 0, 0, 0) // 17:00
        
        rows.push([
          person.id,
          person.name,
          person.role,
          startDate,
          endDate,
          null,
          0,
          null
        ])
      } else {
        personAppointments.forEach((apt, index) => {
          const [startHours, startMinutes] = apt.startTime.split(':').map(Number)
          const [endHours, endMinutes] = apt.endTime.split(':').map(Number)
          
          const startDate = new Date(currentDate)
          startDate.setHours(startHours, startMinutes, 0, 0)
          
          const endDate = new Date(currentDate)
          endDate.setHours(endHours, endMinutes, 0, 0)
          
          rows.push([
            `${person.id}_${apt.id}`,
            apt.patientName,
            person.role,
            startDate,
            endDate,
            null,
            100,
            null
          ])
        })
      }
    })

    data.addRows(rows)
    return data
  }

  const drawChart = () => {
    if (!window.google || !chartRef.current) return

    try {
      const data = createGanttData()
      
      const options = {
        height: 400,
        gantt: {
          trackHeight: 30,
          labelStyle: {
            fontName: 'Inter',
            fontSize: 12,
            color: '#9ca3af'
          },
          palette: [
            {
              color: '#3b82f6',
              dark: '#1d4ed8',
              light: '#93c5fd'
            }
          ]
        }
      }

      if (chartInstance.current) {
        chartInstance.current.clearChart()
      }

      chartInstance.current = new window.google.visualization.Gantt(chartRef.current)
      chartInstance.current.draw(data, options)
    } catch (error) {
      console.error('Error drawing Gantt chart:', error)
    }
  }

  useEffect(() => {
    // Load Google Charts
    const loadGoogleCharts = () => {
      if (window.google && window.google.visualization) {
        drawChart()
      } else {
        const script = document.createElement('script')
        script.src = 'https://www.gstatic.com/charts/loader.js'
        script.onload = () => {
          window.google.charts.load('current', { packages: ['gantt'] })
          window.google.charts.setOnLoadCallback(drawChart)
        }
        document.head.appendChild(script)
      }
    }

    loadGoogleCharts()
  }, [filteredPersonnel, appointments, currentDate])

  return (
    <div className="w-full">
      {/* Date Selector */}
      <div className="flex items-center justify-center mb-6">
        <button
          onClick={() => changeDate('prev')}
          className="p-2 rounded-lg hover:bg-dark-800 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-gray-400" />
        </button>
        
        <div className="mx-4 text-lg font-semibold text-white">
          {formatDate(currentDate)}
        </div>
        
        <button
          onClick={() => changeDate('next')}
          className="p-2 rounded-lg hover:bg-dark-800 transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      {/* Search and View Tabs */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search nurses by name, type, skill, or neighborhood..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
        
        <div className="flex bg-dark-800 rounded-lg p-1">
          <button
            onClick={() => setViewMode('personnel')}
            className={`px-4 py-2 rounded-md transition-colors ${
              viewMode === 'personnel' 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Personnel
          </button>
          <button
            onClick={() => setViewMode('gantt')}
            className={`px-4 py-2 rounded-md transition-colors ${
              viewMode === 'gantt' 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Gantt
          </button>
        </div>
      </div>

      {/* Google Gantt Chart */}
      <div className="bg-dark-900 border border-dark-700 rounded-2xl overflow-hidden p-4">
        <div ref={chartRef} className="w-full" />
      </div>
    </div>
  )
}
