import { FileText, ClipboardList, Stethoscope, UserCheck } from 'lucide-react'
import { DocumentType } from '../types'

interface DocumentSelectorProps {
  onSelectDocument: (documentType: DocumentType) => void
  onBack: () => void
}

export default function DocumentSelector({ onSelectDocument, onBack }: DocumentSelectorProps) {
  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 flex-shrink-0">
        <div className="text-center flex-1">
          <h2 className="text-3xl font-semibold text-white mb-2">Select Document Type</h2>
          <p className="text-gray-400">Choose the type of documentation you want to create</p>
        </div>
        <button
          onClick={onBack}
          className="px-4 py-2 bg-dark-700 hover:bg-dark-600 rounded-lg transition-colors text-gray-300"
        >
          Back to Patients
        </button>
      </div>
      
      {/* Document Cards */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Encounter Note Card */}
          <div 
            onClick={() => onSelectDocument('encounter')}
            className="p-6 bg-dark-900 border border-dark-700 hover:border-dark-600 rounded-2xl cursor-pointer transition-colors group"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                  Encounter Note
                </h3>
                <p className="text-xs text-gray-500">Per visit</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-3">
              Document patient encounters with homebound status, skilled services needs, and clinical observations.
            </p>
            <p className="text-xs text-gray-500">Completed by: Any clinician</p>
          </div>

          {/* OASIS Assessment Card */}
          <div 
            onClick={() => onSelectDocument('oasis')}
            className="p-6 bg-dark-900 border border-dark-700 hover:border-dark-600 rounded-2xl cursor-pointer transition-colors group"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Stethoscope className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                  OASIS Assessment
                </h3>
                <p className="text-xs text-gray-500">OASIS-E</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-3">
              Comprehensive patient assessment for Medicare/Medicaid with demographics, clinical status, and functional assessments.
            </p>
            <p className="text-xs text-gray-500">Completed by: RN or qualified therapist</p>
          </div>

          {/* Initial Assessment Card */}
          <div 
            onClick={() => onSelectDocument('initial')}
            className="p-6 bg-dark-900 border border-dark-700 hover:border-dark-600 rounded-2xl cursor-pointer transition-colors group"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <UserCheck className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                  Initial Assessment
                </h3>
                <p className="text-xs text-gray-500">First visit</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-3">
              First comprehensive patient evaluation with medical history, current condition, and initial care plan.
            </p>
            <p className="text-xs text-gray-500">Completed by: Primary clinician</p>
          </div>

          {/* Progress Note Card */}
          <div 
            onClick={() => onSelectDocument('progress')}
            className="p-6 bg-dark-900 border border-dark-700 hover:border-dark-600 rounded-2xl cursor-pointer transition-colors group"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <ClipboardList className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                  Progress Note
                </h3>
                <p className="text-xs text-gray-500">Ongoing visits</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-3">
              Document ongoing patient care, interventions performed, vital signs, and progress updates.
            </p>
            <p className="text-xs text-gray-500">Completed by: Visiting clinician/aide</p>
          </div>
        </div>
      </div>
    </div>
  )
}
