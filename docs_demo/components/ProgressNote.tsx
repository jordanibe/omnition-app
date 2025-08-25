import { useState, useEffect } from 'react'
import { Check } from 'lucide-react'
import FormHeader from './FormHeader'
import TabbedForm from './TabbedForm'
import { ProgressNoteData } from '../types'
import { Patient } from '../data/patients'

interface ProgressNoteProps {
  patient?: Patient | null
  onBack: () => void
  onSubmit: (data: ProgressNoteData) => void
}

export default function ProgressNote({ patient, onBack, onSubmit }: ProgressNoteProps) {
  const [formData, setFormData] = useState<ProgressNoteData>({
    // Visit Information
    visitDate: '',
    visitTime: '',
    visitType: '',
    duration: '',
    
    // Patient Condition
    currentStatus: '',
    changesSinceLastVisit: '',
    
    // Interventions
    interventionsPerformed: '',
    patientResponse: '',
    engagementLevel: '',
    
    // Vital Signs
    bloodPressure: '',
    heartRate: '',
    respiratoryRate: '',
    temperature: '',
    oxygenSaturation: '',
    painLevel: '',
    
    // Changes and Plans
    changesInCondition: '',
    planUpdates: '',
    nextVisitPlans: '',
    
    // Additional Notes
    visitNotes: '',
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
        currentStatus: `Patient presents with ${patient.currentSymptoms}. ${patient.primaryDiagnosis} with ${patient.secondaryDiagnosis}.`,
        completedBy: 'Nurse Wilson', // Default value
        completedByRole: 'RN'
      }))
    }
  }, [patient])

  const handleInputChange = (field: keyof ProgressNoteData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const isFormValid = () => {
    return Boolean(formData.visitDate && 
           formData.currentStatus.trim() && 
           formData.interventionsPerformed.trim() && 
           formData.patientResponse.trim() && 
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
        visitDate: '',
        visitTime: '',
        visitType: '',
        duration: '',
        currentStatus: '',
        changesSinceLastVisit: '',
        interventionsPerformed: '',
        patientResponse: '',
        engagementLevel: '',
        bloodPressure: '',
        heartRate: '',
        respiratoryRate: '',
        temperature: '',
        oxygenSaturation: '',
        painLevel: '',
        changesInCondition: '',
        planUpdates: '',
        nextVisitPlans: '',
        visitNotes: '',
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
          <h2 className="text-2xl font-semibold text-white mb-2">Progress Note Submitted!</h2>
          <p className="text-gray-400">Your progress note has been successfully created.</p>
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
      id: 'visit-info',
      label: 'Visit Information',
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-md font-medium text-gray-300 mb-2">
                Visit Date *
              </label>
              <input
                type="date"
                value={formData.visitDate}
                onChange={(e) => handleInputChange('visitDate', e.target.value)}
                required
                className="w-full p-3 bg-dark-900 border border-dark-700 rounded-lg text-white text-md focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-md font-medium text-gray-300 mb-2">
                Visit Time
              </label>
              <input
                type="time"
                value={formData.visitTime}
                onChange={(e) => handleInputChange('visitTime', e.target.value)}
                className="w-full p-3 bg-dark-900 border border-dark-700 rounded-lg text-white text-md focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-md font-medium text-gray-300 mb-2">
                Visit Type
              </label>
              <input
                type="text"
                value={formData.visitType}
                onChange={(e) => handleInputChange('visitType', e.target.value)}
                placeholder="e.g., Skilled nursing, Physical therapy"
                className="w-full p-3 bg-dark-900 border border-dark-700 rounded-lg text-white placeholder-gray-400 text-md focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-md font-medium text-gray-300 mb-2">
                Duration
              </label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => handleInputChange('duration', e.target.value)}
                placeholder="e.g., 45 minutes"
                className="w-full p-3 bg-dark-900 border border-dark-700 rounded-lg text-white placeholder-gray-400 text-md focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'patient-condition',
      label: 'Patient Condition',
      content: (
        <div className="space-y-6">
          <div>
            <label className="block text-md font-medium text-gray-300 mb-2">
              Current Status *
            </label>
            <textarea
              value={formData.currentStatus}
              onChange={(e) => handleInputChange('currentStatus', e.target.value)}
              required
              rows={4}
              className="w-full p-3 bg-dark-900 border border-dark-700 rounded-lg text-white text-md focus:outline-none focus:border-blue-500 transition-colors resize-none"
            />
          </div>
          
          <div>
            <label className="block text-md font-medium text-gray-300 mb-2">
              Changes Since Last Visit
            </label>
            <textarea
              value={formData.changesSinceLastVisit}
              onChange={(e) => handleInputChange('changesSinceLastVisit', e.target.value)}
              rows={4}
              className="w-full p-3 bg-dark-900 border border-dark-700 rounded-lg text-white text-md focus:outline-none focus:border-blue-500 transition-colors resize-none"
            />
          </div>
        </div>
      )
    },
    {
      id: 'interventions',
      label: 'Interventions',
      content: (
        <div className="space-y-6">
          <div>
            <label className="block text-md font-medium text-gray-300 mb-2">
              Interventions Performed *
            </label>
            <textarea
              value={formData.interventionsPerformed}
              onChange={(e) => handleInputChange('interventionsPerformed', e.target.value)}
              required
              rows={4}
              className="w-full p-3 bg-dark-900 border border-dark-700 rounded-lg text-white text-md focus:outline-none focus:border-blue-500 transition-colors resize-none"
            />
          </div>
          
          <div>
            <label className="block text-md font-medium text-gray-300 mb-2">
              Patient Response *
            </label>
            <textarea
              value={formData.patientResponse}
              onChange={(e) => handleInputChange('patientResponse', e.target.value)}
              required
              rows={4}
              className="w-full p-3 bg-dark-900 border border-dark-700 rounded-lg text-white text-md focus:outline-none focus:border-blue-500 transition-colors resize-none"
            />
          </div>
          
          <div>
            <label className="block text-md font-medium text-gray-300 mb-2">
              Engagement Level
            </label>
            <textarea
              value={formData.engagementLevel}
              onChange={(e) => handleInputChange('engagementLevel', e.target.value)}
              rows={3}
              className="w-full p-3 bg-dark-900 border border-dark-700 rounded-lg text-white text-md focus:outline-none focus:border-blue-500 transition-colors resize-none"
            />
          </div>
        </div>
      )
    },
    {
      id: 'vital-signs',
      label: 'Vital Signs',
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-md font-medium text-gray-300 mb-2">
                Blood Pressure
              </label>
              <input
                type="text"
                value={formData.bloodPressure}
                onChange={(e) => handleInputChange('bloodPressure', e.target.value)}
                placeholder="e.g., 120/80"
                className="w-full p-3 bg-dark-900 border border-dark-700 rounded-lg text-white placeholder-gray-400 text-md focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-md font-medium text-gray-300 mb-2">
                Heart Rate
              </label>
              <input
                type="text"
                value={formData.heartRate}
                onChange={(e) => handleInputChange('heartRate', e.target.value)}
                placeholder="e.g., 72 bpm"
                className="w-full p-3 bg-dark-900 border border-dark-700 rounded-lg text-white placeholder-gray-400 text-md focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-md font-medium text-gray-300 mb-2">
                Respiratory Rate
              </label>
              <input
                type="text"
                value={formData.respiratoryRate}
                onChange={(e) => handleInputChange('respiratoryRate', e.target.value)}
                placeholder="e.g., 16/min"
                className="w-full p-3 bg-dark-900 border border-dark-700 rounded-lg text-white placeholder-gray-400 text-md focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-md font-medium text-gray-300 mb-2">
                Temperature
              </label>
              <input
                type="text"
                value={formData.temperature}
                onChange={(e) => handleInputChange('temperature', e.target.value)}
                placeholder="e.g., 98.6°F"
                className="w-full p-3 bg-dark-900 border border-dark-700 rounded-lg text-white placeholder-gray-400 text-md focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-md font-medium text-gray-300 mb-2">
                Oxygen Saturation
              </label>
              <input
                type="text"
                value={formData.oxygenSaturation}
                onChange={(e) => handleInputChange('oxygenSaturation', e.target.value)}
                placeholder="e.g., 98%"
                className="w-full p-3 bg-dark-900 border border-dark-700 rounded-lg text-white placeholder-gray-400 text-md focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-md font-medium text-gray-300 mb-2">
                Pain Level
              </label>
              <input
                type="text"
                value={formData.painLevel}
                onChange={(e) => handleInputChange('painLevel', e.target.value)}
                placeholder="e.g., 2/10"
                className="w-full p-3 bg-dark-900 border border-dark-700 rounded-lg text-white placeholder-gray-400 text-md focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'changes-plans',
      label: 'Changes & Plans',
      content: (
        <div className="space-y-6">
          <div>
            <label className="block text-md font-medium text-gray-300 mb-2">
              Changes in Condition
            </label>
            <textarea
              value={formData.changesInCondition}
              onChange={(e) => handleInputChange('changesInCondition', e.target.value)}
              rows={4}
              className="w-full p-3 bg-dark-900 border border-dark-700 rounded-lg text-white text-md focus:outline-none focus:border-blue-500 transition-colors resize-none"
            />
          </div>
          
          <div>
            <label className="block text-md font-medium text-gray-300 mb-2">
              Plan Updates
            </label>
            <textarea
              value={formData.planUpdates}
              onChange={(e) => handleInputChange('planUpdates', e.target.value)}
              rows={4}
              className="w-full p-3 bg-dark-900 border border-dark-700 rounded-lg text-white text-md focus:outline-none focus:border-blue-500 transition-colors resize-none"
            />
          </div>
          
          <div>
            <label className="block text-md font-medium text-gray-300 mb-2">
              Next Visit Plans
            </label>
            <textarea
              value={formData.nextVisitPlans}
              onChange={(e) => handleInputChange('nextVisitPlans', e.target.value)}
              rows={4}
              className="w-full p-3 bg-dark-900 border border-dark-700 rounded-lg text-white text-md focus:outline-none focus:border-blue-500 transition-colors resize-none"
            />
          </div>
        </div>
      )
    },
    {
      id: 'completion',
      label: 'Completion',
      content: (
        <div className="space-y-6">
          <div>
            <label className="block text-md font-medium text-gray-300 mb-2">
              Additional Visit Notes
            </label>
            <textarea
              value={formData.visitNotes}
              onChange={(e) => handleInputChange('visitNotes', e.target.value)}
              rows={6}
              className="w-full p-3 bg-dark-900 border border-dark-700 rounded-lg text-white text-md focus:outline-none focus:border-blue-500 transition-colors resize-none"
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
        title="Progress Note"
        subtitle="Document patient progress and ongoing care"
        onBack={onBack}
      />
      
      <div className="flex-1">
        <TabbedForm
          tabs={tabs}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          submitLabel="Submit Progress Note"
          isFormValid={isFormValid()}
        />
      </div>
    </div>
  )
}
