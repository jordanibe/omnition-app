'use client'

import { useState, useEffect } from 'react'
import { Download, ArrowLeft } from 'lucide-react'
import { DocumentType, EncounterNoteData, OasisAssessmentData, InitialAssessmentData, ProgressNoteData } from '@/docs_demo/types'
import { Patient } from '@/docs_demo/data/patients'

interface DocumentationViewProps {
  documentType: DocumentType
  patient: Patient
  onBack: () => void
}

export default function DocumentationView({ documentType, patient, onBack }: DocumentationViewProps) {
  const [formData, setFormData] = useState<any>({})

  // Pre-populate fields to mirror docs_demo behavior exactly
  useEffect(() => {
    if (documentType === 'encounter') {
      setFormData((prev: any) => ({
        dateTime: prev.dateTime || '',
        reasonForEncounter: prev.reasonForEncounter || '',
        homeboundStatus: prev.homeboundStatus || '',
        homeboundDetails: prev.homeboundDetails || '',
        skilledServices: prev.skilledServices || {
          nursing: false,
          pt: false,
          ot: false,
          slp: false,
          msw: false,
          hha: false
        },
        clinicalObservations: prev.clinicalObservations || '',
        physicianSignature: prev.physicianSignature || '',
        completedBy: prev.completedBy || '',
        completedByRole: prev.completedByRole || ''
      }))
    }

    if (documentType === 'progress') {
      setFormData((prev: any) => ({
        // Visit Information
        visitDate: prev.visitDate || '',
        visitTime: prev.visitTime || '',
        visitType: prev.visitType || '',
        duration: prev.duration || '',
        // Patient Condition
        currentStatus: prev.currentStatus || (patient ? `Patient presents with ${patient.currentSymptoms}. ${patient.primaryDiagnosis} with ${patient.secondaryDiagnosis}.` : ''),
        changesSinceLastVisit: prev.changesSinceLastVisit || '',
        // Interventions
        interventionsPerformed: prev.interventionsPerformed || '',
        patientResponse: prev.patientResponse || '',
        engagementLevel: prev.engagementLevel || '',
        // Vital Signs
        bloodPressure: prev.bloodPressure || '',
        heartRate: prev.heartRate || '',
        respiratoryRate: prev.respiratoryRate || '',
        temperature: prev.temperature || '',
        oxygenSaturation: prev.oxygenSaturation || '',
        painLevel: prev.painLevel || '',
        // Changes and Plans
        changesInCondition: prev.changesInCondition || '',
        planUpdates: prev.planUpdates || '',
        nextVisitPlans: prev.nextVisitPlans || '',
        // Additional Notes
        visitNotes: prev.visitNotes || '',
        completedBy: prev.completedBy || '',
        completedByRole: prev.completedByRole || ''
      }))
    }

    if (documentType === 'initial') {
      setFormData((prev: any) => ({
        // Medical History
        pastMedicalHistory: prev.pastMedicalHistory || (patient ? patient.pastMedicalHistory : ''),
        surgicalHistory: prev.surgicalHistory || (patient ? patient.surgicalHistory : ''),
        medications: prev.medications || (patient ? patient.medications : ''),
        // Current Condition
        chiefComplaint: prev.chiefComplaint || (patient ? patient.chiefComplaint : ''),
        currentSymptoms: prev.currentSymptoms || (patient ? patient.currentSymptoms : ''),
        painAssessment: prev.painAssessment || (patient ? patient.painAssessment : ''),
        // Functional Status
        adlIndependence: prev.adlIndependence || (patient ? patient.adlIndependence : ''),
        mobilityStatus: prev.mobilityStatus || (patient ? patient.mobilityStatus : ''),
        // Home Environment
        livingSituation: prev.livingSituation || (patient ? patient.livingSituation : ''),
        safetyHazards: prev.safetyHazards || (patient ? patient.safetyHazards : ''),
        accessibility: prev.accessibility || (patient ? patient.accessibility : ''),
        // Safety Evaluation
        fallRiskFactors: prev.fallRiskFactors || (patient ? patient.fallRiskFactors : ''),
        emergencyContacts: prev.emergencyContacts || (patient ? patient.emergencyContacts : ''),
        // Care Plan
        goals: prev.goals || (patient ? patient.goals : ''),
        interventions: prev.interventions || (patient ? patient.interventions : ''),
        visitFrequency: prev.visitFrequency || (patient ? patient.visitFrequency : ''),
        // Assessment Info
        assessmentDate: prev.assessmentDate || '',
        completedBy: prev.completedBy || '',
        completedByRole: prev.completedByRole || ''
      }))
    }

    if (documentType === 'oasis') {
      setFormData((prev: any) => ({
        // Demographics
        age: prev.age || (patient ? String(patient.age) : ''),
        gender: prev.gender || (patient ? patient.gender : ''),
        raceEthnicity: prev.raceEthnicity || (patient ? patient.raceEthnicity : ''),
        livingArrangement: prev.livingArrangement || (patient ? patient.livingArrangement : ''),
        // Clinical Status
        primaryDiagnosis: prev.primaryDiagnosis || (patient ? patient.primaryDiagnosis : ''),
        secondaryDiagnosis: prev.secondaryDiagnosis || (patient ? patient.secondaryDiagnosis : ''),
        medications: prev.medications || (patient ? patient.medications : ''),
        allergies: prev.allergies || (patient ? patient.allergies : ''),
        // Functional Status
        adlIndependence: prev.adlIndependence || (patient ? patient.adlIndependence : ''),
        mobilityStatus: prev.mobilityStatus || (patient ? patient.mobilityStatus : ''),
        cognitiveFunction: prev.cognitiveFunction || (patient ? patient.cognitiveFunction : ''),
        // Service Needs
        skilledNursingNeeds: prev.skilledNursingNeeds || (patient ? patient.skilledNursingNeeds : ''),
        therapyNeeds: prev.therapyNeeds || (patient ? patient.therapyNeeds : ''),
        equipmentNeeds: prev.equipmentNeeds || (patient ? patient.equipmentNeeds : ''),
        // Psychosocial Status
        depressionScreening: prev.depressionScreening || (patient ? patient.depressionScreening : ''),
        anxietyAssessment: prev.anxietyAssessment || (patient ? patient.anxietyAssessment : ''),
        // Safety Assessment
        fallRisk: prev.fallRisk || (patient ? patient.fallRisk : ''),
        medicationManagement: prev.medicationManagement || (patient ? patient.medicationManagement : ''),
        // Assessment Info
        frequency: prev.frequency || '',
        assessmentDate: prev.assessmentDate || '',
        completedBy: prev.completedBy || '',
        completedByRole: prev.completedByRole || ''
      }))
    }
  }, [documentType, patient])

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
                  onChange={(e) => setFormData({ ...formData, dateTime: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Reason for Encounter</label>
                <input
                  type="text"
                  className="w-full p-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  value={formData.reasonForEncounter || ''}
                  onChange={(e) => setFormData({ ...formData, reasonForEncounter: e.target.value })}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Assessment of Homebound Status</label>
              <div className="space-y-3">
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="homeboundStatus"
                      value="yes"
                      checked={(formData.homeboundStatus || '') === 'yes'}
                      onChange={(e) => setFormData({ ...formData, homeboundStatus: e.target.value })}
                      className="text-blue-600 focus:ring-blue-500 w-4 h-4"
                    />
                    <span className="text-gray-300 text-sm">Yes</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="homeboundStatus"
                      value="no"
                      checked={(formData.homeboundStatus || '') === 'no'}
                      onChange={(e) => setFormData({ ...formData, homeboundStatus: e.target.value })}
                      className="text-blue-600 focus:ring-blue-500 w-4 h-4"
                    />
                    <span className="text-gray-300 text-sm">No</span>
                  </label>
                </div>
                {(formData.homeboundStatus || '') === 'yes' && (
                  <textarea
                    rows={4}
                    placeholder="Provide details about homebound status..."
                    className="w-full p-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-blue-500 resize-none"
                    value={formData.homeboundDetails || ''}
                    onChange={(e) => setFormData({ ...formData, homeboundDetails: e.target.value })}
                  />
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Need for Skilled Services</label>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries({
                  nursing: 'Nursing',
                  pt: 'Physical Therapy',
                  ot: 'Occupational Therapy',
                  slp: 'Speech Language Pathology',
                  msw: 'Medical Social Work',
                  hha: 'Home Health Aide'
                }).map(([key, label]) => (
                  <label key={key} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={Boolean((formData.skilledServices?.[key as any]) || false)}
                      onChange={(e) => {
                        const next = {
                          ...(formData.skilledServices || {}),
                          [key]: e.target.checked
                        }
                        setFormData({ ...formData, skilledServices: next })
                      }}
                      className="text-blue-600 focus:ring-blue-500 rounded w-4 h-4"
                    />
                    <span className="text-gray-300 text-sm">{label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Clinical Observations</label>
              <textarea
                rows={6}
                className="w-full p-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-blue-500 resize-none"
                value={formData.clinicalObservations || ''}
                onChange={(e) => setFormData({ ...formData, clinicalObservations: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Physician Signature</label>
              <input
                type="text"
                className="w-full p-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                value={formData.physicianSignature || ''}
                onChange={(e) => setFormData({ ...formData, physicianSignature: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Completed By</label>
                <input
                  type="text"
                  className="w-full p-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  value={formData.completedBy || ''}
                  onChange={(e) => setFormData({ ...formData, completedBy: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Role</label>
                <input
                  type="text"
                  className="w-full p-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  value={formData.completedByRole || ''}
                  onChange={(e) => setFormData({ ...formData, completedByRole: e.target.value })}
                />
              </div>
            </div>
          </div>
        )

      case 'oasis':
        return (
          <div className="space-y-8">
            {/* Demographics */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Age</label>
                <input
                  type="number"
                  className="w-full p-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  value={formData.age || ''}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Gender</label>
                <select
                  className="w-full p-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  value={formData.gender || ''}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Race/Ethnicity</label>
              <input
                type="text"
                className="w-full p-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                value={formData.raceEthnicity || ''}
                onChange={(e) => setFormData({ ...formData, raceEthnicity: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Living Arrangement</label>
              <textarea
                rows={3}
                className="w-full p-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-blue-500 resize-none"
                value={formData.livingArrangement || ''}
                onChange={(e) => setFormData({ ...formData, livingArrangement: e.target.value })}
              />
            </div>

            {/* Clinical Status */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Primary Diagnosis</label>
              <input
                type="text"
                className="w-full p-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                value={formData.primaryDiagnosis || ''}
                onChange={(e) => setFormData({ ...formData, primaryDiagnosis: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Secondary Diagnosis</label>
              <input
                type="text"
                className="w-full p-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                value={formData.secondaryDiagnosis || ''}
                onChange={(e) => setFormData({ ...formData, secondaryDiagnosis: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Medications</label>
              <textarea
                rows={4}
                className="w-full p-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-blue-500 resize-none"
                value={formData.medications || ''}
                onChange={(e) => setFormData({ ...formData, medications: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Allergies</label>
              <textarea
                rows={3}
                className="w-full p-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-blue-500 resize-none"
                value={formData.allergies || ''}
                onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
              />
            </div>

            {/* Functional Status */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">ADL Independence</label>
              <textarea
                rows={4}
                className="w-full p-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-blue-500 resize-none"
                value={formData.adlIndependence || ''}
                onChange={(e) => setFormData({ ...formData, adlIndependence: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Mobility Status</label>
              <textarea
                rows={4}
                className="w-full p-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-blue-500 resize-none"
                value={formData.mobilityStatus || ''}
                onChange={(e) => setFormData({ ...formData, mobilityStatus: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Cognitive Function</label>
              <textarea
                rows={4}
                className="w-full p-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-blue-500 resize-none"
                value={formData.cognitiveFunction || ''}
                onChange={(e) => setFormData({ ...formData, cognitiveFunction: e.target.value })}
              />
            </div>

            {/* Service Needs */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Skilled Nursing Needs</label>
              <textarea
                rows={4}
                className="w-full p-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-blue-500 resize-none"
                value={formData.skilledNursingNeeds || ''}
                onChange={(e) => setFormData({ ...formData, skilledNursingNeeds: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Therapy Needs</label>
              <textarea
                rows={4}
                className="w-full p-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-blue-500 resize-none"
                value={formData.therapyNeeds || ''}
                onChange={(e) => setFormData({ ...formData, therapyNeeds: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Equipment Needs</label>
              <textarea
                rows={4}
                className="w-full p-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-blue-500 resize-none"
                value={formData.equipmentNeeds || ''}
                onChange={(e) => setFormData({ ...formData, equipmentNeeds: e.target.value })}
              />
            </div>

            {/* Psychosocial Status */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Depression Screening</label>
              <textarea
                rows={4}
                className="w-full p-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-blue-500 resize-none"
                value={formData.depressionScreening || ''}
                onChange={(e) => setFormData({ ...formData, depressionScreening: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Anxiety Assessment</label>
              <textarea
                rows={4}
                className="w-full p-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-blue-500 resize-none"
                value={formData.anxietyAssessment || ''}
                onChange={(e) => setFormData({ ...formData, anxietyAssessment: e.target.value })}
              />
            </div>

            {/* Safety Assessment */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Fall Risk</label>
              <textarea
                rows={4}
                className="w-full p-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-blue-500 resize-none"
                value={formData.fallRisk || ''}
                onChange={(e) => setFormData({ ...formData, fallRisk: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Medication Management</label>
              <textarea
                rows={4}
                className="w-full p-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-blue-500 resize-none"
                value={formData.medicationManagement || ''}
                onChange={(e) => setFormData({ ...formData, medicationManagement: e.target.value })}
              />
            </div>

            {/* Assessment Info */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Assessment Date</label>
                <input
                  type="date"
                  className="w-full p-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  value={formData.assessmentDate || ''}
                  onChange={(e) => setFormData({ ...formData, assessmentDate: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Frequency</label>
                <select
                  className="w-full p-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  value={formData.frequency || ''}
                  onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
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

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Completed By</label>
            <input
              type="text"
              className="w-full p-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
              value={formData.completedBy || ''}
                  onChange={(e) => setFormData({ ...formData, completedBy: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Role</label>
            <input
              type="text"
              className="w-full p-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
              value={formData.completedByRole || ''}
                  onChange={(e) => setFormData({ ...formData, completedByRole: e.target.value })}
            />
          </div>
        </div>
      </div>
    )

      case 'initial':
        return (
          <div className="space-y-8">
            {/* Medical History */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Past Medical History</label>
              <textarea
                rows={6}
                className="w-full p-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-blue-500 resize-none"
                value={formData.pastMedicalHistory || ''}
                onChange={(e) => setFormData({ ...formData, pastMedicalHistory: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Surgical History</label>
              <textarea
                rows={4}
                className="w-full p-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-blue-500 resize-none"
                value={formData.surgicalHistory || ''}
                onChange={(e) => setFormData({ ...formData, surgicalHistory: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Current Medications</label>
              <textarea
                rows={6}
                className="w-full p-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-blue-500 resize-none"
                value={formData.medications || ''}
                onChange={(e) => setFormData({ ...formData, medications: e.target.value })}
              />
            </div>

            {/* Current Condition */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Chief Complaint</label>
              <input
                type="text"
                className="w-full p-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                value={formData.chiefComplaint || ''}
                onChange={(e) => setFormData({ ...formData, chiefComplaint: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Current Symptoms</label>
              <textarea
                rows={4}
                className="w-full p-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-blue-500 resize-none"
                value={formData.currentSymptoms || ''}
                onChange={(e) => setFormData({ ...formData, currentSymptoms: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Pain Assessment</label>
              <textarea
                rows={3}
                className="w-full p-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-blue-500 resize-none"
                value={formData.painAssessment || ''}
                onChange={(e) => setFormData({ ...formData, painAssessment: e.target.value })}
              />
            </div>

            {/* Functional Status */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">ADL Independence</label>
              <textarea
                rows={4}
                className="w-full p-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-blue-500 resize-none"
                value={formData.adlIndependence || ''}
                onChange={(e) => setFormData({ ...formData, adlIndependence: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Mobility Status</label>
              <textarea
                rows={4}
                className="w-full p-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-blue-500 resize-none"
                value={formData.mobilityStatus || ''}
                onChange={(e) => setFormData({ ...formData, mobilityStatus: e.target.value })}
              />
            </div>

            {/* Home Environment */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Living Situation</label>
              <textarea
                rows={3}
                className="w-full p-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-blue-500 resize-none"
                value={formData.livingSituation || ''}
                onChange={(e) => setFormData({ ...formData, livingSituation: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Safety Hazards</label>
              <textarea
                rows={3}
                className="w-full p-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-blue-500 resize-none"
                value={formData.safetyHazards || ''}
                onChange={(e) => setFormData({ ...formData, safetyHazards: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Accessibility</label>
              <textarea
                rows={3}
                className="w-full p-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-blue-500 resize-none"
                value={formData.accessibility || ''}
                onChange={(e) => setFormData({ ...formData, accessibility: e.target.value })}
              />
            </div>

            {/* Safety Evaluation */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Fall Risk Factors</label>
              <textarea
                rows={3}
                className="w-full p-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-blue-500 resize-none"
                value={formData.fallRiskFactors || ''}
                onChange={(e) => setFormData({ ...formData, fallRiskFactors: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Emergency Contacts</label>
              <textarea
                rows={3}
                className="w-full p-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-blue-500 resize-none"
                value={formData.emergencyContacts || ''}
                onChange={(e) => setFormData({ ...formData, emergencyContacts: e.target.value })}
              />
            </div>

            {/* Care Plan */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Goals</label>
              <textarea
                rows={4}
                className="w-full p-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-blue-500 resize-none"
                value={formData.goals || ''}
                onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Interventions</label>
              <textarea
                rows={4}
                className="w-full p-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-blue-500 resize-none"
                value={formData.interventions || ''}
                onChange={(e) => setFormData({ ...formData, interventions: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Visit Frequency</label>
                <input
                  type="text"
                  className="w-full p-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  value={formData.visitFrequency || ''}
                  onChange={(e) => setFormData({ ...formData, visitFrequency: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Assessment Date</label>
                <input
                  type="date"
                  className="w-full p-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  value={formData.assessmentDate || ''}
                  onChange={(e) => setFormData({ ...formData, assessmentDate: e.target.value })}
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
                  onChange={(e) => setFormData({ ...formData, completedBy: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Role</label>
                <input
                  type="text"
                  className="w-full p-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  value={formData.completedByRole || ''}
                  onChange={(e) => setFormData({ ...formData, completedByRole: e.target.value })}
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
                  onChange={(e) => setFormData({ ...formData, visitDate: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Visit Time</label>
                <input
                  type="time"
                  className="w-full p-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  value={formData.visitTime || ''}
                  onChange={(e) => setFormData({ ...formData, visitTime: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Visit Type</label>
                <input
                  type="text"
                  placeholder="e.g., Skilled nursing, Physical therapy"
                  className="w-full p-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  value={formData.visitType || ''}
                  onChange={(e) => setFormData({ ...formData, visitType: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Duration</label>
                <input
                  type="text"
                  placeholder="e.g., 45 minutes"
                  className="w-full p-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  value={formData.duration || ''}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Current Status</label>
              <textarea
                rows={4}
                className="w-full p-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-blue-500 resize-none"
                value={formData.currentStatus || ''}
                onChange={(e) => setFormData({ ...formData, currentStatus: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Changes Since Last Visit</label>
              <textarea
                rows={4}
                className="w-full p-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-blue-500 resize-none"
                value={formData.changesSinceLastVisit || ''}
                onChange={(e) => setFormData({ ...formData, changesSinceLastVisit: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Interventions Performed</label>
              <textarea
                rows={4}
                className="w-full p-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-blue-500 resize-none"
                value={formData.interventionsPerformed || ''}
                onChange={(e) => setFormData({ ...formData, interventionsPerformed: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Patient Response</label>
              <textarea
                rows={4}
                className="w-full p-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-blue-500 resize-none"
                value={formData.patientResponse || ''}
                onChange={(e) => setFormData({ ...formData, patientResponse: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Blood Pressure</label>
                <input
                  type="text"
                  placeholder="e.g., 120/80"
                  className="w-full p-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  value={formData.bloodPressure || ''}
                  onChange={(e) => setFormData({ ...formData, bloodPressure: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Heart Rate</label>
                <input
                  type="text"
                  placeholder="e.g., 72 bpm"
                  className="w-full p-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  value={formData.heartRate || ''}
                  onChange={(e) => setFormData({ ...formData, heartRate: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Respiratory Rate</label>
                <input
                  type="text"
                  placeholder="e.g., 16/min"
                  className="w-full p-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  value={formData.respiratoryRate || ''}
                  onChange={(e) => setFormData({ ...formData, respiratoryRate: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Temperature</label>
                <input
                  type="text"
                  placeholder="e.g., 98.6°F"
                  className="w-full p-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  value={formData.temperature || ''}
                  onChange={(e) => setFormData({ ...formData, temperature: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Oxygen Saturation</label>
                <input
                  type="text"
                  placeholder="e.g., 98%"
                  className="w-full p-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  value={formData.oxygenSaturation || ''}
                  onChange={(e) => setFormData({ ...formData, oxygenSaturation: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Pain Level</label>
                <input
                  type="text"
                  placeholder="e.g., 2/10"
                  className="w-full p-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  value={formData.painLevel || ''}
                  onChange={(e) => setFormData({ ...formData, painLevel: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Additional Visit Notes</label>
              <textarea
                rows={6}
                className="w-full p-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-blue-500 resize-none"
                value={formData.visitNotes || ''}
                onChange={(e) => setFormData({ ...formData, visitNotes: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Completed By</label>
                <input
                  type="text"
                  className="w-full p-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  value={formData.completedBy || ''}
                  onChange={(e) => setFormData({ ...formData, completedBy: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Role</label>
                <input
                  type="text"
                  className="w-full p-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  value={formData.completedByRole || ''}
                  onChange={(e) => setFormData({ ...formData, completedByRole: e.target.value })}
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
          <button
            onClick={onBack}
            className="px-3 py-2 bg-dark-800 hover:bg-dark-700 border border-dark-600 rounded-lg transition-colors text-gray-300 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
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
