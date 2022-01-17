import React, { memo, useState, FC, useEffect } from 'react'
import styled from 'styled-components'
import { SCircleButton } from './SButton'

const TimerCard: FC<{ id: number }> = () => {
  let timerId: NodeJS.Timer
  const [time, setTime] = useState(0)
  const [isRunning, setRunning] = useState(false)

  useEffect(() => {
    if (isRunning) {
      timerId = setInterval(() => {
        console.log('start: ' + timerId)
        setTime(prev => prev + 1)
      }, 1000)
    } else {
      return
      // clearInterval(timerId)
      // console.log('stop: ' + timerId) //ここでundefinedになるのはなぜ？？？？？？
    }
    return () => clearInterval(timerId)
  }, [isRunning])

  return (
    <STimerCard>
      <p>{time}</p>
      <SCircleButton onClick={() => setRunning(true)} disabled={isRunning}>
        ▶︎
      </SCircleButton>
      <SCircleButton onClick={() => setRunning(false)} disabled={!isRunning}>
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
