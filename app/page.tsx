'use client'

import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import MainContent from '@/components/MainContent'
import { CLIENT_NAME, CLIENT_LOGO } from './config'

interface Module {
  id: string
  name: string
  type: 'logistics' | 'analytics' | 'documentation'
  content: string
  createdAt: Date
}

export default function Home() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [modules, setModules] = useState<Module[]>([])
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null)

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed)
  }

  const handleNewModule = () => {
    setActiveModuleId(null)
  }

  const handleModuleSelect = (moduleId: string) => {
    setActiveModuleId(moduleId)
  }

  return (
    <div className="h-screen w-screen flex bg-dark-950 overflow-hidden">
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        onToggleCollapse={toggleSidebar}
        modules={modules}
        onNewModule={handleNewModule}
        onModuleSelect={handleModuleSelect}
        activeModuleId={activeModuleId}
      />
      <MainContent 
        clientName={CLIENT_NAME}
        clientLogo={CLIENT_LOGO}
        modules={modules}
        setModules={setModules}
        activeModuleId={activeModuleId}
        setActiveModuleId={setActiveModuleId}
      />
    </div>
  )
}
