import { useState, useEffect } from 'react'
import { Check } from 'lucide-react'
import FormHeader from './FormHeader'
import TabbedForm from './TabbedForm'
import { EncounterNoteData } from '../types'
import { Patient } from '../data/patients'

interface EncounterNoteProps {
  patient?: Patient | null
  onBack: () => void
  onSubmit: (data: EncounterNoteData) => void
}

export default function EncounterNote({ patient, onBack, onSubmit }: EncounterNoteProps) {
  const [formData, setFormData] = useState<EncounterNoteData>({
    dateTime: '',
    reasonForEncounter: '',
    homeboundStatus: 'no',
    homeboundDetails: '',
    skilledServices: {
      nursing: false,
      pt: false,
      ot: false,
      slp: false,
      msw: false,
      hha: false
    },
    clinicalObservations: '',
    physicianSignature: '',
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
        completedBy: 'Nurse Smith', // Default value
        completedByRole: 'RN'
      }))
    }
  }, [patient])

  const handleInputChange = (field: keyof EncounterNoteData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSkilledServiceChange = (service: keyof EncounterNoteData['skilledServices'], checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      skilledServices: {
        ...prev.skilledServices,
        [service]: checked
      }
    }))
  }

  const isFormValid = () => {
    return Boolean(formData.dateTime && 
           formData.reasonForEncounter.trim() && 
           formData.clinicalObservations.trim() && 
           formData.completedBy.trim() &&
           formData.completedByRole.trim() &&
           (formData.homeboundStatus === 'no' || formData.homeboundDetails.trim()))
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
        dateTime: '',
        reasonForEncounter: '',
        homeboundStatus: 'no',
        homeboundDetails: '',
        skilledServices: {
          nursing: false,
          pt: false,
          ot: false,
          slp: false,
          msw: false,
          hha: false
        },
        clinicalObservations: '',
        physicianSignature: '',
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
          <h2 className="text-2xl font-semibold text-white mb-2">Encounter Note Submitted!</h2>
          <p className="text-gray-400">Your encounter note has been successfully created.</p>
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
        <div className="space-y-8">
          {/* Patient Info Card */}
          {patient && (
            <div className="p-6 bg-dark-800 border border-dark-600 rounded-lg">
              <h3 className="text-md font-semibold text-white mb-6">Patient Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-md">
                <div>
                  <span className="text-gray-400">Name:</span> <span className="text-white ml-2">{patient.name}</span>
                </div>
                <div>
                  <span className="text-gray-400">Age:</span> <span className="text-white ml-2">{patient.age} years</span>
                </div>
                <div>
                  <span className="text-gray-400">Primary Diagnosis:</span> <span className="text-white ml-2">{patient.primaryDiagnosis}</span>
                </div>
                <div>
                  <span className="text-gray-400">Secondary Diagnosis:</span> <span className="text-white ml-2">{patient.secondaryDiagnosis}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )
    },
    {
      id: 'encounter-details',
      label: 'Encounter Details',
      content: (
        <div className="space-y-8">
          {/* Date/Time of Encounter */}
          <div>
            <label className="block text-md font-medium text-gray-300 mb-3">
              Date/Time of Encounter *
            </label>
            <input
              type="datetime-local"
              value={formData.dateTime}
              onChange={(e) => handleInputChange('dateTime', e.target.value)}
              required
              className="w-full p-4 bg-dark-900 border border-dark-700 rounded-lg text-white text-md focus:outline-none focus:border-blue-500 transition-colors text-md"
            />
          </div>

          {/* Reason for Encounter */}
          <div>
            <label className="block text-md font-medium text-gray-300 mb-3">
              Reason for Encounter *
            </label>
            <textarea
              value={formData.reasonForEncounter}
              onChange={(e) => handleInputChange('reasonForEncounter', e.target.value)}
              required
              rows={4}
              placeholder="Describe the primary reason for this encounter..."
              className="w-full p-4 bg-dark-900 border border-dark-700 rounded-lg text-white placeholder-gray-400 text-md focus:outline-none focus:border-blue-500 transition-colors resize-none text-md"
            />
          </div>

          {/* Homebound Status */}
          <div>
            <label className="block text-md font-medium text-gray-300 mb-3">
              Assessment of Homebound Status *
            </label>
            <div className="space-y-4">
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="homeboundStatus"
                    value="yes"
                    checked={formData.homeboundStatus === 'yes'}
                    onChange={(e) => handleInputChange('homeboundStatus', e.target.value)}
                    className="text-blue-600 focus:ring-blue-500 w-4 h-4"
                  />
                  <span className="text-gray-300 text-md">Yes</span>
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="homeboundStatus"
                    value="no"
                    checked={formData.homeboundStatus === 'no'}
                    onChange={(e) => handleInputChange('homeboundStatus', e.target.value)}
                    className="text-blue-600 focus:ring-blue-500 w-4 h-4"
                  />
                  <span className="text-gray-300 text-md">No</span>
                </label>
              </div>
              {formData.homeboundStatus === 'yes' && (
                <textarea
                  value={formData.homeboundDetails}
                  onChange={(e) => handleInputChange('homeboundDetails', e.target.value)}
                  required
                  rows={4}
                  placeholder="Provide details about homebound status..."
                  className="w-full p-4 bg-dark-900 border border-dark-700 rounded-lg text-white placeholder-gray-400 text-md focus:outline-none focus:border-blue-500 transition-colors resize-none text-md"
                />
              )}
            </div>
          </div>

          {/* Need for Skilled Services */}
          <div>
            <label className="block text-md font-medium text-gray-300 mb-4">
              Need for Skilled Services
            </label>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries({
                nursing: 'Nursing',
                pt: 'Physical Therapy',
                ot: 'Occupational Therapy',
                slp: 'Speech Language Pathology',
                msw: 'Medical Social Work',
                hha: 'Home Health Aide'
              }).map(([key, label]) => (
                <label key={key} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={formData.skilledServices[key as keyof typeof formData.skilledServices]}
                    onChange={(e) => handleSkilledServiceChange(key as keyof typeof formData.skilledServices, e.target.checked)}
                    className="text-blue-600 focus:ring-blue-500 rounded w-4 h-4"
                  />
                  <span className="text-gray-300 text-md">{label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'clinical-observations',
      label: 'Clinical Observations',
      content: (
        <div className="space-y-8">
          {/* Clinical Observations */}
          <div>
            <label className="block text-md font-medium text-gray-300 mb-3">
              Clinical Observations *
            </label>
            <textarea
              value={formData.clinicalObservations}
              onChange={(e) => handleInputChange('clinicalObservations', e.target.value)}
              required
              rows={8}
              placeholder="Document your clinical findings and observations..."
              className="w-full p-4 bg-dark-900 border border-dark-700 rounded-lg text-white placeholder-gray-400 text-md focus:outline-none focus:border-blue-500 transition-colors resize-none text-md"
            />
          </div>

          {/* Physician Signature */}
          <div>
            <label className="block text-md font-medium text-gray-300 mb-3">
              Physician Signature
            </label>
            <input
              type="text"
              value={formData.physicianSignature}
              onChange={(e) => handleInputChange('physicianSignature', e.target.value)}
              placeholder="Enter physician name for signature"
              className="w-full p-4 bg-dark-900 border border-dark-700 rounded-lg text-white placeholder-gray-400 text-md focus:outline-none focus:border-blue-500 transition-colors text-md"
            />
          </div>
        </div>
      )
    },
    {
      id: 'completion-info',
      label: 'Completion Info',
      content: (
        <div className="space-y-8">
          {/* Completed By */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-md font-medium text-gray-300 mb-3">
                Completed By *
              </label>
              <input
                type="text"
                value={formData.completedBy}
                onChange={(e) => handleInputChange('completedBy', e.target.value)}
                required
                placeholder="Enter your name"
                className="w-full p-4 bg-dark-900 border border-dark-700 rounded-lg text-white placeholder-gray-400 text-md focus:outline-none focus:border-blue-500 transition-colors text-md"
              />
            </div>
            <div>
              <label className="block text-md font-medium text-gray-300 mb-3">
                Role *
              </label>
              <input
                type="text"
                value={formData.completedByRole}
                onChange={(e) => handleInputChange('completedByRole', e.target.value)}
                required
                placeholder="Enter your role/credentials"
                className="w-full p-4 bg-dark-900 border border-dark-700 rounded-lg text-white placeholder-gray-400 text-md focus:outline-none focus:border-blue-500 transition-colors text-md"
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
        title="Encounter Note"
        subtitle="Document patient encounters with homebound status and skilled services needs"
        onBack={onBack}
      />
      
      <div className="flex-1">
        <TabbedForm
          tabs={tabs}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          submitLabel="Submit Encounter Note"
          isFormValid={isFormValid()}
        />
      </div>
    </div>
  )
}
