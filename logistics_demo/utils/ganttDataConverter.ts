import { Personnel, Appointment } from '../types'
import { GanttPersonnel, GanttAssignment } from '../components/CustomGanttChart'

export interface SubEvent {
  startTime: number
  endTime: number
  color: string
  label?: string
}

export interface MultiColorAssignment {
  id: string
  text: string
  startTime: number
  endTime: number
  subEvents: SubEvent[]
  data?: Record<string, any>
}

export function convertToGanttData(
  personnel: Personnel[],
  appointments: Appointment[],
  currentDate: string
): GanttPersonnel[] {
  return personnel.map(person => {
    const personAppointments = appointments.filter(apt => apt.personnelId === person.id)
    
    // Convert appointments to Gantt assignments
    const assignments: GanttAssignment[] = personAppointments.map(apt => {
      const [startHours, startMinutes] = apt.startTime.split(':').map(Number)
      const [endHours, endMinutes] = apt.endTime.split(':').map(Number)
      
      const startTime = startHours + (startMinutes / 60)
      const endTime = endHours + (endMinutes / 60)
      
      return {
        id: apt.id,
        text: apt.patientName,
        startTime,
        endTime,
        color: '#3b82f6', // Default blue
        data: {
          patientName: apt.patientName,
          startTime: apt.startTime,
          endTime: apt.endTime,
          personnelId: apt.personnelId
        }
      }
    })
    
    return {
      id: person.id,
      name: person.name,
      type: person.role,
      assignments
    }
  })
}

export function createMultiColorAssignment(
  baseAssignment: GanttAssignment,
  subEvents: SubEvent[]
): MultiColorAssignment {
  return {
    id: baseAssignment.id,
    text: baseAssignment.text,
    startTime: baseAssignment.startTime,
    endTime: baseAssignment.endTime,
    subEvents,
    data: baseAssignment.data
  }
}

export function generateSubEvents(
  startTime: number,
  endTime: number,
  colors: string[] = ['#93c5fd', '#1d4ed8', '#93c5fd']
): SubEvent[] {
  const duration = endTime - startTime
  const subEventCount = colors.length
  
  if (subEventCount === 1) {
    return [{
      startTime,
      endTime,
      color: colors[0]
    }]
  }
  
  const subEventDuration = duration / subEventCount
  const subEvents: SubEvent[] = []
  
  for (let i = 0; i < subEventCount; i++) {
    const subStart = startTime + (i * subEventDuration)
    const subEnd = startTime + ((i + 1) * subEventDuration)
    
    subEvents.push({
      startTime: subStart,
      endTime: subEnd,
      color: colors[i % colors.length]
    })
  }
  
  return subEvents
}

// Example usage for creating multi-color assignments
export function createExampleMultiColorAssignments(
  personnel: Personnel[],
  appointments: Appointment[],
  currentDate: string
): GanttPersonnel[] {
  return personnel.map(person => {
    const personAppointments = appointments.filter(apt => apt.personnelId === person.id)
    
    const assignments: GanttAssignment[] = personAppointments.map((apt, index) => {
      const [startHours, startMinutes] = apt.startTime.split(':').map(Number)
      const [endHours, endMinutes] = apt.endTime.split(':').map(Number)
      
      const startTime = startHours + (startMinutes / 60)
      const endTime = endHours + (endMinutes / 60)
      
      // Create different color patterns for different assignments
      let colors: string[]
      if (index % 3 === 0) {
        // Light blue -> Navy -> Light blue (3pm-4pm example)
        colors = ['#93c5fd', '#1d4ed8', '#93c5fd']
      } else if (index % 3 === 1) {
        // Green -> Dark green -> Green
        colors = ['#86efac', '#166534', '#86efac']
      } else {
        // Purple -> Dark purple -> Purple
        colors = ['#c4b5fd', '#581c87', '#c4b5fd']
      }
      
      // Generate sub-events for multi-color effect
      const subEvents = generateSubEvents(startTime, endTime, colors)
      
      // For now, use the first color as the main color
      // In a more advanced implementation, you could render multiple colored segments
      return {
        id: apt.id,
        text: apt.patientName,
        startTime,
        endTime,
        color: subEvents[0].color, // Use first color for now
        data: {
          patientName: apt.patientName,
          startTime: apt.startTime,
          endTime: apt.endTime,
          personnelId: apt.personnelId,
          subEvents // Store sub-events for future multi-color rendering
        }
      }
    })
    
    return {
      id: person.id,
      name: person.name,
      type: person.role,
      assignments
    }
  })
}
