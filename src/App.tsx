import React from 'react'
import PomodoroArea from './components/PomodoroArea'
import TrackingArea from './components/TrackingArea'
import { TagListProvider } from './components/providers/TagListProvider'

const App = () => {
  return (
    <>
      <div className="appWrap">
        <div className="pomodoro">
          <PomodoroArea />
        </div>
        <TagListProvider>
          <div className="timeTrack">
            <TrackingArea />
          </div>
        </TagListProvider>
      </div>
    </>
  )
}

export default App
