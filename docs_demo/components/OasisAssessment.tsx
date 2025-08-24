import { useState, useEffect } from 'react'
import { Check } from 'lucide-react'
import FormHeader from './FormHeader'
import TabbedForm from './TabbedForm'
import { OasisAssessmentData } from '../types'
import { Patient } from '../data/patients'

interface OasisAssessmentProps {
  patient?: Patient | null
  onBack: () => void
  onSubmit: (data: OasisAssessmentData) => void
}

export default function OasisAssessment({ patient, onBack, onSubmit }: OasisAssessmentProps) {
  const [formData, setFormData] = useState<OasisAssessmentData>({
    // Demographics
    age: '',
    gender: 'male',
    raceEthnicity: '',
    livingArrangement: '',
    
    // Clinical Status
    primaryDiagnosis: '',
    secondaryDiagnosis: '',
    medications: '',
    allergies: '',
    
    // Functional Status
    adlIndependence: '',
    mobilityStatus: '',
    cognitiveFunction: '',
    
    // Service Needs
    skilledNursingNeeds: '',
    therapyNeeds: '',
    equipmentNeeds: '',
    
    // Psychosocial Status
    depressionScreening: '',
    anxietyAssessment: '',
    
    // Safety Assessment
    fallRisk: '',
    medicationManagement: '',
    
    // Assessment Info
    frequency: 'start_of_care',
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
        age: patient.age.toString(),
        gender: patient.gender,
        raceEthnicity: patient.raceEthnicity,
        livingArrangement: patient.livingArrangement,
        primaryDiagnosis: patient.primaryDiagnosis,
        secondaryDiagnosis: patient.secondaryDiagnosis,
        medications: patient.medications,
        allergies: patient.allergies,
        adlIndependence: patient.adlIndependence,
        mobilityStatus: patient.mobilityStatus,
        cognitiveFunction: patient.cognitiveFunction,
        skilledNursingNeeds: patient.skilledNursingNeeds,
        therapyNeeds: patient.therapyNeeds,
        equipmentNeeds: patient.equipmentNeeds,
        depressionScreening: patient.depressionScreening,
        anxietyAssessment: patient.anxietyAssessment,
        fallRisk: patient.fallRisk,
        medicationManagement: patient.medicationManagement,
        completedBy: 'Nurse Johnson', // Default value
        completedByRole: 'RN'
      }))
    }
  }, [patient])

  const handleInputChange = (field: keyof OasisAssessmentData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const isFormValid = () => {
    return Boolean(formData.age && 
           formData.primaryDiagnosis.trim() && 
           formData.adlIndependence.trim() && 
           formData.mobilityStatus.trim() && 
           formData.cognitiveFunction.trim() && 
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
        age: '',
        gender: 'male',
        raceEthnicity: '',
        livingArrangement: '',
        primaryDiagnosis: '',
        secondaryDiagnosis: '',
        medications: '',
        allergies: '',
        adlIndependence: '',
        mobilityStatus: '',
        cognitiveFunction: '',
        skilledNursingNeeds: '',
        therapyNeeds: '',
        equipmentNeeds: '',
        depressionScreening: '',
        anxietyAssessment: '',
        fallRisk: '',
        medicationManagement: '',
        frequency: 'start_of_care',
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
          <h2 className="text-2xl font-semibold text-white mb-2">OASIS Assessment Submitted!</h2>
          <p className="text-gray-400">Your OASIS assessment has been successfully created.</p>
        </div>
        <button
          onClick={onBack}
          className="px-6 py-2 bg-dark-700 hover:bg-dark-600 rounded-lg transition-colors text-gray-300"
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
              <h3 className="text-lg font-semibold text-white mb-4">Patient Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
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
      id: 'demographics',
      label: 'Demographics',
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Age *
              </label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => handleInputChange('age', e.target.value)}
                required
                className="w-full p-3 bg-dark-900 border border-dark-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Gender
              </label>
              <select
                value={formData.gender}
                onChange={(e) => handleInputChange('gender', e.target.value)}
                className="w-full p-3 bg-dark-900 border border-dark-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Race/Ethnicity
            </label>
            <input
              type="text"
              value={formData.raceEthnicity}
              onChange={(e) => handleInputChange('raceEthnicity', e.target.value)}
              className="w-full p-3 bg-dark-900 border border-dark-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Living Arrangement
            </label>
            <textarea
              value={formData.livingArrangement}
              onChange={(e) => handleInputChange('livingArrangement', e.target.value)}
              rows={3}
              className="w-full p-3 bg-dark-900 border border-dark-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
            />
          </div>
        </div>
      )
    },
    {
      id: 'clinical-status',
      label: 'Clinical Status',
      content: (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Primary Diagnosis *
            </label>
            <input
              type="text"
              value={formData.primaryDiagnosis}
              onChange={(e) => handleInputChange('primaryDiagnosis', e.target.value)}
              required
              className="w-full p-3 bg-dark-900 border border-dark-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Secondary Diagnosis
            </label>
            <input
              type="text"
              value={formData.secondaryDiagnosis}
              onChange={(e) => handleInputChange('secondaryDiagnosis', e.target.value)}
              className="w-full p-3 bg-dark-900 border border-dark-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Medications
            </label>
            <textarea
              value={formData.medications}
              onChange={(e) => handleInputChange('medications', e.target.value)}
              rows={4}
              className="w-full p-3 bg-dark-900 border border-dark-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Allergies
            </label>
            <textarea
              value={formData.allergies}
              onChange={(e) => handleInputChange('allergies', e.target.value)}
              rows={3}
              className="w-full p-3 bg-dark-900 border border-dark-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
            />
          </div>
        </div>
      )
    },
    {
      id: 'functional-status',
      label: 'Functional Status',
      content: (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              ADL Independence *
            </label>
            <textarea
              value={formData.adlIndependence}
              onChange={(e) => handleInputChange('adlIndependence', e.target.value)}
              required
              rows={4}
              className="w-full p-3 bg-dark-900 border border-dark-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Mobility Status *
            </label>
            <textarea
              value={formData.mobilityStatus}
              onChange={(e) => handleInputChange('mobilityStatus', e.target.value)}
              required
              rows={4}
              className="w-full p-3 bg-dark-900 border border-dark-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Cognitive Function *
            </label>
            <textarea
              value={formData.cognitiveFunction}
              onChange={(e) => handleInputChange('cognitiveFunction', e.target.value)}
              required
              rows={4}
              className="w-full p-3 bg-dark-900 border border-dark-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
            />
          </div>
        </div>
      )
    },
    {
      id: 'service-needs',
      label: 'Service Needs',
      content: (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Skilled Nursing Needs
            </label>
            <textarea
              value={formData.skilledNursingNeeds}
              onChange={(e) => handleInputChange('skilledNursingNeeds', e.target.value)}
              rows={4}
              className="w-full p-3 bg-dark-900 border border-dark-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Therapy Needs
            </label>
            <textarea
              value={formData.therapyNeeds}
              onChange={(e) => handleInputChange('therapyNeeds', e.target.value)}
              rows={4}
              className="w-full p-3 bg-dark-900 border border-dark-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Equipment Needs
            </label>
            <textarea
              value={formData.equipmentNeeds}
              onChange={(e) => handleInputChange('equipmentNeeds', e.target.value)}
              rows={4}
              className="w-full p-3 bg-dark-900 border border-dark-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
            />
          </div>
        </div>
      )
    },
    {
      id: 'psychosocial-status',
      label: 'Psychosocial Status',
      content: (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Depression Screening
            </label>
            <textarea
              value={formData.depressionScreening}
              onChange={(e) => handleInputChange('depressionScreening', e.target.value)}
              rows={4}
              className="w-full p-3 bg-dark-900 border border-dark-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Anxiety Assessment
            </label>
            <textarea
              value={formData.anxietyAssessment}
              onChange={(e) => handleInputChange('anxietyAssessment', e.target.value)}
              rows={4}
              className="w-full p-3 bg-dark-900 border border-dark-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
            />
          </div>
        </div>
      )
    },
    {
      id: 'safety-assessment',
      label: 'Safety Assessment',
      content: (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Fall Risk Assessment
            </label>
            <textarea
              value={formData.fallRisk}
              onChange={(e) => handleInputChange('fallRisk', e.target.value)}
              rows={4}
              className="w-full p-3 bg-dark-900 border border-dark-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Medication Management
            </label>
            <textarea
              value={formData.medicationManagement}
              onChange={(e) => handleInputChange('medicationManagement', e.target.value)}
              rows={4}
              className="w-full p-3 bg-dark-900 border border-dark-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Assessment Date *
            </label>
            <input
              type="date"
              value={formData.assessmentDate}
              onChange={(e) => handleInputChange('assessmentDate', e.target.value)}
              required
              className="w-full p-3 bg-dark-900 border border-dark-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Completed By *
              </label>
              <input
                type="text"
                value={formData.completedBy}
                onChange={(e) => handleInputChange('completedBy', e.target.value)}
                required
                className="w-full p-3 bg-dark-900 border border-dark-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Role *
              </label>
              <input
                type="text"
                value={formData.completedByRole}
                onChange={(e) => handleInputChange('completedByRole', e.target.value)}
                required
                className="w-full p-3 bg-dark-900 border border-dark-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
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
        title="OASIS Assessment (OASIS-E)"
        subtitle="Comprehensive patient assessment for Medicare/Medicaid"
        onBack={onBack}
      />
      
      <div className="flex-1">
        <TabbedForm
          tabs={tabs}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          submitLabel="Submit OASIS Assessment"
          isFormValid={isFormValid()}
        />
      </div>
    </div>
  )
}
