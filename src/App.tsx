import React, { useState } from 'react'
import Navigation from './layout/navigation'
import DashboardScreen from './screens/Dashboard/dashboardScreen'
import ProducerFormScreen from './screens/Form/producerForm'
import ProducerListScreen from './screens/ListProducers/producerListScreen'

const App: React.FC = () => {
  const [screen, setScreen] = useState<'dashboard' | 'form' | 'list'>(
    'dashboard'
  )

  const renderScreen = () => {
    switch (screen) {
      case 'form':
        return <ProducerFormScreen onCancel={() => undefined} />
      case 'list':
        return <ProducerListScreen />
      default:
        return <DashboardScreen />
    }
  }

  return (
    <>
      <Navigation currentScreen={screen} onChangeScreen={setScreen} />
      <main style={{ padding: '20px' }}>{renderScreen()}</main>
    </>
  )
}

export default App
