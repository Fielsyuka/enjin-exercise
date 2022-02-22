import React, { memo, useState, useEffect, useRef } from 'react'
import { pomodoroStatus } from '../constants/constants'
// import { formatTime } from '../utils/utils'

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

  let tick: NodeJS.Timer

  useEffect(() => {
    tick = setInterval(() => {
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
  }, [timeSetting])

  useEffect(() => {
    timeRef.current = timer
  }, [timer])

  useEffect(() => {
    setTimer(timeSetting)
  }, [timeSetting])

  return (
    <>
      <p>{timer}</p>
    </>
  )
}

export default memo(PomodoroTimer)
