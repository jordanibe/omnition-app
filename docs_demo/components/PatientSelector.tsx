import { useState } from 'react'
import { User, Calendar, MapPin } from 'lucide-react'
import { Patient } from '../data/patients'

interface PatientSelectorProps {
  patients: Patient[]
  onSelectPatient: (patient: Patient) => void
  onBack: () => void
}

// Helper function to get risk level for sorting
const getRiskLevel = (fallRisk: string): number => {
  if (fallRisk.includes('Very high')) return 4
  if (fallRisk.includes('High')) return 3
  if (fallRisk.includes('Moderate')) return 2
  if (fallRisk.includes('Low')) return 1
  return 0
}

export default function PatientSelector({ patients, onSelectPatient, onBack }: PatientSelectorProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'recent' | 'high-risk'>('all')

  const filteredPatients = patients
    .filter(patient => {
      const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           patient.primaryDiagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           patient.id.toLowerCase().includes(searchTerm.toLowerCase())
      
      if (selectedFilter === 'all') return matchesSearch
      if (selectedFilter === 'recent') return matchesSearch && ['P001', 'P002', 'P003', 'P004', 'P005'].includes(patient.id)
      if (selectedFilter === 'high-risk') return matchesSearch && (patient.fallRisk.includes('High') || patient.fallRisk.includes('Very high'))
      
      return matchesSearch
    })
    .sort((a, b) => getRiskLevel(b.fallRisk) - getRiskLevel(a.fallRisk))

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 flex-shrink-0">
        <div>
          <h2 className="text-3xl font-semibold text-white mb-2">Select Patient</h2>
          <p className="text-gray-400">Choose a patient to create documentation for</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4 flex-shrink-0">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by name, diagnosis, or patient ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 bg-dark-900 border border-dark-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedFilter === 'all' 
                ? 'bg-blue-600 text-white' 
                : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
            }`}
          >
            All Patients
          </button>
          <button
            onClick={() => setSelectedFilter('recent')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedFilter === 'recent' 
                ? 'bg-blue-600 text-white' 
                : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
            }`}
          >
            Recent
          </button>
          <button
            onClick={() => setSelectedFilter('high-risk')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedFilter === 'high-risk' 
                ? 'bg-blue-600 text-white' 
                : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
            }`}
          >
            High Risk
          </button>
        </div>
      </div>

      {/* Patient Grid */}
      <div className="flex-1 overflow-y-auto">
        {filteredPatients.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPatients.map((patient) => (
              <div
                key={patient.id}
                onClick={() => onSelectPatient(patient)}
                className="h-48 p-4 bg-dark-900 border border-dark-700 hover:border-blue-500 rounded-lg cursor-pointer transition-colors group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                        {patient.name}
                      </h3>
                      <p className="text-sm text-gray-500">ID: {patient.id}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-gray-400">{patient.age} years</span>
                    <p className="text-xs text-gray-500 capitalize">{patient.gender}</p>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-300">
                    <span className="font-medium">Primary:</span>
                    <span className="text-gray-400 truncate">{patient.primaryDiagnosis}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-300">
                    <span className="font-medium">Living:</span>
                    <span className="text-gray-400 truncate">{patient.livingArrangement.split(' ').slice(0, 3).join(' ')}...</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-300">
                    <span className="font-medium">Risk:</span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      patient.fallRisk.includes('Very high') ? 'bg-red-900 text-red-300' :
                      patient.fallRisk.includes('High') ? 'bg-orange-900 text-orange-300' :
                      patient.fallRisk.includes('Moderate') ? 'bg-yellow-900 text-yellow-300' :
                      'bg-green-900 text-green-300'
                    }`}>
                      {patient.fallRisk.split(' - ')[0]}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <User className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No patients found</h3>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
