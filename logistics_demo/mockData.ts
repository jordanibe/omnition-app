import { Personnel, Appointment, Schedule, OptimizationData } from './types'

export const mockPersonnel: Personnel[] = [
  { id: '1', name: 'Elizabeth Turner', role: 'Nurse', type: 'nurse' },
  { id: '2', name: 'Robert Mckenzie', role: 'Nurse', type: 'nurse' },
  { id: '3', name: 'Whitney Martinez', role: 'Lab Technician', type: 'lab_technician' },
  { id: '4', name: 'Tina West', role: 'Nurse', type: 'nurse' },
  { id: '5', name: 'Eddie Jones', role: 'Nurse', type: 'nurse' },
  { id: '6', name: 'Elizabeth Bauer', role: 'Nurse', type: 'nurse' },
  { id: '7', name: 'Valerie Mills', role: 'Lab Technician', type: 'lab_technician' },
]

export const mockAppointments: Appointment[] = [
  { id: '1', patientName: 'Christopher Williams', startTime: '11:00', endTime: '14:00', personnelId: '1' },
  { id: '2', patientName: 'Karen Ross', startTime: '15:00', endTime: '17:00', personnelId: '1' },
  { id: '3', patientName: 'William Smith', startTime: '08:00', endTime: '11:00', personnelId: '2' },
  { id: '4', patientName: 'Mark Perry', startTime: '12:00', endTime: '14:00', personnelId: '2' },
  { id: '5', patientName: 'Lisa Barber', startTime: '12:00', endTime: '14:00', personnelId: '3' },
  { id: '6', patientName: 'Daniel Williams', startTime: '15:00', endTime: '17:00', personnelId: '3' },
  { id: '7', patientName: 'Wesley Khan', startTime: '09:00', endTime: '11:00', personnelId: '4' },
  { id: '8', patientName: 'Gary Rogers', startTime: '13:00', endTime: '15:00', personnelId: '5' },
  { id: '9', patientName: 'Barbara Harris', startTime: '15:00', endTime: '17:00', personnelId: '5' },
  { id: '10', patientName: 'Tyler Nelson', startTime: '09:00', endTime: '11:00', personnelId: '6' },
  { id: '11', patientName: 'Jermaine Kemp', startTime: '11:00', endTime: '13:00', personnelId: '6' },
  { id: '12', patientName: 'Lisa Sanchez', startTime: '08:00', endTime: '10:00', personnelId: '7' },
  { id: '13', patientName: 'April Hunt', startTime: '12:00', endTime: '14:00', personnelId: '7' },
  { id: '14', patientName: 'Spencer Morgan', startTime: '15:00', endTime: '17:00', personnelId: '7' },
]

export const mockSchedule: Schedule = {
  date: '2024-01-15',
  appointments: mockAppointments
}

export const mockOptimizationData: OptimizationData = {
  recommended: {
    appointmentVolume: 85,
    providerBalance: 78,
    travelEfficiency: 92,
    continuityOfCare: 88
  },
  baseline: {
    appointmentVolume: 62,
    providerBalance: 65,
    travelEfficiency: 65,
    continuityOfCare: 70
  }
}


