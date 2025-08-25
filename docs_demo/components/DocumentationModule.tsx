import { useState } from 'react'
import { DocumentType, DocumentationModuleProps, EncounterNoteData, OasisAssessmentData, InitialAssessmentData, ProgressNoteData } from '../types'
import { Patient } from '../data/patients'
import { patients } from '../data/patients'
import { ChevronDown, Send, MessageSquare } from 'lucide-react'

export default function DocumentationModule({ onFormSubmit, onBackToMain }: DocumentationModuleProps) {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [selectedDocumentType, setSelectedDocumentType] = useState<DocumentType | 'ask-omni' | null>(null)
  const [askOmniText, setAskOmniText] = useState('')
  const [isPatientDropdownOpen, setIsPatientDropdownOpen] = useState(false)
  const [isDocumentDropdownOpen, setIsDocumentDropdownOpen] = useState(false)

  const documentTypeLabels = {
    'encounter': 'Encounter Note',
    'oasis': 'OASIS Assessment',
    'initial': 'Initial Assessment',
    'progress': 'Progress Note',
    'ask-omni': 'Ask Omni'
  }

  const handleSubmit = () => {
    if (!selectedPatient) {
      alert('Please select a patient')
      return
    }
    
    if (!selectedDocumentType) {
      alert('Please select a document type')
      return
    }

    if (selectedDocumentType === 'ask-omni') {
      if (!askOmniText.trim()) {
        alert('Please enter your question for Omni')
        return
      }
      console.log('Ask Omni submitted:', { patient: selectedPatient, question: askOmniText })
      // Here you would typically call an API to get Omni's response
      alert(`Omni will help you with: "${askOmniText}" for patient ${selectedPatient.name}`)
      return
    }

    // For regular document types, you would navigate to the appropriate form
    console.log('Document type selected:', { patient: selectedPatient, documentType: selectedDocumentType })
    alert(`Opening ${documentTypeLabels[selectedDocumentType]} for patient ${selectedPatient.name}`)
  }

  const handleBackToMain = () => {
    if (onBackToMain) {
      onBackToMain()
    }
  }

  const togglePatientDropdown = () => {
    setIsPatientDropdownOpen(!isPatientDropdownOpen)
    setIsDocumentDropdownOpen(false)
  }

  const toggleDocumentDropdown = () => {
    setIsDocumentDropdownOpen(!isDocumentDropdownOpen)
    setIsPatientDropdownOpen(false)
  }

  const selectPatient = (patient: Patient) => {
    setSelectedPatient(patient)
    setIsPatientDropdownOpen(false)
  }

  const selectDocumentType = (docType: DocumentType | 'ask-omni') => {
    setSelectedDocumentType(docType)
    setIsDocumentDropdownOpen(false)
    if (docType !== 'ask-omni') {
      setAskOmniText('')
    }
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-dark-950 graph-pattern overflow-hidden">
      {/* Header */}
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 relative overflow-hidden">
        {/* Title */}
        <div className="mb-12 text-center flex-shrink-0">
          <h2 className="text-4xl font-medium mb-4 animate-float">
            <span className="text-white">What would you like to document?</span>
          </h2>
        </div>

        {/* Input Area - Similar to Analytics Module */}
        <div className="w-full max-w-4xl flex-shrink-0">
          <div className="flex items-center gap-4">
            {/* Patient Dropdown */}
            <div className="relative flex-1">
              <button
                onClick={togglePatientDropdown}
                className="w-full p-3 bg-dark-900 border border-dark-700 rounded-lg text-left text-white hover:border-dark-600 transition-colors flex items-center justify-between"
              >
                <span className={selectedPatient ? 'text-white' : 'text-gray-400'}>
                  {selectedPatient ? `${selectedPatient.name} (${selectedPatient.id})` : 'Select Patient...'}
                </span>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isPatientDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isPatientDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-dark-900 border border-dark-700 rounded-lg max-h-60 overflow-y-auto z-10">
                  {patients.map((patient) => (
                    <button
                      key={patient.id}
                      onClick={() => selectPatient(patient)}
                      className="w-full p-3 text-left text-white hover:bg-dark-800 transition-colors border-b border-dark-700 last:border-b-0"
                    >
                      <div className="font-medium">{patient.name}</div>
                      <div className="text-sm text-gray-400">ID: {patient.id} • Age: {patient.age}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Document Type Dropdown */}
            <div className="relative flex-1">
              <button
                onClick={toggleDocumentDropdown}
                className="w-full p-3 bg-dark-900 border border-dark-700 rounded-lg text-left text-white hover:border-dark-600 transition-colors flex items-center justify-between"
              >
                <span className={selectedDocumentType ? 'text-white' : 'text-gray-400'}>
                  {selectedDocumentType ? documentTypeLabels[selectedDocumentType] : 'Select Document Type...'}
                </span>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isDocumentDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isDocumentDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-dark-900 border border-dark-700 rounded-lg z-10">
                  {Object.entries(documentTypeLabels).map(([key, label]) => (
                    <button
                      key={key}
                      onClick={() => selectDocumentType(key as DocumentType | 'ask-omni')}
                      className="w-full p-3 text-left text-white hover:bg-dark-800 transition-colors border-b border-dark-700 last:border-b-0 flex items-center gap-2"
                    >
                      {key === 'ask-omni' && <MessageSquare className="w-4 h-4 text-blue-400" />}
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={!selectedPatient || !selectedDocumentType}
              className="p-3 bg-blue-600 hover:bg-blue-700 disabled:bg-dark-700 disabled:cursor-not-allowed rounded-lg transition-colors flex-shrink-0"
            >
              <Send className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Ask Omni Text Input - Only show when "Ask Omni" is selected */}
          {selectedDocumentType === 'ask-omni' && (
            <div className="mt-4">
              <div className="relative">
                <textarea
                  value={askOmniText}
                  onChange={(e) => setAskOmniText(e.target.value)}
                  placeholder="Describe what you need help with... For example: 'Help me write a progress note for this patient's recent fall' or 'What should I document for this patient's medication changes?'"
                  className="w-full p-4 pr-16 bg-dark-900 border border-dark-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors resize-none min-h-[120px]"
                  rows={4}
                />
                <div className="absolute bottom-4 right-4 flex items-center gap-2 text-gray-400 text-sm">
                  <MessageSquare className="w-4 h-4" />
                  <span>Ask Omni</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="mt-8 text-center text-gray-400 max-w-2xl">
          <p className="text-sm">
            Select a patient and document type to get started. Use "Ask Omni" for assistance with documentation questions or to get help writing specific notes.
          </p>
        </div>
      </div>
    </div>
  )
}
