import React from 'react'
import QRProvider from './context/QRContext'
import Home from './pages/Home'

function App() {
  return (
    <QRProvider>
      <Home />
    </QRProvider>
  )
}

export default App
