import React from 'react'
import { StatusProvider } from './components/providers/statusProvider'
import Header from './components/Header'
import Pomodoro from './components/Pomodoro'
import TimeTrack from './components/TimeTrack'

const App = () => {
  return (
    <>
      <StatusProvider>
        <Header />
        <main className="main">
          <Pomodoro />
          <TimeTrack />
        </main>
      </StatusProvider>
    </>
  )
}

export default App
