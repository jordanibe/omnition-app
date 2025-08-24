'use client'

import { useState } from 'react'
import { 
  Edit, 
  Settings, 
  HelpCircle, 
  Menu,
  ChevronLeft
} from 'lucide-react'

interface Module {
  id: string
  name: string
  type: 'logistics' | 'analytics' | 'documentation'
  content: string
  createdAt: Date
}

interface SidebarProps {
  isCollapsed: boolean
  onToggleCollapse: () => void
  modules: Module[]
  onNewModule: () => void
  onModuleSelect: (moduleId: string) => void
  activeModuleId: string | null
}

export default function Sidebar({ isCollapsed, onToggleCollapse, modules, onNewModule, onModuleSelect, activeModuleId }: SidebarProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredModules = modules.filter(module =>
    module.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleNewModule = () => {
    onNewModule()
  }

  if (isCollapsed) {
    return (
      <div className="w-16 bg-dark-900 border-r border-dark-700 flex flex-col items-center py-4 space-y-4">
        <button
          onClick={onToggleCollapse}
          className="p-2 rounded-lg hover:bg-dark-800 transition-colors"
        >
          <Menu className="w-5 h-5 text-gray-400" />
        </button>
        
        <button
          onClick={handleNewModule}
          className="p-2 rounded-lg hover:bg-dark-800 transition-colors"
        >
          <Edit className="w-5 h-5 text-gray-400" />
        </button>

        <div className="flex-1" />

        <button className="p-2 rounded-lg hover:bg-dark-800 transition-colors">
          <Settings className="w-5 h-5 text-gray-400" />
        </button>
        
        <button className="p-2 rounded-lg hover:bg-dark-800 transition-colors">
          <HelpCircle className="w-5 h-5 text-gray-400" />
        </button>
      </div>
    )
  }

  return (
    <div className="w-72 bg-dark-900 border-r border-dark-700 flex flex-col h-full">
      {/* Header */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-medium text-gray-300">OmnitionAI</h2>
          <button
            onClick={onToggleCollapse}
            className="p-1 rounded hover:bg-dark-800 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-gray-400" />
          </button>
        </div>
        
        {/* New Module Button */}
        <button
          onClick={handleNewModule}
          className="w-full flex items-center gap-3 p-3 rounded-lg bg-dark-900 hover:bg-dark-800 transition-colors text-left"
        >
          <Edit className="w-5 h-5 text-gray-400" />
          <span className="text-gray-300">New Module</span>
        </button>
      </div>

      {/* Module List */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          {modules.length > 0 ? (
            modules.map((module) => (
              <div
                key={module.id}
                onClick={() => onModuleSelect(module.id)}
                className={`p-3 rounded-lg cursor-pointer transition-colors group ${
                  activeModuleId === module.id 
                    ? 'bg-dark-800 border border-blue-500' 
                    : 'hover:bg-dark-800'
                }`}
              >
                <div className="text-gray-300 text-sm font-medium truncate">
                  {module.name}
                </div>
                <div className="text-gray-500 text-xs mt-1">
                  Last updated {module.createdAt.toLocaleDateString()}
                </div>
              </div>
            ))
          ) : (
            <div className="text-gray-500 text-sm text-center py-8">
              No modules yet
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-dark-700 space-y-2">
        <button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-dark-800 transition-colors text-left">
          <Settings className="w-4 h-4 text-gray-400" />
          <span className="text-gray-400 text-sm">Settings & help</span>
        </button>
        
        <button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-dark-800 transition-colors text-left">
          <HelpCircle className="w-4 h-4 text-gray-400" />
          <span className="text-gray-400 text-sm">Help & FAQ</span>
        </button>
      </div>
    </div>
  )
}
