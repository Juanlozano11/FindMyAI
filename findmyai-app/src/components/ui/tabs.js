import { useState } from 'react'

export const Tabs = ({ value, onValueChange, children }) => {
  const [activeTab, setActiveTab] = useState(value)

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    onValueChange(tab)
  }

  return (
    <div className="Tabs">
      {children.map(child =>
        child.props.value === activeTab ? child : null
      )}
    </div>
  )
}

export const TabsList = ({ children }) => (
  <div className="Tabs-list">
    {children}
  </div>
)

export const TabsTrigger = ({ value, children, setActiveTab }) => (
  <button onClick={() => setActiveTab(value)} className="Tabs-trigger">
    {children}
  </button>
)

export const TabsContent = ({ value, children }) => (
  <div className={`Tabs-content ${value}`}>
    {children}
  </div>
)
