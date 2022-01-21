import React, { memo } from 'react'
import VideoFrame from './components/VideoFrame'
import TrackingArea from './components/TrackingArea'

const App = () => {
  return (
    <>
      <div className="appWrap">
        <div className="pomodoro">
          <VideoFrame />
        </div>
        <div className="timeTrack">
          <TrackingArea />
        </div>
      </div>
    </>
  )
}

export default memo(App)
