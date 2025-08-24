'use client'

import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import MainContent from '@/components/MainContent'
import { CLIENT_NAME, CLIENT_LOGO } from './config'

export default function Home() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed)
  }

  return (
    <div className="h-screen flex bg-dark-950">
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        onToggleCollapse={toggleSidebar}
      />
      <MainContent 
        clientName={CLIENT_NAME}
        clientLogo={CLIENT_LOGO}
      />
    </div>
  )
}
