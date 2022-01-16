import React, { memo, useState, useCallback } from 'react'
import styled from 'styled-components'
import { SCircleButton } from './SButton'

const TimerCard = () => {
  let timerId: NodeJS.Timer
  const [time, setTime] = useState(0)
  const [isRunning, setRunning] = useState(false)

  const stopTimer = useCallback(() => {
    console.log('stop: ' + timerId)
    setRunning(false)
    if (!timerId) {
      return
    }
    clearInterval(timerId)
  }, [])

  const startTimer = useCallback(() => {
    setRunning(true)
    timerId = setInterval(() => {
      console.log('start: ' + timerId)
      setTime(oldVal => oldVal + 1)
    }, 1000)
  }, [])

  return (
    <STimerCard>
      <p>{time}</p>
      <SCircleButton onClick={startTimer} disabled={isRunning}>
        ▶︎
      </SCircleButton>
      <SCircleButton onClick={stopTimer} disabled={!isRunning}>
        ■
      </SCircleButton>
    </STimerCard>
  )
}

const STimerCard = styled.div`
  margin: 1em auto;
  box-shadow: 0 0 12px 3px rgba(0, 0, 0, 0.1);
  padding: 1em;
  background-color: #fff;
`
export default memo(TimerCard)
