import React, { memo } from 'react'
import VideoFrame from './components/VideoFrame'
import TrackingArea from './components/TrackingArea'
import { TagListProvider } from './components/providers/TagListProvider'

const App = () => {
  return (
    <>
      <div className="appWrap">
        <div className="pomodoro">
          <VideoFrame />
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

export default memo(App)
