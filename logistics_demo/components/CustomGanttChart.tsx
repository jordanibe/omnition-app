'use client'

import { useState, useEffect, useRef } from 'react'

export interface GanttAssignment {
  id: string
  text: string
  startTime: number // Hour as decimal (e.g., 9.5 for 9:30 AM)
  endTime: number   // Hour as decimal (e.g., 10.5 for 10:30 AM)
  color: string
  data?: Record<string, any> // Additional data for tooltips, etc.
}

export interface GanttPersonnel {
  id: string
  name: string
  type: string
  assignments: GanttAssignment[]
}

export interface CustomGanttChartProps {
  personnel: GanttPersonnel[]
  startHour?: number
  endHour?: number
  hourWidth?: number // Pixels per hour
  onAssignmentClick?: (assignment: GanttAssignment, personnel: GanttPersonnel) => void
  onPersonnelClick?: (personnel: GanttPersonnel) => void
}

export default function CustomGanttChart({
  personnel,
  startHour = 5,
  endHour = 21,
  hourWidth = 60,
  onAssignmentClick,
  onPersonnelClick
}: CustomGanttChartProps) {
  const [tooltip, setTooltip] = useState<{
    visible: boolean
    x: number
    y: number
    content: GanttAssignment | null
  }>({
    visible: false,
    x: 0,
    y: 0,
    content: null
  })

  const chartRef = useRef<HTMLDivElement>(null)
  const totalHours = endHour - startHour
  const totalWidth = totalHours * hourWidth

  // Calculate smart time range if not provided
  const calculateTimeRange = () => {
    if (startHour !== undefined && endHour !== undefined) {
      return { start: startHour, end: endHour }
    }

    let minHour = 24
    let maxHour = 0

    personnel.forEach(person => {
      person.assignments.forEach(assignment => {
        minHour = Math.min(minHour, Math.floor(assignment.startTime))
        maxHour = Math.max(maxHour, Math.ceil(assignment.endTime))
      })
    })

    // Add padding
    minHour = Math.max(0, minHour - 1)
    maxHour = Math.min(24, maxHour + 1)

    return { start: minHour, end: maxHour }
  }

  const timeRange = calculateTimeRange()

  const formatTime = (hour: number) => {
    const hourInt = Math.floor(hour)
    const minute = Math.round((hour % 1) * 60)
    return `${hourInt.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
  }

  const getAssignmentPosition = (assignment: GanttAssignment) => {
    const adjustedStartHour = assignment.startTime - timeRange.start
    const adjustedEndHour = assignment.endTime - timeRange.start
    
    const startPixels = adjustedStartHour * hourWidth
    const endPixels = adjustedEndHour * hourWidth
    const width = endPixels - startPixels
    
    return { left: startPixels, width }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (tooltip.visible && tooltip.content) {
      setTooltip(prev => ({
        ...prev,
        x: e.clientX + 10,
        y: e.clientY - 40
      }))
    }
  }

  const handleAssignmentMouseEnter = (assignment: GanttAssignment, e: React.MouseEvent) => {
    setTooltip({
      visible: true,
      x: e.clientX + 10,
      y: e.clientY - 40,
      content: assignment
    })
  }

  const handleAssignmentMouseLeave = () => {
    setTooltip(prev => ({ ...prev, visible: false }))
  }

  const handleAssignmentClick = (assignment: GanttAssignment, personnel: GanttPersonnel) => {
    if (onAssignmentClick) {
      onAssignmentClick(assignment, personnel)
    }
  }

  const handlePersonnelClick = (personnel: GanttPersonnel) => {
    if (onPersonnelClick) {
      onPersonnelClick(personnel)
    }
  }

  return (
    <div className="custom-gantt-chart" ref={chartRef} onMouseMove={handleMouseMove}>
      {/* Header */}
      <div className="gantt-header">
        <div className="gantt-personnel-header">Personnel</div>
        <div className="gantt-timeline-header" style={{ minWidth: totalWidth }}>
          {Array.from({ length: totalHours }, (_, i) => {
            const hour = timeRange.start + i
            return (
              <div key={hour} className="gantt-hour-header" style={{ width: hourWidth }}>
                {formatTime(hour)}
              </div>
            )
          })}
        </div>
      </div>

      {/* Body */}
      <div className="gantt-body">
        <div className="gantt-personnel-list">
          {personnel.map(person => (
            <div key={person.id} className="gantt-personnel-row">
              <div 
                className="gantt-personnel-name"
                onClick={() => handlePersonnelClick(person)}
              >
                {person.name} ({person.type})
              </div>
            </div>
          ))}
        </div>

        <div className="gantt-timeline" style={{ minWidth: totalWidth }}>
          {personnel.map(person => (
            <div key={person.id} className="gantt-timeline-row">
              <div className="gantt-hour-grid">
                {Array.from({ length: totalHours }, (_, i) => (
                  <div key={i} className="gantt-hour-cell" style={{ width: hourWidth }} />
                ))}
              </div>

              {/* Assignments */}
              {person.assignments.map(assignment => {
                const { left, width } = getAssignmentPosition(assignment)
                return (
                  <div
                    key={assignment.id}
                    className="gantt-assignment"
                    style={{
                      left: `${left}px`,
                      width: `${width}px`,
                      backgroundColor: assignment.color
                    }}
                    onMouseEnter={(e) => handleAssignmentMouseEnter(assignment, e)}
                    onMouseLeave={handleAssignmentMouseLeave}
                    onClick={() => handleAssignmentClick(assignment, person)}
                    data-testid={`assignment-${assignment.id}`}
                  >
                    {assignment.text}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Tooltip */}
      {tooltip.visible && tooltip.content && (
        <div
          className="gantt-tooltip"
          style={{
            position: 'fixed',
            left: tooltip.x,
            top: tooltip.y,
            zIndex: 1000
          }}
        >
          <div className="tooltip-content">
            <div className="tooltip-title">{tooltip.content.text}</div>
            <div className="tooltip-time">
              {formatTime(tooltip.content.startTime)} - {formatTime(tooltip.content.endTime)}
            </div>
            {tooltip.content.data && Object.entries(tooltip.content.data).map(([key, value]) => {
              // Skip rendering subEvents as they're objects
              if (key === 'subEvents') return null
              
              // Format the value properly
              let displayValue = value
              if (typeof value === 'object' && value !== null) {
                displayValue = JSON.stringify(value)
              } else if (typeof value === 'string' || typeof value === 'number') {
                displayValue = value
              } else {
                displayValue = String(value)
              }
              
              return (
                <div key={key} className="tooltip-data">
                  {key}: {displayValue}
                </div>
              )
            })}
          </div>
        </div>
      )}

      <style jsx>{`
        .custom-gantt-chart {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          color: white;
          height: auto;
          min-height: 100%;
          overflow-x: auto;
          overflow-y: visible;
          background-color: #1f2937;
        }

        .gantt-header {
          display: flex;
          border-bottom: 1px solid #374151;
          background-color: #1f2937;
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .gantt-personnel-header {
          width: 200px;
          min-width: 200px;
          max-width: 200px;
          padding: 12px;
          font-weight: 600;
          background-color: #111827;
          border-right: 1px solid #374151;
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }

        .gantt-timeline-header {
          display: flex;
          flex: 1;
          background-color: #1f2937;
        }

        .gantt-hour-header {
          padding: 12px 8px;
          text-align: center;
          font-size: 12px;
          font-weight: 500;
          border-right: 1px solid #374151;
          min-width: 60px;
          width: 60px;
          background-color: #1f2937;
          flex-shrink: 0;
        }

        .gantt-body {
          display: flex;
        }

        .gantt-personnel-list {
          width: 200px;
          min-width: 200px;
          max-width: 200px;
          background-color: #111827;
          border-right: 1px solid #374151;
          flex-shrink: 0;
        }

        .gantt-personnel-row {
          height: 60px;
          border-bottom: 1px solid #374151;
        }

        .gantt-personnel-name {
          padding: 12px;
          height: 100%;
          display: flex;
          align-items: center;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .gantt-personnel-name:hover {
          background-color: #374151;
        }

        .gantt-timeline {
          flex: 1;
          position: relative;
          min-width: 0;
          overflow: hidden;
        }

        .gantt-timeline-row {
          height: 60px;
          border-bottom: 1px solid #374151;
          position: relative;
        }

        .gantt-hour-grid {
          display: flex;
          height: 100%;
        }

        .gantt-hour-cell {
          height: 100%;
          border-right: 1px solid #374151;
          background-color: #1f2937;
          min-width: 60px;
          width: 60px;
          flex-shrink: 0;
        }

        .gantt-assignment {
          position: absolute;
          top: 8px;
          height: 44px;
          background-color: #3b82f6;
          border-radius: 4px;
          padding: 8px;
          font-size: 12px;
          font-weight: 500;
          color: white;
          cursor: pointer;
          transition: all 0.2s;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .gantt-assignment:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        .gantt-tooltip {
          background-color: #111827;
          border: 1px solid #374151;
          border-radius: 6px;
          padding: 12px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
          max-width: 250px;
        }

        .tooltip-content {
          font-size: 12px;
        }

        .tooltip-title {
          font-weight: 600;
          margin-bottom: 4px;
          color: #f9fafb;
        }

        .tooltip-time {
          color: #9ca3af;
          margin-bottom: 8px;
        }

        .tooltip-data {
          color: #d1d5db;
          margin-bottom: 2px;
        }
      `}</style>
    </div>
  )
}
