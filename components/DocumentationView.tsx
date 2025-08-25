'use client'

import { useState } from 'react'
import { Download } from 'lucide-react'
import { DocumentType, EncounterNoteData, OasisAssessmentData, InitialAssessmentData, ProgressNoteData } from '@/docs_demo/types'
import { Patient } from '@/docs_demo/data/patients'

interface DocumentationViewProps {
  documentType: DocumentType
  patient: Patient
  onBack: () => void
}

export default function DocumentationView({ documentType, patient, onBack }: DocumentationViewProps) {
  const [formData, setFormData] = useState<any>({})

  const documentTypeLabels = {
    'encounter': 'Encounter Note',
    'oasis': 'OASIS Assessment',
    'initial': 'Initial Assessment',
    'progress': 'Progress Note',
    'ask-omni': 'Ask Omni'
  }

  const handleExport = () => {
    // TODO: Implement export functionality
    console.log('Exporting document:', { documentType, patient, formData })
  }

  const renderForm = () => {
    switch (documentType) {
      case 'encounter':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Date & Time</label>
                <input
                  type="datetime-local"
                  className="w-full p-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  value={formData.dateTime || ''}
                  onChange={(e) => setFormData({...formData, dateTime: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Reason for Encounter</label>
                <input
                  type="text"
                  className="w-full p-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  value={formData.reasonForEncounter || ''}
                  onChange={(e) => setFormData({...formData, reasonForEncounter: e.target.value})}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Homebound Status</label>
              <select
                className="w-full p-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                value={formData.homeboundStatus || ''}
                onChange={(e) => setFormData({...formData, homeboundStatus: e.target.value})}
              >
                <option value="">Select status</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Clinical Observations</label>
              <textarea
                rows={4}
                className="w-full p-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-blue-500 resize-none"
                value={formData.clinicalObservations || ''}
                onChange={(e) => setFormData({...formData, clinicalObservations: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Completed By</label>
                <input
                  type="text"
                  className="w-full p-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  value={formData.completedBy || ''}
                  onChange={(e) => setFormData({...formData, completedBy: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Role</label>
                <input
                  type="text"
                  className="w-full p-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  value={formData.completedByRole || ''}
                  onChange={(e) => setFormData({...formData, completedByRole: e.target.value})}
                />
              </div>
            </div>
          </div>
        )

      case 'oasis':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Assessment Date</label>
                <input
                  type="date"
                  className="w-full p-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  value={formData.assessmentDate || ''}
                  onChange={(e) => setFormData({...formData, assessmentDate: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Frequency</label>
                <select
                  className="w-full p-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  value={formData.frequency || ''}
                  onChange={(e) => setFormData({...formData, frequency: e.target.value})}
                >
                  <option value="">Select frequency</option>
                  <option value="start_of_care">Start of Care</option>
                  <option value="resumption">Resumption</option>
                  <option value="recertification">Recertification</option>
                  <option value="discharge">Discharge</option>
                  <option value="transfer">Transfer</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Primary Diagnosis</label>
          <input
            type="text"
            className="w-full p-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
            value={formData.primaryDiagnosis || patient.primaryDiagnosis || ''}
            onChange={(e) => setFormData({...formData, primaryDiagnosis: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Medications</label>
          <textarea
            rows={3}
            className="w-full p-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-blue-500 resize-none"
            value={formData.medications || patient.medications || ''}
            onChange={(e) => setFormData({...formData, medications: e.target.value})}
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Completed By</label>
            <input
              type="text"
              className="w-full p-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
              value={formData.completedBy || ''}
              onChange={(e) => setFormData({...formData, completedBy: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Role</label>
            <input
              type="text"
              className="w-full p-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
              value={formData.completedByRole || ''}
              onChange={(e) => setFormData({...formData, completedByRole: e.target.value})}
            />
          </div>
        </div>
      </div>
    )

      case 'initial':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Chief Complaint</label>
              <input
                type="text"
                className="w-full p-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                value={formData.chiefComplaint || ''}
                onChange={(e) => setFormData({...formData, chiefComplaint: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Current Symptoms</label>
              <textarea
                rows={3}
                className="w-full p-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-blue-500 resize-none"
                value={formData.currentSymptoms || ''}
                onChange={(e) => setFormData({...formData, currentSymptoms: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Assessment Date</label>
                <input
                  type="date"
                  className="w-full p-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  value={formData.assessmentDate || ''}
                  onChange={(e) => setFormData({...formData, assessmentDate: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Visit Frequency</label>
                <input
                  type="text"
                  className="w-full p-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  value={formData.visitFrequency || ''}
                  onChange={(e) => setFormData({...formData, visitFrequency: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Completed By</label>
                <input
                  type="text"
                  className="w-full p-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  value={formData.completedBy || ''}
                  onChange={(e) => setFormData({...formData, completedBy: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Role</label>
                <input
                  type="text"
                  className="w-full p-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  value={formData.completedByRole || ''}
                  onChange={(e) => setFormData({...formData, completedByRole: e.target.value})}
                />
              </div>
            </div>
          </div>
        )

      case 'progress':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Visit Date</label>
                <input
                  type="date"
                  className="w-full p-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  value={formData.visitDate || ''}
                  onChange={(e) => setFormData({...formData, visitDate: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Visit Time</label>
                <input
                  type="time"
                  className="w-full p-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  value={formData.visitTime || ''}
                  onChange={(e) => setFormData({...formData, visitTime: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Current Status</label>
              <textarea
                rows={3}
                className="w-full p-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-blue-500 resize-none"
                value={formData.currentStatus || ''}
                onChange={(e) => setFormData({...formData, currentStatus: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Interventions Performed</label>
              <textarea
                rows={3}
                className="w-full p-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-blue-500 resize-none"
                value={formData.interventionsPerformed || ''}
                onChange={(e) => setFormData({...formData, interventionsPerformed: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Completed By</label>
                <input
                  type="text"
                  className="w-full p-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  value={formData.completedBy || ''}
                  onChange={(e) => setFormData({...formData, completedBy: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Role</label>
                <input
                  type="text"
                  className="w-full p-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  value={formData.completedByRole || ''}
                  onChange={(e) => setFormData({...formData, completedByRole: e.target.value})}
                />
              </div>
            </div>
          </div>
        )

      default:
        return <div className="text-gray-400">Document type not supported</div>
    }
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-dark-950 graph-pattern overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-dark-700 flex-shrink-0">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-semibold text-white">Omnition</h1>
          <span className="text-xl text-gray-400">•</span>
          <h2 className="text-2xl font-medium text-white">
            {documentTypeLabels[documentType]} for {patient.name}
          </h2>
        </div>
        <button
          onClick={handleExport}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-white flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Export
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {renderForm()}
        </div>
      </div>
    </div>
  )
}
