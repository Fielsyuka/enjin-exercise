import React, { memo, useState, useEffect, useRef, useContext } from 'react'
import styled from 'styled-components'
import { StatusContext } from './providers/statusProvider'
import { color } from '../theme/GlobalColor'
import { pomodoroStatus } from '../constants/constants'
import { printTime } from '../utils/utils'

type Props = {
  timeSetting: number
}

const PomodoroTimer: React.VFC<Props> = props => {
  console.log('PomodoroTimer is rendered')

  const { timeSetting } = props
  const { status, setStatus } = useContext(StatusContext)
  const [timer, setTimer] = useState(timeSetting)
  const timeRef = useRef(timer)

  useEffect(() => {
    const tick: NodeJS.Timer = setInterval(() => {
      if (status === pomodoroStatus.stop) {
        return
      }
      if (timeRef.current > 0) {
        setTimer(prev => prev - 1)
      } else {
        clearInterval(tick)
        setStatus(prev => {
          return prev == pomodoroStatus.break
            ? pomodoroStatus.work
            : pomodoroStatus.break
        })
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
  max-width: 700px;
  margin: 32px auto 64px;
  padding: 0.5em;
  border: 2px solid ${color.accent};
  border-radius: 16px;
  background-color: #fff;
  color: ${color.accent};
  font-size: 56px;
  font-weight: bold;
  text-align: center;
  letter-spacing: 0.02em;
  line-height: 1;
  @media screen and (min-width: 768px) {
    margin: 24px auto 80px;
    font-size: 100px;
  }
  &.isWorking {
    border-color: ${color.working};
    color: ${color.working};
  }
  &.isBreaking {
    border-color: ${color.breaking};
    color: ${color.breaking};
  }
`

export default memo(PomodoroTimer)
