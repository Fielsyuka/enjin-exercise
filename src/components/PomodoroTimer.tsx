import React, { memo, useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { pomodoroStatus } from '../constants/constants'
import { printTime } from '../utils/utils'

type Props = {
  status: string
  timeSetting: number
  onCountOver(): void
}

const PomodoroTimer: React.VFC<Props> = props => {
  console.log('PomodoroTimer is rendered')

  const { status, timeSetting, onCountOver } = props
  const [timer, setTimer] = useState(timeSetting)
  const timeRef = useRef(timer)

  useEffect(() => {
    const tick: NodeJS.Timer = setInterval(() => {
      if (status == pomodoroStatus.stop) {
        return
      }
      if (timeRef.current > 0) {
        setTimer(prev => prev - 1)
      } else {
        clearInterval(tick)
        onCountOver()
      }
    }, 1000)
    return () => {
      console.log('clear')
      clearInterval(tick)
    }
  }, [status])

  useEffect(() => {
    timeRef.current = timer
  }, [timer])

  useEffect(() => {
    setTimer(timeSetting)
  }, [timeSetting, status])

  return (
    <>
      <STimerCount>{printTime(timer, 'minutes')}</STimerCount>
    </>
  )
}

const STimerCount = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
  max-width: 600px;
  margin: 40px auto;
  padding: 0.5rem 1rem;
  border: 2px solid #fff;
  border-radius: 16px;
  color: #fff;
  font-size: 8rem;
  text-align: center;
`

export default memo(PomodoroTimer)
