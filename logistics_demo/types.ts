export interface Personnel {
  id: string
  name: string
  role: string
  type: 'nurse' | 'lab_technician' | 'other'
}

export interface Appointment {
  id: string
  patientName: string
  startTime: string
  endTime: string
  personnelId: string
}

export interface Schedule {
  date: string
  appointments: Appointment[]
}

export interface OptimizationMetrics {
  appointmentVolume: number
  providerBalance: number
  travelEfficiency: number
  continuityOfCare: number
}

export interface OptimizationData {
  recommended: OptimizationMetrics
  baseline: OptimizationMetrics
}
