import { useState } from 'react'
import { DocumentType, DocumentationModuleProps, EncounterNoteData, OasisAssessmentData, InitialAssessmentData, ProgressNoteData } from '../types'
import { Patient } from '../data/patients'
import { patients } from '../data/patients'
import DocumentSelector from './DocumentSelector'
import PatientSelector from './PatientSelector'
import EncounterNote from './EncounterNote'
import OasisAssessment from './OasisAssessment'
import InitialAssessment from './InitialAssessment'
import ProgressNote from './ProgressNote'

export default function DocumentationModule({ onFormSubmit, onBackToMain }: DocumentationModuleProps) {
  const [currentView, setCurrentView] = useState<'patient-selector' | 'document-selector' | 'encounter' | 'oasis' | 'initial' | 'progress'>('patient-selector')
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)

  const handleSelectPatient = (patient: Patient) => {
    setSelectedPatient(patient)
    setCurrentView('document-selector')
  }

  const handleSelectDocument = (documentType: DocumentType) => {
    setCurrentView(documentType)
  }

  const handleBackToPatientSelector = () => {
    setCurrentView('patient-selector')
    setSelectedPatient(null)
  }

  const handleBackToDocumentSelector = () => {
    setCurrentView('document-selector')
  }

  const handleBackToMain = () => {
    if (onBackToMain) {
      onBackToMain()
    }
  }

  const handleEncounterSubmit = (data: EncounterNoteData) => {
    console.log('Encounter Note submitted:', data)
    if (onFormSubmit) {
      onFormSubmit('encounter', data)
    }
  }

  const handleOasisSubmit = (data: OasisAssessmentData) => {
    console.log('OASIS Assessment submitted:', data)
    if (onFormSubmit) {
      onFormSubmit('oasis', data)
    }
  }

  const handleInitialSubmit = (data: InitialAssessmentData) => {
    console.log('Initial Assessment submitted:', data)
    if (onFormSubmit) {
      onFormSubmit('initial', data)
    }
  }

  const handleProgressSubmit = (data: ProgressNoteData) => {
    console.log('Progress Note submitted:', data)
    if (onFormSubmit) {
      onFormSubmit('progress', data)
    }
  }

  const renderHeader = () => {
    return (
      <div className="flex items-center justify-between p-6 border-b border-dark-700 flex-shrink-0">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-semibold text-white">Documentation Module</h1>
          {selectedPatient && (
            <div className="flex items-center gap-2 text-gray-400">
              <span>•</span>
              <span className="text-md">{selectedPatient.name} ({selectedPatient.id})</span>
            </div>
          )}
        </div>
        <button
          onClick={handleBackToMain}
          className="px-4 py-2 bg-dark-700 hover:bg-dark-600 rounded-lg transition-colors text-gray-300"
        >
          Back to Main
        </button>
      </div>
    )
  }

  const renderContent = () => {
    switch (currentView) {
      case 'patient-selector':
        return (
          <div className="flex-1 p-6 overflow-y-auto">
            <PatientSelector
              patients={patients}
              onSelectPatient={handleSelectPatient}
              onBack={handleBackToMain}
            />
          </div>
        )
      
      case 'document-selector':
        return (
          <div className="flex-1 p-6 overflow-y-auto">
            <DocumentSelector 
              onSelectDocument={handleSelectDocument}
              onBack={handleBackToPatientSelector}
            />
          </div>
        )
      
      case 'encounter':
        return (
          <div className="flex-1 p-6 overflow-y-auto">
            <EncounterNote 
              patient={selectedPatient}
              onBack={handleBackToDocumentSelector}
              onSubmit={handleEncounterSubmit}
            />
          </div>
        )
      
      case 'oasis':
        return (
          <div className="flex-1 p-6 overflow-y-auto">
            <OasisAssessment 
              patient={selectedPatient}
              onBack={handleBackToDocumentSelector}
              onSubmit={handleOasisSubmit}
            />
          </div>
        )
      
      case 'initial':
        return (
          <div className="flex-1 p-6 overflow-y-auto">
            <InitialAssessment 
              patient={selectedPatient}
              onBack={handleBackToDocumentSelector}
              onSubmit={handleInitialSubmit}
            />
          </div>
        )
      
      case 'progress':
        return (
          <div className="flex-1 p-6 overflow-y-auto">
            <ProgressNote 
              patient={selectedPatient}
              onBack={handleBackToDocumentSelector}
              onSubmit={handleProgressSubmit}
            />
          </div>
        )
      
      default:
        return null
    }
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-dark-950 graph-pattern overflow-hidden">
      {renderHeader()}
      {renderContent()}
    </div>
  )
}
