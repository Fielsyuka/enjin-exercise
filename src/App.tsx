import React, { memo } from 'react'
import VideoFrame from './components/VideoFrame'
import TimerCard from './components/TimerCard'

const App = () => {
  console.log('rendered App')

  return (
    <>
      <h1>React Exercise </h1>
      <TimerCard />
      <TimerCard />
      <VideoFrame />
    </>
  )
}

export default memo(App)
