export type DocumentType = 'encounter' | 'oasis' | 'initial' | 'progress' | 'ask-omni'

// Encounter Note Types
export interface EncounterNoteData {
  dateTime: string
  reasonForEncounter: string
  homeboundStatus: 'yes' | 'no'
  homeboundDetails: string
  skilledServices: {
    nursing: boolean
    pt: boolean
    ot: boolean
    slp: boolean
    msw: boolean
    hha: boolean
  }
  clinicalObservations: string
  physicianSignature: string
  completedBy: string
  completedByRole: string
}

// OASIS Assessment Types
export interface OasisAssessmentData {
  // Demographics
  age: string
  gender: 'male' | 'female' | 'other'
  raceEthnicity: string
  livingArrangement: string
  
  // Clinical Status
  primaryDiagnosis: string
  secondaryDiagnosis: string
  medications: string
  allergies: string
  
  // Functional Status
  adlIndependence: string
  mobilityStatus: string
  cognitiveFunction: string
  
  // Service Needs
  skilledNursingNeeds: string
  therapyNeeds: string
  equipmentNeeds: string
  
  // Psychosocial Status
  depressionScreening: string
  anxietyAssessment: string
  
  // Safety Assessment
  fallRisk: string
  medicationManagement: string
  
  // Assessment Info
  frequency: 'start_of_care' | 'resumption' | 'recertification' | 'discharge' | 'transfer'
  assessmentDate: string
  completedBy: string
  completedByRole: string
}

// Initial Assessment Types
export interface InitialAssessmentData {
  // Medical History
  pastMedicalHistory: string
  surgicalHistory: string
  medications: string
  
  // Current Condition
  chiefComplaint: string
  currentSymptoms: string
  painAssessment: string
  
  // Functional Status
  adlIndependence: string
  mobilityStatus: string
  
  // Home Environment
  livingSituation: string
  safetyHazards: string
  accessibility: string
  
  // Safety Evaluation
  fallRiskFactors: string
  emergencyContacts: string
  
  // Care Plan
  goals: string
  interventions: string
  visitFrequency: string
  
  // Assessment Info
  assessmentDate: string
  completedBy: string
  completedByRole: string
}

// Progress Note Types
export interface ProgressNoteData {
  // Visit Information
  visitDate: string
  visitTime: string
  visitType: string
  duration: string
  
  // Patient Condition
  currentStatus: string
  changesSinceLastVisit: string
  
  // Interventions
  interventionsPerformed: string
  patientResponse: string
  engagementLevel: string
  
  // Vital Signs
  bloodPressure: string
  heartRate: string
  respiratoryRate: string
  temperature: string
  oxygenSaturation: string
  painLevel: string
  
  // Changes and Plans
  changesInCondition: string
  planUpdates: string
  nextVisitPlans: string
  
  // Additional Notes
  visitNotes: string
  completedBy: string
  completedByRole: string
}

export interface DocumentationModuleProps {
  onFormSubmit?: (documentType: DocumentType, data: EncounterNoteData | OasisAssessmentData | InitialAssessmentData | ProgressNoteData) => void
  onBackToMain?: () => void
}
