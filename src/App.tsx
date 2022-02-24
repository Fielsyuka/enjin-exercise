import React from 'react'
import Header from './components/Header'
import Pomodoro from './components/Pomodoro'
import TimeTrack from './components/TimeTrack'
import { TagListProvider } from './components/providers/TagListProvider'

const App = () => {
  return (
    <>
      <Header />
      <main className="main">
        <Pomodoro />
        <TagListProvider>
          <TimeTrack />
        </TagListProvider>
      </main>
    </>
  )
}

export default App
