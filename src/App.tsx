import React, { memo, useCallback, useState } from 'react'
import VideoFrame from './components/VideoFrame'
import TimerCard from './components/TimerCard'
import { SButton } from './components/SButton'

const App = () => {
  console.log('rendered App')
  const [timerList, setTimerList] = useState([0, 1])

  const deleteCard = useCallback(() => {
    setTimerList(prev => {
      const newList = [...prev]
      newList.splice(0, 1)
      return newList
    })
  }, [])

  return (
    <>
      <h1>React Exercise </h1>
      <SButton onClick={deleteCard}>Remove Card</SButton>
      {timerList &&
        timerList.map(index => {
          return <TimerCard id={index} key={index} />
        })}
      {/* <TimerCard /> */}
      <VideoFrame />
    </>
  )
}

export default memo(App)
