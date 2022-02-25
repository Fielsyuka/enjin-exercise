import React, { memo, useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { color } from '../theme/GlobalColor'
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
      <STimerCount className={status}>
        {printTime(timer, 'minutes')}
      </STimerCount>
    </>
  )
}

const STimerCount = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 600px;
  margin: 64px auto;
  padding: 40px 16px;
  border: 4px solid ${color.accent};
  border-radius: 16px;
  background-color: #fff;
  color: ${color.accent};
  font-size: 56px;
  font-weight: bold;
  text-align: center;
  line-height: 1;
  @media screen and (min-width: 768px) {
    margin: 24px auto 56px;
    font-size: 72px;
  }
  &.isWorking {
    padding: 32px 16px 110px;
    border-color: ${color.working};
    color: ${color.working};
  }
  &.isBreaking {
    padding: 32px 16px 110px;
    border-color: ${color.breaking};
    color: ${color.breaking};
  }
`

export default memo(PomodoroTimer)
