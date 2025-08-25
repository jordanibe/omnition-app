import { useState, useEffect } from 'react'
import { Check } from 'lucide-react'
import FormHeader from './FormHeader'
import TabbedForm from './TabbedForm'
import { InitialAssessmentData } from '../types'
import { Patient } from '../data/patients'

interface InitialAssessmentProps {
  patient?: Patient | null
  onBack: () => void
  onSubmit: (data: InitialAssessmentData) => void
}

export default function InitialAssessment({ patient, onBack, onSubmit }: InitialAssessmentProps) {
  const [formData, setFormData] = useState<InitialAssessmentData>({
    // Medical History
    pastMedicalHistory: '',
    surgicalHistory: '',
    medications: '',
    
    // Current Condition
    chiefComplaint: '',
    currentSymptoms: '',
    painAssessment: '',
    
    // Functional Status
    adlIndependence: '',
    mobilityStatus: '',
    
    // Home Environment
    livingSituation: '',
    safetyHazards: '',
    accessibility: '',
    
    // Safety Evaluation
    fallRiskFactors: '',
    emergencyContacts: '',
    
    // Care Plan
    goals: '',
    interventions: '',
    visitFrequency: '',
    
    // Assessment Info
    assessmentDate: '',
    completedBy: '',
    completedByRole: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  // Pre-populate form with patient data
  useEffect(() => {
    if (patient) {
      setFormData(prev => ({
        ...prev,
        pastMedicalHistory: patient.pastMedicalHistory,
        surgicalHistory: patient.surgicalHistory,
        medications: patient.medications,
        completedBy: 'Nurse Davis', // Default value
        completedByRole: 'RN'
      }))
    }
  }, [patient])

  const handleInputChange = (field: keyof InitialAssessmentData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const isFormValid = () => {
    return Boolean(formData.pastMedicalHistory.trim() && 
           formData.medications.trim() && 
           formData.assessmentDate && 
           formData.completedBy.trim() && 
           formData.completedByRole.trim())
  }

  const handleSubmit = async () => {
    if (!isFormValid()) return

    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    onSubmit(formData)
    setShowSuccess(true)
    setIsSubmitting(false)
    
    // Reset form after success
    setTimeout(() => {
      setShowSuccess(false)
      setFormData({
        pastMedicalHistory: '',
        surgicalHistory: '',
        medications: '',
        chiefComplaint: '',
        currentSymptoms: '',
        painAssessment: '',
        adlIndependence: '',
        mobilityStatus: '',
        livingSituation: '',
        safetyHazards: '',
        accessibility: '',
        fallRiskFactors: '',
        emergencyContacts: '',
        goals: '',
        interventions: '',
        visitFrequency: '',
        assessmentDate: '',
        completedBy: '',
        completedByRole: ''
      })
    }, 2000)
  }

  if (showSuccess) {
    return (
      <div className="w-full max-w-2xl text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-semibold text-white mb-2">Initial Assessment Submitted!</h2>
          <p className="text-gray-400">Your initial assessment has been successfully created.</p>
        </div>
        <button
          onClick={onBack}
          className="px-10 py-4 bg-dark-700 hover:bg-dark-600 rounded-lg transition-colors text-gray-300"
        >
          Create Another Document
        </button>
      </div>
    )
  }

  const tabs = [
    {
      id: 'patient-info',
      label: 'Patient Information',
      content: (
        <div className="space-y-6">
      {/* Patient Info Card */}
      {patient && (
            <div className="p-4 bg-dark-800 border border-dark-600 rounded-lg">
                            <h3 className="text-md font-semibold text-white mb-4">Patient Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-md">
            <div>
              <span className="text-gray-400">Name:</span> <span className="text-white">{patient.name}</span>
            </div>
            <div>
              <span className="text-gray-400">Age:</span> <span className="text-white">{patient.age} years</span>
            </div>
            <div>
              <span className="text-gray-400">Primary Diagnosis:</span> <span className="text-white">{patient.primaryDiagnosis}</span>
            </div>
            <div>
              <span className="text-gray-400">Secondary Diagnosis:</span> <span className="text-white">{patient.secondaryDiagnosis}</span>
            </div>
          </div>
        </div>
      )}
        </div>
      )
    },
    {
      id: 'medical-history',
      label: 'Medical History',
      content: (
        <div className="space-y-6">
            <div>
            <label className="block text-md font-medium text-gray-300 mb-2">
              Past Medical History *
            </label>
              <textarea
                value={formData.pastMedicalHistory}
                onChange={(e) => handleInputChange('pastMedicalHistory', e.target.value)}
              required
              rows={6}
              className="w-full p-3 bg-dark-900 border border-dark-700 rounded-lg text-white text-md focus:outline-none focus:border-blue-500 transition-colors resize-none"
              />
            </div>
          
            <div>
            <label className="block text-md font-medium text-gray-300 mb-2">
              Surgical History
            </label>
              <textarea
                value={formData.surgicalHistory}
                onChange={(e) => handleInputChange('surgicalHistory', e.target.value)}
              rows={4}
              className="w-full p-3 bg-dark-900 border border-dark-700 rounded-lg text-white text-md focus:outline-none focus:border-blue-500 transition-colors resize-none"
              />
            </div>
          
            <div>
            <label className="block text-md font-medium text-gray-300 mb-2">
              Current Medications *
            </label>
              <textarea
                value={formData.medications}
                onChange={(e) => handleInputChange('medications', e.target.value)}
                required
              rows={6}
              className="w-full p-3 bg-dark-900 border border-dark-700 rounded-lg text-white text-md focus:outline-none focus:border-blue-500 transition-colors resize-none"
            />
        </div>

            <div>
            <label className="block text-md font-medium text-gray-300 mb-2">
              Assessment Date *
            </label>
              <input
                type="date"
                value={formData.assessmentDate}
                onChange={(e) => handleInputChange('assessmentDate', e.target.value)}
                required
              className="w-full p-3 bg-dark-900 border border-dark-700 rounded-lg text-white text-md focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-md font-medium text-gray-300 mb-2">
                Completed By *
              </label>
              <input
                type="text"
                value={formData.completedBy}
                onChange={(e) => handleInputChange('completedBy', e.target.value)}
                required
                className="w-full p-3 bg-dark-900 border border-dark-700 rounded-lg text-white text-md focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-md font-medium text-gray-300 mb-2">
                Role *
              </label>
              <input
                type="text"
                value={formData.completedByRole}
                onChange={(e) => handleInputChange('completedByRole', e.target.value)}
                required
                className="w-full p-3 bg-dark-900 border border-dark-700 rounded-lg text-white text-md focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>
        </div>
      )
    }
  ]

  return (
    <div className="w-full h-full flex flex-col">
      <FormHeader
        title="Initial Assessment"
        subtitle="Comprehensive initial patient assessment and care planning"
        onBack={onBack}
      />
      
      <div className="flex-1">
        <TabbedForm
          tabs={tabs}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          submitLabel="Submit Initial Assessment"
          isFormValid={isFormValid()}
        />
      </div>
    </div>
  )
}
