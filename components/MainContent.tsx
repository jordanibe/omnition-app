'use client'

import { useState } from 'react'
import { 
  Send, 
  Upload, 
  Mic,
  Settings,
  User,
  Plus,
  ChevronDown,
  MessageSquare
} from 'lucide-react'
import Image from 'next/image'
import { CLIENT_NAME } from '@/app/config'
import { patients } from '@/docs_demo/data/patients'
import { DocumentType } from '@/docs_demo/types'
import DocumentationView from './DocumentationView'
import { LogisticsView } from '@/logistics_demo'

interface MainContentProps {
  clientName?: string
  clientLogo?: string
  modules?: any[]
  setModules?: (modules: any[]) => void
  activeModuleId?: string | null
  setActiveModuleId?: (id: string | null) => void
}

type ModuleType = 'none' | 'logistics' | 'analytics' | 'documentation'

export default function MainContent({ clientName = CLIENT_NAME, clientLogo, modules = [], setModules, activeModuleId, setActiveModuleId }: MainContentProps) {
  const [selectedModule, setSelectedModule] = useState<'none' | 'logistics' | 'analytics' | 'documentation'>('none')
  const [message, setMessage] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [analyticsItems, setAnalyticsItems] = useState<string[]>([])
  const [analyticsInput, setAnalyticsInput] = useState('')
  
  // Documentation module state
  const [selectedPatient, setSelectedPatient] = useState<any>(null)
  const [selectedDocumentType, setSelectedDocumentType] = useState<DocumentType | 'ask-omni' | null>(null)
  const [askOmniText, setAskOmniText] = useState('')
  const [isPatientDropdownOpen, setIsPatientDropdownOpen] = useState(false)
  const [isDocumentDropdownOpen, setIsDocumentDropdownOpen] = useState(false)
  const [patientSearchTerm, setPatientSearchTerm] = useState('')
  
  // Title arrays for different modules
  const logisticsTitles = [
    "What can I perfect for you?",
    "Let's make things better.",
    "What can I optimize for you?"
  ]
  
  const analyticsTitles = [
    "What insights would you like?",
    "Let's dive deeper.",
    "What do you want to know?"
  ]

  const documentationTitles = [
    "What would you like to document?",
    "Let's capture the details.",
    "What needs to be recorded?"
  ]
  
  // Get random title for current module
  const getCurrentTitle = () => {
    if (selectedModule === 'logistics') {
      return logisticsTitles[Math.floor(Math.random() * logisticsTitles.length)]
    } else if (selectedModule === 'analytics') {
      return analyticsTitles[Math.floor(Math.random() * analyticsTitles.length)]
    } else if (selectedModule === 'documentation') {
      return documentationTitles[Math.floor(Math.random() * documentationTitles.length)]
    }
    return "Hi, I'm Omni. What shall I build for you?"
  }

  const documentTypeLabels = {
    'encounter': 'Encounter Note',
    'oasis': 'OASIS Assessment',
    'initial': 'Initial Assessment',
    'progress': 'Progress Note',
    'ask-omni': 'Ask Omni'
  }

  const handleSend = () => {
    if (message.trim()) {
      // Create a new logistics module and add it to the sidebar
      const newModule = {
        id: `log_${Date.now()}`,
        name: `Logistics Optimization - ${new Date().toLocaleDateString()}`,
        type: 'logistics' as const,
        content: message,
        createdAt: new Date()
      }

      if (setModules) {
        setModules([...modules || [], newModule])
      }
      if (setActiveModuleId) {
        setActiveModuleId(newModule.id)
      }
      
      setMessage('')
    }
  }

  const handleDataUpload = () => {
    console.log('Opening data upload dialog')
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    console.log('Toggle recording:', !isRecording)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleModuleSelect = (module: ModuleType) => {
    setSelectedModule(module)
    setMessage('')
    setAnalyticsInput('')
    // Reset documentation state when switching modules
    if (module !== 'documentation') {
      setSelectedPatient(null)
      setSelectedDocumentType(null)
      setAskOmniText('')
      setIsPatientDropdownOpen(false)
      setIsDocumentDropdownOpen(false)
      setPatientSearchTerm('')
    }
    // Clear active module when switching to main interface
    if (setActiveModuleId) {
      setActiveModuleId(null)
    }
  }

  const handleAddAnalyticsItem = () => {
    if (analyticsInput.trim()) {
      setAnalyticsItems([...analyticsItems, analyticsInput.trim()])
      setAnalyticsInput('')
    }
  }

  const handleAnalyticsKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddAnalyticsItem()
    }
  }

  const handleFormSubmit = (documentType: any, data: any) => {
    console.log('Document submitted:', { documentType, data })
  }

  // Documentation module handlers
  const handleDocumentationSubmit = () => {
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
      alert(`Omni will help you with: "${askOmniText}" for patient ${selectedPatient.name}`)
      return
    }

    // Create a new module and add it to the sidebar
    const newModule = {
      id: `doc_${Date.now()}`,
      name: `${documentTypeLabels[selectedDocumentType]} - ${selectedPatient.name}`,
      type: 'documentation' as const,
      content: '',
      createdAt: new Date(),
      documentType: selectedDocumentType,
      patientId: selectedPatient.id,
      patientName: selectedPatient.name
    }

    if (setModules) {
      setModules([...modules || [], newModule])
    }
    if (setActiveModuleId) {
      setActiveModuleId(newModule.id)
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

  const selectPatient = (patient: any) => {
    setSelectedPatient(patient)
    setIsPatientDropdownOpen(false)
    setPatientSearchTerm('')
  }

  const selectDocumentType = (docType: DocumentType | 'ask-omni') => {
    setSelectedDocumentType(docType)
    setIsDocumentDropdownOpen(false)
    if (docType !== 'ask-omni') {
      setAskOmniText('')
    }
  }

  // If there's an active module, render the appropriate view
  if (activeModuleId) {
    const activeModule = modules.find(m => m.id === activeModuleId)
    if (activeModule && activeModule.type === 'documentation' && activeModule.documentType && activeModule.patientId) {
      const patient = patients.find(p => p.id === activeModule.patientId)
      if (patient && activeModule.documentType !== 'ask-omni') {
        return (
          <DocumentationView
            documentType={activeModule.documentType as DocumentType}
            patient={patient}
            onBack={() => {
              if (setActiveModuleId) {
                setActiveModuleId(null)
              }
            }}
          />
        )
      }
    }
    
    if (activeModule && activeModule.type === 'logistics') {
      return (
        <LogisticsView
          moduleName={activeModule.name}
        />
      )
    }
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-dark-950 graph-pattern overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-6 flex-shrink-0">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-semibold text-white">Omnition</h1>
          {/* <span className="text-xl text-gray-400">@ {clientName}</span> */}
        </div>
        
        <div className="w-12 h-12 rounded-lg bg-dark-800 border border-dark-600 flex items-center justify-center">
          {clientLogo ? (
            <Image
              src={clientLogo}
              alt={`${clientName} logo`}
              width={32}
              height={32}
              className="rounded"
            />
          ) : (
            <User className="w-6 h-6 text-gray-400" />
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 relative overflow-hidden">
        {/* Dynamic Title - Always Visible */}
        <div className="mb-12 text-center flex-shrink-0">
          <h2 className="text-4xl font-medium mb-4 animate-float">
            {selectedModule === 'none' ? (
              <>
                <span className="text-white">Hi, I'm </span>
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent bg-200% animate-shimmer">
                    Omni
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent opacity-50 blur-sm">
                    Omni
                  </span>
                </span>
                <span className="text-white">. What shall I build for you?</span>
              </>
            ) : (
              <span className="text-white">{getCurrentTitle()}</span>
            )}
          </h2>
        </div>

        {/* Logistics Module Input Area */}
        {selectedModule === 'logistics' && (
        <div className="w-full max-w-3xl flex-shrink-0">
          <div className="relative">
                          <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={`Describe your desired outcomes and key constraints. For example:
  - Assign patients to nurses to maximize the number of patients assigned.
  - Each patient's duration is in minutes.
  - Each nurse can only do one patient at a time.
  - Each nurse can do up to their max capacity in patients.`}
                className="w-full p-4 pr-24 pb-16 bg-dark-900 border border-dark-700 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors resize-none min-h-[180px]"
                rows={5}
              />
            
            {/* Bottom Controls */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              {/* Microphone Button */}
              <button
                onClick={toggleRecording}
                className={`p-2 rounded-lg transition-colors ${
                  isRecording 
                    ? 'bg-red-600 hover:bg-red-700' 
                    : 'bg-dark-700 hover:bg-dark-600'
                }`}
              >
                <Mic className={`w-5 h-5 ${isRecording ? 'text-white' : 'text-gray-400'}`} />
              </button>

              <div className="flex items-center gap-2">
                {/* Data Upload Button */}
                <button
                  onClick={handleDataUpload}
                  className="flex items-center gap-2 px-3 py-2 bg-dark-700 hover:bg-dark-600 rounded-lg transition-colors"
                >
                  <Upload className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-400 text-sm">Data</span>
                </button>

                {/* Send Button */}
                <button
                  onClick={handleSend}
                  disabled={!message.trim()}
                  className="p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-dark-700 disabled:cursor-not-allowed rounded-lg transition-colors"
                >
                  <Send className={`w-5 h-5 ${message.trim() ? 'text-white' : 'text-gray-500'}`} />
                </button>
              </div>
            </div>
          </div>
        </div>
        )}

        {/* Analytics Module Input Area */}
        {selectedModule === 'analytics' && (
          <div className="w-full max-w-3xl mb-8 flex-shrink-0">
            <div className="flex items-center gap-3">
              {/* Browse Button */}
              <button className="px-4 py-2 bg-dark-700 hover:bg-dark-600 rounded-lg transition-colors text-gray-300">
                Browse insights...
              </button>
              
              {/* Analytics Input */}
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={analyticsInput}
                  onChange={(e) => setAnalyticsInput(e.target.value)}
                  onKeyPress={handleAnalyticsKeyPress}
                  placeholder="Describe your desired insight..."
                  className="w-full p-3 pr-12 bg-dark-900 border border-dark-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                />
                
                {/* Add Button */}
                <button
                  onClick={handleAddAnalyticsItem}
                  disabled={!analyticsInput.trim()}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 bg-blue-600 hover:bg-blue-700 disabled:bg-dark-700 disabled:cursor-not-allowed rounded transition-colors"
                >
                  <Plus className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            {/* Analytics Items List */}
            {analyticsItems.length > 0 && (
              <div className="mt-4">
                <div className={`space-y-2 ${analyticsItems.length > 4 ? 'max-h-48 overflow-y-auto' : ''}`}>
                  {analyticsItems.map((item, index) => (
                    <div key={index} className="p-3 bg-dark-800 border border-dark-600 rounded-lg text-gray-300 text-sm flex items-center justify-between group">
                      <span className="flex-1">{item}</span>
                      <button
                        onClick={() => {
                          const newItems = analyticsItems.filter((_, i) => i !== index)
                          setAnalyticsItems(newItems)
                        }}
                        className="ml-3 p-1 text-gray-400 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                
                {/* Build Analytics Module Button */}
                <button className="mt-4 px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-white font-medium mx-auto block">
                  Build Analytics Module
                </button>
              </div>
            )}
          </div>
        )}

        {/* Documentation Module Input Area */}
        {selectedModule === 'documentation' && (
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
                    {/* Search Input */}
                    <div className="p-3 border-b border-dark-700">
                      <input
                        type="text"
                        value={patientSearchTerm}
                        onChange={(e) => setPatientSearchTerm(e.target.value)}
                        placeholder="Search patients..."
                        className="w-full p-2 bg-dark-800 border border-dark-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                        autoFocus
                      />
                    </div>
                    {/* Patient List */}
                    {patients
                      .filter(patient => 
                        patient.name.toLowerCase().includes(patientSearchTerm.toLowerCase()) ||
                        patient.id.toLowerCase().includes(patientSearchTerm.toLowerCase())
                      )
                      .map((patient) => (
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
                onClick={handleDocumentationSubmit}
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
        )}

        {/* Module Cards */}
        <div className="w-full max-w-4xl mt-12 flex-shrink-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Logistics Module Card */}
            <div 
              onClick={() => handleModuleSelect('logistics')}
              className={`p-6 rounded-2xl transition-colors cursor-pointer group ${
                selectedModule === 'logistics' 
                  ? 'bg-dark-800 border-2 border-blue-500' 
                  : 'bg-dark-900 border border-dark-700 hover:border-dark-600'
              }`}
            >
              <h3 className={`text-lg font-semibold mb-2 transition-colors ${
                selectedModule === 'logistics' 
                  ? 'text-blue-400' 
                  : 'text-white group-hover:text-blue-400'
              }`}>
                Logistics Module
              </h3>
              <p className="text-gray-400 text-sm">
                Orchestrate care at scale, from routes to rosters.
              </p>
            </div>

            {/* Analytics Module Card */}
            <div 
              onClick={() => handleModuleSelect('analytics')}
              className={`p-6 rounded-2xl transition-colors cursor-pointer group ${
                selectedModule === 'analytics' 
                  ? 'bg-dark-800 border-2 border-blue-500' 
                  : 'bg-dark-900 border border-dark-700 hover:border-dark-600'
              }`}
            >
              <h3 className={`text-lg font-semibold mb-2 transition-colors ${
                selectedModule === 'analytics' 
                  ? 'text-blue-400' 
                  : 'text-white group-hover:text-blue-400'
              }`}>
                Analytics Module
              </h3>
              <p className="text-gray-400 text-sm">
                Operational truth at a glance. Ask anything. See everything.
              </p>
            </div>

            {/* Documentation Module Card */}
            <div 
              onClick={() => handleModuleSelect('documentation')}
              className={`p-6 rounded-2xl transition-colors cursor-pointer group ${
                selectedModule === 'documentation' 
                  ? 'bg-dark-800 border-2 border-blue-500' 
                  : 'bg-dark-900 border border-dark-700 hover:border-dark-600'
              }`}
            >
              <h3 className={`text-lg font-semibold mb-2 transition-colors ${
                selectedModule === 'documentation' 
                  ? 'text-blue-400' 
                  : 'text-white group-hover:text-blue-400'
              }`}>
                Documentation Module
              </h3>
              <p className="text-gray-400 text-sm">
                Clinical narratives, captured and coded effortlessly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
