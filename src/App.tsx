import React, { memo } from 'react'
import VideoFrame from './components/VideoFrame'

const App = () => {
  console.log('rendered App')

  return (
    <>
      <h1>React Exercise </h1>
      <VideoFrame />
    </>
  )
}

export default memo(App)
